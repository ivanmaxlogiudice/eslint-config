import plugin from 'eslint-plugin-perfectionist'
import type { TypedFlatConfigItem } from '../types'

export const perfectionist: TypedFlatConfigItem[] = [
    {
        name: 'ivanmaxlogiudice/perfectionist/rules',
        plugins: {
            perfectionist: plugin,
        },
        rules: {
            'perfectionist/sort-imports': ['warn', {
                internalPattern: ['@/**'],
                newlinesBetween: 'ignore',
            }],
            'perfectionist/sort-named-exports': ['warn', { groupKind: 'values-first' }],
            'perfectionist/sort-named-imports': ['warn', { groupKind: 'values-first' }],
        },
    },
]
