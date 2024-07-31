import antfu from '@antfu/eslint-config'
import { defu } from 'defu'

export const config: typeof antfu = (options, ...userConfigs) => {
    const pipe = antfu(
        defu(options?.stylistic === false ? {} : { stylistic: { indent: 4 } }, options),
        ...userConfigs,
    )

    if (options?.stylistic !== false) {
        pipe.override('antfu/stylistic/rules', {
            rules: {
                'style/function-call-spacing': ['error', 'never'],
            },
        })
    }

    if (options?.vue) {
        pipe.override('antfu/vue/rules', {
            rules: {
                'vue/block-order': ['error', {
                    order: ['template', 'script', 'style'],
                }],
                'vue/html-indent': ['error', 4],
            },
        })
    }

    if (options?.yaml ?? true) {
        pipe.override('antfu/yaml/rules', {
            rules: {
                'yaml/indent': ['error', 2],
            },
        })
    }

    pipe.onResolved((config) => {
        // https://github.com/ivanmaxlogiudice/eslint-config/issues/37
        const stylistic = config.find(item => item.name === 'antfu/stylistic/rules')
        if (
            stylistic
            && stylistic.rules
            && Array.isArray(stylistic.rules['style/indent'])
            && stylistic.rules['style/indent'][2]
        ) {
            stylistic.rules['style/indent'][2].offsetTernaryExpressions = false
        }
    })

    return pipe
}

export default config
