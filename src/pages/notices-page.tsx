import { Bell, CalendarClock, FileText, Megaphone } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const noticeStats = [
  { label: "本月通告", value: "18" },
  { label: "家長信", value: "6" },
  { label: "活動安排", value: "9" },
]

const notices = [
  {
    title: "上學期家長日安排",
    date: "2024年10月12日",
    tag: "家長日",
    icon: CalendarClock,
  },
  {
    title: "校內閱讀週活動通告",
    date: "2024年10月6日",
    tag: "活動",
    icon: Megaphone,
  },
  {
    title: "校巴時間更新",
    date: "2024年9月28日",
    tag: "交通",
    icon: Bell,
  },
  {
    title: "校服及體育服指引",
    date: "2024年9月16日",
    tag: "行政",
    icon: FileText,
  },
]

export function NoticesPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6 px-6 py-6">
      <section className="flex flex-col gap-5 rounded-2xl border border-border/60 bg-card px-6 py-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              各類通告
            </p>
            <h1 className="text-2xl font-semibold">最新通告及家長信</h1>
            <p className="max-w-2xl text-sm text-muted-foreground">
              即時整理校內公告、活動安排及重要通知，讓家長掌握最新消息。
            </p>
          </div>
          <Button size="sm" className="gap-2">
            <Bell className="h-4 w-4" />
            查看全部通告
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {noticeStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border/60 bg-muted/40 px-4 py-3"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {stat.label}
              </p>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>最新通告</CardTitle>
            <CardDescription>近期發布的重要事項。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {notices.map((notice) => {
              const Icon = notice.icon
              return (
                <div
                  key={notice.title}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/60 px-4 py-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg border border-border/60 bg-muted/40 p-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{notice.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {notice.date}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full border border-border/60 bg-muted px-3 py-1 text-xs text-muted-foreground">
                    {notice.tag}
                  </span>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>通告分類</CardTitle>
            <CardDescription>快速進入常用類別。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {["家長信", "課後活動", "校車安排", "校服須知"].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-lg border border-border/60 px-4 py-3"
              >
                <p className="text-sm font-semibold">{item}</p>
                <Button size="sm" variant="secondary">
                  查看
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
