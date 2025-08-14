// /pages/Memos/index.js
import { getGlobalData } from '@/lib/db/getSiteData'
import { getMemos } from '@/lib/memos'          // 你自己的 Memos 数据拉取逻辑
import LayoutBase from '@/themes/heo/LayoutBase'
import LayoutMemos from '@/themes/heo/LayoutMemos'
import BLOG from '@/blog.config'

export async function getStaticProps({ locale }) {
  // 1. 站点级数据（导航、配置、locale 等）
  const global = await getGlobalData({ from: 'memos-index', locale })

  // 2. 说说数据：只取最近 30 条（按需调整）
  const memos = await getMemos({ limit: 30 })

  return {
    props: {
      ...global,   // 主题需要的全局 props
      memos        // 说说列表
    },
    revalidate: parseInt(BLOG.NEXT_REVALIDATE_SECOND)
  }
}

export default function MemosPage(props) {
  return (
    <LayoutBase {...props}>
      <LayoutMemos {...props} />
    </LayoutBase>
  )
}