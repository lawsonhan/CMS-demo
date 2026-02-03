import { EditorContent, type Editor } from "@tiptap/react"
import type { PageData } from "@/lib/page-types"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HomeTemplateProps {
    page: PageData
    editor: Editor | null
}

export function HomeTemplate({ editor }: HomeTemplateProps) {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[400px] w-full overflow-hidden bg-slate-900 text-white">
                {/* Placeholder for Hero Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-60"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />

                <div className="relative container mx-auto h-full flex flex-col justify-center px-4 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        培育未來棟樑
                    </h1>
                    <p className="text-lg md:text-xl text-slate-200 max-w-2xl mb-8">
                        致力建立關愛校園，啟發學生潛能，培養良好品德，達致全人發展。
                    </p>
                    <div className="flex gap-4">
                        <Button size="lg" className="bg-primary hover:bg-primary/90">
                            了解更多
                        </Button>
                        <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900">
                            入學申請
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content Area (Principal's Message etc.) */}
            <section className="py-12 bg-background">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold tracking-tight mb-2 text-primary">校長寄語</h2>
                            <div className="h-1 w-20 bg-primary/20 mx-auto rounded-full" />
                        </div>

                        {/* Tiptap Editor Content */}
                        <div className="simple-editor-wrapper tiptap-theme !border-none !h-auto !bg-transparent !p-0">
                            <EditorContent editor={editor} className="simple-editor-content" />
                        </div>
                    </div>
                </div>
            </section>

            {/* News & Events Grid (Mock Data) */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900">最新消息</h2>
                        <Button variant="ghost" className="text-primary gap-1">
                            查看全部 <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
                                <div className="h-48 bg-slate-200 relative">
                                    <img
                                        src={`https://images.unsplash.com/photo-${i === 1 ? '1544531672-e22519392b43' : i === 2 ? '1509062522246-3755977927d7' : '1577896851239-01097d8cbc62'}?q=80&w=800&auto=format&fit=crop`}
                                        className="w-full h-full object-cover"
                                        alt="News"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-md text-xs font-bold shadow-sm">
                                        <span className="block text-slate-500">DEC</span>
                                        <span className="block text-lg">1{i}</span>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <span className="text-xs font-medium text-primary mb-2 block">校園動態</span>
                                    <h3 className="text-lg font-bold mb-2 line-clamp-2">
                                        {i === 1 ? "年度才藝表演大賽完滿結束" : i === 2 ? "全港小學數學奧林匹克比賽獲獎名單" : "開放日及升中簡介會安排"}
                                    </h3>
                                    <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                                        本校學生在是次活動中表現出色，充分展現了平日努力學習的成果。感謝各位家長及老師的支持和指導...
                                    </p>
                                    <a href="#" className="text-sm font-medium text-primary flex items-center gap-1 hover:underline">
                                        閱讀更多 <ExternalLink className="h-3 w-3" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer Quick Links */}
            <footer className="bg-slate-900 text-slate-300 py-12">
                <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h4 className="text-white font-bold mb-4">關於我們</h4>
                        <p className="text-sm leading-relaxed">
                            南元朗官立小學致力提供優質教育，培養學生德、智、體、群、美五育均衡發展。
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">實用連結</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">校曆表</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">電子通告</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">招標公告</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">聯絡資料</h4>
                        <p className="text-sm mb-2">地址: 新界元朗某某路123號</p>
                        <p className="text-sm mb-2">電話: (852) 2478 1234</p>
                        <p className="text-sm">電郵: info@school.edu.hk</p>
                    </div>
                </div>
                <div className="container mx-auto px-4 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-center text-xs">
                    © 2026 CMS Demo School. All rights reserved.
                </div>
            </footer>
        </div>
    )
}
