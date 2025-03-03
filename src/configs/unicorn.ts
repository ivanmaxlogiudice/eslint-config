import plugin from 'eslint-plugin-unicorn'
import type { TypedFlatConfigItem } from '../types'

export function unicorn(): TypedFlatConfigItem[] {
    return [
        {
            name: 'ivanmaxlogiudice/unicorn/rules',
            plugins: {
                unicorn: plugin,
            },
            rules: {
                'unicorn/consistent-date-clone': 'error',
                'unicorn/consistent-empty-array-spread': 'error',
                'unicorn/consistent-function-scoping': ['error', { checkArrowFunctions: false }],
                'unicorn/error-message': 'error',
                'unicorn/escape-case': 'error',
                'unicorn/new-for-builtins': 'error',
                'unicorn/no-array-for-each': 'error',
                'unicorn/no-array-push-push': 'error',
                'unicorn/no-await-in-promise-methods': 'error',
                'unicorn/no-invalid-remove-event-listener': 'error',
                'unicorn/no-lonely-if': 'error',
                'unicorn/no-negation-in-equality-check': 'error',
                'unicorn/no-new-array': 'error',
                'unicorn/no-new-buffer': 'error',
                'unicorn/no-unnecessary-await': 'error',
                'unicorn/number-literal-case': 'error',
                'unicorn/prefer-add-event-listener': 'error',
                'unicorn/prefer-array-find': 'error',
                'unicorn/prefer-array-flat-map': 'error',
                'unicorn/prefer-array-some': 'error',
                'unicorn/prefer-at': 'error',
                'unicorn/prefer-dom-node-text-content': 'error',
                'unicorn/prefer-includes': 'error',
                'unicorn/prefer-modern-math-apis': 'error',
                'unicorn/prefer-negative-index': 'error',
                'unicorn/prefer-node-protocol': 'error',
                'unicorn/prefer-number-properties': 'error',
                'unicorn/prefer-prototype-methods': 'error',
                'unicorn/prefer-query-selector': 'error',
                'unicorn/prefer-regexp-test': 'error',
                'unicorn/prefer-string-raw': 'error',
                'unicorn/prefer-string-replace-all': 'error',
                'unicorn/prefer-string-slice': 'error',
                'unicorn/prefer-string-starts-ends-with': 'error',
                'unicorn/prefer-string-trim-start-end': 'error',
                'unicorn/prefer-structured-clone': 'error',
                'unicorn/prefer-type-error': 'error',
                'unicorn/throw-new-error': 'error',
            },
        },
    ]
}
