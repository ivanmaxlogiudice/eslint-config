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
                'perfectionist/sort-imports': ['warn', {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'internal-type',
                        'parent',
                        'parent-type',
                        'sibling',
                        'sibling-type',
                        'index',
                        'index-type',
                        'object',
                        'type',
                        'side-effect',
                        'side-effect-style',
                    ],
                    internalPattern: ['@/**'],
                    newlinesBetween: 'ignore',
                }],
                'perfectionist/sort-named-exports': ['warn', { groupKind: 'values-first' }],
                'perfectionist/sort-named-imports': ['warn', { groupKind: 'values-first' }],
            },
        },
    ]
}
