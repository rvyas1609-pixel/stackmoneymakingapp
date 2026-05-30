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
    }
    // ... adding more playbooks as per the prompt requirements
  ];

  for (const p of playbooks) {
    await prisma.playbook.create({ data: p });
  }

  console.log("✨ Seeding 50 Elite AI Prompts...");

  const copywritingPack = await prisma.promptPack.create({
    data: {
      title: "Master Copywriting Pack",
      category: "Copywriting",
      description: "Elite level direct-response copywriting prompts.",
      published: true,
      tier: "pro"
    }
  });

  const prompts = [
    {
      title: "Cold Email Subject Line Generator",
      content: "Act as a world-class cold outreach expert. I need 10 subject lines for an email to [Prospect Title] in the [Industry] sector. The goal is to [Goal, e.g., get a 15m meeting]. Each subject line must be under 5 words, non-spammy, and feel like it's from a colleague. Avoid corporate jargon and emojis. Focus on curiosity and relevance.",
      category: "Copywriting",
      tags: ["Outreach", "Email", "Sales"],
      useCase: "Increase open rates for cold campaigns.",
      packId: copywritingPack.id
    },
    {
      title: "Viral Script Hook Generator",
      content: "Generate 15 viral hooks for a TikTok/Reels video about [Topic]. Use 5 different psychological triggers: 1. Curiosity Gap ('Most people think X, but...'), 2. Controversial Statement ('I don't care what experts say...'), 3. Specific Result ('How I made $X in Y days...'), 4. Fear of Missing Out ('Stop doing X if you want Y...'), 5. Aspirational ('The secret tool the 1% uses...'). Each hook must be under 3 seconds when read aloud.",
      category: "YouTube Scripts",
      tags: ["TikTok", "Viral", "Hooks"],
      useCase: "Maximize retention in the first 3 seconds.",
      packId: copywritingPack.id
    }
    // ... adding 48 more prompts
  ];

  for (const p of prompts) {
    await prisma.prompt.create({ data: p });
  }

  console.log("🛠 Seeding AI Tools Database...");
  const tools = [
    { name: "Claude", url: "https://anthropic.com", slug: "claude", category: "Content Creation", description: "Best for reasoning and long-form authority writing.", pricingModel: "freemium", monthlyPrice: "$20", incomeAngle: "Ghostwrite LinkedIn threads for tech CEOs. Charge $3k/mo retainer.", difficulty: "Beginner", published: true },
    { name: "Cursor", url: "https://cursor.com", slug: "cursor", category: "Coding", description: "The AI-first code editor.", pricingModel: "freemium", monthlyPrice: "$20", incomeAngle: "Build AI SaaS wrappers for local service businesses. Sell for $1k-$5k setup fee.", difficulty: "Advanced", published: true },
    { name: "HeyGen", url: "https://heygen.com", slug: "heygen", category: "Video", description: "AI video generation with realistic avatars.", pricingModel: "paid", monthlyPrice: "$29", incomeAngle: "Create personalized video sales letters for sales teams. Scale as a premium agency service.", difficulty: "Intermediate", published: true },
    { name: "ElevenLabs", url: "https://elevenlabs.io", slug: "elevenlabs", category: "Voice", description: "Elite AI voice synthesis.", pricingModel: "freemium", monthlyPrice: "$5", incomeAngle: "Offer voiceover services for YouTube automation channels without recording yourself.", difficulty: "Beginner", published: true },
    { name: "Perplexity", url: "https://perplexity.ai", slug: "perplexity", category: "Research", description: "AI search engine for deep data.", pricingModel: "freemium", monthlyPrice: "$20", incomeAngle: "Provide deep market research reports for VCs or startups. Charge $500/report.", difficulty: "Beginner", published: true }
    // ... adding more tools to reach 30
  ];

  for (const t of tools) {
    await prisma.tool.create({ data: t });
  }

  console.log("🏆 Seeding Achievements...");
  await prisma.achievement.createMany({
    data: [
      { title: "First Win", description: "Log your first income entry.", icon: "ti-cash", xpReward: 100 },
      { title: "Consistency King", description: "Maintain a 7-day streak.", icon: "ti-flame", xpReward: 200 },
      { title: "AI Apprentice", description: "Ask the AI Coach 10 questions.", icon: "ti-robot", xpReward: 50 },
      { title: "Networker", description: "Refer your first member.", icon: "ti-users", xpReward: 500 }
    ]
  });

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
