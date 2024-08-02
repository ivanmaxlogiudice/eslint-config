import type { Linter } from 'eslint'
import plugin from '@stylistic/eslint-plugin'

const config = plugin.configs.customize({
    flat: true,
    indent: 4,
    jsx: false,
    pluginName: 'style',
    quotes: 'single',
    semi: false,
})

export const stylistic: Linter.Config[] = [
    {
        name: 'ivanmaxlogiudice/stylistic/rules',
        plugins: {
            style: plugin,
        },
        rules: {
            ...config.rules,
        },
    },
]
