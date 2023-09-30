import { pluginComments } from '../plugins'
import { type FlatESLintConfigItem, type OptionsOverrides } from '../types'

export function comments(options: OptionsOverrides = {}): FlatESLintConfigItem[] {
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
