import type { FlatConfigItem, OptionsFormatters, StylisticConfig } from '../types'
import type { VendoredPrettierOptions } from '../vender/prettier-types'
import { GLOB_CSS, GLOB_LESS, GLOB_MARKDOWN, GLOB_POSTCSS, GLOB_SCSS } from '../globs'
import { ensurePackages, interopDefault, parserPlain } from '../utils'
import { StylisticConfigDefaults } from './stylistic'

export async function formatters(
    options: OptionsFormatters | true = {},
    stylistic: StylisticConfig = {},
): Promise<FlatConfigItem[]> {
    await ensurePackages([
        'eslint-plugin-format',
    ])

    if (options === true) {
        options = {
            css: true,
            graphql: true,
            html: true,
            markdown: true,
            toml: true,
        }
    }

    const {
        indent,
        quotes,
        semi,
    } = {
        ...StylisticConfigDefaults,
        ...stylistic,
    }

    const prettierOptions: VendoredPrettierOptions = Object.assign({
        endOfLine: 'auto',
        semi,
        singleQuote: quotes === 'single',
        tabWidth: typeof indent === 'number' ? indent : 2,
        trailingComma: 'all',
        useTabs: indent === 'tab',
    }, options.prettierOptions || {})

    const dprintOptions = Object.assign({
        indentWidth: typeof indent === 'number' ? indent : 2,
        quoteStyle: quotes === 'single' ? 'preferSingle' : 'preferDouble',
        useTabs: indent === 'tab',
    }, options.dprintOptions || {})

    const pluginFormat = await interopDefault(import('eslint-plugin-format'))

    const configs: FlatConfigItem[] = [
        {
            name: 'config:formatters:setup',
            plugins: {
                format: pluginFormat,
            },
        },
    ]

    if (options.css) {
        configs.push(
            {
                files: [GLOB_CSS, GLOB_POSTCSS],
                languageOptions: {
                    parser: parserPlain,
                },
                name: 'config:formatter:css',
                rules: {
                    'format/prettier': ['error', {
                        ...prettierOptions,
                        parser: 'css',
                    }],
                },
            },
            {
                files: [GLOB_SCSS],
                languageOptions: {
                    parser: parserPlain,
                },
                name: 'config:formatter:scss',
                rules: {
                    'format/prettier': ['error', {
                        ...prettierOptions,
                        parser: 'scss',
                    }],
                },
            },
            {
                files: [GLOB_LESS],
                languageOptions: {
                    parser: parserPlain,
                },
                name: 'config:formatter:less',
                rules: {
                    'format/prettier': ['error', {
                        ...prettierOptions,
                        parser: 'less',
                    }],
                },
            },
        )
    }

    if (options.html) {
        configs.push({
            files: ['**/*.html'],
            languageOptions: {
                parser: parserPlain,
            },
            name: 'config:formatter:html',
            rules: {
                'format/prettier': ['error', {
                    ...prettierOptions,
                    parser: 'html',
                }],
            },
        })
    }

    if (options.toml) {
        configs.push({
            files: ['**/*.toml'],
            languageOptions: {
                parser: parserPlain,
            },
            name: 'config:formatter:toml',
            rules: {
                'format/dprint': ['error', {
                    ...dprintOptions,
                    language: 'toml',
                }],
            },
        })
    }

    if (options.markdown) {
        const formater = options.markdown === true
            ? 'prettier'
            : options.markdown

        configs.push({
            files: [GLOB_MARKDOWN],
            languageOptions: {
                parser: parserPlain,
            },
            name: 'config:formatter:markdown',
            rules: {
                [`format/${formater}`]: [
                    'error',
                    formater === 'prettier'
                        ? {
                            ...prettierOptions,
                            embeddedLanguageFormatting: 'off',
                            parser: 'markdown',
                        }
                        : {
                            ...dprintOptions,
                            language: 'markdown',
                        },
                ],
            },
        })
    }

    if (options.graphql) {
        configs.push({
            files: ['**/*.graphql'],
            languageOptions: {
                parser: parserPlain,
            },
            name: 'config:formatter:graphql',
            rules: {
                'format/prettier': ['error', {
                    ...prettierOptions,
                    parser: 'graphql',
                }],
            },
        })
    }

    return configs
}
