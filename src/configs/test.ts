import type { FlatConfigItem, OptionsIsInEditor, OptionsOverrides } from '../types'
import { GLOB_TESTS } from '../globs'
import { interopDefault } from '../utils'

export async function test(options: OptionsIsInEditor & OptionsOverrides = {}): Promise<FlatConfigItem[]> {
    const {
        isInEditor = false,
        overrides = {},
    } = options

    const [
        pluginVitest,
        pluginNoOnlyTests,
    ] = await Promise.all([
        interopDefault(import('eslint-plugin-vitest')),
        // @ts-expect-error Missing types
        interopDefault(import('eslint-plugin-no-only-tests')),
    ] as const)

    return [
        {
            name: 'config:test:setup',
            plugins: {
                test: {
                    ...pluginVitest,
                    rules: {
                        ...pluginVitest.rules,
                        // extend `test/no-only-tests` rule
                        ...pluginNoOnlyTests.rules,
                    },
                },
            },
        },
        {
            files: GLOB_TESTS,
            name: 'config:test:rules',
            rules: {
                'node/prefer-global/process': 'off',

                'test/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }],
                'test/no-identical-title': 'error',
                'test/no-only-tests': isInEditor ? 'off' : 'error',
                'test/prefer-hooks-in-order': 'error',
                'test/prefer-lowercase-title': 'error',

                ...overrides,
            },
        },
    ]
}
