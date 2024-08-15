// @ts-expect-error missing types
import plugin from '@eslint-community/eslint-plugin-eslint-comments'
import type { TypedFlatConfigItem } from '../types'

export function comments(): TypedFlatConfigItem[] {
    return [
        {
            name: 'ivanmaxlogiudice/comments/rules',
            plugins: {
                'eslint-comments': plugin,
            },
            rules: {
                'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
                'eslint-comments/no-aggregating-enable': 'error',
                'eslint-comments/no-duplicate-disable': 'error',
                'eslint-comments/no-unlimited-disable': 'error',
                'eslint-comments/no-unused-enable': 'error',
            },
        },
    ]
}
