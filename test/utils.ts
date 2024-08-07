import fsp from 'node:fs/promises'
import { join } from 'node:path'
import fs from 'node:fs'

export async function copy(from: string, target: string): Promise<void> {
    const files = await fsp.readdir(from)

    if (!fs.existsSync(target)) {
        await fsp.mkdir(target, { recursive: true })
    }

    await Promise.all(
        files.map(async file => await fsp.copyFile(join(from, file), join(target, file))),
    )
}
