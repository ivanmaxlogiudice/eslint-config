import fs from 'node:fs'
import process from 'node:process'
import { isPackageExists } from 'local-pkg'
import type { Awaitable, FlatConfigItem, OptionsConfig, UserConfigItem } from './types'
import {
    comments,
    formatters,
    ignores,
    imports,
    javascript,
    jsdoc,
    jsonc,
    markdown,
    node,
    perfectionist,
    sortPackageJson,
    sortTsconfig,
    stylistic,
    test,
    typescript,
    unicorn,
    unocss,
    vue,
    yaml,
} from './configs'
import { combine, interopDefault, renamePluginInConfigs } from './utils'

const flatConfigProps: (keyof FlatConfigItem)[] = [
    'name',
    'files',
    'ignores',
    'languageOptions',
    'linterOptions',
    'processor',
    'plugins',
    'rules',
    'settings',
]

const VuePackages = [
    'vue',
    'nuxt',
    'vitepress',
    '@slidev/cli',
]

const UnocssPackages = [
    'unocss',
    '@unocss/nuxt',
]

export const defaultPluginRenaming = {
    '@stylistic': 'style',
    '@typescript-eslint': 'ts',
    'import-x': 'import',
    'n': 'node',
    'vitest': 'test',
    'yml': 'yaml',
}

/**
 * Construct an array of ESLint flat config items.
 */

export async function config(
    options: OptionsConfig & FlatConfigItem = {},
    ...userConfigs: Awaitable<UserConfigItem | UserConfigItem[]>[]
): Promise<UserConfigItem[]> {
    const {
        autoRenamePlugins = true,
        componentExts = [],
        gitignore: enableGitignore = true,
        isInEditor = !!((process.env.VSCODE_PID || process.env.JETBRAINS_IDE || process.env.VIM) && !process.env.CI),
        typescript: enableTypeScript = isPackageExists('typescript'),
        unocss: enableUnoCSS = UnocssPackages.some(i => isPackageExists(i)),
        vue: enableVue = VuePackages.some(i => isPackageExists(i)),
    } = options

    const stylisticOptions = options.stylistic === false
        ? false
        : typeof options.stylistic === 'object'
            ? options.stylistic
            : {}

    if (stylisticOptions && !('jsx' in stylisticOptions))
        stylisticOptions.jsx = options.jsx ?? true

    const configs: Awaitable<FlatConfigItem[]>[] = []

    if (enableGitignore) {
        if (typeof enableGitignore !== 'boolean') {
            configs.push(
                interopDefault(import('eslint-config-flat-gitignore')).then(r => [r(enableGitignore)]),
            )
        }
        else {
            if (fs.existsSync('.gitignore'))
                configs.push(interopDefault(import('eslint-config-flat-gitignore')).then(r => [r()]))
        }
    }

    // Base configs
    configs.push(
        ignores(),
        javascript({
            isInEditor,
            overrides: getOverrides(options, 'javascript'),
        }),
        comments(),
        node(),
        jsdoc({
            stylistic: stylisticOptions,
        }),
        imports({
            stylistic: stylisticOptions,
        }),
        unicorn(),
    )

    if (enableVue)
        componentExts.push('vue')

    if (enableTypeScript) {
        configs.push(typescript({
            ...resolveSubOptions(options, 'typescript'),
            componentExts,
            overrides: getOverrides(options, 'typescript'),
        }))
    }

    if (stylisticOptions) {
        configs.push(stylistic({
            ...stylisticOptions,
            overrides: getOverrides(options, 'stylistic'),
        }))
    }

    if (enableUnoCSS) {
        configs.push(unocss({
            ...resolveSubOptions(options, 'unocss'),
            overrides: getOverrides(options, 'unocss'),
        }))
    }

    if (options.test ?? true) {
        configs.push(test({
            isInEditor,
            overrides: getOverrides(options, 'test'),
        }))
    }

    if (enableVue) {
        configs.push(vue({
            ...resolveSubOptions(options, 'vue'),
            overrides: getOverrides(options, 'vue'),
            stylistic: stylisticOptions,
            typescript: !!enableTypeScript,
        }))
    }

    if (options.jsonc ?? true) {
        configs.push(
            jsonc({
                overrides: getOverrides(options, 'jsonc'),
                stylistic: stylisticOptions,
            }),
            sortPackageJson(),
            sortTsconfig(),
        )
    }

    if (options.yaml ?? true) {
        configs.push(yaml({
            overrides: getOverrides(options, 'yaml'),
            stylistic: stylisticOptions,
        }))
    }

    if (options.markdown ?? true) {
        configs.push(markdown({
            componentExts,
            overrides: getOverrides(options, 'markdown'),
        }))
    }

    if (options.formatters) {
        configs.push(formatters(
            options.formatters,
            typeof stylisticOptions === 'boolean' ? {} : stylisticOptions,
        ))
    }

    if (options.perfectionist ?? true) {
        configs.push(perfectionist({
            overrides: getOverrides(options, 'perfectionist'),
        }))
    }

    // User can optionally pass a flat config item to the first argument
    // We pick the known keys as ESLint would do schema validation
    const fusedConfig = flatConfigProps.reduce((acc, key) => {
        if (key in options)
            acc[key] = options[key] as any

        return acc
    }, {} as FlatConfigItem)

    if (Object.keys(fusedConfig).length > 0)
        configs.push([fusedConfig])

    const merged = await combine(
        ...configs,
        ...userConfigs,
    )

    if (autoRenamePlugins)
        return renamePluginInConfigs(merged, defaultPluginRenaming)

    return merged
}

export type ResolvedOptions<T> = T extends boolean
    ? never
    : NonNullable<T>

export function resolveSubOptions<K extends keyof OptionsConfig>(
    options: OptionsConfig,
    key: K,
): ResolvedOptions<OptionsConfig[K]> {
    return typeof options[key] === 'boolean'
        ? {} as any
        : options[key] || {}
}

export function getOverrides<K extends keyof OptionsConfig>(
    options: OptionsConfig,
    key: K,
) {
    const sub = resolveSubOptions(options, key)
    return {
        ...(options.overrides as any)?.[key],
        ...'overrides' in sub
            ? sub.overrides
            : {},
    }
}
