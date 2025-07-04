import plugin from 'eslint-plugin-import-lite'
import type { TypedFlatConfigItem } from '../types'

export function imports(): TypedFlatConfigItem[] {
    return [
        {
            name: 'ivanmaxlogiudice/imports/rules',
            plugins: {
                import: plugin,
            },
            rules: {
                'antfu/import-dedupe': 'error',
                'antfu/no-import-dist': 'error',
                'antfu/no-import-node-modules-by-path': 'error',

                'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
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
