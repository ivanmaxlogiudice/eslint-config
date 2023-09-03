import ymlPlugin, { configs } from 'eslint-plugin-yml'
import ymlParser from 'yaml-eslint-parser'
import { GLOB_YAML } from './shared.js'

/** @type {import('eslint-define-config').FlatESLintConfigItem[]} */
export const yml = [
    {
        files: [GLOB_YAML],
        plugins: {
            yml: ymlPlugin,
        },
        languageOptions: {
            parser: ymlParser,
        },
        rules: {
            ...configs.standard.rules,

            'yml/no-empty-document': 'off',
            'yml/no-empty-mapping-value': 'off',
            'yml/quotes': ['error', {
                avoidEscape: false,
                prefer: 'single',
            }],
        },
    },
]
