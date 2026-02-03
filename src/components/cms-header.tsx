import { Fragment } from "react"
import type { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { getBreadcrumbs } from "@/lib/navigation"
import {
    SidebarTrigger,
} from "@/components/ui/sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface CMSHeaderProps {
    /** Optional custom actions to display on the right side */
    actions?: ReactNode
}

export function CMSHeader({ actions }: CMSHeaderProps) {
    const { pathname } = useLocation()
    const breadcrumbs = getBreadcrumbs(pathname)

    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 bg-background z-10">
            <div className="flex items-center gap-2 min-w-0">
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
            </div>

            {actions && (
                <div className="flex items-center gap-2">
                    {actions}
                </div>
            )}
        </header>
    )
}
