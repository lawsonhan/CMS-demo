import { Image, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const photoAlbums = [
  {
    title: "2024-2025 開學禮",
    date: "2024年9月",
    photos: 86,
  },
  {
    title: "STEAM 學習日",
    date: "2024年6月",
    photos: 64,
  },
  {
    title: "校園運動會",
    date: "2024年3月",
    photos: 72,
  },
  {
    title: "親子閱讀嘉年華",
    date: "2024年1月",
    photos: 48,
  },
]

const featuredMoments = [
  "社區共融體驗",
  "藝文成果展",
  "校隊比賽",
  "晨會分享",
  "校園農圃",
  "畢業禮",
]

export function ActivityPhotosPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6 px-6 py-6">
      <section className="flex flex-col gap-5 rounded-2xl border border-border/60 bg-card px-6 py-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              活動相片
            </p>
            <h1 className="text-2xl font-semibold">校園活動影像牆</h1>
            <p className="max-w-2xl text-sm text-muted-foreground">
              收錄校內外活動的精彩時刻，展示同學的成長與校園生活。
            </p>
          </div>
          <Button size="sm" className="gap-2">
            <Image className="h-4 w-4" />
            查看全部相簿
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {featuredMoments.map((moment) => (
            <div
              key={moment}
              className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/40 px-4 py-3"
            >
              <span className="text-sm font-medium">{moment}</span>
              <Sparkles className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>最新相簿</CardTitle>
            <CardDescription>精選近期活動照片。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {photoAlbums.slice(0, 4).map((album) => (
                <div
                  key={album.title}
                  className="flex flex-col gap-3 rounded-xl border border-border/60 p-4"
                >
                  <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-muted/40 via-muted/80 to-muted" />
                  <div>
                    <p className="text-sm font-semibold">{album.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {album.date} · {album.photos} 張相片
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>相簿分類</CardTitle>
            <CardDescription>依主題快速瀏覽。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {photoAlbums.map((album) => (
              <div
                key={album.title}
                className="flex items-center justify-between rounded-lg border border-border/60 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold">{album.title}</p>
                  <p className="text-xs text-muted-foreground">{album.date}</p>
                </div>
                <Button size="sm" variant="secondary">
                  {album.photos} 張
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
