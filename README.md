# @ivanmaxlogiudice/eslint-config

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

## 🌟 Features

- Auto fix for formatting (aimed to be used standalone **without** Prettier).
- Reasonable defaults, best practices, only one line of config.
- Designed to work with TypeScript, Vue, JSON, YAML, Markdown, etc. Out-of-box.
- Sort imports, `package.json`, `tsconfig.json`...
- Ignores common files like `dist`, `node_modules`, `coverage`, and files in `.gitignore`.
- **Style principle**: Minimal for reading, stable for diff, consistent
  - Sorted imports, dangling commas
  - Single quotes, no semi
  - Indentation 4 spaces.
  - Using [ESLint Stylistic](https://github.com/eslint-stylistic/eslint-stylistic)

## 🛠️ Install

### Starter Wizard

```bash
bunx @ivanmaxlogiudice/eslint-config@latest
```

### Manual instalation

```bash
bun add -D eslint @ivanmaxlogiudice/eslint-config
```

And create `eslint.config.mjs` in your project root:

```js
// eslint.config.js
import config from '@ivanmaxlogiudice/eslint-config'

export default config()
```

## Thanks

**Based on：**
- [Antfu's eslint-config](https://github.com/antfu/eslint-config)
- [Sxzz's eslint-config](https://github.com/sxzz/eslint-config)

## License

[MIT](./LICENSE) License © 2022-PRESENT [Iván Máximiliano, Lo Giudice](https://github.com/ivanmaxlogiudice)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@ivanmaxlogiudice/eslint-config?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/@ivanmaxlogiudice/eslint-config
[npm-downloads-src]: https://img.shields.io/npm/dm/@ivanmaxlogiudice/eslint-config?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/@ivanmaxlogiudice/eslint-config
[license-src]: https://img.shields.io/github/license/ivanmaxlogiudice/eslint-config.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/ivanmaxlogiudice/eslint-config/blob/main/LICENSE
