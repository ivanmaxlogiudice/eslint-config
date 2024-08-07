import { spawn } from 'node:child_process'
import fsp from 'node:fs/promises'
import { join } from 'node:path'
import fs from 'node:fs'

export async function copy(from: string, target: string): Promise<void> {
    const files = await fsp.readdir(from)

    if (!fs.existsSync(target)) {
        await fsp.mkdir(target, { recursive: true })
    }

    for (const file of files) {
        await fsp.copyFile(join(from, file), join(target, file))
    }
}

export async function runESLint(cwd: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const process = spawn('bun', ['x', 'eslint', '.', '--fix'], {
            cwd,
            stdio: 'pipe',
        })

        process.on('error', reject)
        process.on('close', code => code ? reject(code) : resolve())
    })
}
