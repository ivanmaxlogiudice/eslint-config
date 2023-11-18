import type { FlatConfigItem } from '../types'
import { interopDefault } from '../utils'

export async function unocss(): Promise<FlatConfigItem[]> {
    const pluginUnocss = await interopDefault(import('@unocss/eslint-plugin'))

    return [
        {
            name: 'config:unocss',
            plugins: {
                '@unocss': pluginUnocss,
            },
            rules: {
                ...pluginUnocss.configs.recommended.rules,
            },
        },
    ]
}
