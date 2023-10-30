import type { ConfigItem } from '../types'

import { pluginUnocss } from '../plugins'

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
