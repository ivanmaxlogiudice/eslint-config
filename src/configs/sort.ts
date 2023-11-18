import type { FlatConfigItem } from '../types'

/**
 * Sort package.json
 *
 * Requires `jsonc` config
 */
export function sortPackageJson(): FlatConfigItem[] {
    return [
        {
            files: ['**/package.json'],
            name: 'config:sort-package-json',
            rules: {
                'jsonc/sort-array-values': ['error', {
                    order: { type: 'asc' },
                    pathPattern: '^files$',
                }],
                'jsonc/sort-keys': [
                    'error',
                    {
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
                            'files',
                            'main',
                            'module',
                            'types',
                            'exports',
                            'typesVersions',
                            'sideEffects',
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
                        pathPattern: '^$',
                    },
                    {
                        order: { type: 'asc' },
                        pathPattern: '^(?:dev|peer|optional|bundled)?[Dd]ependencies$',
                    },
                    {
                        order: { type: 'asc' },
                        pathPattern: '^resolutions$',
                    },
                    {
                        order: { type: 'asc' },
                        pathPattern: '^pnpm.overrides$',
                    },
                    {
                        order: [
                            'types',
                            'import',
                            'require',
                            'default',
                        ],
                        pathPattern: '^exports.*$',
                    },
                ],
            },
        },
    ]
}

/**
 * Sort tsconfig.json
 *
 * Requires `jsonc` config
 */
export function sortTsconfig(): FlatConfigItem[] {
    return [
        {
            files: ['**/tsconfig.json', '**/tsconfig.*.json'],
            name: 'config:sort-tsconfig',
            rules: {
                'jsonc/sort-keys': [
                    'error',
                    {
                        order: [
                            'extends',
                            'compilerOptions',
                            'references',
                            'files',
                            'include',
                            'exclude',
                        ],
                        pathPattern: '^$',
                    },
                    {
                        order: [
                            /* Projects */
                            'incremental',
                            'composite',
                            'tsBuildInfoFile',
                            'disableSourceOfProjectReferenceRedirect',
                            'disableSolutionSearching',
                            'disableReferencedProjectLoad',
                            /* Language and Environment */
                            'target',
                            'jsx',
                            'jsxFactory',
                            'jsxFragmentFactory',
                            'jsxImportSource',
                            'lib',
                            'moduleDetection',
                            'noLib',
                            'reactNamespace',
                            'useDefineForClassFields',
                            'emitDecoratorMetadata',
                            'experimentalDecorators',
                            /* Modules */
                            'baseUrl',
                            'rootDir',
                            'rootDirs',
                            'customConditions',
                            'module',
                            'moduleResolution',
                            'moduleSuffixes',
                            'noResolve',
                            'paths',
                            'resolveJsonModule',
                            'resolvePackageJsonExports',
                            'resolvePackageJsonImports',
                            'typeRoots',
                            'types',
                            'allowArbitraryExtensions',
                            'allowImportingTsExtensions',
                            'allowUmdGlobalAccess',
                            /* JavaScript Support */
                            'allowJs',
                            'checkJs',
                            'maxNodeModuleJsDepth',
                            /* Type Checking */
                            'strict',
                            'strictBindCallApply',
                            'strictFunctionTypes',
                            'strictNullChecks',
                            'strictPropertyInitialization',
                            'allowUnreachableCode',
                            'allowUnusedLabels',
                            'alwaysStrict',
                            'exactOptionalPropertyTypes',
                            'noFallthroughCasesInSwitch',
                            'noImplicitAny',
                            'noImplicitOverride',
                            'noImplicitReturns',
                            'noImplicitThis',
                            'noPropertyAccessFromIndexSignature',
                            'noUncheckedIndexedAccess',
                            'noUnusedLocals',
                            'noUnusedParameters',
                            'useUnknownInCatchVariables',
                            /* Emit */
                            'declaration',
                            'declarationDir',
                            'declarationMap',
                            'downlevelIteration',
                            'emitBOM',
                            'emitDeclarationOnly',
                            'importHelpers',
                            'importsNotUsedAsValues',
                            'inlineSourceMap',
                            'inlineSources',
                            'mapRoot',
                            'newLine',
                            'noEmit',
                            'noEmitHelpers',
                            'noEmitOnError',
                            'outDir',
                            'outFile',
                            'preserveConstEnums',
                            'preserveValueImports',
                            'removeComments',
                            'sourceMap',
                            'sourceRoot',
                            'stripInternal',
                            /* Interop Constraints */
                            'allowSyntheticDefaultImports',
                            'esModuleInterop',
                            'forceConsistentCasingInFileNames',
                            'isolatedModules',
                            'preserveSymlinks',
                            'verbatimModuleSyntax',
                            /* Completeness */
                            'skipDefaultLibCheck',
                            'skipLibCheck',
                        ],
                        pathPattern: '^compilerOptions$',
                    },
                ],
            },
        },
    ]
}
