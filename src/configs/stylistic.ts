import pluginStylistic from '@stylistic/eslint-plugin'
import pluginAntfu from 'eslint-plugin-antfu'
import type { OptionsOverrides, TypedFlatConfigItem } from '../types'

const config = pluginStylistic.configs.customize({
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
                antfu: pluginAntfu,
                style: pluginStylistic,
            },
            rules: {
                ...config.rules,

                'antfu/consistent-chaining': 'error',
                'antfu/consistent-list-newline': 'error',
                'antfu/curly': 'error',
                'antfu/if-newline': 'error',
                'antfu/top-level-function': 'error',

                'style/function-call-spacing': ['error', 'never'],
                'style/generator-star-spacing': ['error', { after: true, before: false }],
                'style/yield-star-spacing': ['error', { after: true, before: false }],

                ...overrides,
            },
        },
    ]
}
