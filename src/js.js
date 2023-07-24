import globals from 'globals'
import jsConfig from '@eslint/js'
import standardConfig from 'eslint-config-standard'
import nPlugin from 'eslint-plugin-n'
import importPlugin from 'eslint-plugin-import'
import unusedImportsPlugin from 'eslint-plugin-unused-imports'
import unicornPlugin from 'eslint-plugin-unicorn'
import antfuPlugin from 'eslint-plugin-antfu'
import noOnlyTestsPlugin from 'eslint-plugin-no-only-tests'
import { GLOB_MARKDOWN, GLOB_SRC, GLOB_SRC_EXT } from './shared.js'

export { importPlugin, unicornPlugin, antfuPlugin }

/** @type {import('eslint-define-config').FlatESLintConfigItem[]} */
export const js = [
    jsConfig.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2021,
                ...globals.node,
            },
            sourceType: 'module',
        },
        plugins: {
            standard: standardConfig,
            n: nPlugin,
        },
        rules: {
            // ...standardConfig,
            
            'array-bracket-spacing': ['error', 'never'],
            'array-callback-return': 'error',
            'arrow-parens': ['error', 'as-needed', {
                requireForBlockBody: true,
            }],
            'block-scoped-var': 'error',
            'block-spacing': ['error', 'always'],
            'brace-style': ['error', 'stroustrup', {
                allowSingleLine: true,
            }],
            'consistent-return': 'error',
            'comma-dangle': ['error', 'always-multiline'],
            'comma-spacing': ['error', {
                after: true,
                before: false,
            }],
            'comma-style': ['error', 'last'],
            'curly': ['error', 'multi-or-nest', 'consistent'],
            'eqeqeq': ['error', 'smart'],
            'func-call-spacing': ['error', 'never'],
            'indent': ['error', 4, {
                SwitchCase: 1,
                outerIIFEBody: 1,
                VariableDeclarator: 1,
            }],
            'key-spacing': ['error', {
                afterColon: true,
                beforeColon: false,
            }],
            'max-statements-per-line': ['error', {
                max: 1,
            }],
            'object-curly-spacing': ['error', 'always'],
            'object-shorthand': ['error', 'always', {
                avoidQuotes: true,
                ignoreConstructors: false,
            }],
            'operator-linebreak': ['error', 'before'],
            'prefer-arrow-callback': ['error', {
                allowNamedFunctions: false,
                allowUnboundThis: true,
            }],
            'prefer-const': ['error', {
                destructuring: 'all',
                ignoreReadBeforeAssign: true,
            }],
            'prefer-exponentiation-operator': 'error',
            'prefer-rest-params': 'error',
            'prefer-spread': 'error',
            'prefer-template': 'error',
            'quote-props': ['error', 'consistent-as-needed'],
            'quotes': ['error', 'single', {
                avoidEscape: true,
            }],
            'semi': ['error', 'never'],
            'sort-imports': ['error', {
                allowSeparatedGroups: false,
                ignoreCase: false,
                ignoreDeclarationSort: true,
                ignoreMemberSort: false,
                memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
            }],
            'space-before-blocks': ['error', 'always'],
            'space-before-function-paren': ['error', {
                anonymous: 'always',
                asyncArrow: 'always',
                named: 'never',
            }],
            'spaced-comment': ['error', 'always', {
                block: {
                    balanced: true,
                    exceptions: ['*'],
                    markers: ['!'],
                },
                line: {
                    exceptions: ['/', '#'],
                    markers: ['/'],
                },
            }],
            'require-await': 'error',
            'template-curly-spacing': 'error',
            'vars-on-top': 'error',

            // no-
            'no-alert': 'warn',
            'no-cond-assign': ['error', 'always'],
            'no-console': ['error', {
                allow: ['warn', 'error'],
            }],
            'no-constant-condition': 'warn',
            'no-debugger': 'warn',
            'no-duplicate-imports': 'error',
            'no-empty': ['error', { 
                allowEmptyCatch: true, 
            }],
            'no-invalid-this': 'error',
            'no-lonely-if': 'error',
            'no-multi-spaces': 'error',
            'no-multi-str': 'error',
            'no-return-await': 'warn',
            'no-restricted-globals': ['error', 
                { name: 'global', message: 'Use `globalThis` instead.' }, 
                { name: 'self', message: 'Use `globalThis` instead.' },
            ],
            'no-restricted-properties': ['error',
                { property: '__proto__', message: 'Use `Object.getPrototypeOf` or `Object.setPrototypeOf` instead.' },
                { property: '__defineGetter__', message: 'Use `Object.defineProperty` instead.' },
                { property: '__defineSetter__', message: 'Use `Object.defineProperty` instead.' },
                { property: '__lookupGetter__', message: 'Use `Object.getOwnPropertyDescriptor` instead.' },
                { property: '__lookupSetter__', message: 'Use `Object.getOwnPropertyDescriptor` instead.' },
            ],
            'no-restricted-syntax': ['error',
                'DebuggerStatement',
                'LabeledStatement',
                'WithStatement',
            ],
            'no-param-reassign': 'error',
            'no-unused-expressions': ['error', {
                allowShortCircuit: true,
                allowTernary: true,
                allowTaggedTemplates: true,
            }],
            'no-useless-escape': 'error',
            'no-use-before-define': ['error', {
                classes: false,
                functions: false,
                variables: true,
            }],
            'no-var': 'error',
            'no-void': 'error',

            // node
            'n/prefer-global/buffer': ['error', 'never'],
            'n/no-callback-literal': 'off',

            // off
            'camelcase': 'off',
            'complexity': 'off',
            'generator-star-spacing': 'off',
            'no-unused-vars': 'off', // handled by unused-imports/no-unused-vars
        },
    },
    {
        files: ['**/scripts/*', '**/cli.*'],
        rules: {
            'no-console': 'off',
        },
    },
    {
        plugins: {
            noOnlyTest: noOnlyTestsPlugin,
        },
        files: ['**/*.{test,spec}.{js?(x),ts}'],
        rules: {
            'no-unused-expressions': 'off',
            'no-only-tests/no-only-tests': 'error',
        },
    },
]

