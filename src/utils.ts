import path from 'node:path'
import fs from 'node:fs'
import process from 'node:process'
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

export function packageExists(name: string): boolean {
    if (!cachePkg) {
        const pkgPath = path.join(process.cwd(), 'package.json')

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

    // TODO: In vscode windows, "@clack/prompts" doesnt works, check for another one.
    throw new Error(`${missingPackages.length === 1 ? 'Package is' : 'Packages are'} required for this config: ${missingPackages.join(', ')}. Do you want to install them?`)
}

export async function interopDefault<T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> {
    const resolved = await m
    return (resolved as any).default || resolved
}

export function isInEditorEnv(): boolean {
    return !!((process.env.VSCODE_PID || process.env.VSCODE_CWD || process.env.JETBRAINS_IDE || process.env.VIM || process.env.NVIM) && !process.env.CI)
}
