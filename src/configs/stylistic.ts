import type { OptionsOverrides, StylisticConfig, TypedFlatConfigItem } from '../types'
import { pluginAntfu } from '../plugins'
import { interopDefault } from '../utils'

export const StylisticConfigDefaults: StylisticConfig = {
    indent: 4,
    jsx: true,
    quotes: 'single',
    semi: false,
}

export async function stylistic(
    options: StylisticConfig & OptionsOverrides = {},
): Promise<TypedFlatConfigItem[]> {
    const {
        indent,
        jsx,
        overrides = {},
        quotes,
        semi,
    } = {
        ...StylisticConfigDefaults,
        ...options,
    }

    const pluginStylistic = await interopDefault(import('@stylistic/eslint-plugin'))

    const config = pluginStylistic.configs.customize({
        flat: true,
        indent,
        jsx,
        pluginName: 'style',
        quotes,
        semi,
    })

    if (indent !== 2) {
        // @ts-expect-error Check Issue: https://github.com/ivanmaxlogiudice/eslint-config/issues/37
        config.rules['style/indent'][2].offsetTernaryExpressions = false
    }

    return [
        {
            name: 'config/stylistic/rules',
            plugins: {
                antfu: pluginAntfu,
                style: pluginStylistic,
            },
            rules: {
                ...config.rules,

                'antfu/consistent-list-newline': 'error',
                'antfu/if-newline': 'error',
                'antfu/top-level-function': 'error',

                'curly': ['error', 'multi-or-nest', 'consistent'],

                'style/function-call-spacing': ['error', 'never'],
                'style/quotes': ['error', quotes, {
                    allowTemplateLiterals: true,
                    avoidEscape: true,
                }],

                ...overrides,
            },
        },
    ]
}
