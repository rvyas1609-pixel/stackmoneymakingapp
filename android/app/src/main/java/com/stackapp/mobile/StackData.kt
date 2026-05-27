package com.stackapp.mobile

data class MoneyMethod(
    val title: String,
    val category: String,
    val income: String,
    val difficulty: String,
    val icon: String,
    val description: String
)

data class Achievement(
    val title: String,
    val description: String,
    val icon: String,
    val xp: Int
)

data class Resource(
    val title: String,
    val type: String,
    val description: String
)

data class IncomeEntry(
    val amount: Double,
    val method: String,
    val date: String
)

data class Plan(
    val name: String,
    val price: String,
    val features: List<String>,
    val isPopular: Boolean = false,
    val cryptoPrice: String
)

object StackData {
    val plans = listOf(
        Plan("Free", "$0", listOf("3 playbooks per month", "50 AI prompts", "Community (read-only)", "Basic roadmap"), false, "0 BTC"),
        Plan("Starter", "$19", listOf("All weekly playbooks", "Full prompt vault", "Resource library", "AI Mentor (50 msgs)"), false, "0.0003 BTC"),
        Plan("Pro", "$49", listOf("Everything in Starter", "AI Mentor (unlimited)", "Masterclass videos", "Income tracker", "Priority support"), true, "0.0008 BTC"),
        Plan("Elite", "$149", listOf("Everything in Pro", "Private mastermind", "1-on-1 monthly call", "DFY templates"), false, "0.0025 BTC")
    )

    val cryptoWallets = mapOf(
        "BTC" to "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
        "ETH" to "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
        "SOL" to "HN7cABqLq46Es1ba9L695f3n4A7Z4uT9n4A7Z4uT9n4A"
    )

    val incomeEntries = listOf(
        IncomeEntry(450.0, "AI Content Agency", "Oct 12, 2025"),
        IncomeEntry(125.5, "AI YouTube Affiliate", "Oct 10, 2025"),
        IncomeEntry(672.0, "AI Prompt Packs", "Oct 05, 2025")
    )

    val resources = listOf(
        Resource("Cold Email Script (DFY)", "PDF", "High-converting templates for outreach"),
        Resource("Freelance Contract Template", "DOCX", "Legal protection for your services"),
        Resource("Client Onboarding Checklist", "Notion", "Professional setup for new clients"),
        Resource("AI Tools Comparison Sheet", "XLSX", "Pricing and feature breakdown"),
        Resource("Content Calendar Template", "Notion", "Organize your social media posting"),
        Resource("Revenue Tracker", "XLSX", "Detailed log for your income sources"),
        Resource("Social Media Strategy", "PDF", "Step-by-step growth framework"),
        Resource("Prompt Engineering Guide", "PDF", "How to get better results from AI"),
        Resource("Agency Pricing Calculator", "XLSX", "Calculate your margins and rates"),
        Resource("YouTube Script Template", "DOCX", "Structure for high-retention videos")
    )

    val levels = listOf(
        "Broke", "Curious", "Hustler", "Builder", "Grinder", 
        "Earner", "Stacker", "Operator", "Empire", "Legend"
    )

    val achievements = listOf(
        Achievement("First Stack", "Log first income", "💰", 500),
        Achievement("Prompt Wizard", "Use 100 prompts", "✨", 500),
        Achievement("Method Master", "Complete 5 playbooks", "🏆", 1000),
        Achievement("Streak King", "30-day streak", "🔥", 2000),
        Achievement("\$1K Club", "Hit \$1K total earned", "💎", 5000)
    )

