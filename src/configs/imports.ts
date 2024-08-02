import type { Linter } from 'eslint'
import plugin from 'eslint-plugin-import-x'
import pluginAntfu from 'eslint-plugin-antfu'
import { GLOB_SRC_EXT } from '../globs'

export const imports: Linter.Config[] = [
    {
        name: 'ivanmaxlogiudice/imports/rules',
        plugins: {
            antfu: pluginAntfu,
            import: plugin as any,
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
            'import/newline-after-import': ['error', { count: 1 }],
        },
    }, {
        name: 'ivanmaxlogiudice/imports/disables/bin',
        files: ['**/bin/**/*', `**/bin.${GLOB_SRC_EXT}`],
        rules: {
            'antfu/no-import-dist': 'off',
            'antfu/no-import-node-modules-by-path': 'off',
        },
    },
]
