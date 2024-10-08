import { ensurePackages, interopDefault } from '../utils'
import type { OptionsUnoCSS, TypedFlatConfigItem } from '../types'

export async function unocss(options: OptionsUnoCSS = {}): Promise<TypedFlatConfigItem[]> {
    const {
        attributify = true,
        overrides = {},
        strict = false,
    } = options

    await ensurePackages(['@unocss/eslint-plugin'])

    const [plugin] = await Promise.all([
        interopDefault(import('@unocss/eslint-plugin')),
    ] as const)

    return [
        {
            name: 'ivanmaxlogiudice/unocss/rules',
            plugins: {
                unocss: plugin,
            },
            rules: {
                'unocss/order': 'warn',

                ...attributify
                    ? { 'unocss/order-attributify': 'warn' }
                    : {},

                ...strict
                    ? { 'unocss/blocklist': 'error' }
                    : {},

                ...overrides,
            },
        },
    ]
}
