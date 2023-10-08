import { pluginUnocss } from '../plugins'
import { type ConfigItem, type OptionsOverrides } from '../types'

export function unocss(options: OptionsOverrides = {}): ConfigItem[] {
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
