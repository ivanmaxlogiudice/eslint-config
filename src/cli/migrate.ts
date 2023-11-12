/* eslint-disable no-console */
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import detectIndent from 'detect-indent'
import parse from 'parse-gitignore'
import c from 'picocolors'
import prompts from 'prompts'
import { devDependencies } from '../../package.json'
import { ARROW, CHECK, CROSS, WARN, version, vscodeSettingsString } from './constants'
import { isGitClean, throwError } from './utils'

const SKIP_PROMPT = !!process.env.SKIP_PROMPT
const SKIP_GIT_CHECK = !!process.env.SKIP_GIT_CHECK

export async function migrate() {
    const cwd = process.cwd()

    const pathPackageJSON = path.join(process.cwd(), 'package.json')
    const pathESLintConfig = path.join(process.cwd(), 'eslint.config.js')
    const pathESLintIngore = path.join(process.cwd(), '.eslintignore')

    if (fs.existsSync(pathESLintConfig))
        throwError(WARN, 'eslint.config.js already exists, migration wizard exited.')

    if (!SKIP_GIT_CHECK && !isGitClean())
        throwError(CROSS, 'There are uncommitted changes in the current repository, please commit them and try again.')

    // Update package.json
    console.log(`\n${ARROW} Installing ${c.green('@ivanmaxlogiudice/eslint-config')} to v${c.yellow(version)}.\n`)

    const pkgContent = await fsp.readFile(pathPackageJSON, 'utf-8')
    const pkgIndent = detectIndent(pkgContent).indent || 2
    const pkg: Record<string, any> = JSON.parse(pkgContent)

    pkg.devDependencies ??= {}
    pkg.devDependencies['@ivanmaxlogiudice/eslint-config'] = `^${version}`

    await fsp.writeFile(pathPackageJSON, JSON.stringify(pkg, null, pkgIndent))

    console.log(`${CHECK} Changes wrote to package.json`)

    // Get ESLint Ignores
    const eslintIgnores: string[] = []
    if (fs.existsSync(pathESLintIngore)) {
        console.log(`${ARROW} Migrating existing .eslintignore.`)

        const content = await fsp.readFile(pathESLintIngore, 'utf-8')
        const parsed = parse(content)
        const globs = parsed.globs()

        for (const glob of globs) {
            if (glob.type === 'ignore')
                eslintIgnores.push(...glob.patterns)
            else if (glob.type === 'unignore')
                eslintIgnores.push(...glob.patterns.map((pattern: string) => `!${pattern}`))
        }
    }

    // Create eslint.config.js
    let configContent = `${eslintIgnores.length > 0 ? `ignores: ${JSON.stringify(eslintIgnores)}` : ''}`
    if (pkg.type === 'module') {
        configContent = `
import config from '@ivanmaxlogiudice/eslint-config'

export default config({\n${configContent}\n})
`.trimStart()
    }
    else {
        configContent = `
const config = require('@ivanmaxlogiudice/eslint-config').default

module.exports = config({\n${configContent}\n})
`.trimStart()
    }

    await fsp.writeFile(pathESLintConfig, configContent)
    console.log(`${CHECK} Created ${c.green('eslint.config.js')} successfully.`)

    // List legacy files
    const files = fs.readdirSync(cwd)
    const legacyFiles: string[] = []

    files.forEach((file) => {
        if (file !== 'eslint.config.js' && (file.includes('eslint') || file.includes('prettier')))
            legacyFiles.push(file)
    })

    if (legacyFiles.length > 0) {
        console.log(`\n${WARN} You can now remove those files manually: `)
        console.log(`  ${c.red('-')} ${c.dim(legacyFiles.join(', '))}`)
    }

    // List legacy dependencies
    const dependencies = { ...pkg.devDependencies, ...pkg?.dependencies }
    const legacyDependencies: string[] = []

    Object.keys(dependencies).forEach((dep) => {
        if (dep.includes('prettier'))
            legacyDependencies.push(dep)
    })

    if (legacyDependencies.length > 0) {
        console.log(`\n${WARN} You can now remove those dependencies: `)
        console.log(`  ${c.red('-')} ${c.dim(legacyDependencies.join(', '))}`)
    }

    // Need to update the eslint version?
    const updateESLintVersion = pkg.devDependencies?.eslint
        ? pkg.devDependencies.eslint !== 'latest' && pkg.devDependencies.eslint.match(/\d+/)?.[0] < 8
        : true

    // Update .vscode/settings.json
    let prompResult: prompts.Answers<'updateVscodeSettings' | 'updateESLintVersion'> = {
        updateESLintVersion,
        updateVscodeSettings: true,
    }

    if (!SKIP_PROMPT) {
        console.log()

        try {
            prompResult = await prompts([
                {
                    initial: true,
                    message: 'Update .vscode/settings.json for better VSCode experience?',
                    name: 'updateVscodeSettings',
                    type: 'confirm',
                },
                {
                    initial: true,
                    message: 'Update ESLint to the latest version?',
                    name: 'updateESLintVersion',
                    type: 'confirm',
                },
            ], {
                onCancel() {
                    throw new Error('Cancelled')
                },
            })
        }
        catch (error: any) {
            console.log(error.message)
            return
        }
    }

    if (prompResult.updateVscodeSettings ?? true) {
        const dotVSCodePath = path.join(cwd, '.vscode')
        const settingsPath = path.join(dotVSCodePath, 'settings.json')

        if (!fs.existsSync(dotVSCodePath))
            await fsp.mkdir(dotVSCodePath, { recursive: true })

        if (!fs.existsSync(settingsPath)) {
            await fsp.writeFile(settingsPath, `{${vscodeSettingsString}}\n`)

            console.log(`${CHECK} Created ${c.green('.vscode/settings.json')} successfully.`)
        }
        else {
            let settingsContent = await fsp.readFile(settingsPath, 'utf-8')

            settingsContent = settingsContent.trim().replace(/\s*}$/, '')
            settingsContent += settingsContent.endsWith(',') || settingsContent.endsWith('{') ? '' : ','
            settingsContent += `${vscodeSettingsString}}\n`

            await fsp.writeFile(settingsPath, settingsContent, 'utf-8')
            console.log(`${CHECK} Updated ${c.green('.vscode/settings.json')} successfully.`)
            console.log(`${WARN} You need to check if there is any conflict between duplicate keys.\n`)
        }
    }

    if (prompResult.updateESLintVersion) {
        pkg.devDependencies.eslint = devDependencies.eslint

        await fsp.writeFile(pathPackageJSON, JSON.stringify(pkg, null, pkgIndent))

        console.log(`${CHECK} Updated ${c.green('eslint')} to the version ${c.yellow(devDependencies.eslint)}.\n`)
    }

    // Migration completed
    console.log(`${CHECK} Migration completed!`)
    console.log(`${c.green('-')} Now you can update the dependencies and run ${c.blue('eslint . --fix')}\n`)
}