/** @type {import('eslint-define-config').FlatESLintConfigItem[]} */
export const jsx = [
    {
        files: ['**/*.jsx'],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
    },
]

/** @type {import('eslint-define-config').FlatESLintConfigItem[]} */
export const imports = [
    {
        plugins: {
            'import': importPlugin,
            'unused-imports': unusedImportsPlugin,
            'antfu': antfuPlugin,
        },
        settings: {
            'import/resolver': {
                node: { extensions: ['.js', '.mjs', '.ts', '.mts', '.d.ts'] },
            },
        },
        rules: {
            'import/first': 'error',
            'import/newline-after-import': ['error', {
                considerComments: true,
                count: 1,
            }],
            'import/no-default-export': 'error',
            'import/no-duplicates': 'error',
            'import/no-mutable-exports': 'error',
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
                    pattern: '@/**',
                }],
                pathGroupsExcludedImportTypes: ['type'],
            }],
            'import/no-self-import': 'error',

            // off
            'import/namespace': 'off',
            'import/no-absolute-path': 'off',
            'import/no-named-as-default': 'off',
            'import/no-named-as-default-member': 'off',
            'import/no-unresolved': 'off',

            // unused-imports
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': ['warn', {
                vars: 'all',
                varsIgnorePattern: '^_',
                args: 'after-used',
                argsIgnorePattern: '^_',
            }],

            'antfu/if-newline': 'error',
            'antfu/import-dedupe': 'error',
            'antfu/prefer-inline-type-import': 'error',
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
        plugins: {
            import: importPlugin,
        },
        rules: {
            'import/no-default-export': 'off',
        },
    },
]

/** @type {import('eslint-define-config').FlatESLintConfigItem[]} */
export const unicorn = [
    {
        plugins: {
            unicorn: unicornPlugin,
        },
        rules: {
            'unicorn/better-regex': 'error',
            'unicorn/custom-error-definition': 'error',
            'unicorn/error-message': 'error',
            'unicorn/escape-case': 'error',
            'unicorn/explicit-length-check': 'error',
            'unicorn/import-index': 'error',
            'unicorn/new-for-builtins': 'error',
            'unicorn/no-array-callback-reference': 'error',
            'unicorn/no-array-method-this-argument': 'error',
            'unicorn/no-array-push-push': 'error',
            'unicorn/no-console-spaces': 'error',
            'unicorn/no-for-loop': 'error',
            'unicorn/no-hex-escape': 'error',
            'unicorn/no-instanceof-array': 'error',
            'unicorn/no-invalid-remove-event-listener': 'error',
            'unicorn/no-lonely-if': 'error',
            'unicorn/no-new-array': 'error',
            'unicorn/no-new-buffer': 'error',
            'unicorn/no-unnecessary-await': 'error',
            'unicorn/no-unsafe-regex': 'off',
            'unicorn/number-literal-case': 'error',
            'unicorn/prefer-add-event-listener': 'error',
            'unicorn/prefer-array-find': 'error',
            'unicorn/prefer-array-flat-map': 'error',
            'unicorn/prefer-array-index-of': 'error',
            'unicorn/prefer-array-some': 'error',
            'unicorn/prefer-at': 'error',
            'unicorn/prefer-blob-reading-methods': 'error',
            'unicorn/prefer-date-now': 'error',
            'unicorn/prefer-dom-node-append': 'error',
            'unicorn/prefer-dom-node-dataset': 'error',
            'unicorn/prefer-dom-node-remove': 'error',
            'unicorn/prefer-dom-node-text-content': 'error',
            'unicorn/prefer-includes': 'error',
            'unicorn/prefer-keyboard-event-key': 'error',
            'unicorn/prefer-logical-operator-over-ternary': 'error',
            'unicorn/prefer-math-trunc': 'error',
            'unicorn/prefer-modern-dom-apis': 'error',
            'unicorn/prefer-negative-index': 'error',
            'unicorn/prefer-node-protocol': 'error',
            'unicorn/prefer-number-properties': 'error',
            'unicorn/prefer-optional-catch-binding': 'error',
            'unicorn/prefer-prototype-methods': 'error',
            'unicorn/prefer-query-selector': 'error',
            'unicorn/prefer-reflect-apply': 'error',
            'unicorn/prefer-string-replace-all': 'error',
            'unicorn/prefer-string-slice': 'error',
            'unicorn/prefer-string-starts-ends-with': 'error',
            'unicorn/prefer-string-trim-start-end': 'error',
            'unicorn/prefer-text-content': 'error',
            'unicorn/prefer-type-error': 'error',
            'unicorn/switch-case-braces': 'error',
            'unicorn/throw-new-error': 'error',
        },
    },
]
  