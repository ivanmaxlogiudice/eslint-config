<div align="center">

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![code style][antfu-src]][antfu-href]

My ESlint configuration, based on `@antfu/eslint-config` with personal customizations. Nicely integrates with Nuxt and provides optional rules for Tailwind.

[Release Notes](/releases)

---

</div>

## 🌟 Features

This is my personal ESlint configuration, based on [`@antfu/eslint-config`](https://github.com/antfu/eslint-config). It only deviates for some minor tweaks and personal preferences, since I agree almost completely with Anthony's style choices.

My own customizations and preferences:

-   Indentation: 4 spaces.
-   (Vue) Set block order to `<template>`, `<script>`, `<style>`.
-   And some other minor tweaks.

## 🛠️ Setup

### Starter Wizard

We provided a CLI tool to help you set up your project, or migrate from the legacy config to the new flat config with one command.

```bash
pnpx @ivanmaxlogiudice/eslint-config@latest
```

### Manual Install

If you prefer to set up manually:

```bash
pnpm add -D @ivanmaxlogiudice/eslint-config
```

And create `eslint.config.js` in your project root:

```js
// eslint.config.js
import config from '@ivanmaxlogiudice/eslint-config'

export default config()
```

### Add script for package.json

```json
{
    "scripts": {
        "lint": "eslint .",
        "lint:fix": "eslint . --fix"
    }
}
```

## 📝 VS Code Support (auto fix on save)

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

Add the following settings to your `.vscode/settings.json`:

```jsonc
{
    // Disable the default formatter, use eslint instead
    "prettier.enable": false,
    "editor.formatOnSave": false,

    // Auto fix
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit",
        "source.organizeImports": "never"
    },

    // Silent the stylistic rules in you IDE, but still auto fix them
    "eslint.rules.customizations": [
        { "rule": "style/*", "severity": "off", "fixable": true },
        { "rule": "format/*", "severity": "off", "fixable": true },
        { "rule": "*-indent", "severity": "off", "fixable": true },
        { "rule": "*-spacing", "severity": "off", "fixable": true },
        { "rule": "*-spaces", "severity": "off", "fixable": true },
        { "rule": "*-order", "severity": "off", "fixable": true },
        { "rule": "*-dangle", "severity": "off", "fixable": true },
        { "rule": "*-newline", "severity": "off", "fixable": true },
        { "rule": "*quotes", "severity": "off", "fixable": true },
        { "rule": "*semi", "severity": "off", "fixable": true }
    ],

    // Enable eslint for all supported languages
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact",
        "vue",
        "html",
        "markdown",
        "json",
        "jsonc",
        "yaml",
        "toml",
        "xml",
        "gql",
        "graphql",
        "astro",
        "css",
        "less",
        "scss",
        "pcss",
        "postcss"
    ]
}
```

For more settings, check the "VS Code support" section in [antfu/eslint-config](https://github.com/antfu/eslint-config#vs-code-support-auto-fix)

### Customization

You can configure each integration individually, for example:

```js
// eslint.config.js
import config from '@ivanmaxlogiudice/eslint-config'

export default config({
// Type of the project. 'lib' for libraries, the default is 'app'
    type: 'lib',

    // Enable stylistic formatting rules
    // stylistic: true,

    // Or customize the stylistic rules
    stylistic: {
        quotes: 'double', // or 'double'
    },

    // TypeScript and Vue are autoetected, you can also explicitly enable them:
    typescript: true,
    vue: true,

    // Disable jsonc and yaml support
    jsonc: false,
    yaml: false,

    // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
    ignores: [
        '**/fixtures',
    // ...globs
    ]
})
```

#### Integrationg with Nuxt

1. Install the ESLint module with `pnpx nuxi module add eslint`, as described in the [official docs](https://eslint.nuxt.com/packages/module)

2. Set it to be "standalone", to prevent conflicting with `@ivanmaxlogiudice/eslint-config`:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
    modules: [
        '@nuxt/eslint',
    ],

    eslint: {
        config: {
            standalone: false, // <-- Important to work correctly
        },
    },
})
```

3. Integrate this config by prepending it to the Nuxt provided one:

```js
// eslint.config.js
import config from '@ivanmaxlogiudice/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
    config({
        // options
    }),
    // ...your other rules
)
```

### Lint Staged

If you want to apply lint and auto-fix before every commit, you can add the following to your `package.json`:

```json
{
    "simple-git-hooks": {
        "pre-commit": "pnpm lint-staged"
    },
    "lint-staged": {
        "*": "eslint --fix"
    }
}
```

and then

```bash
pnpm add -D lint-staged simple-git-hooks
```

## View what rules are enabled

Use [@eslint/config-inspector](https://github.com/eslint/config-inspector) to view what rules are enabled in your project and apply them to what files,

Go to your project root that contains `eslint.config.js` and run:

```bash
pnpx @eslint/config-inspector
```

You can check more customization in [@antfu/eslint-config](https://github.com/antfu/eslint-config?tab=readme-ov-file#customization).

## 📝 License

[MIT](https://github.com/ivanmaxlogiudice/eslint-config/blob/main/LICENSE)

© 2022-present [Iván Máximiliano, Lo Giudice](https://www.ivanmaxlogiudice.it)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@ivanmaxlogiudice/eslint-config/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@ivanmaxlogiudice/eslint-config
[npm-downloads-src]: https://img.shields.io/npm/dm/@ivanmaxlogiudice/eslint-config.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@ivanmaxlogiudice/eslint-config
[bundle-size-src]: https://img.shields.io/bundlephobia/minzip/@ivanmaxlogiudice/eslint-config.svg?style=flat&colorA=18181B&colorB=28CF8D
[bundle-size-href]: https://bundlephobia.com/result?p=@ivanmaxlogiudice/eslint-config
[license-src]: https://img.shields.io/npm/l/@ivanmaxlogiudice/eslint-config.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@ivanmaxlogiudice/eslint-config
[antfu-src]: https://antfu.me/badge-code-style.svg
[antfu-href]: https://github.com/antfu/eslint-config
