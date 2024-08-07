import path from 'node:path'
import fs from 'node:fs'
import process from 'node:process'
import { type SpawnOptionsWithoutStdio, spawn } from 'node:child_process'
import type { Linter } from 'eslint'
import type { Awaitable } from './types'

let cachePkg: undefined | Record<string, any>

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

export function clearPackageCache(): void {
    cachePkg = undefined
}

export function hasSomePackage(names: string[]): boolean {
    return names.some(name => packageExists(name))
}

export function findPackageJson(depth: number = 3): string | null {
    let currentPath = process.cwd()
    for (let i = 0; i <= depth; i++) {
        const pkgPath = path.join(currentPath, 'package.json')
        if (fs.existsSync(pkgPath)) {
            return pkgPath
        }

        currentPath = path.resolve(currentPath, '..')
    }

    return null
}

export function packageExists(name: string): boolean {
    if (!cachePkg) {
        const pkgPath = findPackageJson()
        if (!pkgPath) {
            throw new Error('Can not found "package.json".')
        }

        const pkgContent = fs.readFileSync(pkgPath, 'utf-8')
        cachePkg = JSON.parse(pkgContent)
    }

    return cachePkg?.dependencies?.[name] !== undefined || cachePkg?.devDependencies?.[name] !== undefined
}

export async function ensurePackages(packages: string[]): Promise<void> {
    if (process.env.CI || process.stdout.isTTY === false)
        return

    const missingPackages = packages.filter(i => i && !packageExists(i)) as string[]
    if (missingPackages.length === 0)
        return

    await asyncSpawn('bun', ['add', '-D', ...missingPackages], {
        stdio: 'pipe',
    })
}

export async function interopDefault<T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> {
    const resolved = await m
    return (resolved as any).default || resolved
}

export function isInEditorEnv(): boolean {
    return !!((process.env.VSCODE_PID || process.env.VSCODE_CWD || process.env.JETBRAINS_IDE || process.env.VIM || process.env.NVIM) && !process.env.CI)
}

export async function asyncSpawn(command: string, args?: readonly string[], options?: SpawnOptionsWithoutStdio): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const process = spawn(command, args, options)

        process.on('close', (code) => {
            if (code) {
                reject(new Error(`${command} failed\nError: ${code}`))
            }
            else {
                resolve()
            }
        })
    })
}
