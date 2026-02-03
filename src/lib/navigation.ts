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
  /** URL-friendly slug (English, lowercase, hyphens). If not provided, derived from title for quickLinks or auto-generated. */
  slug?: string
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
    slug: "home",
    url: "/",
    icon: Home,
  },
  {
    title: "校曆表",
    slug: "calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "聯絡我們",
    slug: "contact",
    url: "/contact",
    icon: Contact,
  },
]

const navMain: NavItem[] = [
  {
    title: "學校小冊子",
    slug: "school-booklet",
    url: "#",
    icon: Book,
  },
  {
    title: "活動相片",
    slug: "activity-photos",
    url: "#",
    icon: Image,
  },
  {
    title: "各類通告",
    slug: "announcements",
    url: "#",
    icon: Bell,
  },
  {
    title: "我們的南元小",
    slug: "about-us",
    url: "#",
    icon: Landmark,
    items: [
      { title: "學校背景及歷史", slug: "history", url: "#" },
      { title: "辦學宗旨", slug: "mission", url: "#" },
      { title: "學校設備", slug: "facilities", url: "#" },
      { title: "學校管理委員會", slug: "management-committee", url: "#" },
      { title: "專業團隊", slug: "professional-team", url: "#" },
      { title: "師資", slug: "teachers", url: "#" },
      { title: "課程編排", slug: "curriculum", url: "#" },
      { title: "升學情況及升中資訊", slug: "secondary-school-info", url: "#" },
      { title: "多元化課外活動", slug: "extra-curricular", url: "#" },
      { title: "校歌", slug: "school-song", url: "#" },
      { title: "學校報告及計劃", slug: "reports-and-plans", url: "#" },
      { title: "學校簡介短片", slug: "intro-video", url: "#" },
      { title: "姊妹學校", slug: "sister-schools", url: "#" },
    ],
  },
  {
    title: "校內資訊",
    slug: "school-info",
    url: "#",
    icon: Info,
    items: [
      { title: "運作情況", slug: "operations", url: "#" },
      { title: "家課政策", slug: "homework-policy", url: "#" },
      { title: "評估制度", slug: "assessment-system", url: "#" },
      { title: "全人獎勵計劃", slug: "whole-person-award", url: "#" },
    ],
  },
  {
    title: "家長備忘",
    slug: "parent-notes",
    url: "#",
    icon: ClipboardList,
    items: [
      { title: "上課時間", slug: "school-hours", url: "#" },
      { title: "課前早會及早讀課安排", slug: "morning-assembly", url: "#" },
      { title: "午膳安排", slug: "lunch-arrangements", url: "#" },
      { title: "校服須知", slug: "uniform-guidelines", url: "#" },
      { title: "放學安排", slug: "dismissal-arrangements", url: "#" },
      { title: "家校通訊", slug: "home-school-communication", url: "#" },
      { title: "請假/早退須知", slug: "leave-early-dismissal", url: "#" },
      { title: "乘坐校車/保母車須知", slug: "school-bus-info", url: "#" },
    ],
  },
  {
    title: "課程特色",
    slug: "curriculum-features",
    url: "#",
    icon: BookOpen,
    items: [
      { title: "科務計劃及檢討報告", slug: "subject-plans", url: "#" },
      { title: "中文科", slug: "chinese", url: "#" },
      { title: "英文科", slug: "english", url: "#" },
      { title: "數學科", slug: "mathematics", url: "#" },
      { title: "常識科/人文及科學科", slug: "general-studies", url: "#" },
      { title: "視藝科", slug: "visual-arts", url: "#" },
      { title: "音樂科", slug: "music", url: "#" },
      { title: "體育科", slug: "physical-education", url: "#" },
      { title: "普通話科", slug: "putonghua", url: "#" },
      { title: "電腦科", slug: "computer-studies", url: "#" },
      { title: "圖書館", slug: "library", url: "#" },
      { title: "自我挑戰獎勵計劃(四主科)", slug: "self-challenge-award", url: "#" },
    ],
  },
  {
    title: "學生支援",
    slug: "student-support",
    url: "#",
    icon: HeartHandshake,
    items: [
      {
        title: "學生輔導",
        slug: "student-counseling",
        url: "#",
        items: [
          {
            title: "輔導組活動",
            slug: "counseling-activities",
            url: "#",
            items: [
              { title: "cheer up 扭蛋活動", slug: "cheer-up-gacha", url: "#" },
              { title: "小六生涯規劃活動-認識自己", slug: "p6-life-planning", url: "#" },
              { title: "小六點唱鼓勵活動", slug: "p6-encouragement", url: "#" },
              { title: "中秋節活動", slug: "mid-autumn-festival", url: "#" },
              { title: "長幼互動喜相聚", slug: "intergenerational-activities", url: "#" },
              { title: "香港公益金慈善花卉義賣", slug: "charity-flower-sale", url: "#" },
              { title: "童樂同遊", slug: "children-fun-trip", url: "#" },
              { title: "開心小天地", slug: "happy-corner", url: "#" },
              { title: "敬師活動", slug: "teacher-appreciation", url: "#" },
              { title: "賣旗日", slug: "flag-day", url: "#" },
            ],
          },
          { title: "《南元小之星》獎勵計劃", slug: "star-award", url: "#" },
          { title: "生命教育", slug: "life-education", url: "#" },
          { title: "成長的天空", slug: "understanding-adolescent", url: "#" },
          { title: "成長課", slug: "growth-lessons", url: "#" },
          { title: "社工與學生午膳活動", slug: "social-worker-lunch", url: "#" },
          { title: "學長計劃", slug: "mentorship-program", url: "#" },
          { title: "禮貌愛心天使活動", slug: "courtesy-angel", url: "#" },
          { title: "和諧大使", slug: "harmony-ambassador", url: "#" },
        ],
      },
      {
        title: "校本支援",
        slug: "school-based-support",
        url: "#",
        items: [{ title: "學生支援", slug: "student-support-details", url: "#" }],
      },
      {
        title: "家長錦囊",
        slug: "parent-tips",
        url: "#",
        items: [
          { title: "提昇詞彙技巧", slug: "vocabulary-tips", url: "#" },
          { title: "認識語言障礙", slug: "language-disorders", url: "#" },
          { title: "如何協助子女提升專注力？", slug: "improve-focus", url: "#" },
          { title: "甚麼是「伴讀」？", slug: "paired-reading", url: "#" },
          { title: "何謂讀寫障礙?", slug: "dyslexia", url: "#" },
        ],
      },
      { title: "相關網站", slug: "related-websites", url: "#" },
    ],
  },
  {
    title: "最新獎項",
    slug: "latest-awards",
    url: "#",
    icon: Trophy,
    items: [
      { title: "獎學金", slug: "scholarships", url: "#" },
      { title: "中文科", slug: "awards-chinese", url: "#" },
      { title: "英文科", slug: "awards-english", url: "#" },
      { title: "數學科", slug: "awards-mathematics", url: "#" },
      { title: "常識科", slug: "awards-general-studies", url: "#" },
      { title: "視藝科", slug: "awards-visual-arts", url: "#" },
      { title: "音樂科", slug: "awards-music", url: "#" },
      { title: "體育科", slug: "awards-physical-education", url: "#" },
      { title: "課外活動", slug: "awards-extra-curricular", url: "#" },
    ],
  },
  {
    title: "南元小文物徑",
    slug: "heritage-trail",
    url: "#",
    icon: MapIcon,
    items: [
      { title: "文物徑簡介", slug: "trail-introduction", url: "#" },
      { title: "烈士日", slug: "martyrs-day", url: "#" },
    ],
  },
  {
    title: "學校夥伴",
    slug: "school-partners",
    url: "#",
    icon: Handshake,
    items: [
      { title: "舊生會", slug: "alumni-association", url: "#" },
      {
        title: "家長教師會",
        slug: "pta",
        url: "#",
        items: [
          { title: "家教會簡介", slug: "pta-introduction", url: "#" },
          { title: "家長教師會會章", slug: "pta-constitution", url: "#" },
          { title: "留影集 2021-2022", slug: "pta-photos-2021-2022", url: "#" },
          { title: "留影集 2020-2021", slug: "pta-photos-2020-2021", url: "#" },
          { title: "留影集 2019-2020", slug: "pta-photos-2019-2020", url: "#" },
          { title: "留影集 2018-2019", slug: "pta-photos-2018-2019", url: "#" },
          { title: "委員名單", slug: "pta-committee", url: "#" },
        ],
      },
      {
        title: "校友會",
        slug: "alumni",
        url: "#",
        items: [
          { title: "會長的話", slug: "alumni-president-message", url: "#" },
          { title: "會章", slug: "alumni-constitution", url: "#" },
          { title: "校友會委員名單", slug: "alumni-committee", url: "#" },
          { title: "獎學金獲獎名單", slug: "alumni-scholarship-winners", url: "#" },
          { title: "南元朗官立小學《百年校史文摘》摘錄", slug: "school-history-excerpts", url: "#" },
          { title: "會務文件", slug: "alumni-documents", url: "#" },
          { title: "2425年度活動相片", slug: "alumni-photos-2024-2025", url: "#" },
          { title: "2324年度活動相片", slug: "alumni-photos-2023-2024", url: "#" },
          { title: "2223年度活動相片", slug: "alumni-photos-2022-2023", url: "#" },
          { title: "留影集", slug: "alumni-photo-gallery", url: "#" },
          { title: "入會表格", slug: "alumni-membership-form", url: "#" },
        ],
      },
    ],
  },
]

