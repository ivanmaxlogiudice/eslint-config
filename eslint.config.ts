// @ts-expect-error missing types
import styleMigrate from '@stylistic/eslint-plugin-migrate'

import { config } from './src'

export default config({
    type: 'lib',
    yaml: true,
    markdown: true,
}, {
    ignores: ['fixtures', '_fixtures'],
}, {
    files: ['src/**/*.ts'],
    rules: {
        'perfectionist/sort-objects': ['error', {
            partitionByComment: true,
            groups: ['top', 'unknown'],
            customGroups: {
                top: ['name'],
            },
        }],
    },
}, {
    files: ['src/configs/*.ts'],
    plugins: {
        'style-migrate': styleMigrate,
    },
    rules: {
        'style-migrate/migrate': ['error', { namespaceTo: 'style' }],
    },
})
