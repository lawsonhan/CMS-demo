import { Route, Routes, useLocation } from "react-router-dom"

import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { getBreadcrumbs } from "@/lib/navigation"
import { PageContainer } from "@/components/page-container"

function AppHelper() {
  const { pathname } = useLocation()
  const breadcrumbs = getBreadcrumbs(pathname)
  const currentTitle =
    breadcrumbs[breadcrumbs.length - 1]?.title || "主頁"

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>

        <Routes>
          <Route path="*" element={<PageContainer pageTitle={currentTitle} />} />
        </Routes>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AppHelper
