import { type FlatESLintConfigItem } from 'eslint-define-config'
import { pluginUnocss } from '../plugins'
import { type OptionsOverrides } from '../types'

export function unocss(options: OptionsOverrides = {}): FlatESLintConfigItem[] {
    const {
        overrides = {},
    } = options

    return [
        {
            plugins: {
                '@unocss': pluginUnocss,
            },
            rules: {
                ...pluginUnocss.configs.recommended.rules,

                ...overrides,
            },
        },
    ]
}
