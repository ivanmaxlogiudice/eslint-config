import { pluginComments } from '../plugins'
import { type ConfigItem, type OptionsOverrides } from '../types'

export function comments(options: OptionsOverrides = {}): ConfigItem[] {
    const {
        overrides = {},
    } = options

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

                ...overrides,
            },
        },
    ]
}
