import type { RuleOptions } from './typegen'
import type { Awaitable, OptionsConfig, TypedFlatConfigItem } from './types'
import type { Linter } from 'eslint'
import { comments, disables, ignores, imports, javascript, jsdoc, jsonc, markdown, node, perfectionist, regexp, sortPackageJson, sortTsconfig, stylistic, test, typescript, unicorn, unocss, vue, yaml } from './configs'
import { combine, hasSomePackage, isInEditorEnv, isPackageInScope } from './utils'

export async function config(
    options: OptionsConfig & Omit<TypedFlatConfigItem, 'files'> = {},
    ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | Linter.Config[]>[]
): Promise<Linter.Config[]> {
    const {
        componentExts = [],
        regexp: enableRegexp = false,
        typescript: enableTypeScript = isPackageInScope('typescript'),
        unicorn: enableUnicorn = true,
        unocss: enableUnoCSS = hasSomePackage(['unocss', '@unocss/nuxt']),
        vue: enableVue = hasSomePackage(['vue', 'nuxt', 'vitepress', '@slidev/cli']),
    } = options

    let isInEditor = options.isInEditor
    if (isInEditor == null) {
        isInEditor = isInEditorEnv()
        if (isInEditor) {
            // eslint-disable-next-line no-console
            console.log('[@ivanmaxlogiudice/eslint-config] Detected running in editor, some rules are disabled.')
        }
    }

    const configs: Awaitable<Linter.Config[]>[] = [
        comments(),
        ignores(options.ignores),
        imports(),
        javascript({
            isInEditor,
            overrides: getOverrides(options, 'javascript'),
        }),
        jsdoc(),
        node(),
        perfectionist(),
        stylistic({
            overrides: getOverrides(options, 'stylistic'),
        }),

        // Basic json(c) file support and sorting json keys
        jsonc({
            overrides: getOverrides(options, 'jsonc'),
        }),
        sortPackageJson(),
        sortTsconfig(),
    ]

    if (enableUnicorn) {
        configs.push(unicorn(enableUnicorn === true ? {} : enableUnicorn))
    }

    if (enableVue) {
        componentExts.push('vue')
    }

    if (enableTypeScript) {
        configs.push(typescript({
            ...resolveSubOptions(options, 'typescript'),
            componentExts,
            overrides: getOverrides(options, 'typescript'),
            type: options.type,
        }))
    }

    if (enableRegexp) {
        configs.push(regexp({
            overrides: getOverrides(options, 'regexp'),
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
            typescript: !!enableTypeScript,
        }))
    }

    if (enableUnoCSS) {
        configs.push(unocss({
            ...resolveSubOptions(options, 'unocss'),
            overrides: getOverrides(options, 'unocss'),
        }))
    }

    if (options.yaml) {
        configs.push(yaml({
            overrides: getOverrides(options, 'yaml'),
        }))
    }

    if (options.markdown) {
        configs.push(markdown({
            componentExts,
            ...resolveSubOptions(options, 'markdown'),
            overrides: getOverrides(options, 'markdown'),
        }))
    }

    configs.push(disables())

    const merged = await combine(
        ...configs,
        ...userConfigs,
    )

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
        : options[key] || {} as any
}

export function getOverrides<K extends keyof OptionsConfig>(
    options: OptionsConfig,
    key: K,
): Partial<Linter.RulesRecord & RuleOptions> {
    const sub = resolveSubOptions(options, key)
    return {
        ...'overrides' in sub
            ? sub.overrides
            : {},
    }
}
