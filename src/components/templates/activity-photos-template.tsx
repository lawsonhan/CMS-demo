import { EditorContent, type Editor } from "@tiptap/react"
import type { PageData } from "@/lib/page-types"
import { Calendar, Image as ImageIcon } from "lucide-react"

interface ActivityPhotosTemplateProps {
    page: PageData
    editor: Editor | null
}

export function ActivityPhotosTemplate({ page, editor }: ActivityPhotosTemplateProps) {
    // Other logic removed as not strictly needed for this visual template without sidebar

    // Mock data for photo albums
    const albums = [
        {
            id: 1,
            title: "2024 年度運動會",
            date: "2024-11-20",
            photoCount: 128,
            coverImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 2,
            title: "聖誕聯歡派對",
            date: "2023-12-22",
            photoCount: 85,
            coverImage: "https://images.unsplash.com/photo-1545048702-79362596cdc9?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 3,
            title: "秋季旅行 - 南生圍",
            date: "2023-11-10",
            photoCount: 42,
            coverImage: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 4,
            title: "中華文化日",
            date: "2024-02-05",
            photoCount: 64,
            coverImage: "https://images.unsplash.com/photo-1515096788709-a3cf4ce0a4a6?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 5,
            title: "畢業典禮 2023",
            date: "2023-07-15",
            photoCount: 210,
            coverImage: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 6,
            title: "家長教師會燒烤晚會",
            date: "2023-10-06",
            photoCount: 55,
            coverImage: "https://images.unsplash.com/photo-1529124781588-482350925bfa?q=80&w=800&auto=format&fit=crop",
        },
    ]

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            {/* Banner Section */}
            <div className="relative h-[250px] w-full overflow-hidden bg-slate-900">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2668&auto=format&fit=crop")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="relative container mx-auto h-full flex flex-col justify-end pb-12 px-4 lg:px-8">
                    <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2">
                        {page.title}
                    </h1>
                    <p className="text-slate-300 text-lg max-w-2xl">
                        紀錄學生成長的每個精彩時刻，分享校園生活的點點滴滴。
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 py-12 flex-1">
                {/* Editor Content if any (e.g. intro text) */}
                <div className="mb-8">
                    <EditorContent editor={editor} className="simple-editor-content" />
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {albums.map((album) => (
                        <div key={album.id} className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">
                            {/* Photo Cover with Badge */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={album.coverImage}
                                    alt={album.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                                    <div>
                                        <div className="flex items-center gap-2 text-xs font-medium bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg mb-2 w-fit">
                                            <Calendar className="h-3 w-3" /> {album.date}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs font-medium bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg">
                                        <ImageIcon className="h-3 w-3" /> {album.photoCount}
                                    </div>
                                </div>
                            </div>

                            <div className="p-5">
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1 mb-1">
                                    {album.title}
                                </h3>
                                <p className="text-sm text-slate-500">
                                    點擊查看相簿內容
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More Button Mockup */}
                <div className="mt-12 text-center">
                    <button className="px-6 py-2.5 rounded-full border border-slate-200 text-slate-600 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all text-sm font-medium">
                        載入更多相簿
                    </button>
                </div>
            </div>
        </div>
    )
}
