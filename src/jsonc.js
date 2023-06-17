import jsoncPlugin, { configs } from 'eslint-plugin-jsonc'
import jsoncParser from 'jsonc-eslint-parser'
import { GLOB_JSON, GLOB_JSON5, GLOB_JSONC } from './shared.js'

/** @type {import('eslint-define-config').FlatESLintConfigItem[]} */
export const jsonc = [
    {
        files: [GLOB_JSON, GLOB_JSON5, GLOB_JSONC],
        plugins: {
            jsonc: jsoncPlugin,
        },
        languageOptions: {
            parser: jsoncParser,
        },
        rules: {
            ...configs['recommended-with-jsonc'].rules,

            'jsonc/array-bracket-spacing': ['error', 'never'],
            'jsonc/comma-dangle': 'error',
            'jsonc/comma-style': ['error', 'last'],
            'jsonc/indent': ['error', 4],
            'jsonc/key-spacing': ['error', { 
                beforeColon: false, 
                afterColon: true, 
            }],
            'jsonc/no-octal-escape': 'error',
            'jsonc/object-curly-newline': ['error', { 
                multiline: true, 
                consistent: true, 
            }],
            'jsonc/object-curly-spacing': ['error', 'always'],
            'jsonc/object-property-newline': ['error', { 
                allowMultiplePropertiesPerLine: true, 
            }],
        },
    },
]
  
/** @type {import('eslint-define-config').FlatESLintConfigItem[]} */
export const pkgOrder = [
    {
        files: ['**/package.json'],
        rules: {
            'jsonc/sort-keys': [
                'error',
                {
                    pathPattern: '^$',
                    order: [
                        'name',
                        'version',
                        'private',
                        'packageManager',
                        'description',
                        'type',
                        'keywords',
                        'license',
                        'homepage',
                        'bugs',
                        'repository',
                        'author',
                        'contributors',
                        'funding',
                        'sideEffects',
                        'files',
                        'main',
                        'module',
                        'types',
                        'exports',
                        'typesVersions',
                        'unpkg',
                        'jsdelivr',
                        'browser',
                        'bin',
                        'man',
                        'directories',
                        'publishConfig',
                        'scripts',
                        'peerDependencies',
                        'peerDependenciesMeta',
                        'optionalDependencies',
                        'dependencies',
                        'devDependencies',
                        'engines',
                        'config',
                        'overrides',
                        'pnpm',
                        'husky',
                        'simple-git-hooks',
                        'lint-staged',
                        'eslintConfig',
                    ],
                },
                {
                    pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
                    order: { type: 'asc' },
                },
                {
                    pathPattern: '^exports.*$',
                    order: [
                        'types',
                        'require',
                        'import',
                    ],
                },
            ],
        },
    },
]