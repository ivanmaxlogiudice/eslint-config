import { type FlatESLintConfigItem } from 'eslint-define-config'
import { pluginComments } from '../plugins'
import { type OptionsOverrides } from '../types'

export function comments(options: OptionsOverrides = {}): FlatESLintConfigItem[] {
    const {
        overrides = {},
    } = options

    return [
        {
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
