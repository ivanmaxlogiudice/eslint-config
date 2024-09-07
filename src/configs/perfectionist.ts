import plugin from 'eslint-plugin-perfectionist'
import type { TypedFlatConfigItem } from '../types'

export function perfectionist(): TypedFlatConfigItem[] {
    return [
        {
            name: 'ivanmaxlogiudice/perfectionist/rules',
            plugins: {
                perfectionist: plugin,
            },
            rules: {
                'perfectionist/sort-exports': ['error', { order: 'asc', type: 'natural' }],
                'perfectionist/sort-imports': ['error', {
                    groups: [
                        'builtin',
                        'external',
                        'type',
                        ['internal', 'internal-type'],
                        ['parent', 'sibling', 'index'],
                        ['parent-type', 'sibling-type', 'index-type'],
                        'side-effect',
                        'object',
                        'unknown',
                    ],
                    newlinesBetween: 'ignore',
                    order: 'asc',
                    type: 'natural',
                }],
                'perfectionist/sort-named-exports': ['error', { order: 'asc', type: 'natural' }],
                'perfectionist/sort-named-imports': ['error', { order: 'asc', type: 'natural' }],
            },
        },
    ]
}
