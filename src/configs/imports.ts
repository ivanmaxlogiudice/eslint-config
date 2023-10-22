import { pluginAntfu, pluginImport } from '../plugins'
import type { ConfigItem, OptionsStylistic } from '../types'

export function imports(options: OptionsStylistic = {}): ConfigItem[] {
    const {
        stylistic = true,
    } = options

    return [
        {
            name: 'config:imports',
            plugins: {
                antfu: pluginAntfu,
                import: pluginImport,
            },
            rules: {
                'antfu/import-dedupe': 'error',
                'antfu/no-import-node-modules-by-path': 'error',

                'import/first': 'error',
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
            },
        },
    ]
}
