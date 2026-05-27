'use client'
import Link from 'next/link'

// Simple admin sidebar. Styled navy + gold per requirements. Expand as needed.
export default function AdminSidebar() {
  const sections = [
    { label: 'Overview', href: '/admin' },
    { label: 'Content', href: '/admin/content' },
    { label: 'Prompts', href: '/admin/prompts' },
    { label: 'Resources', href: '/admin/tools' },
    { label: 'Roadmaps', href: '/admin/roadmaps' },
    { label: 'Users', href: '/admin/users' },
    { label: 'Subscriptions', href: '/admin/subscriptions' },
    { label: 'Gamification', href: '/admin/gamification' },
    { label: 'AI Mentor', href: '/admin/ai-mentor' },
    { label: 'Announcements', href: '/admin/announcements' },
    { label: 'Homepage', href: '/admin/homepage' },
    { label: 'Navigation', href: '/admin/navigation' },
    { label: 'Testimonials', href: '/admin/testimonials' },
    { label: 'FAQ', href: '/admin/faq' },
    { label: 'Pricing', href: '/admin/pricing' },
    { label: 'Discounts', href: '/admin/discounts' },
    { label: 'Settings', href: '/admin/settings' },
    { label: 'Analytics', href: '/admin/analytics' }
  ]

  return (
    <aside className="w-64 h-screen sticky top-0 bg-[#041226] border-r border-[#122235] p-4">
      <div className="mb-6 flex items-center gap-2">
        <div className="text-2xl font-bold text-[#FFD166]">STACK</div>
      </div>
      <nav className="flex flex-col gap-1">
        {sections.map((s) => (
          <Link key={s.href} href={s.href} className="px-3 py-2 rounded hover:bg-[#0b2336]">
            {s.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
