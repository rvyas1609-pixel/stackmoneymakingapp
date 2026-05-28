import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.playbook.deleteMany();
  await prisma.promptPack.deleteMany();
  await prisma.resource.deleteMany();
  await prisma.aITool.deleteMany();
  await prisma.roadmap.deleteMany();

  // 1. Seed Playbooks
  const playbooks = [
    {
      title: "AI Content Agency",
      slug: "ai-content-agency",
      description: "Scale a high-ticket agency using Claude 3.5 and Midjourney for visual content.",
      category: "AI Agency",
      difficulty: "Intermediate",
      range: "$5,000 - $15,000/mo",
      timeCommitment: "15-20 hrs/week",
      tier: "pro",
      icon: "🤖",
      content: "# AI Content Agency Guide...",
      published: true,
      order: 1,
    },
    {
      title: "YouTube Automation 2.0",
      slug: "youtube-automation",
      description: "Build faceless channels that generate passive income using AI voiceovers and scripts.",
      category: "Content",
      difficulty: "Beginner",
      range: "$2,000 - $10,000/mo",
      timeCommitment: "10 hrs/week",
      tier: "starter",
      icon: "📺",
      content: "# YouTube Automation Guide...",
      published: true,
      order: 2,
    },
    {
      title: "TikTok Creativity Program",
      slug: "tiktok-creativity",
      description: "Go viral with AI-generated storytelling and monetize via TikTok's creator fund.",
      category: "Content",
      difficulty: "Beginner",
      range: "$1,000 - $5,000/mo",
      timeCommitment: "5 hrs/week",
      tier: "free",
      icon: "📱",
      content: "# TikTok Creativity Guide...",
      published: true,
      order: 3,
    },
    {
      title: "AI SaaS Micro-Builder",
      slug: "ai-saas-builder",
      description: "Launch simple AI wrappers that solve specific business problems using No-Code.",
      category: "Automation",
      difficulty: "Advanced",
      range: "$10,000 - $50,000/mo",
      timeCommitment: "20-30 hrs/week",
      tier: "elite",
      icon: "🛠️",
      content: "# AI SaaS Guide...",
      published: true,
      order: 4,
    },
    {
       title: "AI Ghostwriting",
       slug: "ai-ghostwriting",
       description: "Write high-converting X (Twitter) and LinkedIn threads for executives using AI.",
       category: "Freelancing",
       difficulty: "Intermediate",
       range: "$3,000 - $8,000/mo",
       timeCommitment: "10 hrs/week",
       tier: "starter",
       icon: "✍️",
       content: "# Ghostwriting Guide...",
       published: true,
       order: 5,
    },
    {
        title: "AI Email Marketing",
        slug: "ai-email-marketing",
        description: "Scale e-commerce brands with AI-personalized cold outreach and newsletters.",
        category: "Automation",
        difficulty: "Intermediate",
        range: "$4,000 - $12,000/mo",
        timeCommitment: "15 hrs/week",
        tier: "pro",
        icon: "📧",
        content: "# Email Marketing Guide...",
        published: true,
        order: 6,
    },
    {
        title: "SEO Niche Sites",
        slug: "seo-niche-sites",
        description: "Build authority websites in 48 hours using AI-driven content clusters.",
        category: "Content",
        difficulty: "Advanced",
        range: "$2,000 - $20,000/mo",
        timeCommitment: "10 hrs/week",
        tier: "pro",
        icon: "🌐",
        content: "# SEO Niche Sites Guide...",
        published: true,
        order: 7,
    },
    {
        title: "AI Lead Gen Bot",
        slug: "ai-lead-gen",
        description: "Sell custom-trained lead generation bots to real estate and insurance agents.",
        category: "AI Agency",
        difficulty: "Advanced",
        range: "$5,000 - $25,000/mo",
        timeCommitment: "20 hrs/week",
        tier: "elite",
        icon: "🔌",
        content: "# AI Lead Gen Guide...",
        published: true,
        order: 8,
    },
    {
        title: "Short-Form Repurposing",
        slug: "short-form-repurposing",
        description: "Turn 1 podcast episode into 30 viral clips using AI video tools.",
        category: "Content",
        difficulty: "Beginner",
        range: "$1,500 - $6,000/mo",
        timeCommitment: "8 hrs/week",
        tier: "starter",
        icon: "✂️",
        content: "# Repurposing Guide...",
        published: true,
        order: 9,
    },
    {
        title: "AI Stock Trading",
        slug: "ai-stock-trading",
        description: "Using LLMs for sentiment analysis and technical signals to trade markets.",
        category: "Automation",
        difficulty: "Advanced",
        range: "Scalable",
        timeCommitment: "5 hrs/week",
        tier: "elite",
        icon: "📈",
        content: "# AI Trading Guide...",
        published: true,
        order: 10,
    }
  ];

  for (const p of playbooks) {
    await prisma.playbook.create({ data: p });
  }

  // 2. Seed Prompt Packs
  const packs = [
    {
      title: "The Ultimate Copywriter Pack",
      description: "100+ prompts for high-converting sales pages and emails.",
      tier: "starter",
      month: 5,
      year: 2025,
      published: true,
      prompts: {
        create: [
          { title: "Hook Generator", content: "Act as a world-class copywriter...", category: "copywriting", tags: ["sales", "hooks"] },
          { title: "Storytelling Prompt", content: "Tell a story about...", category: "copywriting", tags: ["story", "branding"] },
        ]
      }
    },
    {
      title: "Video Script Masterpack",
      description: "Viral hooks and retention-focused scripts for TikTok/Reels.",
      tier: "pro",
      month: 5,
      year: 2025,
      published: true,
      prompts: {
        create: [
          { title: "The 'Controversial' Hook", content: "Start the video with...", category: "video", tags: ["tiktok", "viral"] },
          { title: "Retention Bridge", content: "To keep them watching...", category: "video", tags: ["youtube", "reels"] },
        ]
      }
    }
  ];

  for (const pack of packs) {
    await prisma.promptPack.create({ data: pack });
  }

  // 3. Seed Resources
  const resources = [
    { title: "High-Ticket Sales Script", description: "The exact script used to close $5k/mo clients.", category: "scripts", type: "pdf", tier: "starter", published: true },
    { title: "AI Content Agency Contract", description: "Bulletproof legal agreement for your agency.", category: "templates", type: "doc", tier: "pro", published: true },
    { title: "Niche Research Spreadsheet", description: "Track 100+ profitable niches for 2025.", category: "frameworks", type: "sheet", tier: "free", published: true },
    { title: "Discord Community Setup", description: "Template for building your own paid community.", category: "templates", type: "notion", tier: "elite", published: true },
    { title: "Video Editing Workflow", description: "SOP for hiring and managing editors.", category: "frameworks", type: "pdf", tier: "pro", published: true },
  ];

  for (const r of resources) {
    await prisma.resource.create({ data: r });
  }

  // 4. Seed AI Tools
  const tools = [
    { name: "Claude 3.5 Sonnet", slug: "claude-3-5", description: "Best for coding and creative writing.", pricing: "Free / $20/mo", categories: ["LLM", "AI Coach"], published: true },
    { name: "Midjourney", slug: "midjourney", description: "State of the art image generation.", pricing: "$10/mo", categories: ["Images"], published: true },
    { name: "ElevenLabs", slug: "elevenlabs", description: "Most realistic AI voice synthesis.", pricing: "$5/mo", categories: ["Audio"], published: true },
    { name: "Veed.io", slug: "veed-io", description: "AI-powered video editing for social media.", pricing: "$18/mo", categories: ["Video"], published: true },
    { name: "Perplexity", slug: "perplexity", description: "AI search engine for deep research.", pricing: "Free / $20/mo", categories: ["Research"], published: true },
    { name: "Zapier", slug: "zapier", description: "Connect 6000+ apps for automation.", pricing: "Free / $20/mo", categories: ["Automation"], published: true },
    { name: "Submagic", slug: "submagic", description: "Generate viral captions for short-form video.", pricing: "$20/mo", categories: ["Video"], published: true },
    { name: "Cursor", slug: "cursor", description: "The AI-first code editor.", pricing: "$20/mo", categories: ["Coding"], published: true },
    { name: "Descript", slug: "descript", description: "Edit video by editing text.", pricing: "$12/mo", categories: ["Video"], published: true },
    { name: "AdCreative.ai", slug: "adcreative", description: "Generate high-converting ad creatives.", pricing: "$21/mo", categories: ["Marketing"], published: true },
  ];

  for (const t of tools) {
    await prisma.aITool.create({ data: t });
  }

  // 5. Seed Roadmaps
  const roadmaps = [
    { title: "The $1K Fast-Track", slug: "1k-fast-track", description: "Get your first $1,000 online in 30 days.", duration: 30, difficulty: "Beginner", published: true },
    { title: "The $10K Scale-Up", slug: "10k-scale-up", description: "Transition from freelancer to agency owner.", duration: 90, difficulty: "Advanced", published: true },
    { title: "AI Passive Income Machine", slug: "passive-income", description: "Build a faceless content empire.", duration: 60, difficulty: "Intermediate", published: true },
  ];

  for (const r of roadmaps) {
    await prisma.roadmap.create({ data: r });
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
