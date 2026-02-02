import type { LucideIcon } from "lucide-react"
import {
  Bell,
  Book,
  BookOpen,
  Calendar,
  ClipboardList,
  Contact,
  Handshake,
  HeartHandshake,
  Home,
  Image,
  Info,
  Landmark,
  Map as MapIcon,
  Trophy,
} from "lucide-react"

export type NavItem = {
  title: string
  url?: string
  icon?: LucideIcon
  items?: NavItem[]
}

export type BreadcrumbItem = {
  title: string
  url: string
}

const BASE_PATH = "/pages"

const quickLinks: NavItem[] = [
  {
    title: "主頁",
    url: "/",
    icon: Home,
  },
  {
    title: "校曆表",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "聯絡我們",
    url: "/contact",
    icon: Contact,
  },
]

const navMain: NavItem[] = [
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
        items: [
          {
            title: "輔導組活動",
            url: "#",
            items: [
              { title: "cheer up 扭蛋活動", url: "#" },
              { title: "小六生涯規劃活動-認識自己", url: "#" },
              { title: "小六點唱鼓勵活動", url: "#" },
              { title: "中秋節活動", url: "#" },
              { title: "長幼互動喜相聚", url: "#" },
              { title: "香港公益金慈善花卉義賣", url: "#" },
              { title: "童樂同遊", url: "#" },
              { title: "開心小天地", url: "#" },
              { title: "敬師活動", url: "#" },
              { title: "賣旗日", url: "#" },
            ],
          },
          { title: "《南元小之星》獎勵計劃", url: "#" },
          { title: "生命教育", url: "#" },
          { title: "成長的天空", url: "#" },
          { title: "成長課", url: "#" },
          { title: "社工與學生午膳活動", url: "#" },
          { title: "學長計劃", url: "#" },
          { title: "禮貌愛心天使活動", url: "#" },
          { title: "和諧大使", url: "#" },
        ],
      },
      {
        title: "校本支援",
        url: "#",
        items: [{ title: "學生支援", url: "#" }],
      },
      {
        title: "家長錦囊",
        url: "#",
        items: [
          { title: "提昇詞彙技巧", url: "#" },
          { title: "認識語言障礙", url: "#" },
          { title: "如何協助子女提升專注力？", url: "#" },
          { title: "甚麼是「伴讀」？", url: "#" },
          { title: "何謂讀寫障礙?", url: "#" },
        ],
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
    icon: MapIcon,
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
        items: [
          { title: "家教會簡介", url: "#" },
          { title: "家長教師會會章", url: "#" },
          { title: "留影集 2021-2022", url: "#" },
          { title: "留影集 2020-2021", url: "#" },
          { title: "留影集 2019-2020", url: "#" },
          { title: "留影集 2018-2019", url: "#" },
          { title: "委員名單", url: "#" },
        ],
      },
      {
        title: "校友會",
        url: "#",
        items: [
          { title: "會長的話", url: "#" },
          { title: "會章", url: "#" },
          { title: "校友會委員名單", url: "#" },
          { title: "獎學金獲獎名單", url: "#" },
          { title: "南元朗官立小學《百年校史文摘》摘錄", url: "#" },
          { title: "會務文件", url: "#" },
          { title: "2425年度活動相片", url: "#" },
          { title: "2324年度活動相片", url: "#" },
          { title: "2223年度活動相片", url: "#" },
          { title: "留影集", url: "#" },
          { title: "入會表格", url: "#" },
        ],
      },
    ],
  },
]

const encodeSegment = (segment: string) =>
  encodeURIComponent(segment.trim())

const buildPath = (basePath: string, segments: string[]) => {
  const base = basePath ? (basePath.startsWith("/") ? basePath : `/${basePath}`) : ""
  const prefix = base === "/" ? "" : base.replace(/\/$/, "")
  const encoded = segments.map(encodeSegment).filter(Boolean)
  const path = `${prefix}/${encoded.join("/")}`
  return path === "" ? "/" : path
}

const resolveNavItems = (
  items: NavItem[],
  parentSegments: string[],
  basePath: string
): NavItem[] =>
  items.map((item) => {
    const nextSegments = [...parentSegments, item.title]
    const url =
      item.url && item.url !== "#"
        ? item.url
        : buildPath(basePath, nextSegments)

    return {
      ...item,
      url,
      items: item.items
        ? resolveNavItems(item.items, nextSegments, basePath)
        : undefined,
    }
  })

export const navigation = {
  quickLinks: resolveNavItems(quickLinks, [], ""),
  navMain: resolveNavItems(navMain, [], BASE_PATH),
}

export function normalizePath(pathname: string) {
  if (!pathname) return "/"
  const cleaned = pathname.replace(/\/+$/, "")
  return cleaned === "" ? "/" : cleaned
}

const navIndex = new Map<string, BreadcrumbItem[]>()

const indexItems = (items: NavItem[], parents: BreadcrumbItem[] = []) => {
  items.forEach((item) => {
    if (!item.url) return
    const nextTrail = [...parents, { title: item.title, url: item.url }]
    navIndex.set(normalizePath(item.url), nextTrail)
    if (item.items?.length) {
      indexItems(item.items, nextTrail)
    }
  })
}

indexItems([...navigation.quickLinks, ...navigation.navMain])

const rootCrumb: BreadcrumbItem = { title: "主頁", url: "/" }

export function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const normalized = normalizePath(pathname)
  const fromIndex = navIndex.get(normalized)
  if (fromIndex) {
    if (normalizePath(fromIndex[0]?.url || "") === "/") {
      return fromIndex
    }
    return normalized === "/" ? fromIndex : [rootCrumb, ...fromIndex]
  }

  if (normalized === "/") {
    return [rootCrumb]
  }

  if (normalized.startsWith(`${BASE_PATH}/`)) {
    const segments = normalized
      .slice(BASE_PATH.length + 1)
      .split("/")
      .filter(Boolean)
      .map((segment) => decodeURIComponent(segment))
    let currentPath = BASE_PATH
    const trail = segments.map((segment) => {
      currentPath = `${currentPath}/${encodeSegment(segment)}`
      return { title: segment, url: currentPath }
    })
    return [rootCrumb, ...trail]
  }

  const fallbackTitle = decodeURIComponent(
    normalized.split("/").filter(Boolean).slice(-1)[0] || "主頁"
  )
  return [rootCrumb, { title: fallbackTitle, url: normalized }]
}

export function isNavItemActive(item: NavItem, pathname: string): boolean {
  const normalized = normalizePath(pathname)
  if (item.url && normalizePath(item.url) === normalized) {
    return true
  }
  return item.items?.some((child) => isNavItemActive(child, pathname)) ?? false
}
