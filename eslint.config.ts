import styleMigrate from '@stylistic/eslint-plugin-migrate'
import { config } from './src'

export default config({
    type: 'lib',
}, {
    files: ['src/configs/*.ts'],
    plugins: {
        'style-migrate': styleMigrate,
    },
    rules: {
        'style-migrate/migrate': ['error', { namespaceTo: 'style' }],
    },
})
