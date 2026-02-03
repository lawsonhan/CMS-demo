import { EditorContent, type Editor } from "@tiptap/react"
import type { PageData } from "@/lib/page-types"
import { getSectionMenu } from "@/lib/navigation"
import { cn } from "@/lib/utils"
// We'll need Link from react-router-dom for sidebar navigation
import { Link, useLocation } from "react-router-dom"

interface StandardTemplateProps {
    page: PageData
    editor: Editor | null
}

export function StandardTemplate({ page, editor }: StandardTemplateProps) {
    const location = useLocation()

    // Find the sidebar menu based on current URL
    // We use location.pathname. Ideally page.slug could be used to reconstruct path,
    // but location is more direct for the navigation helper.
    const sectionMenu = getSectionMenu(location.pathname)

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
                                <nav className="p-2">
                                    <ul className="space-y-1">
                                        {sectionMenu.items.map((item, idx) => {
                                            const isActive = location.pathname === item.url ||
                                                location.pathname.endsWith(`/${item.slug}`)

                                            return (
                                                <li key={idx}>
                                                    <Link
                                                        to={item.url || "#"}
                                                        className={cn(
                                                            "block px-4 py-2.5 rounded-md text-sm font-medium transition-colors",
                                                            isActive
                                                                ? "bg-primary text-primary-foreground"
                                                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                                        )}
                                                    >
                                                        {item.title}
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </nav>
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
