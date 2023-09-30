import { type FlatGitignoreOptions } from 'eslint-config-flat-gitignore'
import { type FlatESLintConfigItem as BaseFlatESLintConfigItem } from 'eslint-define-config'
import { type ParserOptions } from '@typescript-eslint/parser'

/**
 * Flat ESLint Configuration.
 *
 * @see [Configuration Files (New)](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new)
 */
export interface FlatESLintConfigItem extends BaseFlatESLintConfigItem {
    /**
     * The name of the configuration object.
     */
    name?: string
}

export interface OptionsComponentExts {
    /**
     * Additional extensions for components.
     *
     * @example ['vue']
     * @default []
     */
    componentExts?: string[]
}

export interface OptionsTypeScriptParserOptions {
    /**
     * Additional parser options for TypeScript.
     */
    parserOptions?: Partial<ParserOptions>
}

export interface OptionsTypeScriptWithTypes {
    /**
     * When this options is provided, type aware rules will be enabled.
     * @see https://typescript-eslint.io/linting/typed-linting/
     */
    tsconfigPath?: string
}

export interface OptionsHasTypeScript {
    typescript?: boolean
}

export interface OptionsStylistic {
    stylistic?: boolean
}

export interface OptionsOverrides {
    overrides?: FlatESLintConfigItem['rules']
}

export interface OptionsIsInEditor {
    isInEditor?: boolean
}

export interface OptionsConfig extends OptionsComponentExts {
    /**
     * Enable gitignore support.
     *
     * Passing an object to configure the options.
     *
     * @see https://github.com/antfu/eslint-config-flat-gitignore
     * @default true
     */
    gitignore?: boolean | FlatGitignoreOptions

    /**
     * Enable TypeScript support.
     *
     * Passing an object to enable TypeScript Language Server support.
     *
     * @default auto-detect based on the dependencies
     */
    typescript?: boolean | OptionsTypeScriptWithTypes

    /**
     * Enable test support.
     *
     * @default true
     */
    test?: boolean

    /**
     * Enable Vue support.
     *
     * @default auto-detect based on the dependencies
     */
    vue?: boolean

    /**
     * Enable JSONC support.
     *
     * @default true
     */
    jsonc?: boolean

    /**
     * Enable YAML support.
     *
     * @default true
     */
    yaml?: boolean

    /**
     * Enable Markdown support.
     *
     * @default true
     */
    markdown?: boolean

    /**
     * Enable stylistic rules.
     *
     * @default true
     */
    stylistic?: boolean

    /**
     * Enable unocss rules.
     *
     * @default auto-detect based on the dependencies
     */
    unocss?: boolean

    /**
     * Control to disable some rules in editors.
     * @default auto-detect based on the process.env
     */
    isInEditor?: boolean

    /**
     * Provide overrides for rules for each integration.
     */
    overrides?: {
        comments?: FlatESLintConfigItem['rules']
        imports?: FlatESLintConfigItem['rules']
        javascript?: FlatESLintConfigItem['rules']
        jsonc?: FlatESLintConfigItem['rules']
        markdown?: FlatESLintConfigItem['rules']
        node?: FlatESLintConfigItem['rules']
        sort?: FlatESLintConfigItem['rules']
        stylistic?: FlatESLintConfigItem['rules']
        test?: FlatESLintConfigItem['rules']
        typescript?: FlatESLintConfigItem['rules']
        typescriptWithTypes?: FlatESLintConfigItem['rules']
        unicorn?: FlatESLintConfigItem['rules']
        unocss?: FlatESLintConfigItem['rules']
        vue?: FlatESLintConfigItem['rules']
        yaml?: FlatESLintConfigItem['rules']
    }
}
