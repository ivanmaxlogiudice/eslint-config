import type { TypedFlatConfigItem } from '../types'
import pluginAntfu from 'eslint-plugin-antfu'
import pluginImportLite from 'eslint-plugin-import-lite'

export function imports(): TypedFlatConfigItem[] {
    return [
        {
            name: 'ivanmaxlogiudice/imports/rules',
            plugins: {
                antfu: pluginAntfu,
                import: pluginImportLite,
            },
            rules: {
                'antfu/import-dedupe': 'error',
                'antfu/no-import-dist': 'error',
                'antfu/no-import-node-modules-by-path': 'error',

                'import/consistent-type-specifier-style': ['error', 'top-level'],
                'import/first': 'error',
                'import/no-duplicates': 'error',
                'import/no-mutable-exports': 'error',
                'import/no-named-default': 'error',

                // Stylistic
                'import/newline-after-import': ['error', { count: 1 }],
            },
        },
    ]
}
