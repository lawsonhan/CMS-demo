import type { JSONContent } from "@tiptap/react"
import type {
    PageData,
    PageVersion,
    CreatePageInput,
    UpdatePageInput,
} from "./page-types"
import { DEFAULT_CONTENT } from "./page-types"

const STORAGE_KEY = "cms-pages"

/**
 * Generate a unique ID for pages and versions
 */
function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

/**
 * Generate a version ID (e.g., v1.0, v1.1, etc.)
 */
function generateVersionId(versions: PageVersion[]): string {
    if (versions.length === 0) return "v1.0"
    const lastVersion = versions[0]
    const match = lastVersion.id.match(/v(\d+)\.(\d+)/)
    if (match) {
        const major = parseInt(match[1], 10)
        const minor = parseInt(match[2], 10)
        return `v${major}.${minor + 1}`
    }
    return `v1.${versions.length}`
}

/**
 * Get all pages from localStorage
 */
export function getAllPages(): PageData[] {
    try {
        const data = localStorage.getItem(STORAGE_KEY)
        return data ? JSON.parse(data) : []
    } catch (error) {
        console.error("Failed to read pages from storage:", error)
        return []
    }
}

/**
 * Save all pages to localStorage
 */
function saveAllPages(pages: PageData[]): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(pages))
    } catch (error) {
        console.error("Failed to save pages to storage:", error)
        throw new Error("Failed to save pages")
    }
}

/**
 * Get a single page by slug
 */
export function getPageBySlug(slug: string): PageData | null {
    const pages = getAllPages()
    return pages.find((p) => p.slug === slug) || null
}

/**
 * Get a single page by ID
 */
export function getPageById(id: string): PageData | null {
    const pages = getAllPages()
    return pages.find((p) => p.id === id) || null
}

/**
 * Create a new page
 */
export function createPage(input: CreatePageInput): PageData {
    const pages = getAllPages()

    // Check if slug already exists
    if (pages.some((p) => p.slug === input.slug)) {
        throw new Error(`Page with slug "${input.slug}" already exists`)
    }

    const now = new Date().toISOString()

    // Determine content based on slug
    let content = input.content || DEFAULT_CONTENT

    if (!input.content) {
        if (input.slug === "home") {
            content = {
                type: "doc",
                content: [
                    {
                        type: "paragraph",
                        content: [
                            {
                                type: "text",
                                text: "各位家長、各位同學：歡迎來到南元朗官立小學！我們致力建立一個關愛、互助、進取的學習社群..."
                            }
                        ]
                    }
                ]
            }
        } else if (input.slug === "calendar") {
            content = {
                type: "doc",
                content: [
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: "請注意：每月校曆表更新時間為该月首日。如遇颱風或暴雨警告，請留意教育局及學校網頁的最新公佈。" }]
                    }
                ]
            }
        } else if (input.slug === "contact") {
            content = {
                type: "doc",
                content: [
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: "乘搭公共交通工具：可乘搭西鐵線至元朗站，步行約10分鐘..." }]
                    }
                ]
            }
        } else if (input.slug === "mission") {
            content = {
                type: "doc",
                content: [
                    {
                        type: "heading",
                        attrs: { level: 3 },
                        content: [{ type: "text", text: "辦學宗旨" }]
                    },
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: "本校秉承校訓「勤、慎、禮、儉」的精神，為學生提供優質的全人教育。我們致力培養學生在德、智、體、群、美五育方面的均衡發展，啟發學生的潛能，協助他們建立正確的價值觀和積極的人生觀，使他們將來成為對社會有貢獻的良好公民。" }]
                    },
                    {
                        type: "heading",
                        attrs: { level: 3 },
                        content: [{ type: "text", text: "學校願景" }]
                    },
                    {
                        type: "paragraph",
                        content: [{ type: "text", text: "我們期望建立一所充滿關愛、互相尊重、乐於學習的校園。教師專業進修，追求卓越；家長與學校緊密合作，共同培育幼苗；學生愉快學習，盡展所長。" }]
                    }
                ]
            }
        }
    }

    const newPage: PageData = {
        id: generateId(),
        slug: input.slug,
        title: input.title,
        summary: input.summary,
        content,
        status: "draft",
        versions: [
            {
                id: "v1.0",
                label: "初始版本",
                timestamp: Date.now(),
                status: "draft",
                content,
            },
        ],
        createdAt: now,
        updatedAt: now,
    }

    pages.push(newPage)
    saveAllPages(pages)

    return newPage
}

