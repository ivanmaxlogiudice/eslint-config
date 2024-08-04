import plugin from '@typescript-eslint/eslint-plugin'
import parser from '@typescript-eslint/parser'
import { GLOB_TS } from '../globs'
import { renameRules } from '../utils'
import type { OptionsComponentExts, OptionsProjectType, TypedFlatConfigItem } from '../types'

export function typescript(options: OptionsComponentExts & OptionsProjectType = {}): TypedFlatConfigItem[] {
    const {
        componentExts = [],
        type = 'app',
    } = options

    const files = [GLOB_TS, ...componentExts.map(ext => `**/*.${ext}`)]

    return [
        {
            name: 'ivanmaxlogiudice/typescript/setup',
            plugins: {
                ts: plugin as any,
            },
        },
        {
            name: 'ivanmaxlogiudice/typescript/parser',
            files,
            languageOptions: {
                parser,
                parserOptions: {
                    extraFileExtensions: componentExts.map(ext => `.${ext}`),
                    sourceType: 'module',
                },
            },
        },
        {
            name: 'ivanmaxlogiudice/typescript/rules',
            files,
            rules: {
                // Disable eslint rules which are already handled by TypeScript.
                ...renameRules(plugin.configs['eslint-recommended']!.overrides![0]!.rules!, '@typescript-eslint', 'ts'),

                ...renameRules(plugin.configs.strict!.rules!, '@typescript-eslint', 'ts'),

                'no-dupe-class-members': 'off',
                'no-loss-of-precision': 'off',
                'no-redeclare': 'off',
                'no-use-before-define': 'off',
                'no-useless-constructor': 'off',
                'ts/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],
                'ts/consistent-type-definitions': ['error', 'interface'],
                'ts/consistent-type-imports': ['error', {
                    disallowTypeAnnotations: false,
                    prefer: 'type-imports',
                }],

                'ts/method-signature-style': ['error', 'property'], // https://www.totaltypescript.com/method-shorthand-syntax-considered-harmful
                'ts/no-dupe-class-members': 'error',
                'ts/no-dynamic-delete': 'off',
                'ts/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
                'ts/no-explicit-any': 'off',
                'ts/no-extraneous-class': 'off',
                'ts/no-import-type-side-effects': 'error',
                'ts/no-invalid-void-type': 'off',
                'ts/no-loss-of-precision': 'error',
                'ts/no-non-null-assertion': 'off',
                'ts/no-redeclare': 'error',
                'ts/no-require-imports': 'error',
                'ts/no-unused-vars': 'off',
                'ts/no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
                'ts/no-useless-constructor': 'off',
                'ts/no-wrapper-object-types': 'error',
                'ts/triple-slash-reference': 'off',
                'ts/unified-signatures': 'off',

                ...(type === 'lib'
                    ? {
                            'ts/explicit-function-return-type': ['error', {
                                allowExpressions: true,
                                allowHigherOrderFunctions: true,
                                allowIIFEs: true,
                            }],
                        }
                    : {}
                ),
            },
        },
        {
            files: ['**/*.d.?([cm])ts'],
            name: 'ivanmaxlogiudice/typescript/disables/dts',
            rules: {
                'eslint-comments/no-unlimited-disable': 'off',
                'import/no-duplicates': 'off',
                'no-restricted-syntax': 'off',
                // 'unused-imports/no-unused-vars': 'off',
            },
        },
        {
            files: ['**/*.{test,spec}.ts?(x)'],
            name: 'ivanmaxlogiudice/typescript/disables/test',
            rules: {
                'no-unused-expressions': 'off',
            },
        },
        {
            files: ['**/*.js', '**/*.cjs'],
            name: 'ivanmaxlogiudice/typescript/disables/cjs',
            rules: {
                'ts/no-require-imports': 'off',
                'ts/no-var-requires': 'off',
            },
        },
    ]
}
