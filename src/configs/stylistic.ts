import plugin from '@stylistic/eslint-plugin'
import type { OptionsOverrides, TypedFlatConfigItem } from '../types'

const config = plugin.configs.customize({
    flat: true,
    indent: 4,
    jsx: false,
    pluginName: 'style',
    quotes: 'single',
    semi: false,
})

// @ts-expect-error Check Issue: https://github.com/ivanmaxlogiudice/eslint-config/issues/37
config.rules['style/indent'][2].offsetTernaryExpressions = false

export function stylistic(options: OptionsOverrides = {}): TypedFlatConfigItem[] {
    const {
        overrides = {},
    } = options

    return [
        {
            name: 'ivanmaxlogiudice/stylistic/rules',
            plugins: {
                style: plugin,
            },
            rules: {
                ...config.rules,

                'antfu/consistent-chaining': 'error',
                'antfu/consistent-list-newline': 'error',

                'antfu/curly': 'error',
                'antfu/if-newline': 'error',
                'antfu/top-level-function': 'error',
                'style/function-call-spacing': ['error', 'never'],

                ...overrides,
            },
        },
    ]
}
