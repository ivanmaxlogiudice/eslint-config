import type { TypedFlatConfigItem } from '../types'
import plugin from 'eslint-plugin-perfectionist'

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
                        'type',
                        ['type-parent', 'type-sibling', 'type-index', 'type-internal'],

                        'builtin',
                        'external',
                        'internal',
                        ['parent', 'sibling', 'index'],
                        'side-effect',
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
