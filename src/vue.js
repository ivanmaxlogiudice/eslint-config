import { getPackageInfoSync } from 'local-pkg'
import vueParser from 'vue-eslint-parser'
import vuePlugin from 'eslint-plugin-vue'
import tsPlugin from '@typescript-eslint/eslint-plugin'

import { typescript } from './typescript.js'
import { GLOB_VUE } from './shared.js'

export { vueParser, vuePlugin }

export function getVueVersion() {
    const pkg = getPackageInfoSync('vue', { paths: [process.cwd()] })
    
    if (pkg && typeof pkg.version === 'string' && !Number.isNaN(+pkg.version[0])) 
        return +pkg.version[0]
  
    return 3
}
const isVue3 = getVueVersion() === 3

/** @type {import('eslint-define-config').FlatESLintConfigItem[]} */
export const reactivityTransform = [
    {
        languageOptions: {
            globals: {
                $: 'readonly',
                $$: 'readonly',
                $ref: 'readonly',
                $computed: 'readonly',
                $shallowRef: 'readonly',
                $toRef: 'readonly',
                $customRef: 'readonly',
            },
        },
        plugins: {
            vue: vuePlugin,
        },
        rules: {
            'vue/no-setup-props-reactivity-loss': 'off',
        },
    },
]

/** @type {import('eslint-define-config').Rules} */
const vueCustomRules = {
    'vue/max-attributes-per-line': 'off',
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': 'off',
    // 'vue/require-prop-types': 'off',
    // 'vue/require-default-prop': 'off',
    // 'vue/no-dupe-keys': 'off',

    'vue/array-bracket-newline': ['error', {
        minItems: 3,
        multiline: true,
    }],
    'vue/array-bracket-spacing': ['error', 'never'],
    'vue/arrow-spacing': ['error', {
        after: true,
        before: true,
    }],
    'vue/block-spacing': ['error', 'always'],
    'vue/block-tag-newline': ['error', {
        multiline: 'always',
        singleline: 'always',
    }],
    'vue/brace-style': ['error', 'stroustrup', {
        allowSingleLine: true,
    }],
    'vue/comma-dangle': ['error', 'always-multiline'],
    'vue/comma-spacing': ['error', {
        after: true,
        before: false,
    }],
    'vue/comma-style': ['error', 'last'],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/component-options-name-casing': ['error', 'PascalCase'],
    'vue/block-order': ['error', {
        order: ['template', 'script', 'style'],
    }],
    'vue/custom-event-name-casing': ['error', 'camelCase'],
    'vue/define-macros-order': ['error', {
        order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'],
    }],
    'vue/dot-location': ['error', 'property'],
    'vue/dot-notation': ['error', {
        allowKeywords: true,
    }],
    'vue/eqeqeq': ['error', 'smart'],
    'vue/html-comment-content-spacing': ['error', 'always', {
        exceptions: ['-'],
    }],
    'vue/html-indent': ['error', 4],
    // 'vue/html-self-closing': ['error', {
    //     html: {
    //         component: 'always',
    //         normal: 'always',
    //         void: 'always',
    //     },
    //     math: 'always',
    //     svg: 'always',
    // }],
    'vue/key-spacing': ['error', {
        afterColon: true,
        beforeColon: false,
    }],
    'vue/keyword-spacing': ['error', {
        after: true,
        before: true,
    }],
    'vue/no-constant-condition': 'warn',
    'vue/no-empty-pattern': 'error',
    'vue/no-extra-parens': ['error', 'functions'],
    'vue/no-irregular-whitespace': 'error',
    'vue/no-loss-of-precision': 'error',
    'vue/no-restricted-syntax': ['error', 'DebuggerStatement', 'LabeledStatement', 'WithStatement'],
    'vue/no-restricted-v-bind': ['error', '/^v-/'],
    'vue/no-sparse-arrays': 'error',
    'vue/no-unused-refs': 'error',
    'vue/no-useless-v-bind': 'error',
    'vue/object-curly-newline': ['error', {
        consistent: true,
        multiline: true,
    }],
    'vue/object-curly-spacing': ['error', 'always'],
    'vue/object-property-newline': ['error', {
        allowMultiplePropertiesPerLine: true,
    }],
    'vue/object-shorthand': ['error', 'always', {
        avoidQuotes: true,
        ignoreConstructors: false,
    }],
    'vue/operator-linebreak': ['error', 'before'],
    'vue/padding-line-between-blocks': ['error', 'always'],
    'vue/prefer-separate-static-class': 'error',
    'vue/prefer-template': 'error',
    'vue/quote-props': ['error', 'consistent-as-needed'],
    'vue/require-typed-object-prop': ['error'],
    'vue/space-in-parens': ['error', 'never'],
    'vue/space-infix-ops': 'error',
    'vue/space-unary-ops': ['error', {
        nonwords: false,
        words: true,
    }],
    'vue/template-curly-spacing': 'error',
}

/** @type {import('eslint-define-config').Rules} */
const vue3Rules = {
    ...vuePlugin.configs.base.rules,
    ...vuePlugin.configs['vue3-essential'].rules,
    ...vuePlugin.configs['vue3-strongly-recommended'].rules,
    ...vuePlugin.configs['vue3-recommended'].rules,
}

/** @type {import('eslint-define-config').Rules} */
const vue2Rules = {
    ...vuePlugin.configs.base.rules,
    ...vuePlugin.configs.essential.rules,
    ...vuePlugin.configs['strongly-recommended'].rules,
    ...vuePlugin.configs.recommended.rules,
}

/** @type {import('eslint-define-config').FlatESLintConfigItem[]} */
export const vue = [
    {
        files: [GLOB_VUE],
        plugins: {
            'vue': vuePlugin,
            '@typescript-eslint': tsPlugin,
        },
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: '@typescript-eslint/parser',
                sourceType: 'module',
                extraFileExtensions: ['.vue'],
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        processor: vuePlugin.processors['.vue'],
        rules: {
            ...typescript[0].rules,
        },
    },
    {
        plugins: {
            vue: vuePlugin,
        },
        rules: {
            ...(isVue3 ? vue3Rules : vue2Rules),
            ...vueCustomRules,
        },
    },
    ...reactivityTransform,
]
