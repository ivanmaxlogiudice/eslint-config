# @ivanmaxlogiudice/eslint-config [![npm (scoped with tag)](https://flat.badgen.net/npm/v/@ivanmaxlogiudice/eslint-config)](https://npmjs.com/package/@ivanmaxlogiudice/eslint-config) [![npm](https://flat.badgen.net/npm/dt/@ivanmaxlogiudice/eslint-config)](https://npmjs.com/package/@ivanmaxlogiudice/eslint-config) #

Personal Flat ESLint configuration for Javascript, TypeScript, Vue 2, Vue 3.

based on [@sxzz/eslint-config](https://github.com/sxzz/eslint-config)

## Features
- Single quotes, no semi
- Auto fix for formatting (aimed to be used standalone without Prettier)
- Designed to work with TypeScript, Vue 2 & 3 out-of-box
- Lint also for json, yaml, markdown
- Sorted imports, dangling commas
- Reasonable defaults, best practices, only one-line of config

## Install
```bash
pnpm add -D @ivanmaxlogiudice/eslint-config
```

## Usage
```js
// eslint.config.js
import { all } from '@ivanmaxlogiudice/eslint-config'

export default all
```

### Custom Config

```js
// eslint.config.js
import { config } from '@ivanmaxlogiudice/eslint-config'

export default config(
  [
    /* your custom config */
  ],
  { vue: true, markdown: true }
)
```

### VSCode

```jsonc
{
  "eslint.experimental.useFlatConfig": true
}
```

### VSCode support for auto fix
Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Add the following settings to your `settings.json`:

```jsonc
{
    "prettier.enable": false,
    "editor.formatOnSave": false,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true,
        "source.organizeImports": false,
  
        // The following is optional.
        // It's better to put under project setting `.vscode/settings.json`
        // to avoid conflicts with working with different eslint configs
        // that does not support all formats.
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
            "yaml"
        ]
    }
}
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
pnpm i -D lint-staged simple-git-hooks
```

## License

[MIT](./LICENSE) License © 2022-PRESENT [Iván M. Lo Giudice](https://github.com/ivanmaxlogiudice)