import type { FlatConfigItem, OptionsStylistic } from '../types'
import { GLOB_SRC_EXT } from '../globs'
import { pluginAntfu, pluginImport } from '../plugins'

export function imports(options: OptionsStylistic = {}): FlatConfigItem[] {
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
                'antfu/no-import-dist': 'error',
                'antfu/no-import-node-modules-by-path': 'error',

                'import/first': 'error',
                'import/no-duplicates': 'error',
                'import/no-mutable-exports': 'error',
                'import/no-named-default': 'error',
                'import/no-self-import': 'error',
                'import/no-webpack-loader-syntax': 'error',

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
        {
            files: ['**/bin/**/*', `**/bin.${GLOB_SRC_EXT}`],
            name: 'config:imports:bin',
            rules: {
                'antfu/no-import-dist': 'off',
                'antfu/no-import-node-modules-by-path': 'off',
            },
        },
    ]
}
