import plugin from 'eslint-plugin-import-x'
import { GLOB_SRC_EXT } from '../globs'
import type { TypedFlatConfigItem } from '../types'

export const imports: TypedFlatConfigItem[] = [
    {
        name: 'ivanmaxlogiudice/imports/rules',
        plugins: {
            import: plugin,
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
            'import/order': 'error',

            // Stylistic
            'import/newline-after-import': ['error', { count: 1 }],
        },
    },
    {
        name: 'ivanmaxlogiudice/imports/disables/bin',
        files: ['**/bin/**/*', `**/bin.${GLOB_SRC_EXT}`],
        rules: {
            'antfu/no-import-dist': 'off',
            'antfu/no-import-node-modules-by-path': 'off',
        },
    },
]
