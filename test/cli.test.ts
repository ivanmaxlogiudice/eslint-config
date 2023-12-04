import { join } from 'node:path'
import process from 'node:process'
import { execa } from 'execa'
import fs from 'fs-extra'
import { afterAll, beforeEach, expect, it } from 'vitest'
import { devDependencies } from '../package.json'

const CLI_PATH = join(__dirname, '../bin/index.js')
const genPath = join(__dirname, '..', '.temp')

function run(env = {
    SKIP_PROMPT: '1',
    SKIP_GIT_CHECK: '1',
}) {
    return execa(`node`, [CLI_PATH], {
        cwd: genPath,
        env: {
            ...process.env,
            NO_COLOR: '1',
            ...env,
        },
    })
};

async function createMockDir() {
    await fs.rm(genPath, { recursive: true, force: true })
    await fs.ensureDir(genPath)

    await Promise.all([
        fs.writeFile(join(genPath, 'package.json'), JSON.stringify({ devDependencies: { prettier: 'latest' } }, null, 2)),
        fs.writeFile(join(genPath, '.eslintrc.yml'), ''),
        fs.writeFile(join(genPath, '.eslintignore'), 'some-path\nsome-file'),
        fs.writeFile(join(genPath, '.prettierc'), ''),
        fs.writeFile(join(genPath, '.prettierignore'), 'some-path\nsome-file'),
    ])
};

beforeEach(async () => await createMockDir())
afterAll(async () => await fs.rm(genPath, { force: true, recursive: true }))

it('package.json updated', async () => {
    const { stdout } = await run()

    const pkgContent: Record<string, any> = await fs.readJSON(join(genPath, 'package.json'))

    expect(JSON.stringify(pkgContent.devDependencies)).toContain('@ivanmaxlogiudice/eslint-config')
    expect(stdout).toContain('Changes wrote to package.json')
})

it('update eslint version (dependencies)', async () => {
    let pkgContent: Record<string, any> = await fs.readJSON(join(genPath, 'package.json'))
    await fs.writeFile(join(genPath, 'package.json'), JSON.stringify({ ...pkgContent, dependencies: { eslint: '7.32.0' } }, null, 2))

    const { stdout } = await run()

    pkgContent = await fs.readJSON(join(genPath, 'package.json'))

    expect(pkgContent.dependencies.eslint).toBe(devDependencies.eslint)
    expect(stdout).toContain(`Updated eslint to the version ${devDependencies.eslint}`)
})

it('update eslint version (devDependencies)', async () => {
    let pkgContent: Record<string, any> = await fs.readJSON(join(genPath, 'package.json'))
    await fs.writeFile(join(genPath, 'package.json'), JSON.stringify({ ...pkgContent, devDependencies: { eslint: '7.32.0' } }, null, 2))

    const { stdout } = await run()

    pkgContent = await fs.readJSON(join(genPath, 'package.json'))

    expect(pkgContent.devDependencies.eslint).toBe(devDependencies.eslint)
    expect(stdout).toContain(`Updated eslint to the version ${devDependencies.eslint}`)
})

it('esm eslint.config.js', async () => {
    const pkgContent = await fs.readFile('package.json', 'utf-8')
    await fs.writeFile(join(genPath, 'package.json'), JSON.stringify({ ...JSON.parse(pkgContent), type: 'module' }, null, 2))

    const { stdout } = await run()

    const eslintConfigContent = await fs.readFile(join(genPath, 'eslint.config.js'), 'utf-8')
    expect(eslintConfigContent.includes('export default')).toBeTruthy()
    expect(stdout).toContain('Created eslint.config.js successfully.')
})

it('cjs eslint.config.js', async () => {
    const { stdout } = await run()

    const eslintConfigContent = await fs.readFile(join(genPath, 'eslint.config.js'), 'utf-8')
    expect(eslintConfigContent.includes('module.exports')).toBeTruthy()
    expect(stdout).toContain('Created eslint.config.js successfully.')
})

it('ignores files added in eslint.config.js', async () => {
    const { stdout } = await run()

    const eslintConfigContent = (await fs.readFile(join(genPath, 'eslint.config.js'), 'utf-8')).replaceAll('\\', '/')

    expect(stdout).toContain('Created eslint.config.js successfully.')
    expect(eslintConfigContent).toMatchInlineSnapshot(`
      "const config = require('@ivanmaxlogiudice/eslint-config').default

      module.exports = config({
      ignores: ["some-path","**/some-path/**","some-file","**/some-file/**"]
      })
      "
    `)
})

it('suggest remove unnecessary files', async () => {
    const { stdout } = await run()

    expect(stdout).toContain('You can now remove those files manually:')
    expect(stdout).toContain('- .eslintignore, .eslintrc.yml, .prettierc, .prettierignore')
})

it('suggest remove unnecessary dependencies', async () => {
    const { stdout } = await run()

    expect(stdout).toContain('You can now remove those dependencies:')
    expect(stdout).toContain('- prettier')
})
