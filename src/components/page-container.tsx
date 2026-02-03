import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { usePage } from "@/hooks/use-page"
import { PageView } from "@/components/page-view"
import { PageEditor } from "@/components/page-editor"
import { CMSHeader } from "@/components/cms-header"

import { Edit, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PageContainerProps {
    pageTitle: string
}

export function PageContainer({ pageTitle }: PageContainerProps) {
    const { pathname } = useLocation()
    const navigate = useNavigate()

    // Derive slug from pathname
    // 1. Root -> 'home'
    // 2. /calendar -> 'calendar'
    // 3. /contact -> 'contact'
    // 4. /pages/xxx -> 'xxx'
    // 5. /xxx -> 'xxx' (fallback)
    let slug = pathname === "/" ? "home" : pathname.replace(/^\/pages\//, "").replace(/^\//, "")
    // Ensure no empty string if something weird happens, fallback to home
    if (!slug) slug = "home"

    // Logic to determine if we are in "edit" mode via URL (optional)
    // For now, we prefer state-based toggle, but could support /edit suffix later.
    const [isEditing, setIsEditing] = useState(false)

    const { page, isLoading, error, update, save, publish, changeSlug } = usePage(slug, {
        autoCreate: true,
        defaultTitle: pageTitle,
    })

    // Reset editing state when slug changes (navigating to another page)
    useEffect(() => {
        setIsEditing(false)
    }, [slug])

    // Handle slug change with navigation
    const handleChangeSlug = async (newSlug: string): Promise<{ newSlug: string }> => {
        const result = await changeSlug(newSlug)
        // Navigate to the new URL
        // Determine the base path (if current path starts with /pages, keep that structure)
        const basePath = pathname.startsWith("/pages") ? "/pages" : ""
        const newPath = basePath ? `${basePath}/${result.newSlug}` : `/${result.newSlug}`
        navigate(newPath, { replace: true })
        return { newSlug: result.newSlug }
    }

    if (isLoading) {
        return (
            <div className="flex flex-col h-full w-full">
                <CMSHeader actions={null} />
                <div className="flex flex-1 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            </div>
        )
    }

    if (error || !page) {
        return (
            <div className="flex flex-col h-full w-full">
                <CMSHeader actions={null} />
                <div className="flex flex-1 flex-col items-center justify-center gap-4">
                    <p className="text-destructive font-medium">Error loading page</p>
                    <p className="text-muted-foreground text-sm">{error || "Page not found"}</p>
                    <Button variant="outline" onClick={() => window.location.reload()}>Retry</Button>
                </div>
            </div>
        )
    }

    if (isEditing) {
        return (
            <div className="flex flex-col h-full w-full bg-background overflow-hidden relative">
                {/* 
                 In editing mode, PageEditor has its own layout structure (sidebar etc).
                 But we want to keep the top global header.
                */}
                <CMSHeader actions={
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">Editing: {page.title}</span>
                    </div>
                } />
                <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
                    <PageEditor
                        page={page}
                        onSave={async (content) => { await save(content) }}
                        onUpdateMetadata={async (data) => { await update(data) }}
                        onPublish={async (content) => { await publish(content); setIsEditing(false) }}
                        onChangeSlug={handleChangeSlug}
                        onCancel={() => setIsEditing(false)}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full w-full bg-background">
            <CMSHeader actions={
                <>
                    {page.status === 'draft' && (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 border border-amber-200">
                            Draft
                        </span>
                    )}
                    <Button onClick={() => setIsEditing(true)} size="sm" className="gap-2 h-8">
                        <Edit className="h-3.5 w-3.5" />
                        Edit Page
                    </Button>
                </>
            } />
            <div className="flex-1 overflow-auto">
                <PageView
                    page={page}
                    onEdit={() => setIsEditing(true)}
                />
            </div>
        </div>
    )
}
