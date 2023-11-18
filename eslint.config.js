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
        files: ['src/**/*.ts'],
        rules: {
            'perfectionist/sort-objects': ['error', {
                'order': 'asc',
                'partition-by-comment': true,
                'type': 'natural',
            }],
        },
    },
)
