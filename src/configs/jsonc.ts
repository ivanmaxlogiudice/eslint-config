import { parserJsonc, pluginJsonc } from '../plugins'
import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from '../globs'
import type { ConfigItem, OptionsOverrides, OptionsStylistic, Rules } from '../types'

export function jsonc(options: OptionsStylistic & OptionsOverrides = {}): ConfigItem[] {
    const {
        stylistic = true,
        overrides = {},
    } = options

    return [
        {
            name: 'config:jsonc:setup',
            plugins: {
                jsonc: pluginJsonc as any,
            },
        },
        {
            files: [GLOB_JSON, GLOB_JSON5, GLOB_JSONC],
            languageOptions: {
                parser: parserJsonc,
            },
            name: 'config:jsonc:rules',
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
