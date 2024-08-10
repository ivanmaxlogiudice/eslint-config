import { comments, ignores, imports, javascript, jsdoc, jsonc, markdown, node, perfectionist, regexp, sortPackageJson, sortTsconfig, stylistic, test, typescript, unicorn, unocss, vue, yaml } from './configs'
import { clearPackageCache, combine, hasSomePackage, packageExists } from './utils'
import type { Awaitable, OptionsConfig, TypedFlatConfigItem } from './types'
import type { Linter } from 'eslint'

export async function config(
    options: OptionsConfig = {},
    ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | Linter.Config[]>[]
): Promise<Linter.Config[]> {
    clearPackageCache()

    const {
        componentExts = [],
        regexp: enableRegexp = false,
        typescript: enableTypeScript = packageExists('typescript'),
        unocss: enableUnoCSS = hasSomePackage(['unocss', '@unocss/nuxt']),
        vue: enableVue = hasSomePackage(['vue', 'nuxt', 'vitepress', '@slidev/cli']),
    } = options

    const configs: Awaitable<Linter.Config[]>[] = [
        comments,
        ignores,
        imports,
        javascript,
        jsdoc,
        node,
        perfectionist,
        stylistic,
        unicorn,

        // Basic json(c) file support and sorting json keys
        jsonc,
        sortPackageJson,
        sortTsconfig,
    ]

    if (enableVue) {
        componentExts.push('vue')
    }

    if (enableTypeScript) {
        configs.push(typescript({
            componentExts,
            type: options.type,
        }))
    }

    if (enableRegexp) {
        configs.push(regexp())
    }

    if (options.test ?? true) {
        configs.push(test())
    }

    if (enableVue) {
        configs.push(vue({
            typescript: enableTypeScript,
        }))
    }

    if (enableUnoCSS) {
        configs.push(unocss({
            ...resolveSubOptions(options, 'unocss'),
        }))
    }

    if (options.yaml) {
        configs.push(yaml())
    }

    if (options.markdown) {
        configs.push(markdown({
            componentExts,
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
