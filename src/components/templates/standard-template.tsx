import { useCallback, useMemo } from "react"
import { EditorContent, type Editor } from "@tiptap/react"
import type { PageData } from "@/lib/page-types"
import { getSectionMenu, normalizePath, type NavItem } from "@/lib/navigation"
import { TreeView, type TreeDataItem } from "@/components/tree-view"
import { useLocation, useNavigate } from "react-router-dom"

interface StandardTemplateProps {
    page: PageData
    editor: Editor | null
}

export function StandardTemplate({ page, editor }: StandardTemplateProps) {
    const location = useLocation()
    const navigate = useNavigate()

    // Find the sidebar menu based on current URL
    // We use location.pathname. Ideally page.slug could be used to reconstruct path,
    // but location is more direct for the navigation helper.
    const sectionMenu = getSectionMenu(location.pathname)
    const selectedId = normalizePath(location.pathname)

    type TreeNavItem = TreeDataItem & { url?: string }

    const buildTreeData = useCallback(
        (items: NavItem[], parentSlugs: string[] = []): TreeNavItem[] =>
            items.map((item) => {
                const slugSegment =
                    item.slug ||
                    item.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
                const nextSlugs = [...parentSlugs, slugSegment]
                const isLeaf = !item.items?.length
                const url = isLeaf ? item.url : undefined
                const id = url ? normalizePath(url) : `node:${nextSlugs.join("/")}`

                return {
                    id,
                    name: item.title,
                    url,
                    children: item.items ? buildTreeData(item.items, nextSlugs) : undefined,
                }
            }),
        []
    )

    const sectionItems = useMemo(() => sectionMenu?.items ?? [], [sectionMenu])

    const treeData = useMemo(
        () => (sectionItems.length ? buildTreeData(sectionItems) : []),
        [buildTreeData, sectionItems]
    )

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            {/* Banner Section */}
            <div className="relative h-[200px] w-full overflow-hidden bg-slate-900">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop")' }}
                />
                <div className="relative container mx-auto h-full flex flex-col justify-center px-4 lg:px-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                        {sectionMenu?.title || page.title}
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 py-12 flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Left Sidebar */}
                    <div className="lg:col-span-1">
                        {sectionMenu && sectionMenu.items && (
                            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                                <div className="bg-primary/5 p-4 border-b border-primary/10">
                                    <h2 className="font-bold text-lg text-primary">{sectionMenu.title}</h2>
                                </div>
                                <div className="p-2">
                                    <TreeView
                                        key={selectedId}
                                        data={treeData}
                                        initialSelectedItemId={selectedId}
                                        onSelectChange={(item) => {
                                            const target = item as TreeNavItem | undefined
                                            if (!target?.url) return
                                            const nextUrl = normalizePath(target.url)
                                            if (nextUrl !== selectedId) {
                                                navigate(target.url)
                                            }
                                        }}
                                        className="p-0"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-xl shadow-sm border p-8 min-h-[500px]">
                            <h2 className="text-2xl font-bold mb-6 pb-4 border-b">{page.title}</h2>

                            <div className="simple-editor-wrapper tiptap-theme !border-none !h-auto !bg-transparent !p-0">
                                <EditorContent editor={editor} className="simple-editor-content" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
