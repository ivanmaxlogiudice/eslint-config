import process from 'node:process'
import { GLOB_MARKDOWN, GLOB_TS } from '../globs'
import { interopDefault, renameRules } from '../utils'
import type { OptionsComponentExts, OptionsFiles, OptionsOverrides, OptionsProjectType, OptionsTypeScriptParserOptions, OptionsTypeScriptWithTypes, TypedFlatConfigItem } from '../types'

export async function typescript(
    options: OptionsFiles & OptionsOverrides & OptionsComponentExts & OptionsTypeScriptWithTypes & OptionsTypeScriptParserOptions & OptionsProjectType = {},
): Promise<TypedFlatConfigItem[]> {
    const {
        componentExts = [],
        overrides = {},
        overridesTypeAware = {},
        parserOptions = {},
        type = 'app',
    } = options

    const files = options.files ?? [GLOB_TS, ...componentExts.map(ext => `**/*.${ext}`)]

    const filesTypeAware = options.filesTypeAware ?? [GLOB_TS]
    const ignoresTypeAware = options.ignoresTypeAware ?? [`${GLOB_MARKDOWN}/**`]
    const tsconfigPath = options?.tsconfigPath
        ? options.tsconfigPath
        : undefined
    const isTypeAware = !!tsconfigPath

    const typeAwareRules: TypedFlatConfigItem['rules'] = {
        'dot-notation': 'off',
        'no-implied-eval': 'off',
        'ts/await-thenable': 'error',
        'ts/dot-notation': ['error', { allowKeywords: true }],
        'ts/no-floating-promises': 'error',
        'ts/no-for-in-array': 'error',
        'ts/no-implied-eval': 'error',
        'ts/no-misused-promises': 'error',
        'ts/no-unnecessary-type-assertion': 'error',
        'ts/no-unsafe-argument': 'error',
        'ts/no-unsafe-assignment': 'error',
        'ts/no-unsafe-call': 'error',
        'ts/no-unsafe-member-access': 'error',
        'ts/no-unsafe-return': 'error',
        'ts/promise-function-async': 'error',
        'ts/restrict-plus-operands': 'error',
        'ts/restrict-template-expressions': 'error',
        'ts/return-await': ['error', 'in-try-catch'],
        'ts/strict-boolean-expressions': ['error', { allowNullableBoolean: true, allowNullableObject: true }],
        'ts/switch-exhaustiveness-check': 'error',
        'ts/unbound-method': 'error',
    }

    const [plugin, parser] = await Promise.all([
        interopDefault(import('@typescript-eslint/eslint-plugin')),
        interopDefault(import('@typescript-eslint/parser')),
    ] as const)

    function makeParser(typeAware: boolean, files: string[], ignores?: string[]): TypedFlatConfigItem {
        return {
            files,
            ...ignores ? { ignores } : {},
            name: `ivanmaxlogiudice/typescript/${typeAware ? 'type-aware-parser' : 'parser'}`,
            languageOptions: {
                parser,
                parserOptions: {
                    extraFileExtensions: componentExts.map(ext => `.${ext}`),
                    sourceType: 'module',
                    ...typeAware
                        ? {
                            projectService: {
                                allowDefaultProject: ['./*.js'],
                                defaultProject: tsconfigPath,
                            },
                            tsconfigRootDir: process.cwd(),
                        }
                        : {},
                    ...parserOptions as any,
                },
            },
        }
    }

    return [
        {
            // Install the plugins without globs, so they can be configured separately.
            name: 'ivanmaxlogiudice/typescript/setup',
            plugins: {
                ts: plugin,
            },
        },
        // assign type-aware parser for type-aware files and type-unaware parser for the rest
        ...isTypeAware
            ? [
                makeParser(false, files),
                makeParser(true, filesTypeAware, ignoresTypeAware),
            ]
            : [
                makeParser(false, files),
            ],
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
                ...overrides,
            },
        },
        ...isTypeAware
            ? [{
                name: 'ivanmaxlogiudice/typescript/rules-type-aware',
                files: filesTypeAware,
                ignores: ignoresTypeAware,
                rules: {
                    ...typeAwareRules,
                    ...overridesTypeAware,
                },
            }]
            : [],
        {
            name: 'ivanmaxlogiudice/typescript/disables/dts',
            files: ['**/*.d.?([cm])ts'],
            rules: {
                'eslint-comments/no-unlimited-disable': 'off',
                'import/no-duplicates': 'off',
                'no-restricted-syntax': 'off',
                'unused-imports/no-unused-vars': 'off',
            },
        },
        {
            name: 'ivanmaxlogiudice/typescript/disables/test',
            files: ['**/*.{test,spec}.ts?(x)'],
            rules: {
                'no-unused-expressions': 'off',
            },
        },
        {
            name: 'ivanmaxlogiudice/typescript/disables/cjs',
            files: ['**/*.js', '**/*.cjs'],
            rules: {
                'ts/no-require-imports': 'off',
                'ts/no-var-requires': 'off',
            },
        },
    ]
}
