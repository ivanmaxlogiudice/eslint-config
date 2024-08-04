import plugin from '@stylistic/eslint-plugin'
import type { TypedFlatConfigItem } from '../types'

const config = plugin.configs.customize({
    flat: true,
    indent: 4,
    jsx: false,
    pluginName: 'style',
    quotes: 'single',
    semi: false,
})

export const stylistic: TypedFlatConfigItem[] = [
    {
        name: 'ivanmaxlogiudice/stylistic/rules',
        plugins: {
            style: plugin,
        },
        rules: {
            ...config.rules,

            'antfu/curly': 'error',
            'antfu/if-newline': 'error',
            'antfu/top-level-function': 'error',
        },
    },
]
