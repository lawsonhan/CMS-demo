"use client"

import * as React from "react"
import {
  Bell,
  Book,
  BookOpen,
  Calendar,
  ClipboardList,
  Command,
  Contact,
  Handshake,
  HeartHandshake,
  Home,
  Image,
  Info,
  Landmark,
  Map,
  Trophy,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  // Top level quick links
  quickLinks: [
    {
      title: "主頁",
      url: "#",
      icon: Home,
    },
    {
      title: "校曆表",
      url: "#",
      icon: Calendar,
    },
    {
      title: "聯絡我們",
      url: "#",
      icon: Contact,
    },
  ],
  // Main navigation group
  navMain: [
    {
      title: "學校小冊子",
      url: "#",
      icon: Book,
    },
    {
      title: "活動相片",
      url: "#",
      icon: Image,
    },
    {
      title: "各類通告",
      url: "#",
      icon: Bell,
    },
    {
      title: "我們的南元小",
      url: "#",
      icon: Landmark,
      items: [
        {
          title: "學校背景及歷史",
          url: "#",
        },
        {
          title: "辦學宗旨",
          url: "#",
        },
        {
          title: "學校設備",
          url: "#",
        },
        {
          title: "學校管理委員會",
          url: "#",
        },
        {
          title: "專業團隊",
          url: "#",
        },
        {
          title: "師資",
          url: "#",
        },
        {
          title: "課程編排",
          url: "#",
        },
        {
          title: "升學情況及升中資訊",
          url: "#",
        },
        {
          title: "多元化課外活動",
          url: "#",
        },
        {
          title: "校歌",
          url: "#",
        },
        {
          title: "學校報告及計劃",
          url: "#",
        },
        {
          title: "學校簡介短片",
          url: "#",
        },
        {
          title: "姊妹學校",
          url: "#",
        },
      ],
    },
    {
      title: "校內資訊",
      url: "#",
      icon: Info,
      items: [
        {
          title: "運作情況",
          url: "#",
        },
        {
          title: "家課政策",
          url: "#",
        },
        {
          title: "評估制度",
          url: "#",
        },
        {
          title: "全人獎勵計劃",
          url: "#",
        },
      ],
    },
    {
      title: "家長備忘",
      url: "#",
      icon: ClipboardList,
      items: [
        {
          title: "上課時間",
          url: "#",
        },
        {
          title: "課前早會及早讀課安排",
          url: "#",
        },
        {
          title: "午膳安排",
          url: "#",
        },
        {
          title: "校服須知",
          url: "#",
        },
        {
          title: "放學安排",
          url: "#",
        },
        {
          title: "家校通訊",
          url: "#",
        },
        {
          title: "請假/早退須知",
          url: "#",
        },
        {
          title: "乘坐校車/保母車須知",
          url: "#",
        },
      ],
    },
    {
      title: "課程特色",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "科務計劃及檢討報告",
          url: "#",
        },
        {
          title: "中文科",
          url: "#",
        },
        {
          title: "英文科",
          url: "#",
        },
        {
          title: "數學科",
          url: "#",
        },
        {
          title: "常識科/人文及科學科",
          url: "#",
        },
        {
          title: "視藝科",
          url: "#",
        },
        {
          title: "音樂科",
          url: "#",
        },
        {
          title: "體育科",
          url: "#",
        },
        {
          title: "普通話科",
          url: "#",
        },
        {
          title: "電腦科",
          url: "#",
        },
        {
          title: "圖書館",
          url: "#",
        },
        {
          title: "自我挑戰獎勵計劃(四主科)",
          url: "#",
        },
      ],
    },
    {
      title: "學生支援",
      url: "#",
      icon: HeartHandshake,
      items: [
        {
          title: "學生輔導",
          url: "#",
        },
        {
          title: "校本支援",
          url: "#",
        },
        {
          title: "家長錦囊",
          url: "#",
        },
        {
          title: "相關網站",
          url: "#",
        },
      ],
    },
    {
      title: "最新獎項",
      url: "#",
      icon: Trophy,
      items: [
        {
          title: "獎學金",
          url: "#",
        },
        {
          title: "中文科",
          url: "#",
        },
        {
          title: "英文科",
          url: "#",
        },
        {
          title: "數學科",
          url: "#",
        },
        {
          title: "常識科",
          url: "#",
        },
        {
          title: "視藝科",
          url: "#",
        },
        {
          title: "音樂科",
          url: "#",
        },
        {
          title: "體育科",
          url: "#",
        },
        {
          title: "課外活動",
          url: "#",
        },
      ],
    },
    {
      title: "南元小文物徑",
      url: "#",
      icon: Map,
      items: [
        {
          title: "文物徑簡介",
          url: "#",
        },
        {
          title: "烈士日",
          url: "#",
        },
      ],
    },
    {
      title: "學校夥伴",
      url: "#",
      icon: Handshake,
      items: [
        {
          title: "舊生會",
          url: "#",
        },
        {
          title: "家長教師會",
          url: "#",
        },
        {
          title: "校友會",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">南元小</span>
                  <span className="truncate text-xs">CMS Admin</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Quick Links (No label) */}
        <NavMain items={data.quickLinks} />
        {/* Main Navigation (Labeled) */}
        <NavMain items={data.navMain} label="主导航" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
