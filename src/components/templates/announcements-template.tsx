import { EditorContent, type Editor } from "@tiptap/react"
import type { PageData } from "@/lib/page-types"
import { ChevronRight, Megaphone } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AnnouncementsTemplateProps {
    page: PageData
    editor: Editor | null
}

export function AnnouncementsTemplate({ page, editor }: AnnouncementsTemplateProps) {
    // Unused logic removed

    // Mock data for announcements
    const notices = [
        {
            id: 1,
            title: "有關變更「冬季校服」事宜",
            date: "2024-11-28",
            category: "行政通告",
            isNew: true,
            summary: "鑑於近日氣溫驟降，請家長留意各級學生更換冬季校服之安排及相關細則...",
        },
        {
            id: 2,
            title: "2024-2025年度 上學期考試安排",
            date: "2024-11-15",
            category: "教務通告",
            isNew: false,
            summary: "上學期考試將於一月上旬舉行，各科考試範圍及時間表詳見附件。",
        },
        {
            id: 3,
            title: "誠邀參加「家長教師會第十五屆周年大會」",
            date: "2024-10-20",
            category: "活動通告",
            isNew: false,
            summary: "本會訂於十一月八日(星期五)晚上七時正，假本校禮堂舉行第十五屆周年大會...",
        },
        {
            id: 4,
            title: "全港分區小學跳繩比賽獲獎名單",
            date: "2024-10-12",
            category: "喜訊",
            isNew: false,
            summary: "恭喜本校跳繩隊於全港分區小學跳繩比賽中勇奪多個獎項！",
        },
        {
            id: 5,
            title: "加強預防流行性感冒措施",
            date: "2024-09-30",
            category: "衛生通告",
            isNew: false,
            summary: "衛生防護中心預測冬季流感季節將至，請家長及學生注意個人衛生，生病應留家休息。",
        },
    ]

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            {/* Banner Section */}
            <div className="relative h-[250px] w-full overflow-hidden bg-slate-900">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1577896334614-5ab230c16533?q=80&w=2574&auto=format&fit=crop")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="relative container mx-auto h-full flex flex-col justify-end pb-12 px-4 lg:px-8">
                    <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2">
                        {page.title}
                    </h1>
                    <p className="text-slate-300 text-lg max-w-2xl">
                        發布學校最新消息、行政安排及學生喜訊。
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 py-12 flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar / Filters */}
                    <div className="lg:col-span-1 hidden lg:block">
                        <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-24">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <Megaphone className="h-5 w-5 text-primary" />
                                通告分類
                            </h3>
                            <div className="space-y-1">
                                <button className="w-full text-left px-3 py-2 rounded-md bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors">
                                    全部通告
                                </button>
                                <button className="w-full text-left px-3 py-2 rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                                    行政通告
                                </button>
                                <button className="w-full text-left px-3 py-2 rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                                    教務通告
                                </button>
                                <button className="w-full text-left px-3 py-2 rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                                    活動通告
                                </button>
                                <button className="w-full text-left px-3 py-2 rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">
                                    喜訊
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Editor Content */}
                        <div className="mb-8">
                            <EditorContent editor={editor} className="simple-editor-content" />
                        </div>

                        {/* Notices List */}
                        <div className="space-y-4">
                            {notices.map((notice) => (
                                <div key={notice.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-primary/20 transition-all group cursor-pointer">
                                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                                        {/* Date Box */}
                                        <div className="shrink-0 flex flex-row md:flex-col items-center justify-center bg-slate-50 border rounded-lg px-4 py-2 md:w-20 md:h-20 text-slate-600">
                                            <span className="text-xs md:text-sm font-medium uppercase tracking-wider">{notice.date.split('-')[1]}月</span>
                                            <span className="text-lg md:text-2xl font-bold ml-2 md:ml-0 md:mt-1">{notice.date.split('-')[2]}</span>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                {notice.isNew && (
                                                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-red-500 text-white hover:bg-red-600">NEW</span>
                                                )}
                                                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-slate-600 border-slate-300">
                                                    {notice.category}
                                                </span>
                                            </div>
                                            <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-primary transition-colors mb-2">
                                                {notice.title}
                                            </h3>
                                            <p className="text-slate-600 text-sm line-clamp-2">
                                                {notice.summary}
                                            </p>
                                        </div>

                                        <div className="hidden md:flex items-center justify-end self-center">
                                            <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                                                <ChevronRight className="h-5 w-5" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Mockup */}
                        <div className="mt-8 flex justify-center gap-2">
                            <Button variant="outline" size="sm" disabled>上一頁</Button>
                            <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90">1</Button>
                            <Button variant="outline" size="sm">2</Button>
                            <Button variant="outline" size="sm">3</Button>
                            <span className="flex items-end px-2 text-slate-400">...</span>
                            <Button variant="outline" size="sm">下一頁</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
