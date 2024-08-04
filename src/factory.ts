import type { Linter } from 'eslint'
import { ignores, imports, javascript, jsonc, node, regexp, sortPackageJson, sortTsconfig, stylistic, typescript, unicorn, unocss, vue } from './configs'
import type { Awaitable, OptionsConfig, TypedFlatConfigItem } from './types'
import { clearPackageCache, combine, hasSomePackage, packageExists } from './utils'

/** Ignore common files and include javascript support */
export const presetJavaScript = [
    ...ignores,
    ...javascript,
    ...node,
    ...imports,
    ...unicorn,
    ...stylistic,
]

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

    const configs: Awaitable<Linter.Config[]>[] = []

    configs.push(
        presetJavaScript,

        // Basic json(c) file support and sorting json keys
        jsonc,
        sortPackageJson,
        sortTsconfig,
    )

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
