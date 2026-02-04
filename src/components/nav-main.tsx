"use client"

import { ChevronRight } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { type NavItem, isNavItemActive } from "@/lib/navigation"

const getFirstLeafUrl = (item: NavItem): string | undefined => {
  if (item.url) return item.url
  if (!item.items?.length) return undefined
  for (const child of item.items) {
    const found = getFirstLeafUrl(child)
    if (found) return found
  }
  return undefined
}

// Helper for recursive rendering of sub-items
function NavSubItems({
  items,
  pathname,
}: {
  items: NavItem[]
  pathname: string
}) {
  if (!items?.length) return null

  return (
    <SidebarMenuSub>
      {items.map((item) => {
        const isActive = isNavItemActive(item, pathname)
        const url = item.url
        const isNavigable = !!url

        return (
          <SidebarMenuSubItem key={item.title}>
            {item.items && item.items.length > 0 ? (
              <Collapsible defaultOpen={isActive}>
                <CollapsibleTrigger asChild>
                  {isNavigable ? (
                    <SidebarMenuSubButton
                      className="group/collapsible w-full"
                      asChild
                      isActive={isActive}
                    >
                      <Link to={url!}>
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </Link>
                    </SidebarMenuSubButton>
                  ) : (
                    <SidebarMenuSubButton
                      className="group/collapsible w-full"
                      type="button"
                      isActive={isActive}
                    >
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuSubButton>
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {/* Recursive call for deeper levels */}
                  <NavSubItems items={item.items} pathname={pathname} />
                </CollapsibleContent>
              </Collapsible>
            ) : (
              isNavigable ? (
                <SidebarMenuSubButton asChild isActive={isActive}>
                  <Link to={url!}>
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              ) : (
                <SidebarMenuSubButton type="button" isActive={isActive} aria-disabled="true">
                  <span>{item.title}</span>
                </SidebarMenuSubButton>
              )
            )}
          </SidebarMenuSubItem>
        )
      })}
    </SidebarMenuSub>
  )
}

export function NavMain({
  items,
  label,
  showChildren = true,
}: {
  items: NavItem[]
  label?: string
  showChildren?: boolean
}) {
  const { pathname } = useLocation()

  return (
    <SidebarGroup>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => {
          const isActive = isNavItemActive(item, pathname)
          const hasChildren = !!item.items?.length
          const canExpand = showChildren && hasChildren
          const url = canExpand ? item.url : hasChildren ? getFirstLeafUrl(item) : item.url
          const isNavigable = !!url

          return canExpand ? (
            <Collapsible key={item.title} asChild defaultOpen={isActive}>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  {isNavigable ? (
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={isActive}
                      className="group/collapsible"
                    >
                      <Link to={url!}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </Link>
                    </SidebarMenuButton>
                  ) : (
                    <SidebarMenuButton
                      type="button"
                      tooltip={item.title}
                      isActive={isActive}
                      className="group/collapsible"
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {item.items && (
                    <NavSubItems items={item.items} pathname={pathname} />
                  )}
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              {isNavigable ? (
                <SidebarMenuButton asChild tooltip={item.title} isActive={isActive}>
                  <Link to={url!}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              ) : (
                <SidebarMenuButton
                  type="button"
                  tooltip={item.title}
                  isActive={isActive}
                  aria-disabled="true"
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
