import { pluginComments } from '../plugins'
import type { ConfigItem } from '../types'

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
