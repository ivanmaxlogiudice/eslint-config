// @ts-check
import styleMigrate from '@stylistic/eslint-plugin-migrate'
import JITI from 'jiti'

const jiti = JITI(import.meta.url)
/**
 * @type {import('./src').default}
 */
const config = jiti('./src').default

export default config(
    {
        vue: true,
        typescript: true,
        formatters: true,
        ignores: [
            'fixtures',
            '_fixtures',
        ],
    },
    {
        files: ['src/**/*.ts'],
        rules: {
            'perfectionist/sort-objects': ['error', {
                'order': 'asc',
                'partition-by-comment': true,
                'type': 'natural',
            }],
        },
    },
    {
        files: ['src/configs/*.ts'],
        plugins: {
            'style-migrate': styleMigrate,
        },
        rules: {
            'style-migrate/migrate': ['error', { namespaceTo: 'style' }],
        },
    },
)
