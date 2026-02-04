import { BookOpen, Download, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const brochureHighlights = [
  {
    title: "校園生活指南",
    description: "一覽校園空間、學生活動及全年學習節奏。",
    meta: "更新：2024年9月",
  },
  {
    title: "課程特色手冊",
    description: "介紹跨學科學習、STEAM 及閱讀推廣。",
    meta: "更新：2024年8月",
  },
  {
    title: "家長支援資源",
    description: "家校合作、諮詢渠道及常見問題整理。",
    meta: "更新：2024年7月",
  },
]

const brochureArchive = [
  { year: "2024-2025", pages: 32, size: "12.4 MB" },
  { year: "2023-2024", pages: 30, size: "11.8 MB" },
  { year: "2022-2023", pages: 28, size: "10.6 MB" },
]

export function SchoolBrochurePage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6 px-6 py-6">
      <section className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card px-6 py-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              學校小冊子
            </p>
            <h1 className="text-2xl font-semibold">南元小資訊小冊子</h1>
            <p className="max-w-2xl text-sm text-muted-foreground">
              集合辦學理念、課程特色與校園生活重點，方便家長及同學快速了解學校。
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              下載最新小冊子
            </Button>
            <Button size="sm" variant="secondary" className="gap-2">
              <BookOpen className="h-4 w-4" />
              線上翻閱
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>最新內容焦點</CardTitle>
            <CardDescription>
              全面介紹校園空間、課程設計及多元學習活動。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {brochureHighlights.map((item) => (
              <div key={item.title} className="space-y-1">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm font-semibold">{item.title}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
                <p className="text-xs text-muted-foreground">{item.meta}</p>
              </div>
            ))}
          </CardContent>
          <CardFooter className="border-t">
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span>總頁數：32</span>
              <Separator orientation="vertical" className="h-4" />
              <span>版本：2024-2025</span>
              <Separator orientation="vertical" className="h-4" />
              <span>語言：繁體中文</span>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>歷年小冊子</CardTitle>
            <CardDescription>
              下載過往年度小冊子，方便查閱舊資料。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {brochureArchive.map((item) => (
              <div
                key={item.year}
                className="flex items-center justify-between rounded-lg border border-border/60 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold">{item.year}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.pages} 頁 · {item.size}
                  </p>
                </div>
                <Button size="sm" variant="secondary">
                  下載
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
