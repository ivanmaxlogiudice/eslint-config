export interface PromItem<T> {
    label: string
    value: T
    hint?: string
}

export type FrameworkOption = 'vue'

export type ExtraLibrariesOption = 'unocss'

export interface PromptResult {
    uncommittedConfirmed: boolean
    frameworks: FrameworkOption[]
    extra: ExtraLibrariesOption[]
    updateVscodeSettings: unknown
}
