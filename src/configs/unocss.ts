import type { FlatConfigItem, OptionsUnoCSS } from '../types'
import { ensurePackages, interopDefault } from '../utils'

export async function unocss(options: OptionsUnoCSS = {}): Promise<FlatConfigItem[]> {
    const {
        attributify = true,
        strict = false,
    } = options

    await ensurePackages([
        '@unocss/eslint-plugin',
    ])

    const pluginUnocss = await interopDefault(import('@unocss/eslint-plugin'))

    return [
        {
            name: 'config:unocss',
            plugins: {
                '@unocss': pluginUnocss,
            },
            rules: {
                'unocss/order': 'warn',
                ...attributify
                    ? {
                            'unocss/order-attributify': 'warn',
                        }
                    : {},
                ...strict
                    ? {
                            'unocss/blocklist': 'error',
                        }
                    : {},
            },
        },
    ]
}
