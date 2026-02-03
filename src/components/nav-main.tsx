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
        const url = item.url ?? "/"

        return (
          <SidebarMenuSubItem key={item.title}>
            {item.items && item.items.length > 0 ? (
              <Collapsible defaultOpen={isActive}>
                <CollapsibleTrigger asChild>
                  <SidebarMenuSubButton
                    className="group/collapsible w-full"
                    asChild
                    isActive={isActive}
                  >
                    <Link to={url}>
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </Link>
                  </SidebarMenuSubButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {/* Recursive call for deeper levels */}
                  <NavSubItems items={item.items} pathname={pathname} />
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <SidebarMenuSubButton asChild isActive={isActive}>
                <Link to={url}>
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuSubButton>
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
}: {
  items: NavItem[]
  label?: string
}) {
  const { pathname } = useLocation()

  return (
    <SidebarGroup>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => {
          const isActive = isNavItemActive(item, pathname)
          const url = item.url ?? "/"

          return item.items && item.items.length > 0 ? (
            <Collapsible key={item.title} asChild defaultOpen={isActive}>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={isActive}
                    className="group/collapsible"
                  >
                    <Link to={url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </Link>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <NavSubItems items={item.items} pathname={pathname} />
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title} isActive={isActive}>
                <Link to={url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
