import { useState } from "react"
import { EditorContent, type Editor } from "@tiptap/react"
import type { PageData } from "@/lib/page-types"
import { ChevronLeft, ChevronRight, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CalendarTemplateProps {
    page: PageData
    editor: Editor | null
}

export function CalendarTemplate({ page, editor }: CalendarTemplateProps) {
    const [currentDate, setCurrentDate] = useState(new Date())

    // Mock Calendar Generation
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

    const days = []
    for (let i = 0; i < firstDay; i++) {
        days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i)
    }

    // Mock Events
    const events = [
        { day: 5, title: "家長教師會會議", type: "meeting" },
        { day: 12, title: "全方位學習日", type: "activity" },
        { day: 24, title: "聖誕聯歡會", type: "celebration" },
        { day: 25, title: "聖誕節假期", type: "holiday" },
    ]

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }

    const monthNames = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Page Header */}
            <div className="bg-white border-b py-8">
                <div className="container mx-auto px-4 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">{page.title}</h1>
                    <p className="text-slate-500 mt-2">關注學校最新動態與重要日程</p>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 py-8 flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Calendar Grid */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold">
                                    {currentDate.getFullYear()}年 {monthNames[currentDate.getMonth()]}
                                </h2>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="icon" onClick={prevMonth}>
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="icon" onClick={nextMonth}>
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-px text-center text-sm mb-2 text-slate-500 font-medium">
                                <div>日</div>
                                <div>一</div>
                                <div>二</div>
                                <div>三</div>
                                <div>四</div>
                                <div>五</div>
                                <div>六</div>
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                                {days.map((day, idx) => {
                                    const event = day ? events.find(e => e.day === day) : null
                                    return (
                                        <div
                                            key={idx}
                                            className={cn(
                                                "aspect-square p-2 border rounded-lg relative flex flex-col items-start justify-start transition-colors",
                                                day ? "bg-white hover:border-primary/50" : "bg-transparent border-transparent",
                                                event?.type === 'holiday' ? "bg-red-50/50" : ""
                                            )}
                                        >
                                            {day && (
                                                <>
                                                    <span className={cn(
                                                        "text-sm font-medium",
                                                        event?.type === 'holiday' ? "text-red-500" : "text-slate-700"
                                                    )}>{day}</span>
                                                    {event && (
                                                        <div className={cn(
                                                            "mt-1 w-full text-[10px] truncate px-1 py-0.5 rounded",
                                                            event.type === 'holiday' ? "bg-red-100 text-red-700" :
                                                                event.type === 'meeting' ? "bg-blue-100 text-blue-700" :
                                                                    "bg-green-100 text-green-700"
                                                        )}>
                                                            {event.title}
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Editable Content Area (for additional notices) */}
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h3 className="text-lg font-bold mb-4 border-b pb-2">備註事項</h3>
                            <div className="simple-editor-wrapper tiptap-theme !border-none !h-auto !bg-transparent !p-0">
                                <EditorContent editor={editor} className="simple-editor-content" />
                            </div>
                        </div>
                    </div>

                    {/* Right: Upcoming Events List */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border p-6">
                            <h3 className="text-lg font-bold mb-4">本月活動</h3>
                            <div className="space-y-4">
                                {events.map((event, idx) => (
                                    <div key={idx} className="flex gap-3 items-start pb-4 border-b last:border-0 last:pb-0">
                                        <div className="bg-primary/10 text-primary font-bold rounded-lg w-12 h-12 flex flex-col items-center justify-center shrink-0">
                                            <span className="text-xs">{monthNames[currentDate.getMonth()]}</span>
                                            <span className="text-lg leading-none">{event.day}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-slate-900">{event.title}</h4>
                                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                                <Clock className="h-3 w-3" />
                                                <span>全日</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                                                <MapPin className="h-3 w-3" />
                                                <span>本校禮堂</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="outline" className="w-full mt-4">下載校曆表 (PDF)</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
