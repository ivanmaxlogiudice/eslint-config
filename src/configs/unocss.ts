import { pluginUnocss } from '../plugins'
import type { ConfigItem } from '../types'

export function unocss(): ConfigItem[] {
    return [
        {
            name: 'config:unocss',
            plugins: {
                '@unocss': pluginUnocss as any,
            },
            rules: {
                ...pluginUnocss.configs.recommended.rules,
            },
        },
    ]
}
