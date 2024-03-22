export interface PromItem<T> {
    label: string
    value: T
    hint?: string
}

export type FrameworkOption = 'vue'

export type ExtraLibrariesOption = 'formatter' | 'unocss'

export interface PromtResult {
    uncommittedConfirmed: boolean
    frameworks: FrameworkOption[]
    extra: ExtraLibrariesOption[]
    updateVscodeSettings: unknown
}
