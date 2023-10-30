import styleMigrate from '@stylistic/eslint-plugin-migrate'

import config from './dist/index.js'

export default config(
    {
        ignores: [
            'fixtures',
            '_fixtures',
        ],
        typescript: true,
        vue: true,
    },
    {
        files: ['src/configs/*.ts'],
        plugins: {
            'style-migrate': styleMigrate,
        },
        rules: {
            'style-migrate/migrate': ['error', {
                namespaceTo: 'style',
            }],
        },
    },
)
