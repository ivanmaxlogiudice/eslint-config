import type { ConfigItem, OptionsOverrides } from '../types'

import { pluginPerfectionist } from '../plugins'

export function perfectionist(options: OptionsOverrides = {}): ConfigItem[] {
    const {
        overrides = {},
    } = options

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
                'perfectionist/sort-array-includes': ['error', {
                    'order': 'asc',
                    'spread-last': true,
                    'type': 'natural',
                }],
                'perfectionist/sort-astro-attributes': ['error', {
                    order: 'asc',
                    type: 'natural',
                }],
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
                'perfectionist/sort-enums': ['error', {
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
                    'newlines-between': 'always',
                    'order': 'asc',
                    'type': 'natural',
                }],
                'perfectionist/sort-interfaces': ['error', {
                    order: 'asc',
                    type: 'natural',
                }],
                'perfectionist/sort-jsx-props': ['error', {
                    order: 'asc',
                    type: 'natural',
                }],
                'perfectionist/sort-maps': ['error', {
                    order: 'asc',
                    type: 'natural',
                }],
                'perfectionist/sort-named-exports': ['error', {
                    order: 'asc',
                    type: 'natural',
                }],
                'perfectionist/sort-named-imports': ['error', {
                    order: 'asc',
                    type: 'natural',
                }],
                'perfectionist/sort-object-types': ['error', {
                    order: 'asc',
                    type: 'natural',
                }],
                'perfectionist/sort-objects': ['error', {
                    'order': 'asc',
                    'partition-by-comment': true,
                    'type': 'natural',
                }],
                'perfectionist/sort-svelte-attributes': ['error', {
                    order: 'asc',
                    type: 'natural',
                }],
                'perfectionist/sort-union-types': ['error', {
                    order: 'asc',
                    type: 'natural',
                }],
                'perfectionist/sort-vue-attributes': ['error', {
                    order: 'asc',
                    type: 'natural',
                }],

                ...overrides,
            },
        },
    ]
}
