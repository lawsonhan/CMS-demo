
import { EditorContent, useEditor } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import { Image } from "@tiptap/extension-image"
import { TaskItem, TaskList } from "@tiptap/extension-list"
import { TextAlign } from "@tiptap/extension-text-align"
import { Typography } from "@tiptap/extension-typography"
import { Highlight } from "@tiptap/extension-highlight"
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"


import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension"
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension"

// Styles
import "@/components/tiptap-templates/simple/simple-editor.scss"
import type { PageData } from "@/lib/page-types"

// Templates
import { HomeTemplate } from "@/components/templates/home-template"
import { CalendarTemplate } from "@/components/templates/calendar-template"
import { ContactTemplate } from "@/components/templates/contact-template"

import { StandardTemplate } from "@/components/templates/standard-template"

interface PageViewProps {
    page: PageData
    onEdit?: () => void
}

export function PageView({ page }: PageViewProps) {
    const editor = useEditor({
        editable: false, // Read-only mode
        content: page.content,
        extensions: [
            StarterKit.configure({
                horizontalRule: false,
                link: {
                    openOnClick: true, // Allow clicking links in view mode
                    enableClickSelection: false,
                },
            }),
            HorizontalRule,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            TaskList,
            TaskItem.configure({ nested: true }),
            Highlight.configure({ multicolor: true }),
            Image,
            Typography,
            Superscript,
            Subscript,
            // Selection, // Not strictly needed for read-only but harmless
            ImageUploadNode, // Use the node view for consistency
        ],
        editorProps: {
            attributes: {
                class: "simple-editor-content", // Re-use the editor styles
            },
        },
    }, [page.content]) // Re-create editor when content changes

    // Template Selection Logic
    if (page.slug === 'home' || page.slug === '') {
        return <HomeTemplate editor={editor} />
    }

    if (page.slug === 'calendar') {
        return <CalendarTemplate page={page} editor={editor} />
    }

    if (page.slug === 'contact') {
        return <ContactTemplate page={page} editor={editor} />
    }

    // Skipped categories (use default for now, or standard if desired, but user said skip)
    // "school-booklet", "activity-photos", "announcements"
    const skippedSlugs = ["school-booklet", "activity-photos", "announcements"]
    if (skippedSlugs.includes(page.slug)) {
        // Fallback to simple view or minimal template
        if (!editor) return null
        return (
            <div className="flex min-h-0 flex-1 flex-col bg-background">
                <div className="flex-1 overflow-auto">
                    <div className="container max-w-4xl mx-auto px-4 py-8 lg:px-8 lg:py-12">
                        <div className="simple-editor-wrapper tiptap-theme !border-none !h-auto">
                            <EditorContent editor={editor} className="simple-editor-content" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Default to Standard Template for all other pages (sub-menus)
    return <StandardTemplate page={page} editor={editor} />
}
