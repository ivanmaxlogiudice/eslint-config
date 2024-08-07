import { GLOB_YAML } from '../globs'
import type { TypedFlatConfigItem } from '../types'
import { ensurePackages, interopDefault } from '../utils'

export async function yaml(): Promise<TypedFlatConfigItem[]> {
    await ensurePackages(['eslint-plugin-yml', 'yaml-eslint-parser'])

    const [plugin, parser] = await Promise.all([
        interopDefault(import('eslint-plugin-yml')),
        interopDefault(import('yaml-eslint-parser')),
    ] as const)

    return [
        {
            name: 'ivanmaxlogiudice/yaml/setup',
            plugins: {
                yaml: plugin,
            },
        },
        {
            name: 'ivanmaxlogiudice/yaml/rules',
            files: [GLOB_YAML],
            languageOptions: {
                parser,
            },
            rules: {
                // TODO: Check rules (https://github.com/ota-meshi/eslint-plugin-yml)
                'style/spaced-comment': 'off',

                'yaml/block-mapping': 'error',
                'yaml/block-sequence': 'error',
                'yaml/no-empty-key': 'error',
                'yaml/no-empty-sequence-entry': 'error',
                'yaml/no-irregular-whitespace': 'error',
                'yaml/plain-scalar': 'error',

                'yaml/vue-custom-block/no-parsing-error': 'error',

                // Stylistic
                'yaml/block-mapping-question-indicator-newline': 'error',
                'yaml/block-sequence-hyphen-indicator-newline': 'error',
                'yaml/flow-mapping-curly-newline': 'error',
                'yaml/flow-mapping-curly-spacing': 'error',
                'yaml/flow-sequence-bracket-newline': 'error',
                'yaml/flow-sequence-bracket-spacing': 'error',
                'yaml/indent': ['error', 2],
                'yaml/key-spacing': 'error',
                'yaml/no-tab-indent': 'error',
                'yaml/quotes': ['error', { avoidEscape: false, prefer: 'single' }],
                'yaml/spaced-comment': 'error',
            },
        },
    ]
}
