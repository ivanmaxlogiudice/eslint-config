import process from 'node:process'
import fs from 'node:fs'
import { isPackageExists } from 'local-pkg'
import gitignore from 'eslint-config-flat-gitignore'
import {
    comments,
    ignores,
    imports,
    javascript,
    jsdoc,
    jsonc,
    markdown,
    node,
    sortKeys,
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
import { combine } from './utils'
import type { ConfigItem, OptionsConfig } from './types'

const flatConfigProps: (keyof ConfigItem)[] = [
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
export function config(options: OptionsConfig & ConfigItem = {}, ...userConfigs: (ConfigItem | ConfigItem[])[]) {
    const {
        isInEditor = !!((process.env.VSCODE_PID || process.env.JETBRAINS_IDE) && !process.env.CI),
        vue: enableVue = VuePackages.some(i => isPackageExists(i)),
        typescript: enableTypeScript = isPackageExists('typescript'),
        unocss: enableUnocss = UnocssPackages.some(i => isPackageExists(i)),
        gitignore: enableGitignore = true,
        overrides = {},
        componentExts = [],
    } = options

    const stylisticOptions = options.stylistic === false
        ? false
        : typeof options.stylistic === 'object'
            ? options.stylistic
            : {}

    if (stylisticOptions && !('jsx' in stylisticOptions))
        stylisticOptions.jsx = options.jsx ?? true

    const configs: ConfigItem[][] = []

    if (enableGitignore) {
        if (typeof enableGitignore !== 'boolean') {
            configs.push([gitignore(enableGitignore)])
        }
        else {
            if (fs.existsSync('.gitignore'))
                configs.push([gitignore()])
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
        jsdoc({
            stylistic: stylisticOptions,
        }),
        imports({
            stylistic: stylisticOptions,
        }),
        unicorn(),

        // Optional plugins (not enabled by default)
        sortKeys(),
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

    if (enableUnocss)
        configs.push(unocss())

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
    }, {} as ConfigItem)

    if (Object.keys(fusedConfig).length > 0)
        configs.push([fusedConfig])

    const merged = combine(
        ...configs,
        ...userConfigs,
    )

    return merged
}