/**
 * Build URL path from slug segments
 */
const buildPath = (basePath: string, slugSegments: string[]) => {
  const base = basePath ? (basePath.startsWith("/") ? basePath : `/${basePath}`) : ""
  const prefix = base === "/" ? "" : base.replace(/\/$/, "")
  const path = `${prefix}/${slugSegments.join("/")}`
  return path === "" ? "/" : path
}

/**
 * Resolve nav items, generating URLs from slugs
 */
const resolveNavItems = (
  items: NavItem[],
  parentSlugs: string[],
  basePath: string
): NavItem[] =>
  items.map((item) => {
    // Use slug if provided, otherwise generate from title (fallback for safety)
    const itemSlug = item.slug || item.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
    const nextSlugs = [...parentSlugs, itemSlug]
    const url =
      item.url && item.url !== "#"
        ? item.url
        : buildPath(basePath, nextSlugs)

    return {
      ...item,
      slug: itemSlug,
      url,
      items: item.items
        ? resolveNavItems(item.items, nextSlugs, basePath)
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
    let currentPath = BASE_PATH
    const trail = segments.map((segment) => {
      currentPath = `${currentPath}/${segment}`
      // Try to find title from navIndex, fallback to slug
      const found = navIndex.get(currentPath)
      const title = found?.[found.length - 1]?.title || segment
      return { title, url: currentPath }
    })
    return [rootCrumb, ...trail]
  }

  const fallbackSlug = normalized.split("/").filter(Boolean).slice(-1)[0] || "home"
  const found = navIndex.get(normalized)
  const fallbackTitle = found?.[found.length - 1]?.title || fallbackSlug
  return [rootCrumb, { title: fallbackTitle, url: normalized }]
}

export function isNavItemActive(item: NavItem, pathname: string): boolean {
  const normalized = normalizePath(pathname)
  if (item.url && normalizePath(item.url) === normalized) {
    return true
  }
  return item.items?.some((child) => isNavItemActive(child, pathname)) ?? false
}

/**
 * Find a nav item by its URL
 */
export function findNavItemByUrl(url: string): NavItem | null {
  const normalized = normalizePath(url)

  function searchItems(items: NavItem[]): NavItem | null {
    for (const item of items) {
      if (item.url && normalizePath(item.url) === normalized) {
        return item
      }
      if (item.items) {
        const found = searchItems(item.items)
        if (found) return found
      }
    }
    return null
  }

  return searchItems([...navigation.quickLinks, ...navigation.navMain])
}

/**
 * Get the title for a given URL from navigation
 */
export function getTitleByUrl(url: string): string {
  const item = findNavItemByUrl(url)
  if (item) return item.title

  // Fallback: try breadcrumbs
  const breadcrumbs = getBreadcrumbs(url)
  return breadcrumbs[breadcrumbs.length - 1]?.title || "Page"
}

/**
 * Get the section menu for a given URL (finds the top-level parent in navMain)
 */
export function getSectionMenu(url: string): NavItem | null {
  const normalized = normalizePath(url)

  // Only look in navMain (not quickLinks)
  for (const section of navigation.navMain) {
    if (section.url && normalizePath(section.url) === normalized) {
      return section
    }
    // Check if any descendant matches
    if (section.items && isNavItemActive(section, url)) {
      return section
    }
  }
  return null
}
