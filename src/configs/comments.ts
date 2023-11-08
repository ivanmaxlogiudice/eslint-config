import type { ConfigItem } from '../types'
import { pluginComments } from '../plugins'

export function comments(): ConfigItem[] {
    return [
        {
            name: 'config:eslint-comments',
            plugins: {
                'eslint-comments': pluginComments,
            },
            rules: {
                ...pluginComments.configs.recommended.rules,

                'eslint-comments/disable-enable-pair': ['error', {
                    allowWholeFile: true,
                }],
            },
        },
    ]
}
