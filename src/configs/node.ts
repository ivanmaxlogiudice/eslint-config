import { type FlatESLintConfigItem } from 'eslint-define-config'
import { pluginNode } from '../plugins'
import { type OptionsOverrides } from '../types'

export function node(options: OptionsOverrides = {}): FlatESLintConfigItem[] {
    const {
        overrides = {},
    } = options

    return [
        {
            plugins: {
                node: pluginNode,
            },
            rules: {
                'node/handle-callback-err': ['error', '^(err|error)$'],
                'node/no-deprecated-api': 'error',
                'node/no-exports-assign': 'error',
                'node/no-new-require': 'error',
                'node/no-path-concat': 'error',
                'node/prefer-global/buffer': ['error', 'never'],
                'node/prefer-global/process': ['error', 'never'],
                'node/process-exit-as-throw': 'error',

                ...overrides,
            },
        },
    ]
}
