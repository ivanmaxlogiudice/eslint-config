import { type FlatESLintConfigItem, type Rules } from 'eslint-define-config'
import { parserJsonc, pluginJsonc } from '../plugins'
import { type OptionsOverrides, type OptionsStylistic } from '../types'
import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from '../globs'

export function jsonc(options: OptionsStylistic & OptionsOverrides = {}): FlatESLintConfigItem[] {
    const {
        stylistic = true,
        overrides = {},
    } = options

    return [
        {
            plugins: {
                jsonc: pluginJsonc,
            },
        },
        {
            files: [GLOB_JSON, GLOB_JSON5, GLOB_JSONC],
            languageOptions: {
                parser: parserJsonc,
            },
            rules: {
                ...(pluginJsonc.configs['recommended-with-jsonc'].rules as Rules),

                'jsonc/no-octal-escape': 'error',

                ...stylistic
                    ? {
                            'jsonc/array-bracket-spacing': ['error', 'never'],
                            'jsonc/comma-dangle': ['error', 'never'],
                            'jsonc/comma-style': ['error', 'last'],
                            'jsonc/indent': ['error', 4],
                            'jsonc/key-spacing': ['error', {
                                afterColon: true,
                                beforeColon: false,
                            }],
                            'jsonc/object-curly-newline': ['error', {
                                consistent: true,
                                multiline: true,
                            }],
                            'jsonc/object-curly-spacing': ['error', 'always'],
                            'jsonc/object-property-newline': ['error', {
                                allowMultiplePropertiesPerLine: true,
                            }],
                            'jsonc/quote-props': 'off',
                            'jsonc/quotes': 'off',
                        }
                    : {},

                ...overrides,
            },
        },
    ]
}