/**
 * Update an existing page
 */
export function updatePage(slug: string, input: UpdatePageInput): PageData {
    const pages = getAllPages()
    const index = pages.findIndex((p) => p.slug === slug)

    if (index === -1) {
        throw new Error(`Page with slug "${slug}" not found`)
    }

    const existingPage = pages[index]
    const now = new Date().toISOString()

    // Create a new version if content or status changed
    let newVersions = [...existingPage.versions]
    if (input.content || input.status) {
        const newVersion: PageVersion = {
            id: generateVersionId(existingPage.versions),
            label: input.status === "published" ? "已發佈" : "已保存",
            timestamp: Date.now(),
            status: input.status || existingPage.status,
            content: input.content || existingPage.content,
        }
        newVersions = [newVersion, ...existingPage.versions].slice(0, 20) // Keep last 20 versions
    }

    const updatedPage: PageData = {
        ...existingPage,
        title: input.title ?? existingPage.title,
        summary: input.summary ?? existingPage.summary,
        content: input.content ?? existingPage.content,
        status: input.status ?? existingPage.status,
        versions: newVersions,
        updatedAt: now,
    }

    pages[index] = updatedPage
    saveAllPages(pages)

    return updatedPage
}

/**
 * Save page as draft (autosave)
 */
export function saveDraft(slug: string, content: JSONContent): PageData {
    return updatePage(slug, { content, status: "draft" })
}

/**
 * Publish a page
 */
export function publishPage(slug: string, content?: JSONContent): PageData {
    const input: UpdatePageInput = { status: "published" }
    if (content) {
        input.content = content
    }
    return updatePage(slug, input)
}

/**
 * Delete a page
 */
export function deletePage(slug: string): void {
    const pages = getAllPages()
    const filtered = pages.filter((p) => p.slug !== slug)

    if (filtered.length === pages.length) {
        throw new Error(`Page with slug "${slug}" not found`)
    }

    saveAllPages(filtered)
}

/**
 * Restore a page to a specific version
 */
export function restoreVersion(slug: string, versionId: string): PageData {
    const pages = getAllPages()
    const page = pages.find((p) => p.slug === slug)

    if (!page) {
        throw new Error(`Page with slug "${slug}" not found`)
    }

    const version = page.versions.find((v) => v.id === versionId)
    if (!version) {
        throw new Error(`Version "${versionId}" not found`)
    }

    return updatePage(slug, { content: version.content })
}

/**
 * Update a page's slug
 * Returns the updated page with the new slug
 */
export function updateSlug(oldSlug: string, newSlug: string): PageData {
    // Validate new slug format
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    if (!slugRegex.test(newSlug)) {
        throw new Error("Slug must be lowercase letters, numbers, and hyphens only (e.g., 'my-page-slug')")
    }

    const pages = getAllPages()
    const index = pages.findIndex((p) => p.slug === oldSlug)

    if (index === -1) {
        throw new Error(`Page with slug "${oldSlug}" not found`)
    }

    // Check if new slug already exists (and it's not the same page)
    if (pages.some((p) => p.slug === newSlug && p.id !== pages[index].id)) {
        throw new Error(`Page with slug "${newSlug}" already exists`)
    }

    const now = new Date().toISOString()
    const updatedPage: PageData = {
        ...pages[index],
        slug: newSlug,
        updatedAt: now,
    }

    pages[index] = updatedPage
    saveAllPages(pages)

    return updatedPage
}

/**
 * Get or create a page by slug
 * If the page doesn't exist, create it with the given title
 */
export function getOrCreatePage(slug: string, title: string): PageData {
    const existing = getPageBySlug(slug)
    if (existing) {
        return existing
    }
    return createPage({ slug, title })
}
