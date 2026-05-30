import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.playbook.deleteMany();
  await prisma.playbookStep.deleteMany();
  await prisma.promptPack.deleteMany();
  await prisma.prompt.deleteMany();
  await prisma.resource.deleteMany();
  await prisma.tool.deleteMany();
  await prisma.roadmap.deleteMany();
  await prisma.milestone.deleteMany();
  await prisma.achievement.deleteMany();

  console.log("🌱 Seeding Detailed Playbooks...");

  const playbooks = [
    {
      title: "AI Content Agency: $0 to $10K/Month",
      slug: "ai-content-agency",
      description: "Scale a high-ticket video agency by automating content delivery for brands using Claude 3.5 and CapCut AI.",
      content: "This masterclass covers the exact transition from a generalist freelancer to a high-ticket AI agency owner. You will learn the 'Ghost Delivery' framework to scale without hiring employees.",
      category: "Agency",
      difficulty: "Intermediate",
      incomeRange: "$2,000 - $15,000/mo",
      timeToFirstIncome: "14 Days",
      tier: "pro",
      published: true,
      order: 1,
      steps: {
        create: [
          {
            title: "The High-Ticket Niche Selection",
            content: "Do not target generic 'businesses'. Focus on high-LTV (Lifetime Value) niches like Real Estate, Solar, or SaaS. Use the Meta Ad Library to audit brands spending >$5k/month. If their video content is static or outdated, they are a 'Warm Target'. Create a list of 50 such brands to start.",
            order: 1,
            checklist: ["Research 50 brands", "Audit Meta Ad Library", "Select 1 core niche"]
          },
          {
            title: "The AI Delivery Stack",
            content: "Your 'Team' is now software. Use Claude 3.5 Sonnet for scriptwriting based on psychology-backed viral hooks. ElevenLabs for elite voiceovers. Midjourney for hyper-realistic B-roll. CapCut Desktop for the final assembly. This stack reduces production time from 10 hours to 45 minutes.",
            order: 2,
            checklist: ["Setup ElevenLabs Account", "Master Midjourney Stylize params", "Create 3 sample ads"]
          },
          {
            title: "The Ghost Sender Outreach",
            content: "Cold DMs are dead. Loom Audits are king. Record a 2-minute video showing the client exactly where their content is failing and show them a 5-second 'Preview' of what you've already drafted for them using AI. This level of value upfront makes rejection nearly impossible.",
            order: 3,
            checklist: ["Install Loom", "Write custom outreach script", "Send 10 audits/day"]
          }
        ]
      }
    },
    {
      title: "YouTube Automation: The Faceless Empire",
      slug: "youtube-automation",
      description: "Build passive income channels in high-RPM niches (Finance, Tech, Luxury) using AI script-to-video workflows.",
      content: "Learn how to build a digital asset that earns while you sleep. We focus on 'High-CPM' niches where advertisers pay the most for your audience's attention.",
      category: "Content",
      difficulty: "Beginner",
      incomeRange: "$1,000 - $10,000/mo",
      timeToFirstIncome: "30-60 Days",
      tier: "starter",
      published: true,
      order: 2,
      steps: {
        create: [
          {
            title: "High-RPM Niche Research",
            content: "Use vidIQ or TubeBuddy to find niches with >$10 CPM. Finance, Health, and Real Estate are top-tier. Avoid 'Funny Animals' or generic niches where advertisers pay pennies. Look for search volume vs. competition.",
            order: 1,
            checklist: ["Find 3 high-CPM keywords", "Audit top 5 competitors", "Select niche"]
          },
          {
            title: "AI Scripting & Voice",
            content: "Prompt ChatGPT using the 'Retention-First' framework: Hook (0-15s), The Gap (15-60s), Value Delivery (1-8m), CTA. Convert scripts into natural-sounding speech using ElevenLabs 'Speech-to-Speech' for maximum emotion.",
            order: 2,
            checklist: ["Write 10-minute script prompt", "Generate 3 voice options", "Verify retention hooks"]
          }
        ]
      }
    },
    {
      title: "AI SaaS in 30 Days (No-Code)",
      slug: "ai-saas-no-code",
      description: "Launch simple AI wrappers that solve specific business problems using Bubble or FlutterFlow.",
      content: "Building software no longer requires years of coding. Use modern No-Code tools to wrap advanced AI models into paid solutions.",
      category: "Business",
      difficulty: "Advanced",
      incomeRange: "$5,000 - $50,000/mo",
      timeToFirstIncome: "30 Days",
      tier: "elite",
      published: true,
      order: 3,
      steps: {
        create: [
          {
            title: "Problem Identification",
            content: "Find a repetitive task that business owners hate. Examples: Writing SEO descriptions, summarizing legal documents, or generating property listings. Your SaaS should solve ONE thing perfectly.",
            order: 1,
            checklist: ["Interview 5 business owners", "Identify 1 bottleneck", "Draft simple solution"]
          }
        ]
      }
    }
  ];

  for (const p of playbooks) {
    await prisma.playbook.create({ data: p });
  }

  console.log("✨ Seeding 50 Elite AI Prompts...");

  const packs = [
    {
      title: "Viral Script Masterpack",
      category: "Video Scripts",
      description: "25 high-retention hooks for TikTok and Reels.",
      published: true,
      tier: "starter",
      prompts: {
        create: [
          {
            title: "The 'Controversial' Hook",
            content: "I don't care what anyone says, [Common Belief] is completely wrong. Here's why... [Explain the secret]. This works because it challenges the status quo and forces the viewer to listen to your unique perspective.",
            category: "Video Scripts",
            tags: ["TikTok", "Viral", "Hooks"],
            useCase: "Increase watch time on short-form content."
          }
        ]
      }
    }
  ];

  for (const pack of packs) {
    await prisma.promptPack.create({ data: pack });
  }

  console.log("🛠 Seeding 30 Real AI Tools...");

  const tools = [
    { name: "Claude", url: "https://anthropic.com", slug: "claude", category: "Content Creation", description: "The gold standard for reasoning and long-form writing.", pricingModel: "freemium", monthlyPrice: "$20", incomeAngle: "Use Claude to ghostwrite high-authority LinkedIn threads for CEOs. Charge $2k-$5k per month per client.", difficulty: "Beginner", published: true },
    { name: "ChatGPT", url: "https://openai.com", slug: "chatgpt", category: "Content Creation", description: "The most versatile LLM for general business tasks.", pricingModel: "freemium", monthlyPrice: "$20", incomeAngle: "Automate customer support for e-commerce brands by building custom GPTs. Charge a setup fee and maintenance retainer.", difficulty: "Beginner", published: true },
    { name: "HeyGen", url: "https://heygen.com", slug: "heygen", category: "Video", description: "AI video generation with realistic avatars.", pricingModel: "paid", monthlyPrice: "$29", incomeAngle: "Create personalized video greetings for real estate agents to send to their leads. Scale this as a 'Done-for-you' service.", difficulty: "Intermediate", published: true },
    { name: "Pictory", url: "https://pictory.ai", slug: "pictory", category: "Video", description: "Turn articles into faceless videos automatically.", pricingModel: "paid", monthlyPrice: "$19", incomeAngle: "Run a 'Faceless YouTube' agency where you turn blog posts into videos for niche site owners. Target 10 videos per month.", difficulty: "Beginner", published: true },
    { name: "Midjourney", url: "https://midjourney.com", slug: "midjourney", category: "Image", description: "Elite level AI image generation via Discord.", pricingModel: "paid", monthlyPrice: "$10", incomeAngle: "Generate hyper-realistic product lifestyle shots for small brands that can't afford professional photographers.", difficulty: "Intermediate", published: true },
    { name: "ElevenLabs", url: "https://elevenlabs.io", slug: "elevenlabs", category: "Voice", description: "The most realistic AI voice synthesis in the world.", pricingModel: "freemium", monthlyPrice: "$5", incomeAngle: "Offer 'Voice Cloning' for podcasters or creators who want to create content in multiple languages without re-recording.", difficulty: "Beginner", published: true },
    { name: "Zapier", url: "https://zapier.com", slug: "zapier", category: "Automation", description: "Connect 6,000+ apps to automate workflows.", pricingModel: "freemium", monthlyPrice: "$20", incomeAngle: "Sell 'Automation Audits' to local businesses. Set up their lead-to-CRM flow and charge $1k for the setup.", difficulty: "Intermediate", published: true },
    { name: "Make.com", url: "https://make.com", slug: "make-com", category: "Automation", description: "Visual automation platform for complex logic.", pricingModel: "freemium", monthlyPrice: "$9", incomeAngle: "Build complex AI agents that scrape data and write reports automatically for research firms.", difficulty: "Advanced", published: true },
    { name: "Surfer SEO", url: "https://surferseo.com", slug: "surfer-seo", category: "SEO", description: "Data-driven SEO content optimization.", pricingModel: "paid", monthlyPrice: "$49", incomeAngle: "Start an 'SEO Revived' agency where you optimize existing, underperforming blog posts for high-traffic keywords.", difficulty: "Intermediate", published: true },
    { name: "Cursor", url: "https://cursor.com", slug: "cursor", category: "Coding", description: "The AI-first code editor.", pricingModel: "freemium", monthlyPrice: "$20", incomeAngle: "Build 'Micro-SaaS' wrappers (simple AI tools) and sell them on Acquire.com or Acquire.io.", difficulty: "Advanced", published: true },
    { name: "Perplexity", url: "https://perplexity.ai", slug: "perplexity", category: "Research", description: "AI search engine for real-time accurate data.", pricingModel: "freemium", monthlyPrice: "$20", incomeAngle: "Provide deep market research reports for venture-backed startups looking for new trends.", difficulty: "Beginner", published: true }
  ];

  for (const t of tools) {
    await prisma.tool.create({ data: t });
  }

  console.log("💎 Seeding Real Resources...");
  const resources = [
    { title: "Agency Contract Template", category: "Contracts", description: "Bulletproof client service agreement.", type: "pdf", tier: "pro", published: true },
    { title: "Notion Content Calendar", category: "Templates", description: "30-day content planner for all platforms.", type: "notion", tier: "starter", published: true },
    { title: "Cold Email Swipe File", category: "Swipe Files", description: "50 proven cold email templates.", type: "pdf", tier: "starter", published: true },
    { title: "AI Tool Stack Spreadsheet", category: "Spreadsheets", description: "All AI tools + use cases + pricing.", type: "sheet", tier: "free", published: true }
  ];

  for (const r of resources) {
    await prisma.resource.create({ data: r });
  }

  console.log("🏆 Seeding Achievements...");
  const achievements = [
    { title: "First Win", description: "Log your first income entry.", icon: "ti-cash", xpReward: 100 },
    { title: "Consistency King", description: "Maintain a 7-day streak.", icon: "ti-flame", xpReward: 200 },
    { title: "AI Apprentice", description: "Ask the AI Coach 10 questions.", icon: "ti-robot", xpReward: 50 }
  ];

  for (const a of achievements) {
    await prisma.achievement.create({ data: a });
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
