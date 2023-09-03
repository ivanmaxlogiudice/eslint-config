// @ts-check

import { eslintComments } from './eslint-comments.js'
import { imports, js, jsx, unicorn } from './js.js'
import { jsonc, pkgOrder } from './jsonc.js'
import { typescript } from './typescript.js'
import { unocss } from './unocss.js'
import { markdown } from './markdown.js'
import { yml } from './yml.js'
import { vue } from './vue.js'

import { GLOB_EXCLUDE } from './shared.js'

/**
 * @typedef { import('eslint-define-config').FlatESLintConfigItem } FlatESLintConfigItem
 */

/** @type {FlatESLintConfigItem[]} */
export const basic = [
    // @ts-ignore
    { ignores: GLOB_EXCLUDE },

    ...js,
    ...jsx,
    ...typescript,
    ...imports,
    ...unicorn,
    ...jsonc,
    ...pkgOrder,
    ...yml,
    ...eslintComments,
]

/** @type {FlatESLintConfigItem[]} */
export const all = [
    ...basic,
    ...vue,
    ...unocss,
]

/** @type {(config?: FlatESLintConfigItem | FlatESLintConfigItem[], enables?: Partial<{
 * vue: boolean
 * markdown: boolean
 * unocss: boolean
 * }>) => FlatESLintConfigItem[]} */
export function config(
    config = [],
    {
        vue: enableVue = true,
        markdown: enableMarkdown = true,
        unocss: enableUnocss = false,
    } = {},
) {
    const configs = [...basic]

    if (enableVue !== false)
        configs.push(...vue)

    if (enableMarkdown !== false)
        configs.push(...markdown)

    if (enableUnocss !== false)
        configs.push(...unocss)

    if (Object.keys(config).length > 0)
        configs.push(...(Array.isArray(config) ? config : [config]))

    return configs
}