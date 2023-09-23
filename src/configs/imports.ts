import { type FlatESLintConfigItem } from 'eslint-define-config'
import { pluginAntfu, pluginImport } from '../plugins'
import { GLOB_MARKDOWN, GLOB_SRC, GLOB_SRC_EXT } from '../globs'
import { type OptionsOverrides, type OptionsStylistic } from '../types'

export function imports(options: OptionsStylistic & OptionsOverrides = {}): FlatESLintConfigItem[] {
    const {
        stylistic = true,
        overrides = {},
    } = options

    return [
        {
            plugins: {
                antfu: pluginAntfu,
                import: pluginImport,
            },
        },
        {
            rules: {
                'antfu/import-dedupe': 'error',
                'antfu/no-import-node-modules-by-path': 'error',
                'antfu/prefer-inline-type-import': 'error',

                'import/export': 'error',
                'import/first': 'error',
                'import/no-default-export': 'error',
                'import/no-duplicates': 'error',
                'import/no-mutable-exports': 'error',
                'import/no-named-default': 'error',
                'import/no-self-import': 'error',
                'import/no-webpack-loader-syntax': 'error',
                'import/order': ['error', {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                        'object',
                        'type',
                    ],
                    pathGroups: [{
                        group: 'internal',
                        pattern: '{{@,~}/,#}**',
                    }],
                    pathGroupsExcludedImportTypes: ['type'],
                }],

                ...stylistic
                    ? {
                            'import/newline-after-import': ['error', {
                                considerComments: true,
                                count: 1,
                            }],
                        }
                    : {},

                ...overrides,
            },
        },
        {
            files: [
                `**/*config*.${GLOB_SRC_EXT}`,
                `**/views/${GLOB_SRC}`,
                `**/pages/${GLOB_SRC}`,
                '**/{index,vite,esbuild,rollup,webpack,rspack}.ts',
                '**/*.d.ts',
                `${GLOB_MARKDOWN}/**`,
            ],
            rules: {
                'import/no-default-export': 'off',
            },
        },
    ]
}
