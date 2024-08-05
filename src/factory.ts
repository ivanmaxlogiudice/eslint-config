import type { Linter } from 'eslint'
import { comments, ignores, imports, javascript, jsdoc, jsonc, markdown, node, regexp, sortPackageJson, sortTsconfig, stylistic, typescript, unicorn, unocss, vue, yaml } from './configs'
import type { Awaitable, OptionsConfig, TypedFlatConfigItem } from './types'
import { clearPackageCache, combine, hasSomePackage, packageExists } from './utils'

export async function config(
    options: OptionsConfig = {},
    ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | Linter.Config[]>[]
): Promise<Linter.Config[]> {
    clearPackageCache()

    const {
        componentExts = [],
        typescript: enableTypeScript = packageExists('typescript'),
        regexp: enableRegexp = false,
        vue: enableVue = hasSomePackage(['vue', 'nuxt', 'vitepress', '@slidev/cli']),
        unocss: enableUnoCSS = hasSomePackage(['unocss', '@unocss/nuxt']),
    } = options

    const configs: Awaitable<Linter.Config[]>[] = [
        comments,
        ignores,
        imports,
        javascript,
        jsdoc,
        node,
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
