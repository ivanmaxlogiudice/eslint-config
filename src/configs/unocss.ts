import { pluginUnocss } from '../plugins'
import { type FlatESLintConfigItem, type OptionsOverrides } from '../types'

export function unocss(options: OptionsOverrides = {}): FlatESLintConfigItem[] {
    const {
        overrides = {},
    } = options

    return [
        {
            name: 'config:unocss',
            plugins: {
                '@unocss': pluginUnocss as any,
            },
            rules: {
                ...pluginUnocss.configs.recommended.rules,

                ...overrides,
            },
        },
    ]
}
