/* eslint-disable no-console */
import { Buffer } from 'node:buffer'
import { spawn, type SpawnOptionsWithoutStdio } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { isPackageExists } from 'local-pkg'
import type { Linter } from 'eslint'
import type { Awaitable } from './types'

const scopeUrl = fileURLToPath(new URL('.', import.meta.url))
const isCwdInScope = isPackageExists('@ivanmaxlogiudice/eslint-config')

/**
 * Combine array and non-array configs into a single array.
 */
export async function combine(...configs: Awaitable<Linter.Config | Linter.Config[]>[]): Promise<Linter.Config[]> {
    const resolved = await Promise.all(configs)
    return resolved.flat()
}

export function renameRules(rules: Record<string, any>, from: string, to: string): Record<string, any> {
    const renamed: Record<string, any> = {}
    for (const rule in rules) {
        if (rule.startsWith(from)) {
            renamed[`${to}${rule.slice(from.length)}`] = rules[rule]
            continue
        }

        renamed[rule] = rules[rule]
    }

    return renamed
}

export function hasSomePackage(names: string[]): boolean {
    return names.some(name => isPackageInScope(name))
}

export function isPackageInScope(name: string): boolean {
    return isPackageExists(name, { paths: [scopeUrl] })
}

export function findUp(file: string, cwd = process.cwd(), depth: number = 3): string | null {
    let currentPath = cwd
    for (let i = 0; i <= depth; i++) {
        const pkgPath = path.join(currentPath, file)
        if (fs.existsSync(pkgPath)) {
            return pkgPath
        }

        currentPath = path.resolve(currentPath, '..')
    }

    return null
}

export async function ensurePackages(packages: string[]): Promise<void> {
    if (process.env.CI || process.stdout.isTTY === false || isCwdInScope === false)
        return

    const missingPackages = packages.filter(i => i && !isPackageInScope(i)) as string[]
    if (missingPackages.length === 0)
        return

    console.log(`\n⚠️ Installing the required ${missingPackages.length === 1 ? 'package' : 'packages'} for this config: ${missingPackages.join(', ')}.`)

    await import('@antfu/install-pkg')
        .then(i => i.installPackage(missingPackages, { dev: true }))
        .then(() => console.log(`✅ ${missingPackages.length === 1 ? 'Package' : 'Packages'} installed successfully.\n`))
}

export async function interopDefault<T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> {
    const resolved = await m
    return (resolved as any).default || resolved
}

export function isInEditorEnv(): boolean {
    if (process.env.CI)
        return false

    if (isInGitHooksOrLintStaged())
        return false

    return !!(false
        || process.env.VSCODE_PID
        || process.env.VSCODE_CWD
        || process.env.JETBRAINS_IDE
        || process.env.VIM
        || process.env.NVIM
    )
}

export function isInGitHooksOrLintStaged(): boolean {
    return !!(false
        || process.env.GIT_PARAMS
        || process.env.VSCODE_GIT_COMMAND
        || process.env.npm_lifecycle_script?.startsWith('lint-staged')
    )
}

export async function spawnAsync(command: string, args?: readonly string[], options?: SpawnOptionsWithoutStdio): Promise<{ stdout: string, stderr: string }> {
    return new Promise((resolve, reject) => {
        const proc = spawn(command, args, {
            ...options,
            shell: process.platform === 'win32',
            stdio: 'pipe',
        })

        const stderr: Buffer[] = []
        const stdout: Buffer[] = []
        proc.stderr.on('data', chunk => stderr.push(chunk))
        proc.stdout.on('data', chunk => stdout.push(chunk))

        proc.on('error', () => reject(new Error(`${command} exited with code -1: ${stderr}`)))
        proc.on('close', code => code
            ? reject(new Error(`${command} exited with code ${code}: ${stderr}`))
            : resolve({
                stderr: Buffer.concat(stderr).toString(),
                stdout: Buffer.concat(stdout).toString(),
            }))
    })
}
