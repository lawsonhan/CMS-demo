import { EditorContent, type Editor } from "@tiptap/react"
import type { PageData } from "@/lib/page-types"
import { Book, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SchoolBookletTemplateProps {
    page: PageData
    editor: Editor | null
}

export function SchoolBookletTemplate({ page, editor }: SchoolBookletTemplateProps) {
    // Other logic removed as not strictly needed for this visual template without sidebar

    // Mock data for booklets
    const booklets = [
        {
            id: 1,
            title: "2024-2025 學校概覽",
            date: "2024-09-01",
            coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
            description: "本年度學校發展重點、課程特色及學生活動概覽。",
        },
        {
            id: 2,
            title: "入學指南 2025",
            date: "2024-11-15",
            coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
            description: "小一入學申請詳情、面試安排及學校資訊。",
        },
        {
            id: 3,
            title: "學生作品集 - 視藝篇",
            date: "2024-06-30",
            coverImage: "https://images.unsplash.com/photo-1603380353725-f8a4916974e9?q=80&w=800&auto=format&fit=crop",
            description: "展示本校學生優秀的視覺藝術作品。",
        },
        {
            id: 4,
            title: "校園生活剪影 - 第一期",
            date: "2023-12-20",
            coverImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
            description: "回顧上學期的精彩校園生活點滴。",
        },
    ]

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            {/* Banner Section - Reused design */}
            <div className="relative h-[250px] w-full overflow-hidden bg-slate-900">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 transform scale-105"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2673&auto=format&fit=crop")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="relative container mx-auto h-full flex flex-col justify-end pb-12 px-4 lg:px-8">
                    <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2">
                        {page.title}
                    </h1>
                    <p className="text-slate-300 text-lg max-w-2xl">
                        瀏覽我們的電子刊物，深入了解學校的最新動態與發展。
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 py-12 flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Left Sidebar (Optional, if this page has sub-navigation, currently quickLinks main items don't usually have children but we keep the structure consistent) */}
                    <div className="lg:col-span-1 hidden lg:block">
                        {/* If no sub-menu, we can show a summary or quick filters */}
                        <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-24">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <Book className="h-5 w-5 text-primary" />
                                刊物分類
                            </h3>
                            <ul className="space-y-2">
                                <li className="text-primary font-medium cursor-pointer hover:underline">全部刊物</li>
                                <li className="text-slate-600 cursor-pointer hover:text-slate-900 hover:underline">學校概覽</li>
                                <li className="text-slate-600 cursor-pointer hover:text-slate-900 hover:underline">入學資訊</li>
                                <li className="text-slate-600 cursor-pointer hover:text-slate-900 hover:underline">學生作品</li>
                                <li className="text-slate-600 cursor-pointer hover:text-slate-900 hover:underline">校園通訊</li>
                            </ul>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Editor Content for Intro Text (if any) */}
                        <div className="mb-8 bg-white rounded-xl shadow-sm border p-6">
                            <EditorContent editor={editor} className="simple-editor-content" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {booklets.map((book) => (
                                <div key={book.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border flex flex-col">
                                    <div className="relative h-48 overflow-hidden bg-slate-100">
                                        <img
                                            src={book.coverImage}
                                            alt={book.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="text-xs text-slate-500 mb-2 font-medium bg-slate-100 w-fit px-2 py-1 rounded">
                                            發布日期: {book.date}
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                                            {book.title}
                                        </h3>
                                        <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-1">
                                            {book.description}
                                        </p>
                                        <div className="flex items-center gap-2 mt-auto pt-4 border-t border-slate-100">
                                            <Button variant="outline" size="sm" className="w-full gap-2 hover:bg-primary/5 hover:text-primary hover:border-primary/30">
                                                <ExternalLink className="h-4 w-4" /> 網上閱讀
                                            </Button>
                                            <Button size="sm" className="w-full gap-2">
                                                <Download className="h-4 w-4" /> 下載 PDF
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
