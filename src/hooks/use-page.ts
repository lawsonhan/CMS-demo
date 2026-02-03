import { useCallback, useEffect, useState } from "react"
import type { JSONContent } from "@tiptap/react"
import type { PageData, UpdatePageInput } from "@/lib/page-types"
import {
    getPageBySlug,
    getOrCreatePage,
    updatePage,
    saveDraft,
    publishPage,
    restoreVersion,
    updateSlug,
} from "@/lib/page-storage"

interface UsePageOptions {
    /** If true, auto-create the page if it doesn't exist */
    autoCreate?: boolean
    /** Title to use when auto-creating */
    defaultTitle?: string
}

interface UsePageReturn {
    /** The page data, null if loading or not found */
    page: PageData | null
    /** Loading state */
    isLoading: boolean
    /** Error message if any */
    error: string | null
    /** Whether the page exists */
    exists: boolean
    /** Refetch the page data */
    refetch: () => void
    /** Update page metadata (title, summary) */
    update: (input: UpdatePageInput) => Promise<PageData>
    /** Save content as draft */
    save: (content: JSONContent) => Promise<PageData>
    /** Publish the page */
    publish: (content?: JSONContent) => Promise<PageData>
    /** Restore to a specific version */
    restore: (versionId: string) => Promise<PageData>
    /** Change the page slug (returns new slug for navigation) */
    changeSlug: (newSlug: string) => Promise<{ page: PageData; newSlug: string }>
}

/**
 * Hook to fetch and manage a single page by slug
 */
export function usePage(
    slug: string,
    options: UsePageOptions = {}
): UsePageReturn {
    const { autoCreate = false, defaultTitle } = options

    const [page, setPage] = useState<PageData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchPage = useCallback(() => {
        setIsLoading(true)
        setError(null)

        try {
            if (autoCreate && defaultTitle) {
                const result = getOrCreatePage(slug, defaultTitle)
                setPage(result)
            } else {
                const result = getPageBySlug(slug)
                setPage(result)
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : "Failed to load page"
            setError(message)
            setPage(null)
        } finally {
            setIsLoading(false)
        }
    }, [slug, autoCreate, defaultTitle])

    useEffect(() => {
        fetchPage()
    }, [fetchPage])

    const update = useCallback(
        async (input: UpdatePageInput): Promise<PageData> => {
            try {
                const updated = updatePage(slug, input)
                setPage(updated)
                return updated
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : "Failed to update page"
                setError(message)
                throw err
            }
        },
        [slug]
    )

    const save = useCallback(
        async (content: JSONContent): Promise<PageData> => {
            try {
                const updated = saveDraft(slug, content)
                setPage(updated)
                return updated
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : "Failed to save draft"
                setError(message)
                throw err
            }
        },
        [slug]
    )

    const publishFn = useCallback(
        async (content?: JSONContent): Promise<PageData> => {
            try {
                const updated = publishPage(slug, content)
                setPage(updated)
                return updated
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : "Failed to publish page"
                setError(message)
                throw err
            }
        },
        [slug]
    )

    const restore = useCallback(
        async (versionId: string): Promise<PageData> => {
            try {
                const updated = restoreVersion(slug, versionId)
                setPage(updated)
                return updated
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : "Failed to restore version"
                setError(message)
                throw err
            }
        },
        [slug]
    )

    const changeSlug = useCallback(
        async (newSlug: string): Promise<{ page: PageData; newSlug: string }> => {
            try {
                const updated = updateSlug(slug, newSlug)
                setPage(updated)
                return { page: updated, newSlug: updated.slug }
            } catch (err) {
                const message =
                    err instanceof Error ? err.message : "Failed to change slug"
                setError(message)
                throw err
            }
        },
        [slug]
    )

    return {
        page,
        isLoading,
        error,
        exists: page !== null,
        refetch: fetchPage,
        update,
        save,
        publish: publishFn,
        restore,
        changeSlug,
    }
}
