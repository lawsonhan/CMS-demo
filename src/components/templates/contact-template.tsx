import { EditorContent, type Editor } from "@tiptap/react"
import type { PageData } from "@/lib/page-types"
import { MapPin, Phone, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ContactTemplateProps {
    page: PageData
    editor: Editor | null
}

export function ContactTemplate({ page, editor }: ContactTemplateProps) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Page Header */}
            <div className="bg-slate-900 text-white py-12">
                <div className="container mx-auto px-4 lg:px-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{page.title}</h1>
                    <p className="text-slate-300 max-w-2xl mx-auto">
                        我們樂意聆聽您的意見。如有任何查詢，歡迎透過以下方式聯絡我們。
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 py-12 -mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Contact Info Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-xl shadow-lg border p-6 space-y-6">
                            <div>
                                <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
                                    <MapPin className="h-5 w-5 text-primary" /> 地址
                                </h3>
                                <p className="text-slate-600 pl-7">
                                    新界元朗某某路123號<br />
                                    Yuen Long, New Territories
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
                                    <Phone className="h-5 w-5 text-primary" /> 電話
                                </h3>
                                <p className="text-slate-600 pl-7">
                                    (852) 2478 1234
                                </p>
                                <p className="text-xs text-slate-400 pl-7 mt-1">
                                    辦公時間: 星期一至五 9:00am - 5:00pm
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
                                    <Mail className="h-5 w-5 text-primary" /> 電郵
                                </h3>
                                <p className="text-slate-600 pl-7">
                                    info@school.edu.hk
                                </p>
                            </div>
                        </div>

                        {/* Editable Content (e.g. Transportation info) */}
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h3 className="text-lg font-bold mb-4 text-slate-900">到校交通</h3>
                            <div className="simple-editor-wrapper tiptap-theme !border-none !h-auto !bg-transparent !p-0">
                                <EditorContent editor={editor} className="simple-editor-content" />
                            </div>
                        </div>
                    </div>

                    {/* Right: Map & Form */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Map Placeholder */}
                        <div className="bg-slate-200 rounded-xl overflow-hidden shadow-sm h-[300px] relative">
                            <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-medium">
                                [ Google Map Placeholder ]
                            </div>
                            {/* In a real app, embed Google Maps iframe or component here */}
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white rounded-xl shadow-sm border p-8">
                            <h2 className="text-2xl font-bold mb-6">發送訊息</h2>
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">姓名</label>
                                        <Input placeholder="您的姓名" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">電郵</label>
                                        <Input placeholder="your@email.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">主旨</label>
                                    <Input placeholder="查詢事項" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">內容</label>
                                    <Textarea placeholder="請輸入您的訊息..." rows={5} />
                                </div>
                                <Button className="w-full md:w-auto gap-2">
                                    <Send className="h-4 w-4" /> 提交表格
                                </Button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
