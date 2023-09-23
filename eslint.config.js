import sortKeys from 'eslint-plugin-sort-keys'
import config from '@ivanmaxlogiudice/eslint-config'

export default config(
    {
        ignores: [
            'fixtures',
            '_fixtures',
        ],
    },
    {
        files: ['src/**/*.ts'],
        plugins: {
            'sort-keys': sortKeys,
        },
        rules: {
            'sort-keys/sort-keys-fix': 'error',
        },
    },
)
