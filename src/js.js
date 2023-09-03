import globals from 'globals'
import jsConfig from '@eslint/js'
import nPlugin from 'eslint-plugin-n'
import importPlugin from 'eslint-plugin-import'
import promisePlugin from 'eslint-plugin-promise'
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
            n: nPlugin,
            promise: promisePlugin,
        },
        rules: {
            'accessor-pairs': ['error', {
                setWithoutGet: true,
                enforceForClassMembers: true,
            }],
            'array-bracket-spacing': ['error', 'never'],
            'array-callback-return': 'error',
            'arrow-parens': ['error', 'as-needed', {
                requireForBlockBody: true,
            }],
            'arrow-spacing': ['error', {
                before: true,
                after: true,
            }],
            'block-scoped-var': 'error',
            'block-spacing': ['error', 'always'],
            'brace-style': ['error', 'stroustrup', {
                allowSingleLine: true,
            }],
            'comma-dangle': ['error', 'always-multiline'],
            'comma-spacing': ['error', {
                after: true,
                before: false,
            }],
            'comma-style': ['error', 'last'],
            'computed-property-spacing': ['error', 'never', {
                enforceForClassMembers: true,
            }],
            'consistent-return': 'error',
            'curly': ['error', 'multi-or-nest', 'consistent'],
            'default-case-last': 'error',
            'dot-location': ['error', 'property'],
            'dot-notation': 'warn',
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
            'keyword-spacing': ['error', {
                before: true,
                after: true,
            }],
            'lines-between-class-members': ['error', 'always', {
                exceptAfterSingleLine: true,
            }],
            'max-statements-per-line': ['error', {
                max: 1,
            }],
            'multiline-ternary': ['error', 'always-multiline'],
            'new-cap': ['error', {
                newIsCap: true,
                capIsNew: false,
                properties: true,
            }],
            'new-parens': 'error',
            'object-curly-newline': ['error', {
                multiline: true,
                consistent: true,
            }],
            'object-curly-spacing': ['error', 'always'],
            'object-property-newline': ['error', {
                allowMultiplePropertiesPerLine: true,
            }],
            'one-var': ['error', {
                initialized: 'never',
            }],
            'object-shorthand': ['error', 'always', {
                avoidQuotes: true,
                ignoreConstructors: false,
            }],
            'operator-linebreak': ['error', 'before'],
            'padded-blocks': ['error', {
                blocks: 'never',
                switches: 'never',
                classes: 'never',
            }],
            'prefer-arrow-callback': ['error', {
                allowNamedFunctions: false,
                allowUnboundThis: true,
            }],
            'prefer-const': ['error', {
                destructuring: 'all',
                ignoreReadBeforeAssign: true,
            }],
            'prefer-exponentiation-operator': 'error',
            'prefer-promise-reject-errors': 'error',
            'prefer-regex-literals': ['error', {
                disallowRedundantWrapping: true,
            }],
            'prefer-rest-params': 'error',
            'prefer-spread': 'error',
            'prefer-template': 'error',
            'quote-props': ['error', 'consistent-as-needed'],
            'quotes': ['error', 'single', {
                avoidEscape: true,
            }],
            'rest-spread-spacing': ['error', 'never'],
            'semi': ['error', 'never'],
            'semi-spacing': ['error', {
                before: false,
                after: true,
            }],
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
            'space-in-parens': ['error', 'never'],
            'space-infix-ops': 'error',
            'space-unary-ops': ['error', {
                words: true,
                nonwords: false,
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
            'symbol-description': 'error',
            'template-curly-spacing': 'error',
            'template-tag-spacing': ['error', 'never'],
            'unicode-bom': ['error', 'never'],
            'use-isnan': ['error', {
                enforceForSwitchCase: true,
                enforceForIndexOf: true,
            }],
            'valid-typeof': ['error', {
                requireStringLiterals: true,
            }],
            'wrap-iife': ['error', 'any', {
                functionPrototypeMethods: true,
            }],
            'yield-star-spacing': ['error', 'both'],
            'yoda': ['error', 'never'],
            'require-await': 'error',
            'vars-on-top': 'error',

            // no-
            'no-alert': 'warn',
            'no-array-constructor': 'error',
            'no-async-promise-executor': 'error',
            'no-caller': 'error',
            'no-case-declarations': 'error',
            'no-class-assign': 'error',
            'no-compare-neg-zero': 'error',
            'no-const-assign': 'error',
            'no-console': ['error', {
                allow: ['warn', 'error'],
            }],
            'no-constant-condition': 'warn',
            'no-control-regex': 'error',
            'no-debugger': 'warn',
            'no-delete-var': 'error',
            'no-dupe-args': 'error',
            'no-dupe-class-members': 'error',
            'no-dupe-keys': 'error',
            'no-duplicate-case': 'error',
            'no-duplicate-imports': 'error',
            'no-empty': ['error', {
                allowEmptyCatch: true,
            }],
            'no-empty-character-class': 'error',
            'no-empty-pattern': 'error',
            'no-eval': 'error',
            'no-ex-assign': 'error',
            'no-extra-bind': 'error',
            'no-extra-boolean-cast': 'error',
            'no-extra-parens': ['error', 'functions'],
            'no-fallthrough': 'error',
            'no-floating-decimal': 'error',
            'no-func-assign': 'error',
            'no-global-assign': 'error',
            'no-implied-eval': 'error',
            'no-import-assign': 'error',
            'no-invalid-regexp': 'error',
            'no-invalid-this': 'error',
            'no-irregular-whitespace': 'error',
            'no-iterator': 'error',
            'no-labels': ['error', {
                allowLoop: false,
                allowSwitch: false,
            }],
            'no-lone-blocks': 'error',
            'no-lonely-if': 'error',
            'no-loss-of-precision': 'error',
            'no-misleading-character-class': 'error',
            'no-mixed-operators': ['error', {
                groups: [
                    ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
                    ['&&', '||'],
                    ['in', 'instanceof'],
                ],
                allowSamePrecedence: true,
            }],
            'no-mixed-spaces-and-tabs': 'error',
            'no-multi-spaces': 'error',
            'no-multi-str': 'error',
            'no-multiple-empty-lines': ['error', {
                max: 1,
                maxBOF: 0,
                maxEOF: 0,
            }],
            'no-new': 'error',
            'no-new-func': 'error',
            'no-new-object': 'error',
            'no-new-symbol': 'error',
            'no-new-wrappers': 'error',
            'no-obj-calls': 'error',
            'no-octal': 'error',
            'no-octal-escape': 'error',
            'no-param-reassign': 'error',
            'no-proto': 'error',
            'no-redeclare': ['error', {
                builtinGlobals: false,
            }],
            'no-regex-spaces': 'error',
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
            'no-return-assign': ['error', 'except-parens'],
            'no-self-assign': ['error', {
                props: true,
            }],
            'no-self-compare': 'error',
            'no-sequences': 'error',
            'no-shadow-restricted-names': 'error',
            'no-sparse-arrays': 'error',
            'no-tabs': 'error',
            'no-template-curly-in-string': 'error',
            'no-this-before-super': 'error',
            'no-throw-literal': 'error',
            'no-trailing-spaces': 'error',
            'no-undef': 'error',
            'no-undef-init': 'error',
            'no-unexpected-multiline': 'error',
            'no-unmodified-loop-condition': 'error',
            'no-unneeded-ternary': ['error', {
                defaultAssignment: false,
            }],
            'no-unreachable': 'error',
            'no-unreachable-loop': 'error',
            'no-unsafe-finally': 'error',
            'no-unsafe-negation': 'error',
            'no-unused-expressions': ['error', {
                allowShortCircuit: true,
                allowTernary: true,
                allowTaggedTemplates: true,
            }],
            'no-use-before-define': ['error', {
                classes: false,
                functions: false,
                variables: true,
            }],
            'no-useless-backreference': 'error',
            'no-useless-call': 'error',
            'no-useless-computed-key': 'error',
            'no-useless-constructor': 'error',
            'no-useless-escape': 'error',
            'no-useless-rename': 'error',
            'no-useless-return': 'error',
            'no-var': 'error',
            'no-void': 'error',
            'no-whitespace-before-property': 'error',
            'no-with': 'error',

            // node
            'n/handle-callback-err': ['error', '^(err|error)$'],
            'n/no-callback-literal': 'off',
            'n/no-deprecated-api': 'error',
            'n/no-exports-assign': 'error',
            'n/no-new-require': 'error',
            'n/no-path-concat': 'error',
            'n/prefer-global/buffer': ['error', 'never'],
            'n/process-exit-as-throw': 'error',

            // promises
            'promise/param-names': 'error',

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
            'import/export': 'error',
            'import/first': 'error',
            'import/newline-after-import': ['error', {
                considerComments: true,
                count: 1,
            }],
            'import/no-default-export': 'error',
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
                    pattern: '@/**',
                }],
                pathGroupsExcludedImportTypes: ['type'],
            }],

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

            'antfu/no-import-node-modules-by-path': 'error',
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
            `**/server/${GLOB_SRC}`,
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
            'unicorn/catch-error-name': 'error',
            'unicorn/custom-error-definition': 'error',
            'unicorn/error-message': 'error',
            'unicorn/escape-case': 'error',
            'unicorn/explicit-length-check': 'error',
            'unicorn/filename-case': ['error', {
                cases: {
                    kebabCase: true,
                    pascalCase: true,
                },
                ignore: [/^[A-Z]+\..*$/],
            }],
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
            'unicorn/no-static-only-class': 'error',
            'unicorn/no-unnecessary-await': 'error',
            'unicorn/no-zero-fractions': 'error',
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
            'unicorn/prefer-modern-math-apis': 'error',
            'unicorn/prefer-negative-index': 'error',
            'unicorn/prefer-node-protocol': 'error',
            'unicorn/prefer-number-properties': 'error',
            'unicorn/prefer-optional-catch-binding': 'error',
            'unicorn/prefer-prototype-methods': 'error',
            'unicorn/prefer-query-selector': 'error',
            'unicorn/prefer-reflect-apply': 'error',
            'unicorn/prefer-regexp-test': 'error',
            'unicorn/prefer-string-replace-all': 'error',
            'unicorn/prefer-string-slice': 'error',
            'unicorn/prefer-string-starts-ends-with': 'error',
            'unicorn/prefer-string-trim-start-end': 'error',
            'unicorn/prefer-top-level-await': 'error',
            'unicorn/prefer-text-content': 'error',
            'unicorn/prefer-type-error': 'error',
            'unicorn/switch-case-braces': 'error',
            'unicorn/throw-new-error': 'error',
        },
    },
]