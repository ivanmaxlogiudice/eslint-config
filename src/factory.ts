import fs from 'node:fs'
import process from 'node:process'
import { isPackageExists } from 'local-pkg'
import type { Awaitable, FlatConfigItem, OptionsConfig, UserConfigItem } from './types'
import {
    comments,
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
import { combine, interopDefault } from './utils'

const flatConfigProps: (keyof FlatConfigItem)[] = [
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

/**
 * Construct an array of ESLint flat config items.
 */
// eslint-disable-next-line require-await
export async function config(
    options: OptionsConfig & FlatConfigItem = {},
    ...userConfigs: Awaitable<UserConfigItem | UserConfigItem[]>[]
): Promise<UserConfigItem[]> {
    const {
        componentExts = [],
        gitignore: enableGitignore = true,
        isInEditor = !!((process.env.VSCODE_PID || process.env.JETBRAINS_IDE) && !process.env.CI),
        overrides = {},
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
            overrides: overrides.javascript,
        }),
        comments(),
        node(),
        perfectionist({
            overrides: overrides.perfectionist,
        }),
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
            ...typeof enableTypeScript !== 'boolean'
                ? enableTypeScript
                : {},
            componentExts,
            overrides: overrides.typescript,
        }))
    }

    if (stylisticOptions)
        configs.push(stylistic(stylisticOptions))

    if (enableUnoCSS) {
        configs.push(unocss(
            typeof enableUnoCSS === 'boolean' ? {} : enableUnoCSS,
        ))
    }

    if (options.test ?? true) {
        configs.push(test({
            isInEditor,
            overrides: overrides.test,
        }))
    }

    if (enableVue) {
        configs.push(vue({
            overrides: overrides.vue,
            stylistic: stylisticOptions,
            typescript: !!enableTypeScript,
        }))
    }

    if (options.jsonc ?? true) {
        configs.push(
            jsonc({
                overrides: overrides.jsonc,
                stylistic: stylisticOptions,
            }),
            sortPackageJson(),
            sortTsconfig(),
        )
    }

    if (options.yaml ?? true) {
        configs.push(yaml({
            overrides: overrides.yaml,
            stylistic: stylisticOptions,
        }))
    }

    if (options.markdown ?? true) {
        configs.push(markdown({
            componentExts,
            overrides: overrides.markdown,
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

    const merged = combine(
        ...configs,
        ...userConfigs,
    )

    return merged
}
