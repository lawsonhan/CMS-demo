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
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <main className="min-w-0 flex-1 space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Page editor
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">
              {pageTitle}
            </h1>
            <p className="text-sm text-muted-foreground">
              Draft · Last saved 2 minutes ago
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary">Save draft</Button>
            <Button>Publish</Button>
          </div>
        </div>
        <SimpleEditor />
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
          <Separator orientation="vertical" className="mr-2 h-4" />
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
