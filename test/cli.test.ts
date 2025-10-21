import fs from 'node:fs/promises'
import { join } from 'node:path'
import process from 'node:process'
import { afterAll, beforeEach, expect, it } from 'bun:test'

const CLI_PATH = join(__dirname, '../bin/index.js')
const genPath = join(__dirname, '..', '.temp', randomStr())

function randomStr() {
    return Math.random().toString(36).slice(2)
}

async function run(params: string[] = [], env = {
    SKIP_PROMPT: '1',
    NO_COLOR: '1',
}) {
    const proc = Bun.spawn(['bun', 'run', CLI_PATH, ...params], {
        cwd: genPath,
        env: {
            ...process.env,
            ...env,
        },
        stderr: 'pipe',
        stdout: 'pipe',
    })

    const stdout = await new Response(proc.stdout).text()
    await proc.exited

    return { stdout }
};

async function createMockDir() {
    await fs.rm(genPath, { recursive: true, force: true })
    await fs.mkdir(genPath, { recursive: true })

    await Promise.all([
        Bun.write(join(genPath, 'package.json'), JSON.stringify({}, null, 4)),
        Bun.write(join(genPath, '.eslintrc.yml'), ''),
        Bun.write(join(genPath, '.eslintignore'), 'some-path\nsome-file'),
        Bun.write(join(genPath, '.prettierc'), ''),
        Bun.write(join(genPath, '.prettierignore'), 'some-path\nsome-file'),
    ])
}

beforeEach(async () => await createMockDir())
afterAll(async () => await fs.rm(genPath, { recursive: true, force: true }))

it('package.json updated', async () => {
    const { stdout } = await run()

    const pkgContent = await Bun.file(join(genPath, 'package.json')).text()
    const pkg: Record<string, any> = JSON.parse(pkgContent)

    expect(JSON.stringify(pkg.devDependencies)).toContain('@ivanmaxlogiudice/eslint-config')
    expect(stdout).toContain('Changes wrote to package.json')
})

it('esm eslint.config.js', async () => {
    const pkgContent = await Bun.file('package.json').text()
    await Bun.write(join(genPath, 'package.json'), JSON.stringify({ ...JSON.parse(pkgContent), type: 'module' }, null, 2))

    const { stdout } = await run()

    const eslintConfigContent = await Bun.file(join(genPath, 'eslint.config.js')).text()
    expect(eslintConfigContent.includes('export default')).toBeTruthy()
    expect(stdout).toContain('Created eslint.config.js')
})

it('ignores files added in eslint.config.js', async () => {
    const { stdout } = await run()

    const eslintConfigContent = (await Bun.file(join(genPath, 'eslint.config.mjs')).text()).replaceAll('\\', '/')

    expect(stdout).toContain('Created eslint.config.mjs')
    expect(eslintConfigContent).toMatchInlineSnapshot(`
      "import { config } from '@ivanmaxlogiudice/eslint-config'

      export default config({
          ignores: ["**/some-path","**/some-file"],
      })
      "
    `)
})

it('suggest remove unnecessary files', async () => {
    const { stdout } = await run()

    expect(stdout).toContain('You can now remove those files manually')
    expect(stdout).toContain('.eslintignore, .eslintrc.yml, .prettierc, .prettierignore')
})
