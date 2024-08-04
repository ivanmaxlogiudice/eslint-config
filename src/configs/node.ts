import plugin from 'eslint-plugin-n'
import type { TypedFlatConfigItem } from '../types'

export const node: TypedFlatConfigItem[] = [
    {
        name: 'ivanmaxlogiudice/node/rules',
        plugins: {
            node: plugin,
        },
        rules: {
            'node/handle-callback-err': ['error', '^(err|error)$'],
            'node/no-deprecated-api': 'error',
            'node/no-exports-assign': 'error',
            'node/no-new-require': 'error',
            'node/no-path-concat': 'error',
            'node/no-unsupported-features/es-builtins': 'error',
            'node/prefer-global/buffer': ['error', 'never'],
            'node/prefer-global/process': ['error', 'never'],
            'node/process-exit-as-throw': 'error',
        },
    },
]
