import { GLOB_MARKDOWN, GLOB_MARKDOWN_CODE } from '../globs'
import { ensurePackages, interopDefault } from '../utils'
import type { OptionsComponentExts, OptionsFiles, OptionsOverrides, TypedFlatConfigItem } from '../types'

export async function markdown(options: OptionsFiles & OptionsOverrides & OptionsComponentExts = {}): Promise<TypedFlatConfigItem[]> {
    const {
        componentExts = [],
        files = [GLOB_MARKDOWN],
        overrides = {},
    } = options

    await ensurePackages(['eslint-plugin-markdown'])

    const plugin = await interopDefault(import('@eslint/markdown'))

    return [
        {
            name: 'ivanmaxlogiudice/markdown/setup',
            plugins: {
                markdown: plugin,
            },
        },
        {
            name: 'ivanmaxlogiudice/markdown/processor',
            files,
            processor: 'markdown/markdown',
        },
        {
            name: 'ivanmaxlogiudice/markdown/disables',
            files: [
                GLOB_MARKDOWN_CODE,
                ...componentExts.map(ext => `${GLOB_MARKDOWN}/**/*.${ext}`),
            ],
            languageOptions: {
                parserOptions: {
                    ecmaFeatures: {
                        impliedStrict: true,
                    },
                },
            },
            rules: {
                'import/newline-after-import': 'off',

                'no-alert': 'off',
                'no-console': 'off',
                'no-labels': 'off',
                'no-lone-blocks': 'off',
                'no-restricted-syntax': 'off',
                'no-undef': 'off',
                'no-unused-expressions': 'off',
                'no-unused-labels': 'off',
                'no-unused-vars': 'off',

                'node/prefer-global/process': 'off',
                'style/comma-dangle': 'off',

                'style/eol-last': 'off',
                'ts/consistent-type-imports': 'off',
                'ts/no-namespace': 'off',
                'ts/no-redeclare': 'off',
                'ts/no-require-imports': 'off',
                'ts/no-unused-expressions': 'off',
                'ts/no-unused-vars': 'off',
                'ts/no-use-before-define': 'off',

                'unicode-bom': 'off',
                'unused-imports/no-unused-imports': 'off',
                'unused-imports/no-unused-vars': 'off',

                ...overrides,
            },
        },
    ]
}