    val methods = listOf(
        // AI Content & Media
        MoneyMethod("AI Content Agency", "AI Content & Media", "$1K–$8K", "Intermediate", "🤖", "Create + sell AI content to businesses."),
        MoneyMethod("AI YouTube Automation", "AI Content & Media", "$500–$5K", "Beginner", "📺", "Faceless channels using AI scripts + voiceover."),
        MoneyMethod("AI TikTok Creativity", "AI Content & Media", "$200–$3K", "Beginner", "📱", "Monetize TikTok with AI-made videos."),
        MoneyMethod("AI Newsletter Business", "AI Content & Media", "$500–$10K", "Intermediate", "📧", "Weekly AI-curated newsletters with sponsorships."),
        MoneyMethod("AI Ghostwriting", "AI Content & Media", "$2K–$15K", "Intermediate", "✍️", "Write content for influencers using Claude/GPT."),
        MoneyMethod("AI Podcast Production", "AI Content & Media", "$1K–$5K", "Beginner", "🎙️", "Edit + produce podcasts with AI tools."),
        MoneyMethod("AI Short-Form Clips", "AI Content & Media", "$2K–$8K", "Intermediate", "🎬", "Repurpose long videos into viral shorts."),
        MoneyMethod("AI Blog + SEO Farm", "AI Content & Media", "$500–$20K", "Advanced", "🌐", "Niche sites with AI-written SEO content."),
        MoneyMethod("AI Children's Book Author", "AI Content & Media", "$200–$3K", "Beginner", "📖", "Write + illustrate kids books with AI."),
        MoneyMethod("AI Music Generation", "AI Content & Media", "$300–$5K", "Beginner", "🎵", "Create + license AI music."),

        // Freelancing & Services
        MoneyMethod("AI-Powered Copywriting", "Freelancing", "$3K–$15K", "Intermediate", "📝", "Write sales pages, ads, emails with AI help."),
        MoneyMethod("AI Video Editing Service", "Freelancing", "$2K–$10K", "Intermediate", "✂️", "Edit client videos using Descript, Runway."),
        MoneyMethod("AI Thumbnail Design", "Freelancing", "$1K–$5K", "Beginner", "🎨", "Design viral thumbnails with Midjourney + Canva."),
        MoneyMethod("AI Social Media Manager", "Freelancing", "$1K–$6K", "Beginner", "📱", "Manage accounts using scheduling + AI tools."),
        MoneyMethod("AI Resume Writer", "Freelancing", "$500–$3K", "Beginner", "📄", "Optimize resumes using Claude."),
        MoneyMethod("AI Customer Service Bot", "Freelancing", "$2K–$10K", "Intermediate", "💬", "Build + sell chatbots to local businesses."),
        MoneyMethod("AI Translation Service", "Freelancing", "$500–$4K", "Beginner", "🌍", "Translate content using DeepL + AI."),

        // Digital Products
        MoneyMethod("AI Prompt Packs", "Digital Products", "$200–$5K", "Beginner", "📦", "Sell prompt bundles on Gumroad/Etsy."),
        MoneyMethod("AI Template Marketplace", "Digital Products", "$500–$8K", "Beginner", "📑", "Notion, Airtable, ClickUp templates."),
        MoneyMethod("AI eBook Publishing", "Digital Products", "$200–$3K", "Beginner", "📚", "Write + sell niche ebooks on Amazon KDP."),
        MoneyMethod("AI Course Creator", "Digital Products", "$1K–$20K", "Intermediate", "🎓", "Build + sell mini courses with AI content."),
        MoneyMethod("AI Stock Photography", "Digital Products", "$100–$2K", "Beginner", "📸", "Generate + sell AI images on Shutterstock."),

        // Automation & SaaS
        MoneyMethod("AI Micro-SaaS Builder", "Automation", "$500–$20K", "Advanced", "🛠️", "Build tiny tools using GPT API + no-code."),
        MoneyMethod("AI Zapier Automation", "Automation", "$2K–$15K", "Intermediate", "⚡", "Build automations for businesses."),
        MoneyMethod("AI Lead Generation Tool", "Automation", "$1K–$10K", "Advanced", "🎯", "Build scrapers + enrichment tools."),
        MoneyMethod("AI Workflow Consultant", "Automation", "$3K–$20K", "Advanced", "📊", "Audit + automate business workflows."),

        // E-Commerce & Dropshipping
        MoneyMethod("AI Dropshipping 2.0", "E-Commerce", "$500–$10K", "Intermediate", "🚢", "AI product research + ad copy automation."),
        MoneyMethod("AI Etsy Digital Shop", "E-Commerce", "$200–$5K", "Beginner", "🛍️", "Sell AI art, planners, and templates."),
        MoneyMethod("AI Amazon FBA Research", "E-Commerce", "$1K–$20K", "Advanced", "📦", "Use AI to find winning products."),

        // Affiliate & Monetization
        MoneyMethod("AI Affiliate Blog", "Affiliate", "$500–$15K", "Intermediate", "🔗", "Build niche review sites with AI content."),
        MoneyMethod("AI Pinterest Affiliate", "Affiliate", "$200–$5K", "Beginner", "📌", "Drive affiliate traffic using AI-made pins."),
        MoneyMethod("AI YouTube Affiliate", "Affiliate", "$500–$8K", "Beginner", "📽️", "Review AI tools + earn commissions."),

        // Consulting & Creator
        MoneyMethod("AI Business Consultant", "Consulting", "$3K–$20K", "Advanced", "💼", "Help SMBs integrate AI into operations."),
        MoneyMethod("AI Career Coach", "Consulting", "$1K–$8K", "Intermediate", "🏁", "Help job seekers use AI for interviews."),
        MoneyMethod("AI Meme Page", "Creator Economy", "$200–$3K", "Beginner", "🤡", "Build viral meme pages + monetize."),
        MoneyMethod("AI Personal Brand", "Creator Economy", "$1K–$50K", "Advanced", "👑", "Build an audience that generates revenue.")
    )

    val promptCategories = listOf(
        "Copywriting", "Email Marketing", "Social Media", "Video Scripts",
        "Business Plans", "Sales & Outreach", "SEO & Content", "Coding",
        "Image Generation", "Personal Finance", "Research & Analysis"
    )
}
