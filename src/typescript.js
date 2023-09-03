import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import { GLOB_TS, GLOB_TSX } from './shared.js'

export { tsParser, tsPlugin }

/** @type {import('eslint-define-config').FlatESLintConfigItem[]} */
export const typescript = [
    {
        files: [GLOB_TS, GLOB_TSX],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
        rules: {
            ...tsPlugin.configs['eslint-recommended'].overrides[0].rules,
            ...tsPlugin.configs.strict.rules,

            '@typescript-eslint/ban-ts-comment': ['error', {
                'ts-ignore': 'allow-with-description',
            }],
            '@typescript-eslint/consistent-type-imports': ['error', {
                disallowTypeAnnotations: false,
                fixStyle: 'inline-type-imports',
            }],
            '@typescript-eslint/prefer-as-const': 'warn',
            '@typescript-eslint/member-delimiter-style': ['error', {
                multiline: { delimiter: 'none' },
            }],
            '@typescript-eslint/type-annotation-spacing': 'error',
            '@typescript-eslint/no-require-imports': 'error',
            '@typescript-eslint/no-redeclare': 'error',
            '@typescript-eslint/no-dupe-class-members': 'error',

            // Override JS
            'indent': 'off',
            '@typescript-eslint/indent': ['error', 4, {
                SwitchCase: 1,
                outerIIFEBody: 1,
                VariableDeclarator: 1,
            }],

            'no-invalid-this': 'off',
            '@typescript-eslint/no-invalid-this': 'error',

            'no-use-before-define': 'off',
            '@typescript-eslint/no-use-before-define': ['error', {
                classes: false,
                functions: false,
                variables: true,
            }],

            'brace-style': 'off',
            '@typescript-eslint/brace-style': ['error', 'stroustrup', {
                allowSingleLine: true,
            }],

            'comma-dangle': 'off',
            '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],

            'object-curly-spacing': 'off',
            '@typescript-eslint/object-curly-spacing': ['error', 'always'],

            'semi': 'off',
            '@typescript-eslint/semi': ['error', 'never'],

            'quotes': 'off',
            '@typescript-eslint/quotes': ['error', 'single', {
                avoidEscape: true,
            }],

            'space-before-blocks': 'off',
            '@typescript-eslint/space-before-blocks': ['error', 'always'],

            'space-before-function-paren': 'off',
            '@typescript-eslint/space-before-function-paren': ['error', {
                anonymous: 'always',
                asyncArrow: 'always',
                named: 'never',
            }],

            'space-infix-ops': 'off',
            '@typescript-eslint/space-infix-ops': 'error',

            'keyword-spacing': 'off',
            '@typescript-eslint/keyword-spacing': ['error', {
                before: true,
                after: true,
            }],

            'comma-spacing': 'off',
            '@typescript-eslint/comma-spacing': ['error', {
                before: false,
                after: true,
            }],

            'no-extra-parens': 'off',
            '@typescript-eslint/no-extra-parens': ['error', 'functions'],

            'no-loss-of-precision': 'off',
            '@typescript-eslint/no-loss-of-precision': 'error',

            'lines-between-class-members': 'off',
            '@typescript-eslint/lines-between-class-members': ['error', 'always', {
                exceptAfterSingleLine: true,
            }],

            // antfu
            'antfu/generic-spacing': 'error',
            'antfu/no-cjs-exports': 'error',
            'antfu/no-ts-export-equal': 'error',
            'antfu/no-const-enum': 'error',
            'antfu/named-tuple-spacing': 'error',

            // off
            'import/named': 'off',

            '@typescript-eslint/no-unused-vars': 'off', // handled by unused-imports/no-unused-imports
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/consistent-indexed-object-style': 'off',
            '@typescript-eslint/naming-convention': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-member-accessibility': 'off',
            '@typescript-eslint/ban-ts-ignore': 'off',
            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/triple-slash-reference': 'off',
        },
    },
    {
        files: ['**/*.d.ts'],
        rules: {
            'import/no-duplicates': 'off',
        },
    },
    {
        files: ['**/*.{test,spec}.ts?(x)'],
        rules: {
            'no-unused-expressions': 'off',
        },
    },
    {
        files: ['**/*.js', '**/*.cjs'],
        rules: {
            '@typescript-eslint/no-var-requires': 'off',
            '@typescript-eslint/no-require-imports': 'off',
        },
    },
]
