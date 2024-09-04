import { GLOB_SRC, GLOB_SRC_EXT } from '../globs'
import type { TypedFlatConfigItem } from '../types'

export async function disables(): Promise<TypedFlatConfigItem[]> {
    return [
        {
            name: 'ivanmaxlogiudice/disables/scripts',
            files: [`scripts/${GLOB_SRC}`],
            rules: {
                'no-console': 'off',
                'ts/explicit-function-return-type': 'off',
                'unicorn/consistent-function-scoping': 'off',
            },
        },
        {
            name: 'ivanmaxlogiudice/disables/cli',
            files: [`cli/${GLOB_SRC}`, `cli.${GLOB_SRC_EXT}`],
            rules: {
                'no-console': 'off',
            },
        },
        {
            name: 'ivanmaxlogiudice/disables/bin',
            files: ['**/bin/**/*', `**/bin.${GLOB_SRC_EXT}`],
            rules: {
                'antfu/no-import-dist': 'off',
                'antfu/no-import-node-modules-by-path': 'off',
            },
        },
        {
            name: 'ivanmaxlogiudice/disables/dts',
            files: ['**/*.d.?([cm])ts'],
            rules: {
                'eslint-comments/no-unlimited-disable': 'off',
                'import/no-duplicates': 'off',
                'no-restricted-syntax': 'off',
                'unused-imports/no-unused-vars': 'off',
            },
        },
        {
            name: 'ivanmaxlogiudice/disables/test',
            files: ['**/*.{test,spec}.([tj])s?(x)'],
            rules: {
                'no-unused-expressions': 'off',
            },
        },
        {
            name: 'ivanmaxlogiudice/disables/cjs',
            files: ['**/*.js', '**/*.cjs'],
            rules: {
                'ts/no-require-imports': 'off',
            },
        },
    ]
}
