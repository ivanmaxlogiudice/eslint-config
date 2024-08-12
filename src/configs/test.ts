import { GLOB_TESTS } from '../globs'
import { interopDefault, isInEditorEnv } from '../utils'
import type { TypedFlatConfigItem } from '../types'

// Hold the reference so we don't redeclare the plugin on each call
let _pluginTest: any

export async function test(): Promise<TypedFlatConfigItem[]> {
    const [pluginVitest, pluginNoOnlyTests] = await Promise.all([
        interopDefault(import('@vitest/eslint-plugin')),
        // @ts-expect-error missing types
        interopDefault(import('eslint-plugin-no-only-tests')),
    ] as const)

    _pluginTest = _pluginTest || {
        ...pluginVitest,
        rules: {
            ...pluginVitest.rules,
            // extend `test/no-only-tests` rule
            ...pluginNoOnlyTests.rules,
        },
    }

    return [
        {
            name: 'ivanmaxlogiudice/test/setup',
            plugins: {
                test: _pluginTest,
            },
        },
        {
            name: 'ivanmaxlogiudice/test/rules',
            files: GLOB_TESTS,
            rules: {
                'node/prefer-global/process': 'off',

                'test/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }],
                'test/no-identical-title': 'error',
                'test/no-import-node-test': 'error',
                'test/no-only-tests': isInEditorEnv() ? 'off' : 'error',
                'test/prefer-hooks-in-order': 'error',
                'test/prefer-lowercase-title': 'error',

                'ts/explicit-function-return-type': 'off',
            },
        },
    ]
}
