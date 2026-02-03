import type { JSONContent } from "@tiptap/react"

/**
 * Represents the status of a page
 */
export type PageStatus = "draft" | "published"

/**
 * Represents a version entry in the page history
 */
export interface PageVersion {
    id: string
    label: string
    timestamp: number
    status: PageStatus
    content: JSONContent
}

/**
 * Core page data model
 */
export interface PageData {
    /** Unique identifier for the page */
    id: string
    /** URL-friendly slug derived from navigation path */
    slug: string
    /** Display title of the page */
    title: string
    /** Optional short description for listings and previews */
    summary?: string
    /** The page content in Tiptap JSON format */
    content: JSONContent
    /** Current status of the page */
    status: PageStatus
    /** Version history of the page */
    versions: PageVersion[]
    /** ISO timestamp of creation */
    createdAt: string
    /** ISO timestamp of last update */
    updatedAt: string
}

/**
 * Input for creating a new page
 */
export interface CreatePageInput {
    slug: string
    title: string
    summary?: string
    content?: JSONContent
}

/**
 * Input for updating an existing page
 */
export interface UpdatePageInput {
    title?: string
    summary?: string
    content?: JSONContent
    status?: PageStatus
}

/**
 * Default empty document for new pages
 */
export const DEFAULT_CONTENT: JSONContent = {
    type: "doc",
    content: [
        {
            type: "heading",
            attrs: { textAlign: null, level: 1 },
            content: [{ type: "text", text: "新頁面" }],
        },
        {
            type: "paragraph",
            attrs: { textAlign: null },
            content: [{ type: "text", text: "在此開始編輯內容..." }],
        },
    ],
}
