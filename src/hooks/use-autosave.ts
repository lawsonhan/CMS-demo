import { useCallback, useRef, useState } from "react"
import type { JSONContent } from "@tiptap/react"

interface UseAutosaveOptions {
    /** Delay in milliseconds before autosave triggers (default: 2000) */
    delay?: number
    /** Called when autosave is triggered */
    onSave: (content: JSONContent) => Promise<void>
    /** Called when autosave fails */
    onError?: (error: Error) => void
}

interface UseAutosaveReturn {
    /** Whether autosave is currently in progress */
    isSaving: boolean
    /** Last saved timestamp */
    lastSaved: Date | null
    /** Whether there are unsaved changes */
    hasUnsavedChanges: boolean
    /** Trigger autosave with new content */
    triggerSave: (content: JSONContent) => void
    /** Force immediate save (for manual save button) */
    saveNow: (content: JSONContent) => Promise<void>
    /** Mark content as unchanged (e.g., after publish) */
    markSaved: () => void
}

/**
 * Hook for managing autosave functionality
 * Debounces save calls and tracks save status
 */
export function useAutosave(options: UseAutosaveOptions): UseAutosaveReturn {
    const { delay = 2000, onSave, onError } = options

    const [isSaving, setIsSaving] = useState(false)
    const [lastSaved, setLastSaved] = useState<Date | null>(null)
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const latestContentRef = useRef<JSONContent | null>(null)

    const performSave = useCallback(
        async (content: JSONContent) => {
            setIsSaving(true)
            try {
                await onSave(content)
                setLastSaved(new Date())
                setHasUnsavedChanges(false)
            } catch (err) {
                const error = err instanceof Error ? err : new Error("Save failed")
                onError?.(error)
            } finally {
                setIsSaving(false)
            }
        },
        [onSave, onError]
    )

    const triggerSave = useCallback(
        (content: JSONContent) => {
            latestContentRef.current = content
            setHasUnsavedChanges(true)

            // Clear existing timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }

            // Set new timeout for debounced save
            timeoutRef.current = setTimeout(() => {
                if (latestContentRef.current) {
                    performSave(latestContentRef.current)
                }
            }, delay)
        },
        [delay, performSave]
    )

    const saveNow = useCallback(
        async (content: JSONContent) => {
            // Clear any pending debounced save
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
                timeoutRef.current = null
            }

            latestContentRef.current = content
            await performSave(content)
        },
        [performSave]
    )

    const markSaved = useCallback(() => {
        setHasUnsavedChanges(false)
        setLastSaved(new Date())
    }, [])

    return {
        isSaving,
        lastSaved,
        hasUnsavedChanges,
        triggerSave,
        saveNow,
        markSaved,
    }
}
