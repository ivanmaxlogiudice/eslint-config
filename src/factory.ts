import { comments, ignores, imports, javascript, jsdoc, jsonc, markdown, node, perfectionist, regexp, sortPackageJson, sortTsconfig, stylistic, test, typescript, unicorn, unocss, vue, yaml } from './configs'
import { clearPackageCache, combine, hasSomePackage, isInEditorEnv, packageExists } from './utils'
import type { RuleOptions } from './typegen'
import type { Awaitable, OptionsConfig, TypedFlatConfigItem } from './types'
import type { Linter } from 'eslint'

export async function config(
    options: OptionsConfig = {},
    ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | Linter.Config[]>[]
): Promise<Linter.Config[]> {
    clearPackageCache()

    const {
        componentExts = [],
        isInEditor = isInEditorEnv(),
        regexp: enableRegexp = false,
        typescript: enableTypeScript = packageExists('typescript'),
        unocss: enableUnoCSS = hasSomePackage(['unocss', '@unocss/nuxt']),
        vue: enableVue = hasSomePackage(['vue', 'nuxt', 'vitepress', '@slidev/cli']),
    } = options

    const configs: Awaitable<Linter.Config[]>[] = [
        comments(),
        ignores(),
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
        unicorn(),

        // Basic json(c) file support and sorting json keys
        jsonc({
            overrides: getOverrides(options, 'jsonc'),
        }),
        sortPackageJson(),
        sortTsconfig(),
    ]

    if (enableVue) {
        componentExts.push('vue')
    }

    if (enableTypeScript) {
        configs.push(typescript({
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
        : options[key] || {}
}

export function getOverrides<K extends keyof OptionsConfig>(
    options: OptionsConfig,
    key: K,
): Partial<Linter.RulesRecord & RuleOptions> {
    const sub = resolveSubOptions(options, key)
    return {
        ...(options.overrides as any)?.[key],
        ...'overrides' in sub
            ? sub.overrides
            : {},
    }
}
