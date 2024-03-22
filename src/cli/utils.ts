import { execSync } from 'node:child_process'

export function isGitClean() {
    try {
        execSync('git diff-index --quiet HEAD', { stdio: 'ignore' })
        return true
    }
    catch {
        return false
    }
}

export function getEslintConfigContent(
    mainConfig: string,
    additionalConfigs?: string[],
) {
    return `
import config from '@ivanmaxlogiudice/eslint-config'

export default config({
${mainConfig}
}${additionalConfigs?.map(config => `, {\n${config}\n}`)})
`.trimStart()
}
