import { useState } from "react"
import type { JSONContent } from "@tiptap/react"
import type { PageData, UpdatePageInput } from "@/lib/page-types"
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { useAutosave } from "@/hooks/use-autosave"
import { AlertCircle, Check } from "lucide-react"

interface PageEditorProps {
    page: PageData
    onSave: (content: JSONContent) => Promise<void>
    onUpdateMetadata: (data: UpdatePageInput) => Promise<void>
    onPublish: (content: JSONContent) => Promise<void>
    onChangeSlug: (newSlug: string) => Promise<{ newSlug: string }>
    onCancel: () => void
}

export function PageEditor({
    page,
    onSave,
    onUpdateMetadata,
    onPublish,
    onChangeSlug,
    onCancel,
}: PageEditorProps) {
    const [content, setContent] = useState<JSONContent>(page.content)
    const [title, setTitle] = useState(page.title)
    const [summary, setSummary] = useState(page.summary || "")
    const [slug, setSlug] = useState(page.slug)
    const [slugError, setSlugError] = useState<string | null>(null)
    const [isSlugSaving, setIsSlugSaving] = useState(false)

    // Autosave setup
    const { isSaving, hasUnsavedChanges, triggerSave, saveNow, markSaved } =
        useAutosave({
            onSave: async (c) => {
                await onSave(c)
            },
            delay: 3000,
        })

    // Handle editor updates
    const handleEditorUpdate = (newContent: JSONContent) => {
        setContent(newContent)
        triggerSave(newContent)
    }

    // Handle manual save (e.g. Cmd+S or button)
    const handleManualSave = async () => {
        await saveNow(content)
    }

    // Handle publish
    const handlePublish = async () => {
        await onPublish(content)
        markSaved()
        onCancel() // Go back to view mode
    }

    // Handle metadata blur (save on blur)
    const handleMetadataBlur = () => {
        if (title !== page.title || summary !== (page.summary || "")) {
            onUpdateMetadata({ title, summary })
        }
    }

    // Validate slug format
    const validateSlug = (value: string): string | null => {
        if (!value) return "Slug is required"
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
            return "Use lowercase letters, numbers, and hyphens only (e.g., 'my-page')"
        }
        return null
    }

    // Handle slug input change
    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase().replace(/\s+/g, "-")
        setSlug(value)
        setSlugError(validateSlug(value))
    }

    // Handle slug save
    const handleSlugSave = async () => {
        if (slug === page.slug) return // No change

        const error = validateSlug(slug)
        if (error) {
            setSlugError(error)
            return
        }

        setIsSlugSaving(true)
        setSlugError(null)

        try {
            await onChangeSlug(slug)
            // Navigation will be handled by parent component
        } catch (err) {
            setSlugError(err instanceof Error ? err.message : "Failed to update slug")
        } finally {
            setIsSlugSaving(false)
        }
    }

    const slugHasChanges = slug !== page.slug

    return (
        <div className="flex min-h-0 flex-1 flex-col">
            <main className="flex min-h-0 flex-1 flex-col rounded-lg bg-background lg:flex-row">
                <section className="flex min-h-0 flex-1 flex-col">
                    <div className="min-h-0 flex-1">
                        <SimpleEditor content={page.content} onUpdate={handleEditorUpdate} />
                    </div>
                </section>

                <Separator orientation="horizontal" className="lg:hidden" />
                <Separator orientation="vertical" className="hidden lg:block" />

                <aside className="flex min-h-0 w-full flex-col lg:sticky lg:top-0 lg:max-h-svh lg:w-[320px] lg:self-start lg:overflow-hidden xl:w-[360px]">
                    <div className="sticky top-0 z-10 border-b bg-background/95 px-4 py-3 backdrop-blur">
                        <div className="flex items-center justify-between gap-3">
                            <div className="space-y-0.5">
                                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                    Editor
                                </p>
                                <div className="flex items-center gap-2">
                                    <h2 className="text-sm font-semibold">Settings</h2>
                                    {isSaving && <span className="text-xs text-muted-foreground animate-pulse">Saving...</span>}
                                    {!isSaving && hasUnsavedChanges && <span className="text-xs text-amber-600">Unsaved</span>}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" onClick={onCancel}>
                                    Cancel
                                </Button>
                                <Button variant="secondary" size="sm" onClick={handleManualSave} disabled={isSaving || !hasUnsavedChanges}>
                                    Save draft
                                </Button>
                                <Button size="sm" onClick={handlePublish}>Publish</Button>
                            </div>
                        </div>
                        <div className="mt-3 space-y-3">
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-muted-foreground">
                                    Title
                                </label>
                                <Input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    onBlur={handleMetadataBlur}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-muted-foreground">
                                    Slug (URL)
                                </label>
                                <div className="flex gap-2">
                                    <Input
                                        value={slug}
                                        onChange={handleSlugChange}
                                        placeholder="my-page-slug"
                                        className={slugError ? "border-destructive" : ""}
                                    />
                                    {slugHasChanges && (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={handleSlugSave}
                                            disabled={isSlugSaving || !!slugError}
                                            className="shrink-0"
                                        >
                                            {isSlugSaving ? "..." : <Check className="h-4 w-4" />}
                                        </Button>
                                    )}
                                </div>
                                {slugError && (
                                    <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                                        <AlertCircle className="h-3 w-3" />
                                        {slugError}
                                    </p>
                                )}
                                {slugHasChanges && !slugError && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Click ✓ to save. URL will change to: /{slug}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-muted-foreground">
                                    Summary
                                </label>
                                <Textarea
                                    rows={3}
                                    placeholder="Short description for listings and previews."
                                    value={summary}
                                    onChange={(e) => setSummary(e.target.value)}
                                    onBlur={handleMetadataBlur}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex min-h-0 flex-1 flex-col p-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold">Version history</h3>
                            <Button variant="ghost" size="sm">
                                View all
                            </Button>
                        </div>
                        <div className="mt-3 min-h-0 flex-1 space-y-2 overflow-auto">
                            {page.versions.map((version) => (
                                <div
                                    key={version.id}
                                    className="rounded-lg border border-border/60 px-3 py-2"
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium">{version.id}</p>
                                        <span className="text-xs text-muted-foreground">
                                            {version.status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {version.label} · {new Date(version.timestamp).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    )
}
