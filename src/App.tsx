import { Fragment } from "react"
import { Link, Route, Routes, useLocation } from "react-router-dom"

import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { getBreadcrumbs } from "@/lib/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

function EditorPage({ pageTitle }: { pageTitle: string }) {
  const versionHistory = [
    {
      id: "v1.6",
      label: "Autosave",
      time: "2 minutes ago",
      status: "Draft",
    },
    {
      id: "v1.5",
      label: "Saved",
      time: "Today, 10:42",
      status: "Draft",
    },
    {
      id: "v1.4",
      label: "Published",
      time: "Yesterday, 18:05",
      status: "Live",
    },
    {
      id: "v1.3",
      label: "Saved",
      time: "Jan 28, 09:12",
      status: "Draft",
    },
  ]

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg bg-background lg:flex-row">
        <section className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-auto">
            <SimpleEditor />
          </div>
        </section>

        <Separator orientation="horizontal" className="lg:hidden" />
        <Separator orientation="vertical" className="hidden lg:block" />

        <aside className="flex min-h-0 w-full flex-col overflow-auto lg:w-[320px] xl:w-[360px]">
          <div className="sticky top-0 z-10 border-b bg-background/95 px-4 py-3 backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Editor
                </p>
                <h2 className="text-sm font-semibold">Settings</h2>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm">
                  Save draft
                </Button>
                <Button size="sm">Publish</Button>
              </div>
            </div>
            <div className="mt-3 space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">
                  Title
                </label>
                <Input defaultValue={pageTitle} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">
                  Slug
                </label>
                <Input defaultValue="page-slug" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">
                  Summary
                </label>
                <Textarea
                  rows={3}
                  placeholder="Short description for listings and previews."
                />
              </div>
            </div>
          </div>

          <div className="flex-1 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Version history</h3>
              <Button variant="ghost" size="sm">
                View all
              </Button>
            </div>
            <div className="mt-3 space-y-2">
              {versionHistory.map((version) => (
                <div
                  key={version.id}
                  className="rounded-lg border border-border/60 px-3 py-2"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{version.id}</p>
                    <span className="text-xs text-muted-foreground">
                      {version.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {version.label} · {version.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}

export default function App() {
  const { pathname } = useLocation()
  const breadcrumbs = getBreadcrumbs(pathname)
  const currentTitle =
    breadcrumbs[breadcrumbs.length - 1]?.title || "主頁"

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />

          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1
                const hideOnMobile = !isLast ? "hidden md:block" : undefined

                return (
                  <Fragment key={`${crumb.url}-${crumb.title}`}>
                    <BreadcrumbItem className={hideOnMobile}>
                      {isLast ? (
                        <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link to={crumb.url}>{crumb.title}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && (
                      <BreadcrumbSeparator className={hideOnMobile} />
                    )}
                  </Fragment>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <Routes>
          <Route path="*" element={<EditorPage pageTitle={currentTitle} />} />
        </Routes>
      </SidebarInset>
    </SidebarProvider>
  )
}
