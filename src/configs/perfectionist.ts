import type { OptionsOverrides, TypedFlatConfigItem } from '../types'
import { interopDefault } from '../utils'

export async function perfectionist(options: OptionsOverrides = {}): Promise<TypedFlatConfigItem[]> {
    const {
        overrides = {},
    } = options

    // @ts-expect-error Missing types
    const pluginPerfectionist = await interopDefault(import('eslint-plugin-perfectionist'))

    return [
        {
            name: 'config:perfectionist:setup',
            plugins: {
                perfectionist: pluginPerfectionist,
            },
        },
        {
            name: 'config:perfectionist:rules',
            rules: {
                'perfectionist/sort-classes': ['error', {
                    groups: [
                        'index-signature',
                        'static-property',
                        'private-property',
                        'property',
                        'constructor',
                        'static-method',
                        'private-method',
                        'method',
                        ['get-method', 'set-method'],
                        'unknown',
                    ],
                    order: 'asc',
                    type: 'natural',
                }],
                'perfectionist/sort-exports': ['error', {
                    order: 'asc',
                    type: 'natural',
                }],
                'perfectionist/sort-imports': ['error', {
                    'groups': [
                        'builtin',
                        'external',
                        'internal-type',
                        'internal',
                        ['parent-type', 'sibling-type', 'index-type'],
                        ['parent', 'sibling', 'index'],
                        'object',
                        'type',
                        'unknown',
                    ],
                    'internal-pattern': ['{{@,~}/,#}**'],
                    'newlines-between': 'ignore',
                    'order': 'asc',
                    'type': 'natural',
                }],
                'perfectionist/sort-named-exports': ['error', {
                    order: 'asc',
                    type: 'natural',
                }],
                'perfectionist/sort-named-imports': ['error', {
                    order: 'asc',
                    type: 'natural',
                }],

                ...overrides,
            },
        },
    ]
}
