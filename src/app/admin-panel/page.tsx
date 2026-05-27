'use client';

import React, { useState, useEffect } from 'react';

// ==========================================
// TYPE DEFINITIONS & CONFIG STATE INTERFACE
// ==========================================

export type SubscriptionTier = 'free' | 'starter' | 'pro' | 'elite';

export interface PlaybookStep {
  id: string;
  number: number;
  heading: string;
  body: string;
}

export interface Playbook {
  id: string;
  title: string;
  description: string;
  slug: string;
  category: string;
  tier: SubscriptionTier;
  stepCount: number;
  estimatedEarnings: string;
  content: string;
  stepsList: string[];
}

export interface Prompt {
  id: string;
  title: string;
  category: string;
  tier: SubscriptionTier;
  content: string;
  tags: string[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'template' | 'script' | 'framework';
  tier: SubscriptionTier;
  downloadUrl: string;
  description: string;
}

export interface AITool {
  id: string;
  name: string;
  category: string;
  tutorialLink: string;
  incomeAngle: string;
  pricing: string;
}

export interface Achievement {
  id: string;
  name: string;
  icon: string;
  xpReward: number;
  condition: string;
}

export interface StackConfig {
  branding: {
    appName: string;
    tagline: string;
    primaryColor: string;
    accentColor: string;
    backgroundColor: string;
    fontFamily: string;
    logoEmoji: string;
    darkModeDefault: boolean;
  };
  features: {
    promptVault: boolean;
    resourceLibrary: boolean;
    aiToolsDb: boolean;
    roadmaps: boolean;
    gamification: boolean;
    communityTab: boolean;
    aiMentor: boolean;
    leaderboard: boolean;
    referralSystem: boolean;
    marketplace: boolean;
  };
  pricing: {
    plans: {
      free: { name: string; price: string; description: string; ctaText: string; enabled: boolean; features: string[] };
      starter: { name: string; price: string; description: string; ctaText: string; enabled: boolean; features: string[] };
      pro: { name: string; price: string; description: string; ctaText: string; enabled: boolean; features: string[] };
      elite: { name: string; price: string; description: string; ctaText: string; enabled: boolean; features: string[] };
    };
  };
  content: {
    playbooks: Playbook[];
    prompts: Prompt[];
    resources: Resource[];
    aiTools: AITool[];
  };
  roadmap: {
    milestones: {
      starter: { title: string; target: string; steps: string[]; playbooks: string[] };
      growth: { title: string; target: string; steps: string[]; playbooks: string[] };
      scale: { title: string; target: string; steps: string[]; playbooks: string[] };
    };
  };
  aiMentor: {
    agentName: string;
    tone: string;
    personality: string;
    systemPrompt: string;
    showStarterPrompts: boolean;
    starterPrompts: string[];
    responseStyle: 'bullets' | 'paragraphs' | 'mixed';
    blockedTopics: string[];
    temperature: number;
    maxTokens: number;
  };
  gamification: {
    xpValues: {
      completePlaybookStep: number;
      savePrompt: number;
      downloadResource: number;
      dailyLogin: number;
      referral: number;
    };
    levels: { level: number; xpNeeded: number }[];
    achievements: Achievement[];
    leaderboardVisible: boolean;
  };
  community: {
    discordInvite: string;
    showWidget: boolean;
    memberCount: number;
    announcement: {
      enabled: boolean;
      text: string;
    };
  };
  email: {
    welcomeSubject: string;
    welcomeBody: string;
    upgradeSubject: string;
    upgradeBody: string;
    notifyOnStep: boolean;
    notifyOnAchievement: boolean;
    notifyOnWeeklyDigest: boolean;
  };
  integrations: {
    clerkKey: string;
    stripeKey: string;
    claudeKey: string;
    openaiKey: string;
    discordToken: string;
    resendKey: string;
  };
  socials: {
    id: string;
    platform: string;
    url: string;
    icon: string;
    visible: boolean;
  }[];
  policies: {
    termsOfService: string;
    privacyPolicy: string;
    refundPolicy: string;
  };
  users: {
    id: string;
    email: string;
    displayName: string;
    tier: SubscriptionTier;
    xp: number;
    level: number;
    joinedAt: string;
  }[];
}

// ==========================================
// DEFAULT CONFIGURATION STATE DATA
// ==========================================

const DEFAULT_CONFIG: StackConfig = {
  branding: {
    appName: 'STACK',
    tagline: 'Your AI Money Operating System',
    primaryColor: '#C8A869',
    accentColor: '#34C792',
    backgroundColor: '#0C0C0B',
    fontFamily: 'serif',
    logoEmoji: '💰',
    darkModeDefault: true,
  },
  features: {
    promptVault: true,
    resourceLibrary: true,
    aiToolsDb: true,
    roadmaps: true,
    gamification: true,
    communityTab: true,
    aiMentor: true,
    leaderboard: true,
    referralSystem: true,
    marketplace: false,
  },
  pricing: {
    plans: {
      free: {
        name: 'Free Access',
        price: '0',
        description: 'Get started and explore the roadmaps',
        ctaText: 'Start Free Journey',
        enabled: true,
        features: ['Weekly roadmap view', 'Limited preview playbooks', 'Join Community channel'],
      },
      starter: {
        name: 'Starter Pro',
        price: '19',
        description: 'Perfect for beginners eager to make their first $1K',
        ctaText: 'Upgrade to Starter',
        enabled: true,
        features: ['Everything in Free', 'Access 15+ Core Playbooks', 'Prompt Vault (limited search)', 'Discord basic role'],
      },
      pro: {
        name: 'Pro Member',
        price: '49',
        description: 'Our most popular tier for full-time online builders',
        ctaText: 'Go Pro Now',
        enabled: true,
        features: ['Everything in Starter', '1,000+ AI Prompts database', 'Full Resource Library templates', 'Monthly live calls with mentors', 'AI Tools Database with premium guides'],
      },
      elite: {
        name: 'Elite Mastermind',
        price: '149',
        description: 'Direct 1-on-1 access and maximum acceleration templates',
        ctaText: 'Secure Elite Seat',
        enabled: true,
        features: ['Everything in Pro', 'Private mastermind mastermind role', '1-on-1 custom roadmap adjustments', 'Direct Discord DM access to mentors', 'Exclusive weekly automation drops'],
      },
    },
  },
  content: {
    playbooks: [
      {
        id: 'pb-1',
        title: 'AI Content Agency',
        description: 'Create high-volume vertical video content and captions for local businesses utilizing modern AI generation platforms.',
        slug: 'ai-content-agency',
        category: 'agency',
        tier: 'starter',
        stepCount: 4,
        estimatedEarnings: '$1,500 - $3,000/mo',
        content: 'Create high-volume vertical video content and captions for local businesses utilizing modern AI generation platforms.',
        stepsList: [
          'Identify 10 local businesses with active Instagram accounts but zero Reels or vertical videos.',
          'Generate 3 sample short videos using CapCut templates or Claude scripts.',
          'Pitch them on a trial pack: 5 vertical videos for $150 (takes 2 hours with AI tools).',
          'Onboard them into a monthly retainer contract of $800/mo for 20 videos.'
        ]
      },
      {
        id: 'pb-2',
        title: 'Digital Products Vault',
        description: 'Build and sell structured Notion templates, custom ChatGPT assistants, and database files on Gumroad.',
        slug: 'digital-products-vault',
        category: 'products',
        tier: 'pro',
        stepCount: 3,
        estimatedEarnings: '$800 - $4,000/mo',
        content: 'Build and sell structured Notion templates, custom ChatGPT assistants, and database files on Gumroad.',
        stepsList: [
          'Choose a highly specific problem (e.g. Notion tracker for freelance video editors).',
          'Build the product draft in 48 hours and package with tutorial loom videos.',
          'Launch on Gumroad and promote using targeted social media snippets and threads.'
        ]
      },
      {
        id: 'pb-3',
        title: 'AI Automation Freelancing',
        description: 'Design and sell Make.com and Zapier automation flows to existing agencies who want to trim operational costs.',
        slug: 'ai-automation-freelance',
        category: 'automation',
        tier: 'elite',
        stepCount: 4,
        estimatedEarnings: '$3,000 - $8,000/mo',
        content: 'Design and sell Make.com and Zapier automation flows to existing agencies who want to trim operational costs.',
        stepsList: [
          'Learn the basic triggers and routers in Make.com for email auto-replies.',
          'Build a pre-packaged template for automated lead triage and CRM updates.',
          'Offer agencies a free operations audit to find bottlenecks they can automate.',
          'Charge a $1,500 setup fee and $200/mo support retainer.'
        ]
      }
    ],
    prompts: [
      {
        id: 'pr-1',
        title: 'Gen-Z Viral Hook Generator',
        category: 'copywriting',
        tier: 'starter',
        content: 'Generate 10 highly engaging vertical video hook variations based on the following topic. Use slang, contrast, and shock-factor formatting that captures attention in under 1.5 seconds. TOPIC: {topic}',
        tags: ['shorts', 'reels', 'hooks', 'copywriting']
      },
      {
        id: 'pr-2',
        title: 'SEO Long-Form Outline Architect',
        category: 'marketing',
        tier: 'pro',
        content: 'Act as an expert SEO writer. Analyze the competitor keyword {keyword} and generate a fully optimized H2/H3 article outline that satisfies search intent and maps out clear sections for high-converting lead magnets.',
        tags: ['seo', 'blogging', 'ranking', 'outlines']
      },
      {
        id: 'pr-3',
        title: 'Cold Email Lead Magnet Pitcher',
        category: 'business',
        tier: 'pro',
        content: 'Draft a short 3-sentence outreach email to {client_type} proposing a completely customized, pre-made AI automation workflow that solves their operations bottleneck. Keep it informal, direct, and zero fluff.',
        tags: ['outreach', 'sales', 'email', 'clients']
      }
    ],
    resources: [
      {
        id: 'res-1',
        title: 'High-Ticket Operations Triage.pdf',
        type: 'template',
        tier: 'pro',
        downloadUrl: '#',
        description: 'Complete client intake forms, onboarding templates, and service agreements ready to customize.'
      },
      {
        id: 'res-2',
        title: 'Make.com Client System.json',
        type: 'framework',
        tier: 'elite',
        downloadUrl: '#',
        description: 'Pre-built automation scenario blueprint that syncs Stripe payments to Discord roles instantly.'
      },
      {
        id: 'res-3',
        title: 'Gen-Z Video Editing Preset Packs',
        type: 'script',
        tier: 'starter',
        downloadUrl: '#',
        description: 'Dynamic zoom, sound effect, and keyframe template bundle for Premiere and CapCut.'
      }
    ],
    aiTools: [
      {
        id: 'tool-1',
        name: 'Claude 3.5 Sonnet',
        category: 'AI Assistant',
        tutorialLink: 'https://anthropic.com',
        incomeAngle: 'Writing scripts, coding landing pages, and formulating outreach templates at 10x speeds.',
        pricing: 'Free / $20/mo'
      },
      {
        id: 'tool-2',
        name: 'Make.com',
        category: 'Automation',
        tutorialLink: 'https://make.com',
        incomeAngle: 'Building background robots that sync client details, automate replies, and scale delivery.',
        pricing: 'Free / $9/mo'
      },
      {
        id: 'tool-3',
        name: 'v0 by Vercel',
        category: 'UI Design',
        tutorialLink: 'https://v0.dev',
        incomeAngle: 'Rapidly prototyping clean, premium modern react interfaces to pitch to tech clients.',
        pricing: 'Free / $20/mo'
      }
    ]
  },
  roadmap: {
    milestones: {
      starter: {
        title: '$0 → $1,000/mo',
        target: 'Validate your niche & earn your very first dollar online',
        steps: [
          'Choose 1 core skill: AI Copywriting, Automation, or Video Editing',
          'Complete the niche research playbook',
          'Create a single-page landing portfolio displaying 3 mock designs',
          'Build an active outreach list of 50 prospective customers'
        ],
        playbooks: ['AI Content Agency']
      },
      growth: {
        title: '$1,000 → $5,000/mo',
        target: 'Convert cold leads into loyal retainer agreements',
        steps: [
          'Send 15 personalized loom video proposals each day',
          'Productize your skill into a fixed-scope service bundle',
          'Secure 3 retainer clients at minimum $1,000/mo each',
          'Deploy automated invoices and onboarding scripts'
        ],
        playbooks: ['Digital Products Vault']
      },
      scale: {
        title: '$5,000 → $10,000/mo',
        target: 'Systemize workflows, hire assistants, and compound earnings',
        steps: [
          'Hire 1 junior video editor or VA to handle task execution',
          'Automate your full lead capture and client reports pipelines',
          'Sell high-ticket consultation upsells and mastermind entry',
          'Launch digital files store to generate passive royalty income'
        ],
        playbooks: ['AI Automation Freelancing']
      }
    }
  },
  aiMentor: {
    agentName: 'Claude Mentor',
    tone: 'Gen-Z Hype Coach',
    personality: 'Extremely energetic, highly motivating, using minimal corporate fluff, and constantly encouraging digital action.',
    systemPrompt: 'You are the Claude Mentor, a Gen-Z high-performance business coach helping creators hit $10k/month. Keep your answers punchy, dynamic, and action-oriented. Provide immediate, ultra-practical money methods, avoid corporate jargon, and reference the weekly playbooks whenever possible.',
    showStarterPrompts: true,
    starterPrompts: [
      'How do I land my first client as a 20yo?',
      'Suggest a fast AI side hustle to start today',
      'What pricing structure should I charge for Make automations?'
    ],
    responseStyle: 'mixed',
    blockedTopics: ['dropshipping', 'crypto trading', 'get rich quick', 'mlm'],
    temperature: 0.75,
    maxTokens: 500,
  },
  gamification: {
    xpValues: {
      completePlaybookStep: 150,
      savePrompt: 50,
      downloadResource: 100,
      dailyLogin: 50,
      referral: 500,
    },
    levels: [
      { level: 1, xpNeeded: 0 },
      { level: 2, xpNeeded: 500 },
      { level: 3, xpNeeded: 1200 },
      { level: 4, xpNeeded: 2500 },
      { level: 5, xpNeeded: 5000 },
    ],
    achievements: [
      { id: 'ach-1', name: 'First Dollar Made', icon: '🚀', xpReward: 300, condition: 'Unlock your first roadmap step' },
      { id: 'ach-2', name: 'Prompt Enthusiast', icon: '⚡', xpReward: 150, condition: 'Save 3 prompt configurations' },
      { id: 'ach-3', name: 'Deep Scholar', icon: '📚', xpReward: 500, condition: 'Complete all steps in a playbook' },
    ],
    leaderboardVisible: true,
  },
  community: {
    discordInvite: 'https://discord.gg/stack-mastermind',
    showWidget: true,
    memberCount: 5240,
    announcement: {
      enabled: true,
      text: '🚀 FLASH SALE: Elite tier prices increase in 48 hours. Secure direct mentorship locks now!',
    },
  },
  email: {
    welcomeSubject: 'Welcome to STACK — Time to build your cash machine 🚀',
    welcomeBody: 'Hey Builder,\n\nWelcome to STACK, the money operating system. You just unlocked access to raw, step-by-step business playbooks and premium AI prompts.\n\nYour first task: Go to your dashboard and complete Milestone Day 1. Let\'s make this year count.\n\nTalk soon,\nFounder, STACK',
    upgradeSubject: 'You are now an ELITE Builder 🏆',
    upgradeBody: 'Hey Builder,\n\nWelcome to the Elite Mastermind tier. You have officially unlocked direct 1-on-1 mentor support, private Discord categories, and daily operational drops.\n\nCheck your email shortly for your personal onboarding link and Discord role connection instructions.\n\nLet\'s scale to $10K/mo!',
    notifyOnStep: true,
    notifyOnAchievement: true,
    notifyOnWeeklyDigest: false,
  },
  integrations: {
    clerkKey: 'pk_live_clerk_5893a20d4efb',
    stripeKey: 'sk_live_stripe_994a320ce11b',
    claudeKey: 'sk-ant-api03-2483a90f',
    openaiKey: 'sk-proj-948f2920ce',
    discordToken: 'MTE5MjM4NDkwMTIzNDA',
    resendKey: 're_829fa20b41ce994',
  },
  socials: [
    { id: 'soc-1', platform: 'YouTube', url: 'https://youtube.com/stackapp', icon: '🎥', visible: true },
    { id: 'soc-2', platform: 'Twitter/X', url: 'https://twitter.com/stackapp', icon: '🐦', visible: true },
    { id: 'soc-3', platform: 'Instagram', url: 'https://instagram.com/stackapp', icon: '📸', visible: true },
    { id: 'soc-4', platform: 'TikTok', url: 'https://tiktok.com/@stackapp', icon: '📱', visible: true }
  ],
  policies: {
    termsOfService: '# Terms of Service\n\nWelcome to STACK. By accessing our weekly playbooks, prompt databases, resource templates, and simulated coaching, you agree to build your systems responsibly and work hard.\n\n1. MEMBERSHIP\nWe provide digital guides and tools. All sales are bound to our refund window.\n\n2. ACCOUNTS\nDo not share your license keys or membership logs with external builders. Sharing accounts is strictly prohibited.\n\n3. DISCLAIMER\nAll earnings figures are estimates. Your outcomes depend completely on your execution, niche, and client retention.',
    privacyPolicy: '# Privacy Policy\n\nYour privacy is crucial to STACK.\n\n1. DATA WE COLLECT\nWe collect email addresses, names, and workspace parameters to tailor your money-making roadmaps and prompt preferences.\n\n2. COOKIES\nWe use secure cookies to persist your dashboard custom styles, layout configurations, and auth states.\n\n3. DATA PROTECTION\nYour integration credentials and payment logs are encrypted using modern industry guidelines.',
    refundPolicy: '# Refund Policy\n\nWe stand fully behind the actionable power of STACK.\n\n* STARTER & PRO TIERS\nWe offer a strict 14-day no-questions-asked refund guarantee. If you have not found value or launched a client, contact support for a prompt refund.\n\n* ELITE MASTERMIND TIER\nDue to direct 1-on-1 mentoring scheduling and custom scenario creation assets, Elite masterminds are non-refundable after the first consultation call.'
  },
  users: [
    { id: 'usr-1', email: 'sarah.creations@gmail.com', displayName: 'Sarah (Elite Member)', tier: 'elite', xp: 4850, level: 4, joinedAt: '2026-03-12' },
    { id: 'usr-2', email: 'marcus.automations@yahoo.com', displayName: 'Marcus the Builder', tier: 'pro', xp: 2450, level: 3, joinedAt: '2026-04-01' },
    { id: 'usr-3', email: 'alex.hustles22@outlook.com', displayName: 'Alex H', tier: 'starter', xp: 950, level: 2, joinedAt: '2026-05-10' },
    { id: 'usr-4', email: 'guest.builder@gmail.com', displayName: 'Guest Builder', tier: 'free', xp: 0, level: 1, joinedAt: '2026-05-26' }
  ]
};

export default function CodelessAdminPanelPage() {
  // ==========================================
  // GLOBAL STATE INITIALIZATION
  // ==========================================
  const [config, setConfig] = useState<StackConfig>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('stack_admin_config');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return DEFAULT_CONFIG;
        }
      }
    }
    return DEFAULT_CONFIG;
  });

  useEffect(() => {
    localStorage.setItem('stack_admin_config', JSON.stringify(config));
  }, [config]);

  // Preview options state
  const [previewUser, setPreviewUser] = useState<any>(config.users[0]);
  const [previewUserXP, setPreviewUserXP] = useState(previewUser?.xp || 0);
  const [previewUserLevel, setPreviewUserLevel] = useState(previewUser?.level || 1);
  const [previewUserCompletedSteps, setPreviewUserCompletedSteps] = useState<string[]>([]);
  const [previewUserSavedPrompts, setPreviewUserSavedPrompts] = useState<string[]>([]);
  const [previewUserDownloadedResources, setPreviewUserDownloadedResources] = useState<string[]>([]);

  // Update preview fields when selected user changes
  useEffect(() => {
    if (previewUser) {
      setPreviewUserXP(previewUser.xp);
      setPreviewUserLevel(previewUser.level);
      setPreviewUserCompletedSteps([]);
      setPreviewUserSavedPrompts([]);
      setPreviewUserDownloadedResources([]);
    }
  }, [previewUser]);

  // Sidebar navigation for preview panel
  const [previewTab, setPreviewTab] = useState('dashboard');
  const [selectedPlaybook, setSelectedPlaybook] = useState<Playbook | null>(null);

  // Active Admin section toggle
  const [activeAdminTab, setActiveAdminTab] = useState('branding');

  // Interactive AI Mentor state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    { sender: 'bot', text: 'Hey builder! I am ready to accelerate your income. Ask me any pricing, strategy, or automation question.' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // XP animation trigger state
  const [xpFloater, setXpFloater] = useState<{ amount: number; text: string; x: number; y: number } | null>(null);
  const [unlockedAchievementAlert, setUnlockedAchievementAlert] = useState<Achievement | null>(null);

  // Paywall dialog state
  const [paywallTarget, setPaywallTarget] = useState<SubscriptionTier | null>(null);

  // Legal modal overlay state
  const [policyOverlay, setPolicyOverlay] = useState<string | null>(null);

  // Form states for creating/editing content items
  const [editingPlaybook, setEditingPlaybook] = useState<Partial<Playbook> | null>(null);
  const [editingPrompt, setEditingPrompt] = useState<Partial<Prompt> | null>(null);
  const [editingResource, setEditingResource] = useState<Partial<Resource> | null>(null);
  const [editingTool, setEditingTool] = useState<Partial<AITool> | null>(null);
  const [editingUser, setEditingUser] = useState<Partial<typeof config.users[0]> | null>(null);
  const [editingSocial, setEditingSocial] = useState<Partial<typeof config.socials[0]> | null>(null);

  // Custom achievement trigger states
  const [editingAchievement, setEditingAchievement] = useState<Partial<Achievement> | null>(null);

  // ==========================================
  // ACTION UTILITIES
  // ==========================================
  const triggerXPFeedback = (amount: number, text: string) => {
    // Increment local XP state
    const newXP = previewUserXP + amount;
    setPreviewUserXP(newXP);

    // Calculate level scaling
    let calculatedLevel = 1;
    for (let i = config.gamification.levels.length - 1; i >= 0; i--) {
      if (newXP >= config.gamification.levels[i].xpNeeded) {
        calculatedLevel = config.gamification.levels[i].level;
        break;
      }
    }

    if (calculatedLevel > previewUserLevel) {
      setPreviewUserLevel(calculatedLevel);
      // Trigger achievement or level-up visual check
    }

    // Award achievement randomly if milestone conditions hit
    if (previewUserSavedPrompts.length === 2 && !previewUserSavedPrompts.includes('badge')) {
      const ach = config.gamification.achievements.find(a => a.id === 'ach-2');
      if (ach) {
        setUnlockedAchievementAlert(ach);
        setPreviewUserSavedPrompts(prev => [...prev, 'badge']);
      }
    }

    // Show float effect
    setXpFloater({ amount, text, x: 200, y: 150 });
    setTimeout(() => setXpFloater(null), 1800);
  };

  const handleResetDefaults = () => {
    if (confirm('Are you absolutely sure you want to reset all configurations to high-fidelity defaults? This will erase any local customizations.')) {
      setConfig(DEFAULT_CONFIG);
      setPreviewUser(DEFAULT_CONFIG.users[0]);
      alert('Config successfully restored to system defaults.');
    }
  };

  const handleExportConfig = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${config.branding.appName.toLowerCase()}-config.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportConfig = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        // Basic key checking to make sure it is a valid config
        if (imported.branding && imported.features && imported.pricing) {
          setConfig(imported);
          if (imported.users && imported.users.length > 0) {
            setPreviewUser(imported.users[0]);
          }
          alert('Config successfully loaded and validated! Preview has updated.');
        } else {
          alert('Invalid configuration file structure. Please upload a genuine Stack export.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const checkTierAccess = (requiredTier: SubscriptionTier): boolean => {
    const tierHierarchy: Record<SubscriptionTier, number> = {
      free: 0,
      starter: 1,
      pro: 2,
      elite: 3
    };

    const userTier = (previewUser?.tier || 'free') as SubscriptionTier;
    if (tierHierarchy[userTier] >= tierHierarchy[requiredTier]) {
      return true;
    }
    // Access denied - trigger modal
    setPaywallTarget(requiredTier);
    return false;
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    // Add user message
    setChatMessages(prev => [...prev, { sender: 'user', text }]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    // Simulate coach response
    setTimeout(() => {
      // Check blacklist
      const lowercase = text.toLowerCase();
      const hitTopic = config.aiMentor.blockedTopics.find(topic => lowercase.includes(topic.toLowerCase()));

      let responseText = '';
      if (hitTopic) {
        responseText = `⚠️ Connection Flagged: I am instructed not to coach on "${hitTopic}" as it promotes low-leverage or high-risk outcomes. Let's redirect to high-yield skills like automated operations, content generation agencies, or dynamic digital product sales!`;
      } else {
        // Generate personalized mock response based on settings
        const baseResponses = [
          `Yo, let's get into it! That is a high-leverage question. In ${config.branding.appName}, we focus on digital leverage. First, productize your offering, next build an auto-intake client funnel using Make.com, then start outreach immediately!`,
          `High-value strategy alert! If you want to scale this side hustle, do not charge hourly. Pack your skills into fixed retainers (e.g. $1,200/mo for 10 videos). Agencies will buy that speed and convenience all day.`,
          `Let's keep the energy high! I recommend you open up your dynamic Roadmaps tab right now, click on the completed playbook steps, and start sending 15 video pitches on Twitter/X today. Massive action is the only path.`
        ];
        const randomBase = baseResponses[Math.floor(Math.random() * baseResponses.length)];

        responseText = `[${config.aiMentor.agentName} - Tone: ${config.aiMentor.tone}]\n\n${randomBase}\n\n`;

        // Apply response style
        if (config.aiMentor.responseStyle === 'bullets') {
          responseText += `• Step 1: Pick one playbook from Content Management.\n• Step 2: Pitch 10 clients on socials.\n• Step 3: Package retainers using Stripe.\n• Step 4: Scale using artificial intelligence.`;
        } else if (config.aiMentor.responseStyle === 'paragraphs') {
          responseText += `Remember that execution beats ideas every single day. Optimize your time commitment, focus your skill levels, and stay consistent. You already have all the tools in the Resource Library. Start building!`;
        } else {
          // Mixed
          responseText += `Action Plan for Today:\n• Send 5 cold pitches before lunch.\n• Set up your color theme landing page.\n\nRemember: No corporate jargon allowed. Stay hungry!`;
        }
      }

      setChatMessages(prev => [...prev, { sender: 'bot', text: responseText }]);
      setIsTyping(false);
      triggerXPFeedback(config.aiMentor.maxTokens / 10, 'Asked AI Mentor');
    }, 1000);
  };

  const handleCopyPrompt = (promptText: string) => {
    navigator.clipboard.writeText(promptText);
    alert('Copied prompt to clipboard!');
    triggerXPFeedback(config.gamification.xpValues.savePrompt, 'Prompt Copied');
  };

  const handleSavePrompt = (promptId: string) => {
    if (previewUserSavedPrompts.includes(promptId)) {
      setPreviewUserSavedPrompts(prev => prev.filter(p => p !== promptId));
    } else {
      setPreviewUserSavedPrompts(prev => [...prev, promptId]);
      triggerXPFeedback(config.gamification.xpValues.savePrompt, 'Saved to Vault');
    }
  };

  // Compile System Prompt live
  const compiledSystemPrompt = `
SYSTEM ROLE: ${config.aiMentor.agentName}
PERSONALITY / STYLE: ${config.aiMentor.personality}
TONE: ${config.aiMentor.tone}
RESPONSE STRUCTURING: Style preference is ${config.aiMentor.responseStyle.toUpperCase()}.
TEMPERATURE CALIBRATION: ${config.aiMentor.temperature}
MAX TOKEN BOUNDARY: ${config.aiMentor.maxTokens}

BLOCKED DOMAINS (NEVER DISCUSS):
${config.aiMentor.blockedTopics.map(t => `- ${t}`).join('\n')}

MEMBER REVENUE AND STATS:
Estimated tier: ${previewUser?.tier || 'free'}
Current Member XP: ${previewUserXP}
Current Member Level: ${previewUserLevel}

INTEGRATION CAPABILITIES:
- Resend Notifications: ${config.email.notifyOnStep ? 'ACTIVE' : 'INACTIVE'}
- Discord Bot Token: ${config.integrations.discordToken ? 'CONNECTED' : 'NOT CONNECTED'}

INSTRUCTIONS:
Provide ultra-practical business guidance. Avoid wordy introductions. Be raw, direct, and actionable. Refer specifically to the custom app playbooks:
${config.content.playbooks.map(p => `- ${p.title} (${p.estimatedEarnings})`).join('\n')}
`;

  return (
    <div className="min-h-screen bg-[#070707] text-[#efefef] font-sans flex flex-col">
      {/* ==========================================
          GLOBAL STICKY CONTROL HEADER
         ========================================== */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a] border-b border-[#222] p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎛️</span>
          <div>
            <h1 className="text-lg font-bold tracking-widest text-[#00ff66] font-mono">STACK ADMIN CONTROL ROOM</h1>
            <p className="text-xs text-gray-400">100% Codeless Site & Dynamic Experience Configurator</p>
          </div>
        </div>

        {/* Configurations Loader & Preview States */}
        <div className="flex items-center gap-3 flex-wrap">
          <label className="text-xs text-gray-400 flex items-center gap-2 cursor-pointer bg-[#111] border border-[#333] px-3 py-1.5 rounded hover:bg-[#1a1a1a] transition">
            📥 Import JSON
            <input type="file" accept=".json" onChange={handleImportConfig} className="hidden" />
          </label>

          <button
            onClick={handleExportConfig}
            className="text-xs bg-[#111] border border-[#333] px-3 py-1.5 rounded hover:bg-[#1a1a1a] transition flex items-center gap-1"
          >
            📤 Export Config
          </button>

          <button
            onClick={handleResetDefaults}
            className="text-xs bg-red-950/40 text-red-400 border border-red-900/50 px-3 py-1.5 rounded hover:bg-red-900/40 transition"
          >
            ⚠️ Reset Defaults
          </button>

          {/* User selector to test tiers */}
          <div className="h-6 w-px bg-[#333]"></div>

          <div className="flex items-center gap-2 bg-[#111] border border-[#333] p-1 rounded">
            <span className="text-[10px] uppercase font-mono px-2 text-[#C8A869]">Preview As User:</span>
            <select
              value={previewUser?.id || ''}
              onChange={(e) => {
                const found = config.users.find(u => u.id === e.target.value);
                if (found) setPreviewUser(found);
              }}
              className="bg-transparent text-xs text-white border-none outline-none pr-3 cursor-pointer"
            >
              {config.users.map(u => (
                <option key={u.id} value={u.id} className="bg-[#111] text-white">
                  {u.displayName} ({u.tier.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* ==========================================
          MAIN WORKSPACE LAYOUT (50% LEFT / 50% RIGHT)
         ========================================== */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2">
        {/* ==========================================
            LEFT SIDE: CONTROL ROOM PANEL
           ========================================== */}
        <div className="bg-[#0a0a0a] border-r border-[#222] p-6 overflow-y-auto max-h-[calc(100vh-80px)]">
          {/* CONTROL SYSTEM SUB-NAVIGATION */}
          <div className="flex gap-1.5 overflow-x-auto pb-4 mb-6 border-b border-[#222]">
            {[
              { id: 'branding', label: '🎨 Branding', color: 'text-amber-400' },
              { id: 'features', label: '⚙️ Flags', color: 'text-purple-400' },
              { id: 'pricing', label: '💵 Subscriptions', color: 'text-emerald-400' },
              { id: 'content', label: '📚 Content', color: 'text-blue-400' },
              { id: 'users', label: '👥 User Accounts', color: 'text-pink-400' },
              { id: 'socials', label: '🔗 Socials & Legal', color: 'text-cyan-400' },
              { id: 'roadmaps', label: '🎯 Roadmaps', color: 'text-indigo-400' },
              { id: 'ai-mentor', label: '🤖 AI Coach', color: 'text-teal-400' },
              { id: 'gamification', label: '🏆 Gamify', color: 'text-yellow-400' },
              { id: 'integrations', label: '🔌 Integrations', color: 'text-red-400' },
              { id: 'analytics', label: '📊 Metrics', color: 'text-violet-400' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveAdminTab(item.id)}
                className={`px-3 py-2 rounded text-xs font-mono whitespace-nowrap transition-all ${
                  activeAdminTab === item.id
                    ? 'bg-[#151515] border-b-2 border-[#00ff66] text-[#00ff66]'
                    : 'text-gray-400 hover:text-white hover:bg-[#111]'
                }`}
              >
                <span className={item.color}>{item.label}</span>
              </button>
            ))}
          </div>

          {/* ==========================================
              ADMIN SUB-SECTION PANELS
             ========================================== */}

          {/* 1. BRANDING & APPEARANCE */}
          {activeAdminTab === 'branding' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-[#00ff66] font-mono text-sm uppercase tracking-wider mb-2">Platform Branding & Theme</h3>
                <p className="text-xs text-gray-400 mb-4">Set up color schemes, fonts, titles, and logo identities.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-300 font-mono mb-1">App Display Name</label>
                  <input
                    type="text"
                    value={config.branding.appName}
                    onChange={(e) => setConfig({
                      ...config,
                      branding: { ...config.branding, appName: e.target.value }
                    })}
                    className="w-full bg-[#111] border border-[#333] rounded px-3 py-2 text-sm text-white focus:border-[#00ff66]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-300 font-mono mb-1">Branding Tagline</label>
                  <input
                    type="text"
                    value={config.branding.tagline}
                    onChange={(e) => setConfig({
                      ...config,
                      branding: { ...config.branding, tagline: e.target.value }
                    })}
                    className="w-full bg-[#111] border border-[#333] rounded px-3 py-2 text-sm text-white focus:border-[#00ff66]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-300 font-mono mb-1">Logo Emoji Icon</label>
                  <input
                    type="text"
                    value={config.branding.logoEmoji}
                    onChange={(e) => setConfig({
                      ...config,
                      branding: { ...config.branding, logoEmoji: e.target.value }
                    })}
                    className="w-full bg-[#111] border border-[#333] rounded px-3 py-2 text-sm text-white focus:border-[#00ff66]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-300 font-mono mb-1">Global Typography Choice</label>
                  <select
                    value={config.branding.fontFamily}
                    onChange={(e) => setConfig({
                      ...config,
                      branding: { ...config.branding, fontFamily: e.target.value }
                    })}
                    className="w-full bg-[#111] border border-[#333] rounded px-3 py-2 text-sm text-white"
                  >
                    <option value="serif">DM Serif Display (Premium Editorial)</option>
                    <option value="sans">DM Sans (Sleek Tech Modern)</option>
                    <option value="mono">Fira Code (No-Nonsense Developer)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#111] p-4 rounded border border-[#222]">
                <div>
                  <label className="block text-xs text-gray-300 font-mono mb-1">Primary Theme Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={config.branding.primaryColor}
                      onChange={(e) => setConfig({
                        ...config,
                        branding: { ...config.branding, primaryColor: e.target.value }
                      })}
                      className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={config.branding.primaryColor}
                      onChange={(e) => setConfig({
                        ...config,
                        branding: { ...config.branding, primaryColor: e.target.value }
                      })}
                      className="flex-1 bg-[#1a1a1a] border border-[#333] rounded px-2 py-1 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-300 font-mono mb-1">Accent Success Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={config.branding.accentColor}
                      onChange={(e) => setConfig({
                        ...config,
                        branding: { ...config.branding, accentColor: e.target.value }
                      })}
                      className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={config.branding.accentColor}
                      onChange={(e) => setConfig({
                        ...config,
                        branding: { ...config.branding, accentColor: e.target.value }
                      })}
                      className="flex-1 bg-[#1a1a1a] border border-[#333] rounded px-2 py-1 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-300 font-mono mb-1">Deep Body Background</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={config.branding.backgroundColor}
                      onChange={(e) => setConfig({
                        ...config,
                        branding: { ...config.branding, backgroundColor: e.target.value }
                      })}
                      className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      value={config.branding.backgroundColor}
                      onChange={(e) => setConfig({
                        ...config,
                        branding: { ...config.branding, backgroundColor: e.target.value }
                      })}
                      className="flex-1 bg-[#1a1a1a] border border-[#333] rounded px-2 py-1 text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-[#111] rounded border border-[#222]">
                <div>
                  <span className="text-xs text-gray-300 font-mono block">Force Dark Mode Default</span>
                  <span className="text-[10px] text-gray-500">Initial loading states will strictly render with dark colors</span>
                </div>
                <input
                  type="checkbox"
                  checked={config.branding.darkModeDefault}
                  onChange={(e) => setConfig({
                    ...config,
                    branding: { ...config.branding, darkModeDefault: e.target.checked }
                  })}
                  className="w-4 h-4 text-[#00ff66] bg-black border-[#333] rounded focus:ring-0"
                />
              </div>
            </div>
          )}

          {/* 2. FEATURE FLAGS */}
          {activeAdminTab === 'features' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-[#00ff66] font-mono text-sm uppercase tracking-wider mb-2">Feature Flags Configuration</h3>
                <p className="text-xs text-gray-400 mb-4">Toggle modular items live inside the member portal experience.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { key: 'promptVault', label: 'Prompt Vault', desc: '1,000+ copywriting prompts module' },
                  { key: 'resourceLibrary', label: 'Resource Library', desc: 'Downloadable template resources' },
                  { key: 'aiToolsDb', label: 'AI Tools Database', desc: 'SaaS tutorials and pricing sheets' },
                  { key: 'roadmaps', label: 'Milestone Roadmaps', desc: 'Level step progression cards' },
                  { key: 'gamification', label: 'Gamification System', desc: 'XP points and achievement lists' },
                  { key: 'communityTab', label: 'Community Feed', desc: 'Simulated Discord discussions' },
                  { key: 'aiMentor', label: 'AI Mentor Chatbot', desc: 'Live Claude-powered coach dialog' },
                  { key: 'leaderboard', label: 'XP Leaderboards', desc: 'Top members ranks visibility' },
                  { key: 'referralSystem', label: 'Referrals & Invites', desc: 'XP rewards for invite steps' },
                  { key: 'marketplace', label: 'Product Marketplace', desc: 'Sell user layouts and scripts (Phase 4)' }
                ].map(flag => (
                  <div key={flag.key} className="p-3 bg-[#111] rounded border border-[#222] flex items-center justify-between hover:border-[#333] transition">
                    <div>
                      <span className="text-xs text-white font-mono block font-bold">{flag.label}</span>
                      <span className="text-[10px] text-gray-500">{flag.desc}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={(config.features as any)[flag.key]}
                      onChange={(e) => setConfig({
                        ...config,
                        features: { ...config.features, [flag.key]: e.target.checked }
                      })}
                      className="w-4 h-4 text-[#00ff66] bg-black border-[#333] rounded focus:ring-0 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. SUBSCRIPTIONS & PRICING */}
          {activeAdminTab === 'pricing' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-[#00ff66] font-mono text-sm uppercase tracking-wider mb-2">Subscription Tier Editor</h3>
                <p className="text-xs text-gray-400 mb-4">Edit active plans, pricing structure, descriptions, and feature lists.</p>
              </div>

              {(['free', 'starter', 'pro', 'elite'] as SubscriptionTier[]).map(tierKey => {
                const plan = config.pricing.plans[tierKey];
                return (
                  <div key={tierKey} className="p-4 bg-[#111] rounded border border-[#222] space-y-4 hover:border-[#333] transition">
                    <div className="flex items-center justify-between border-b border-[#222] pb-2">
                      <span className="text-xs font-mono uppercase text-[#C8A869] font-bold">{tierKey} Plan Configuration</span>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <span className="text-[10px] text-gray-500">Tier Enabled:</span>
                        <input
                          type="checkbox"
                          checked={plan.enabled}
                          onChange={(e) => {
                            const copy = { ...config.pricing.plans };
                            copy[tierKey].enabled = e.target.checked;
                            setConfig({ ...config, pricing: { plans: copy } });
                          }}
                          className="w-3.5 h-3.5 rounded text-[#00ff66] bg-black border-[#333]"
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="col-span-2">
                        <label className="block text-[10px] text-gray-400 font-mono">Plan Display Name</label>
                        <input
                          type="text"
                          value={plan.name}
                          onChange={(e) => {
                            const copy = { ...config.pricing.plans };
                            copy[tierKey].name = e.target.value;
                            setConfig({ ...config, pricing: { plans: copy } });
                          }}
                          className="w-full bg-[#1c1c1c] border border-[#333] rounded px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-gray-400 font-mono">Price ($/mo)</label>
                        <input
                          type="text"
                          value={plan.price}
                          onChange={(e) => {
                            const copy = { ...config.pricing.plans };
                            copy[tierKey].price = e.target.value;
                            setConfig({ ...config, pricing: { plans: copy } });
                          }}
                          className="w-full bg-[#1c1c1c] border border-[#333] rounded px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-gray-400 font-mono">Plan Brief Description</label>
                      <input
                        type="text"
                        value={plan.description}
                        onChange={(e) => {
                          const copy = { ...config.pricing.plans };
                          copy[tierKey].description = e.target.value;
                          setConfig({ ...config, pricing: { plans: copy } });
                        }}
                        className="w-full bg-[#1c1c1c] border border-[#333] rounded px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-gray-400 font-mono">Plan Upgrade CTA Text</label>
                      <input
                        type="text"
                        value={plan.ctaText}
                        onChange={(e) => {
                          const copy = { ...config.pricing.plans };
                          copy[tierKey].ctaText = e.target.value;
                          setConfig({ ...config, pricing: { plans: copy } });
                        }}
                        className="w-full bg-[#1c1c1c] border border-[#333] rounded px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-gray-400 font-mono mb-1">Features Included (one per line)</label>
                      <textarea
                        rows={3}
                        value={plan.features.join('\n')}
                        onChange={(e) => {
                          const copy = { ...config.pricing.plans };
                          copy[tierKey].features = e.target.value.split('\n').filter(f => f.trim() !== '');
                          setConfig({ ...config, pricing: { plans: copy } });
                        }}
                        className="w-full bg-[#1c1c1c] border border-[#333] rounded p-2 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 4. CONTENT MANAGEMENT */}
          {activeAdminTab === 'content' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-[#00ff66] font-mono text-sm uppercase tracking-wider mb-2">Content Repositories</h3>
                <p className="text-xs text-gray-400 mb-4">Edit, add, or delete Side Hustle Playbooks, Prompt Vaults, Resource files, and AI Tools database items.</p>
              </div>

              {/* A. PLAYBOOKS LIST */}
              <div className="bg-[#111] p-4 rounded border border-[#222] space-y-4">
                <div className="flex justify-between items-center border-b border-[#222] pb-2">
                  <span className="text-xs font-mono font-bold text-white">📖 Playbooks & Income Methods</span>
                  <button
                    onClick={() => setEditingPlaybook({})}
                    className="bg-[#00ff66] text-black text-[10px] font-bold uppercase px-2.5 py-1 rounded"
                  >
                    + Add New
                  </button>
                </div>

                <div className="space-y-2">
                  {config.content.playbooks.map(pb => (
                    <div key={pb.id} className="bg-[#181818] p-3 rounded text-xs flex justify-between items-start gap-4">
                      <div>
                        <div className="font-bold text-[#C8A869]">{pb.title}</div>
                        <div className="text-[10px] text-gray-400">{pb.category} • Required: <span className="uppercase text-[#00ff66] font-mono">{pb.tier}</span></div>
                        <div className="text-[10px] text-gray-500 font-mono">Slug: {pb.slug} • Est. Yield: {pb.estimatedEarnings}</div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingPlaybook(pb)}
                          className="bg-[#333] hover:bg-[#444] text-white px-2 py-1 rounded text-[10px]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Delete playbook?')) {
                              setConfig({
                                ...config,
                                content: {
                                  ...config.content,
                                  playbooks: config.content.playbooks.filter(p => p.id !== pb.id)
                                }
                              });
                            }
                          }}
                          className="bg-red-950 text-red-400 px-2 py-1 rounded text-[10px]"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {editingPlaybook && (
                  <div className="bg-black/60 p-4 rounded border border-[#333] space-y-3">
                    <h4 className="text-xs font-mono text-[#00ff66]">{editingPlaybook.id ? 'Edit' : 'Create'} Playbook Record</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-gray-400">Title</label>
                        <input
                          type="text"
                          value={editingPlaybook.title || ''}
                          onChange={(e) => setEditingPlaybook({ ...editingPlaybook, title: e.target.value })}
                          className="w-full bg-[#111] border border-[#333] rounded px-2 py-1 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400">Slug</label>
                        <input
                          type="text"
                          value={editingPlaybook.slug || ''}
                          onChange={(e) => setEditingPlaybook({ ...editingPlaybook, slug: e.target.value })}
                          className="w-full bg-[#111] border border-[#333] rounded px-2 py-1 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400">Category</label>
                        <input
                          type="text"
                          value={editingPlaybook.category || ''}
                          onChange={(e) => setEditingPlaybook({ ...editingPlaybook, category: e.target.value })}
                          className="w-full bg-[#111] border border-[#333] rounded px-2 py-1 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400">Required Tier</label>
                        <select
                          value={editingPlaybook.tier || 'free'}
                          onChange={(e) => setEditingPlaybook({ ...editingPlaybook, tier: e.target.value as SubscriptionTier })}
                          className="w-full bg-[#111] border border-[#333] rounded px-2 py-1 text-xs text-white"
                        >
                          <option value="free">Free</option>
                          <option value="starter">Starter</option>
                          <option value="pro">Pro</option>
                          <option value="elite">Elite</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400">Estimated Earnings</label>
                        <input
                          type="text"
                          value={editingPlaybook.estimatedEarnings || ''}
                          onChange={(e) => setEditingPlaybook({ ...editingPlaybook, estimatedEarnings: e.target.value })}
                          className="w-full bg-[#111] border border-[#333] rounded px-2 py-1 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400">Steps Count</label>
                        <input
                          type="number"
                          value={editingPlaybook.stepCount || 0}
                          onChange={(e) => setEditingPlaybook({ ...editingPlaybook, stepCount: parseInt(e.target.value) || 0 })}
                          className="w-full bg-[#111] border border-[#333] rounded px-2 py-1 text-xs text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400">Brief Overview Description</label>
                      <textarea
                        rows={2}
                        value={editingPlaybook.content || ''}
                        onChange={(e) => setEditingPlaybook({ ...editingPlaybook, content: e.target.value })}
                        className="w-full bg-[#111] border border-[#333] rounded p-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400">Action Steps Checklist (one per line)</label>
                      <textarea
                        rows={3}
                        value={(editingPlaybook.stepsList || []).join('\n')}
                        onChange={(e) => setEditingPlaybook({ ...editingPlaybook, stepsList: e.target.value.split('\n') })}
                        className="w-full bg-[#111] border border-[#333] rounded p-2 text-xs text-white font-mono"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingPlaybook(null)}
                        className="bg-transparent border border-[#333] px-3 py-1 rounded text-xs hover:bg-[#111]"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          const list = [...config.content.playbooks];
                          if (editingPlaybook.id) {
                            const idx = list.findIndex(p => p.id === editingPlaybook.id);
                            list[idx] = editingPlaybook as Playbook;
                          } else {
                            list.push({
                              ...(editingPlaybook as Playbook),
                              id: `pb-${Date.now()}`
                            });
                          }
                          setConfig({ ...config, content: { ...config.content, playbooks: list } });
                          setEditingPlaybook(null);
                        }}
                        className="bg-[#00ff66] text-black font-bold px-3 py-1 rounded text-xs"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* B. PROMPTS LIST */}
              <div className="bg-[#111] p-4 rounded border border-[#222] space-y-4">
                <div className="flex justify-between items-center border-b border-[#222] pb-2">
                  <span className="text-xs font-mono font-bold text-white">✨ Prompt Vault Database</span>
                  <button
                    onClick={() => setEditingPrompt({})}
                    className="bg-[#00ff66] text-black text-[10px] font-bold uppercase px-2.5 py-1 rounded"
                  >
                    + Add New
                  </button>
                </div>

                <div className="space-y-2">
                  {config.content.prompts.map(pr => (
                    <div key={pr.id} className="bg-[#181818] p-3 rounded text-xs flex justify-between items-start gap-4">
                      <div>
                        <div className="font-bold text-teal-400">{pr.title}</div>
                        <div className="text-[10px] text-gray-400">Category: {pr.category} • Tier: <span className="uppercase text-[#00ff66] font-mono">{pr.tier}</span></div>
                        <div className="text-[10px] text-gray-500 font-mono line-clamp-1 italic">"{pr.content}"</div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingPrompt(pr)}
                          className="bg-[#333] hover:bg-[#444] text-white px-2 py-1 rounded text-[10px]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Delete prompt?')) {
                              setConfig({
                                ...config,
                                content: {
                                  ...config.content,
                                  prompts: config.content.prompts.filter(p => p.id !== pr.id)
                                }
                              });
                            }
                          }}
                          className="bg-red-950 text-red-400 px-2 py-1 rounded text-[10px]"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {editingPrompt && (
                  <div className="bg-black/60 p-4 rounded border border-[#333] space-y-3">
                    <h4 className="text-xs font-mono text-[#00ff66]">{editingPrompt.id ? 'Edit' : 'Create'} Prompt Record</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-gray-400">Title</label>
                        <input
                          type="text"
                          value={editingPrompt.title || ''}
                          onChange={(e) => setEditingPrompt({ ...editingPrompt, title: e.target.value })}
                          className="w-full bg-[#111] border border-[#333] rounded px-2 py-1 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400">Category</label>
                        <input
                          type="text"
                          value={editingPrompt.category || ''}
                          onChange={(e) => setEditingPrompt({ ...editingPrompt, category: e.target.value })}
                          className="w-full bg-[#111] border border-[#333] rounded px-2 py-1 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400">Required Tier</label>
                        <select
                          value={editingPrompt.tier || 'free'}
                          onChange={(e) => setEditingPrompt({ ...editingPrompt, tier: e.target.value as SubscriptionTier })}
                          className="w-full bg-[#111] border border-[#333] rounded px-2 py-1 text-xs text-white"
                        >
                          <option value="free">Free</option>
                          <option value="starter">Starter</option>
                          <option value="pro">Pro</option>
                          <option value="elite">Elite</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400">Use Case Tags (comma-separated)</label>
                        <input
                          type="text"
                          value={(editingPrompt.tags || []).join(', ')}
                          onChange={(e) => setEditingPrompt({ ...editingPrompt, tags: e.target.value.split(',').map(t => t.trim()) })}
                          className="w-full bg-[#111] border border-[#333] rounded px-2 py-1 text-xs text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400">Dynamic AI Prompt Text</label>
                      <textarea
                        rows={3}
                        value={editingPrompt.content || ''}
                        onChange={(e) => setEditingPrompt({ ...editingPrompt, content: e.target.value })}
                        className="w-full bg-[#111] border border-[#333] rounded p-2 text-xs text-white font-mono"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingPrompt(null)}
                        className="bg-transparent border border-[#333] px-3 py-1 rounded text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          const list = [...config.content.prompts];
                          if (editingPrompt.id) {
                            const idx = list.findIndex(p => p.id === editingPrompt.id);
                            list[idx] = editingPrompt as Prompt;
                          } else {
                            list.push({
                              ...(editingPrompt as Prompt),
                              id: `pr-${Date.now()}`
                            });
                          }
                          setConfig({ ...config, content: { ...config.content, prompts: list } });
                          setEditingPrompt(null);
                        }}
                        className="bg-[#00ff66] text-black font-bold px-3 py-1 rounded text-xs"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* C. RESOURCES LIST */}
              <div className="bg-[#111] p-4 rounded border border-[#222] space-y-4">
                <div className="flex justify-between items-center border-b border-[#222] pb-2">
                  <span className="text-xs font-mono font-bold text-white">🛠️ Downloadable Resource Library</span>
                  <button
                    onClick={() => setEditingResource({})}
                    className="bg-[#00ff66] text-black text-[10px] font-bold uppercase px-2.5 py-1 rounded"
                  >
                    + Add New
                  </button>
                </div>

                <div className="space-y-2">
                  {config.content.resources.map(res => (
                    <div key={res.id} className="bg-[#181818] p-3 rounded text-xs flex justify-between items-start gap-4">
                      <div>
                        <div className="font-bold text-purple-400">{res.title}</div>
                        <div className="text-[10px] text-gray-400">Type: <span className="uppercase text-purple-300 font-mono">{res.type}</span> • Tier: <span className="uppercase text-[#00ff66] font-mono">{res.tier}</span></div>
                        <div className="text-[10px] text-gray-500">{res.description}</div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingResource(res)}
                          className="bg-[#333] hover:bg-[#444] text-white px-2 py-1 rounded text-[10px]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Delete resource?')) {
                              setConfig({
                                ...config,
                                content: {
                                  ...config.content,
                                  resources: config.content.resources.filter(r => r.id !== res.id)
                                }
                              });
                            }
                          }}
                          className="bg-red-950 text-red-400 px-2 py-1 rounded text-[10px]"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {editingResource && (
                  <div className="bg-black/60 p-4 rounded border border-[#333] space-y-3">
                    <h4 className="text-xs font-mono text-[#00ff66]">{editingResource.id ? 'Edit' : 'Create'} Resource Record</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-gray-400">Title</label>
                        <input
                          type="text"
                          value={editingResource.title || ''}
                          onChange={(e) => setEditingResource({ ...editingResource, title: e.target.value })}
                          className="w-full bg-[#111] border border-[#333] rounded px-2 py-1 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400">Resource Type</label>
                        <select
                          value={editingResource.type || 'template'}
                          onChange={(e) => setEditingResource({ ...editingResource, type: e.target.value as any })}
                          className="w-full bg-[#111] border border-[#333] rounded px-2 py-1 text-xs text-white"
                        >
                          <option value="template">Template</option>
                          <option value="script">Script</option>
                          <option value="framework">Framework</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400">Required Tier</label>
                        <select
                          value={editingResource.tier || 'free'}
                          onChange={(e) => setEditingResource({ ...editingResource, tier: e.target.value as SubscriptionTier })}
                          className="w-full bg-[#111] border border-[#333] rounded px-2 py-1 text-xs text-white"
                        >
                          <option value="free">Free</option>
                          <option value="starter">Starter</option>
                          <option value="pro">Pro</option>
                          <option value="elite">Elite</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400">Mock Download link</label>
                        <input
                          type="text"
                          value={editingResource.downloadUrl || ''}
                          onChange={(e) => setEditingResource({ ...editingResource, downloadUrl: e.target.value })}
                          className="w-full bg-[#111] border border-[#333] rounded px-2 py-1 text-xs text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400">Description</label>
                      <textarea
                        rows={2}
                        value={editingResource.description || ''}
                        onChange={(e) => setEditingResource({ ...editingResource, description: e.target.value })}
                        className="w-full bg-[#111] border border-[#333] rounded p-2 text-xs text-white"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingResource(null)}
                        className="bg-transparent border border-[#333] px-3 py-1 rounded text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          const list = [...config.content.resources];
                          if (editingResource.id) {
                            const idx = list.findIndex(p => p.id === editingResource.id);
                            list[idx] = editingResource as Resource;
                          } else {
                            list.push({
                              ...(editingResource as Resource),
                              id: `res-${Date.now()}`
                            });
                          }
                          setConfig({ ...config, content: { ...config.content, resources: list } });
                          setEditingResource(null);
                        }}
                        className="bg-[#00ff66] text-black font-bold px-3 py-1 rounded text-xs"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* D. AI TOOLS LIST */}
              <div className="bg-[#111] p-4 rounded border border-[#222] space-y-4">
                <div className="flex justify-between items-center border-b border-[#222] pb-2">
                  <span className="text-xs font-mono font-bold text-white">🤖 AI Tools & Software Database</span>
                  <button
                    onClick={() => setEditingTool({})}
                    className="bg-[#00ff66] text-black text-[10px] font-bold uppercase px-2.5 py-1 rounded"
                  >
                    + Add New
                  </button>
                </div>

                <div className="space-y-2">
                  {config.content.aiTools.map(tl => (
                    <div key={tl.id} className="bg-[#181818] p-3 rounded text-xs flex justify-between items-start gap-4">
                      <div>
                        <div className="font-bold text-[#34C792]">{tl.name}</div>
                        <div className="text-[10px] text-gray-400">Category: {tl.category} • Price: {tl.pricing}</div>
                        <div className="text-[10px] text-gray-500 font-mono italic">Angle: {tl.incomeAngle}</div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingTool(tl)}
                          className="bg-[#333] hover:bg-[#444] text-white px-2 py-1 rounded text-[10px]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Delete tool?')) {
                              setConfig({
                                ...config,
                                content: {
                                  ...config.content,
                                  aiTools: config.content.aiTools.filter(t => t.id !== tl.id)
                                }
                              });
                            }
                          }}
                          className="bg-red-950 text-red-400 px-2 py-1 rounded text-[10px]"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {editingTool && (
                  <div className="bg-black/60 p-4 rounded border border-[#333] space-y-3">
                    <h4 className="text-xs font-mono text-[#00ff66]">{editingTool.id ? 'Edit' : 'Create'} AI Tool Record</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-gray-400">Name</label>
                        <input
                          type="text"
                          value={editingTool.name || ''}
                          onChange={(e) => setEditingTool({ ...editingTool, name: e.target.value })}
                          className="w-full bg-[#111] border border-[#333] rounded px-2 py-1 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400">Category</label>
                        <input
                          type="text"
                          value={editingTool.category || ''}
                          onChange={(e) => setEditingTool({ ...editingTool, category: e.target.value })}
                          className="w-full bg-[#111] border border-[#333] rounded px-2 py-1 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400">Tutorial Link</label>
                        <input
                          type="text"
                          value={editingTool.tutorialLink || ''}
                          onChange={(e) => setEditingTool({ ...editingTool, tutorialLink: e.target.value })}
                          className="w-full bg-[#111] border border-[#333] rounded px-2 py-1 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400">Pricing Info</label>
                        <input
                          type="text"
                          value={editingTool.pricing || ''}
                          onChange={(e) => setEditingTool({ ...editingTool, pricing: e.target.value })}
                          className="w-full bg-[#111] border border-[#333] rounded px-2 py-1 text-xs text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400">Income Angles / Monetization Strategy</label>
                      <textarea
                        rows={2}
                        value={editingTool.incomeAngle || ''}
                        onChange={(e) => setEditingTool({ ...editingTool, incomeAngle: e.target.value })}
                        className="w-full bg-[#111] border border-[#333] rounded p-2 text-xs text-white"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingTool(null)}
                        className="bg-transparent border border-[#333] px-3 py-1 rounded text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          const list = [...config.content.aiTools];
                          if (editingTool.id) {
                            const idx = list.findIndex(p => p.id === editingTool.id);
                            list[idx] = editingTool as AITool;
                          } else {
                            list.push({
                              ...(editingTool as AITool),
                              id: `tool-${Date.now()}`
                            });
                          }
                          setConfig({ ...config, content: { ...config.content, aiTools: list } });
                          setEditingTool(null);
                        }}
                        className="bg-[#00ff66] text-black font-bold px-3 py-1 rounded text-xs"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 5. USER ACCOUNTS MANAGEMENT */}
          {activeAdminTab === 'users' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-[#00ff66] font-mono text-sm uppercase tracking-wider mb-2">Simulated User Base</h3>
                <p className="text-xs text-gray-400 mb-4">View the user registrations database. Modify active tiers, display names, and manually award/deduct XP live.</p>
              </div>

              <div className="space-y-2">
                {config.users.map(usr => (
                  <div key={usr.id} className="bg-[#111] p-4 rounded border border-[#222] flex justify-between items-start gap-4 hover:border-[#333] transition">
                    <div>
                      <div className="font-bold text-white flex items-center gap-2">
                        {usr.displayName}
                        <span className="text-[9px] font-mono bg-[#222] border border-[#444] px-1.5 py-0.5 rounded text-[#00ff66] uppercase">
                          {usr.tier}
                        </span>
                      </div>
                      <div className="text-[10px] text-gray-400 font-mono">{usr.email} • Joined: {usr.joinedAt}</div>
                      <div className="text-[10px] text-gray-500 font-mono mt-1">Level {usr.level} • XP: {usr.xp}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingUser(usr)}
                        className="bg-[#333] text-white px-2.5 py-1 rounded text-[10px] font-mono hover:bg-[#444]"
                      >
                        Modify Profile
                      </button>
                      <button
                        onClick={() => {
                          const amount = parseInt(prompt('Enter XP amount to award (use negative to deduct):') || '0');
                          if (amount) {
                            const list = [...config.users];
                            const idx = list.findIndex(u => u.id === usr.id);
                            list[idx].xp = Math.max(0, list[idx].xp + amount);

                            // auto recalculate level
                            let calculatedLevel = 1;
                            for (let i = config.gamification.levels.length - 1; i >= 0; i--) {
                              if (list[idx].xp >= config.gamification.levels[i].xpNeeded) {
                                calculatedLevel = config.gamification.levels[i].level;
                                break;
                              }
                            }
                            list[idx].level = calculatedLevel;

                            setConfig({ ...config, users: list });
                            if (previewUser?.id === usr.id) {
                              setPreviewUserXP(list[idx].xp);
                              setPreviewUserLevel(list[idx].level);
                            }
                            alert(`Awarded ${amount} XP to ${usr.displayName}.`);
                          }
                        }}
                        className="bg-emerald-950 text-emerald-400 border border-emerald-900 px-2 py-1 rounded text-[10px] font-mono"
                      >
                        + XP
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {editingUser && (
                <div className="bg-[#111] p-4 rounded border border-[#00ff66] space-y-4">
                  <h4 className="text-xs font-mono text-[#00ff66]">Modify User Profile Parameters</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-gray-400">Display Name</label>
                      <input
                        type="text"
                        value={editingUser.displayName || ''}
                        onChange={(e) => setEditingUser({ ...editingUser, displayName: e.target.value })}
                        className="w-full bg-black border border-[#333] rounded px-2 py-1 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400">Email Address</label>
                      <input
                        type="text"
                        value={editingUser.email || ''}
                        onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                        className="w-full bg-black border border-[#333] rounded px-2 py-1 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400">Active Subscription tier</label>
                      <select
                        value={editingUser.tier || 'free'}
                        onChange={(e) => setEditingUser({ ...editingUser, tier: e.target.value as SubscriptionTier })}
                        className="w-full bg-black border border-[#333] rounded px-2 py-1 text-xs text-white"
                      >
                        <option value="free">Free</option>
                        <option value="starter">Starter</option>
                        <option value="pro">Pro</option>
                        <option value="elite">Elite</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400">Manually Adjust XP</label>
                      <input
                        type="number"
                        value={editingUser.xp || 0}
                        onChange={(e) => setEditingUser({ ...editingUser, xp: parseInt(e.target.value) || 0 })}
                        className="w-full bg-black border border-[#333] rounded px-2 py-1 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 border-t border-[#222] pt-2">
                    <button
                      onClick={() => setEditingUser(null)}
                      className="bg-transparent border border-[#333] px-3 py-1 rounded text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        const list = [...config.users];
                        const idx = list.findIndex(u => u.id === editingUser.id);
                        list[idx] = { ...list[idx], ...editingUser } as any;

                        setConfig({ ...config, users: list });
                        if (previewUser?.id === editingUser.id) {
                          setPreviewUser(list[idx]);
                        }
                        setEditingUser(null);
                      }}
                      className="bg-[#00ff66] text-black font-bold px-3 py-1 rounded text-xs"
                    >
                      Apply Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 6. SOCIALS & LEGAL POLICIES */}
          {activeAdminTab === 'socials' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-[#00ff66] font-mono text-sm uppercase tracking-wider mb-2">Social Platforms & Legal Policies</h3>
                <p className="text-xs text-gray-400 mb-4">Set up social links in headers/footers, and edit official Markdown legal documents instantly.</p>
              </div>

              {/* SOCIAL LINKS */}
              <div className="bg-[#111] p-4 rounded border border-[#222] space-y-4">
                <h4 className="text-xs font-mono text-white border-b border-[#222] pb-2">🔗 Managed Social Channels</h4>
                <div className="space-y-2">
                  {config.socials.map(soc => (
                    <div key={soc.id} className="bg-[#181818] p-3 rounded text-xs flex justify-between items-center">
                      <div>
                        <span className="text-base mr-2">{soc.icon}</span>
                        <span className="font-bold font-mono">{soc.platform}</span>
                        <span className="text-[10px] text-gray-500 font-mono ml-2">URL: {soc.url}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="flex items-center gap-1 cursor-pointer">
                          <span className="text-[9px] text-gray-400">Show:</span>
                          <input
                            type="checkbox"
                            checked={soc.visible}
                            onChange={(e) => {
                              const list = [...config.socials];
                              const idx = list.findIndex(s => s.id === soc.id);
                              list[idx].visible = e.target.checked;
                              setConfig({ ...config, socials: list });
                            }}
                            className="w-3.5 h-3.5 rounded text-[#00ff66] bg-black border-[#333]"
                          />
                        </label>
                        <button
                          onClick={() => setEditingSocial(soc)}
                          className="bg-[#333] px-2 py-0.5 rounded text-[10px]"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {editingSocial && (
                  <div className="bg-black/60 p-4 rounded border border-[#333] space-y-3">
                    <h5 className="text-xs font-mono text-[#00ff66]">Modify Channel Parameters</h5>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-[10px] text-gray-400">Platform</label>
                        <input
                          type="text"
                          value={editingSocial.platform || ''}
                          onChange={(e) => setEditingSocial({ ...editingSocial, platform: e.target.value })}
                          className="w-full bg-[#111] border border-[#333] rounded px-2 py-1 text-xs text-white"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="text-[10px] text-gray-400">Destination URL</label>
                        <input
                          type="text"
                          value={editingSocial.url || ''}
                          onChange={(e) => setEditingSocial({ ...editingSocial, url: e.target.value })}
                          className="w-full bg-[#111] border border-[#333] rounded px-2 py-1 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400">Icon Emoji</label>
                        <input
                          type="text"
                          value={editingSocial.icon || ''}
                          onChange={(e) => setEditingSocial({ ...editingSocial, icon: e.target.value })}
                          className="w-full bg-[#111] border border-[#333] rounded px-2 py-1 text-xs text-white"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-2 border-t border-[#222]">
                      <button onClick={() => setEditingSocial(null)} className="bg-transparent border border-[#333] px-3 py-1 rounded text-xs">Cancel</button>
                      <button
                        onClick={() => {
                          const list = [...config.socials];
                          const idx = list.findIndex(s => s.id === editingSocial.id);
                          list[idx] = { ...list[idx], ...editingSocial } as any;
                          setConfig({ ...config, socials: list });
                          setEditingSocial(null);
                        }}
                        className="bg-[#00ff66] text-black font-bold px-3 py-1 rounded text-xs"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* POLICIES */}
              <div className="bg-[#111] p-4 rounded border border-[#222] space-y-4">
                <h4 className="text-xs font-mono text-white border-b border-[#222] pb-2">⚖️ Markdown policies & legal terms</h4>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] text-gray-400 font-mono mb-1">Terms of Service</label>
                    <textarea
                      rows={4}
                      value={config.policies.termsOfService}
                      onChange={(e) => setConfig({
                        ...config,
                        policies: { ...config.policies, termsOfService: e.target.value }
                      })}
                      className="w-full bg-black border border-[#333] rounded p-2 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-gray-400 font-mono mb-1">Privacy Policy</label>
                    <textarea
                      rows={4}
                      value={config.policies.privacyPolicy}
                      onChange={(e) => setConfig({
                        ...config,
                        policies: { ...config.policies, privacyPolicy: e.target.value }
                      })}
                      className="w-full bg-black border border-[#333] rounded p-2 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-gray-400 font-mono mb-1">Refund & Purchase Agreement</label>
                    <textarea
                      rows={4}
                      value={config.policies.refundPolicy}
                      onChange={(e) => setConfig({
                        ...config,
                        policies: { ...config.policies, refundPolicy: e.target.value }
                      })}
                      className="w-full bg-black border border-[#333] rounded p-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 7. ROADMAP EDITOR */}
          {activeAdminTab === 'roadmaps' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-[#00ff66] font-mono text-sm uppercase tracking-wider mb-2">Roadmap Milestones</h3>
                <p className="text-xs text-gray-400 mb-4">Edit the 90-day gamified roadmap milestones, steps, and recommended playbooks.</p>
              </div>

              {(['starter', 'growth', 'scale'] as Array<'starter' | 'growth' | 'scale'>).map(stageKey => {
                const milestone = config.roadmap.milestones[stageKey];
                return (
                  <div key={stageKey} className="p-4 bg-[#111] rounded border border-[#222] space-y-3 hover:border-[#333] transition">
                    <span className="text-xs font-mono uppercase text-[#34C792] font-bold">{stageKey} Milestone (Phase)</span>

                    <div>
                      <label className="block text-[10px] text-gray-400 font-mono">Stage Header Title</label>
                      <input
                        type="text"
                        value={milestone.title}
                        onChange={(e) => {
                          const copy = { ...config.roadmap.milestones };
                          copy[stageKey].title = e.target.value;
                          setConfig({ ...config, roadmap: { milestones: copy } });
                        }}
                        className="w-full bg-black border border-[#333] rounded px-3 py-1.5 text-xs text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-gray-400 font-mono">Stage Target Outcome</label>
                      <input
                        type="text"
                        value={milestone.target}
                        onChange={(e) => {
                          const copy = { ...config.roadmap.milestones };
                          copy[stageKey].target = e.target.value;
                          setConfig({ ...config, roadmap: { milestones: copy } });
                        }}
                        className="w-full bg-black border border-[#333] rounded px-3 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-gray-400 font-mono mb-1">Checklist Actions (one per line)</label>
                      <textarea
                        rows={3}
                        value={milestone.steps.join('\n')}
                        onChange={(e) => {
                          const copy = { ...config.roadmap.milestones };
                          copy[stageKey].steps = e.target.value.split('\n').filter(s => s.trim() !== '');
                          setConfig({ ...config, roadmap: { milestones: copy } });
                        }}
                        className="w-full bg-black border border-[#333] rounded p-2 text-xs text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-gray-400 font-mono">Recommended Playbooks (comma separated)</label>
                      <input
                        type="text"
                        value={milestone.playbooks.join(', ')}
                        onChange={(e) => {
                          const copy = { ...config.roadmap.milestones };
                          copy[stageKey].playbooks = e.target.value.split(',').map(p => p.trim()).filter(p => p !== '');
                          setConfig({ ...config, roadmap: { milestones: copy } });
                        }}
                        className="w-full bg-black border border-[#333] rounded px-3 py-1.5 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 8. AI MENTOR SETTINGS */}
          {activeAdminTab === 'ai-mentor' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-[#00ff66] font-mono text-sm uppercase tracking-wider mb-2">AI Mentor Chatbot Calibration</h3>
                <p className="text-xs text-gray-400 mb-4">Live calibrate the Claude AI Mentor chatbot's personality, prompt guidelines, styles, suggestions, and parameter sliders.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-300 font-mono mb-1">Agent Name</label>
                  <input
                    type="text"
                    value={config.aiMentor.agentName}
                    onChange={(e) => setConfig({
                      ...config,
                      aiMentor: { ...config.aiMentor, agentName: e.target.value }
                    })}
                    className="w-full bg-[#111] border border-[#333] rounded px-3 py-2 text-sm text-white focus:border-[#00ff66]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-300 font-mono mb-1">Agent Tone Choice</label>
                  <input
                    type="text"
                    value={config.aiMentor.tone}
                    onChange={(e) => setConfig({
                      ...config,
                      aiMentor: { ...config.aiMentor, tone: e.target.value }
                    })}
                    className="w-full bg-[#111] border border-[#333] rounded px-3 py-2 text-sm text-white focus:border-[#00ff66]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-300 font-mono mb-1">Agent Detailed Personality Guidelines</label>
                <textarea
                  rows={2}
                  value={config.aiMentor.personality}
                  onChange={(e) => setConfig({
                    ...config,
                    aiMentor: { ...config.aiMentor, personality: e.target.value }
                  })}
                  className="w-full bg-[#111] border border-[#333] rounded p-3 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-300 font-mono mb-1">Base System Prompt</label>
                <textarea
                  rows={4}
                  value={config.aiMentor.systemPrompt}
                  onChange={(e) => setConfig({
                    ...config,
                    aiMentor: { ...config.aiMentor, systemPrompt: e.target.value }
                  })}
                  className="w-full bg-[#111] border border-[#333] rounded p-3 text-xs text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#111] p-4 rounded border border-[#222]">
                <div>
                  <label className="block text-xs text-gray-300 font-mono mb-1">Temperature ({config.aiMentor.temperature})</label>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={config.aiMentor.temperature}
                    onChange={(e) => setConfig({
                      ...config,
                      aiMentor: { ...config.aiMentor, temperature: parseFloat(e.target.value) }
                    })}
                    className="w-full accent-[#00ff66]"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-1"><span>0.1 (Precise)</span><span>1.0 (Creative)</span></div>
                </div>

                <div>
                  <label className="block text-xs text-gray-300 font-mono mb-1">Max Response Tokens ({config.aiMentor.maxTokens})</label>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="50"
                    value={config.aiMentor.maxTokens}
                    onChange={(e) => setConfig({
                      ...config,
                      aiMentor: { ...config.aiMentor, maxTokens: parseInt(e.target.value) }
                    })}
                    className="w-full accent-[#00ff66]"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-1"><span>100 tokens</span><span>1,000 tokens</span></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-300 font-mono mb-1">Chat response Formatting</label>
                  <select
                    value={config.aiMentor.responseStyle}
                    onChange={(e) => setConfig({
                      ...config,
                      aiMentor: { ...config.aiMentor, responseStyle: e.target.value as any }
                    })}
                    className="w-full bg-[#111] border border-[#333] rounded px-3 py-2 text-sm text-white"
                  >
                    <option value="bullets">Bullets Only (High Readability)</option>
                    <option value="paragraphs">Paragraphs Only (Narrative)</option>
                    <option value="mixed">Mixed Combo (Standard)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-300 font-mono mb-1">Blocked Topics Blacklist (comma-separated)</label>
                  <input
                    type="text"
                    value={config.aiMentor.blockedTopics.join(', ')}
                    onChange={(e) => setConfig({
                      ...config,
                      aiMentor: { ...config.aiMentor, blockedTopics: e.target.value.split(',').map(t => t.trim()).filter(t => t !== '') }
                    })}
                    className="w-full bg-[#111] border border-[#333] rounded px-3 py-2 text-sm text-white font-mono"
                  />
                </div>
              </div>

              <div className="bg-[#111] p-4 rounded border border-[#222] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-300 font-mono">Show Starter Suggestion Cards</span>
                  <input
                    type="checkbox"
                    checked={config.aiMentor.showStarterPrompts}
                    onChange={(e) => setConfig({
                      ...config,
                      aiMentor: { ...config.aiMentor, showStarterPrompts: e.target.checked }
                    })}
                    className="w-4 h-4 text-[#00ff66] bg-black border-[#333] rounded focus:ring-0 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-gray-400 font-mono mb-1">Starter Suggestions (one per line)</label>
                  <textarea
                    rows={3}
                    value={config.aiMentor.starterPrompts.join('\n')}
                    onChange={(e) => setConfig({
                      ...config,
                      aiMentor: { ...config.aiMentor, starterPrompts: e.target.value.split('\n').filter(p => p.trim() !== '') }
                    })}
                    className="w-full bg-[#1c1c1c] border border-[#333] rounded p-2 text-xs text-white font-mono"
                  />
                </div>
              </div>

              {/* 12. SYSTEM PROMPT EDITOR / PREVIEW BLOCK */}
              <div className="bg-[#111] p-4 rounded border border-yellow-900/50 space-y-4">
                <div className="flex justify-between items-center border-b border-yellow-900/40 pb-2">
                  <span className="text-xs font-mono font-bold text-yellow-400">🤖 Generated Prompt View</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(compiledSystemPrompt.trim());
                        alert('System Prompt copied to clipboard!');
                      }}
                      className="bg-[#222] hover:bg-[#333] text-[#efefef] text-[10px] font-mono px-2 py-1 rounded"
                    >
                      Copy Prompt
                    </button>
                    <a
                      href={`data:text/plain;charset=utf-8,${encodeURIComponent(compiledSystemPrompt.trim())}`}
                      download="system-prompt.txt"
                      className="bg-yellow-950 text-yellow-300 text-[10px] font-mono px-2 py-1 rounded hover:bg-yellow-900/50 text-center"
                    >
                      Export .txt
                    </a>
                  </div>
                </div>

                <textarea
                  readOnly
                  rows={8}
                  value={compiledSystemPrompt.trim()}
                  className="w-full bg-black/60 border border-[#333] rounded p-3 text-[10px] text-gray-300 font-mono"
                />
              </div>
            </div>
          )}

          {/* 9. GAMIFICATION */}
          {activeAdminTab === 'gamification' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-[#00ff66] font-mono text-sm uppercase tracking-wider mb-2">Gamification Rules & Actions</h3>
                <p className="text-xs text-gray-400 mb-4">Configure XP scaling values, level milestones, custom unlocked achievements, and leaderboards.</p>
              </div>

              {/* XP VALUES */}
              <div className="bg-[#111] p-4 rounded border border-[#222] space-y-3">
                <span className="text-xs font-mono font-bold text-white block border-b border-[#222] pb-1.5">⚡ Action XP Rewards Weight</span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-gray-400">Complete Playbook step</label>
                    <input
                      type="number"
                      value={config.gamification.xpValues.completePlaybookStep}
                      onChange={(e) => setConfig({
                        ...config,
                        gamification: {
                          ...config.gamification,
                          xpValues: { ...config.gamification.xpValues, completePlaybookStep: parseInt(e.target.value) || 0 }
                        }
                      })}
                      className="w-full bg-black border border-[#333] rounded px-3 py-1 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400">Save Prompt Card</label>
                    <input
                      type="number"
                      value={config.gamification.xpValues.savePrompt}
                      onChange={(e) => setConfig({
                        ...config,
                        gamification: {
                          ...config.gamification,
                          xpValues: { ...config.gamification.xpValues, savePrompt: parseInt(e.target.value) || 0 }
                        }
                      })}
                      className="w-full bg-black border border-[#333] rounded px-3 py-1 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400">Download Resource file</label>
                    <input
                      type="number"
                      value={config.gamification.xpValues.downloadResource}
                      onChange={(e) => setConfig({
                        ...config,
                        gamification: {
                          ...config.gamification,
                          xpValues: { ...config.gamification.xpValues, downloadResource: parseInt(e.target.value) || 0 }
                        }
                      })}
                      className="w-full bg-black border border-[#333] rounded px-3 py-1 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400">Daily Dashboard Login</label>
                    <input
                      type="number"
                      value={config.gamification.xpValues.dailyLogin}
                      onChange={(e) => setConfig({
                        ...config,
                        gamification: {
                          ...config.gamification,
                          xpValues: { ...config.gamification.xpValues, dailyLogin: parseInt(e.target.value) || 0 }
                        }
                      })}
                      className="w-full bg-black border border-[#333] rounded px-3 py-1 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* ACHIEVEMENTS LIST */}
              <div className="bg-[#111] p-4 rounded border border-[#222] space-y-4">
                <div className="flex justify-between items-center border-b border-[#222] pb-2">
                  <span className="text-xs font-mono font-bold text-white">🏆 Achievements Registry</span>
                  <button
                    onClick={() => setEditingAchievement({})}
                    className="bg-[#00ff66] text-black text-[10px] font-bold uppercase px-2.5 py-1 rounded"
                  >
                    + Add New
                  </button>
                </div>

                <div className="space-y-2">
                  {config.gamification.achievements.map(ach => (
                    <div key={ach.id} className="bg-[#181818] p-3 rounded text-xs flex justify-between items-start gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{ach.icon}</span>
                        <div>
                          <div className="font-bold text-yellow-400">{ach.name}</div>
                          <div className="text-[10px] text-gray-400">XP Reward: +{ach.xpReward} XP</div>
                          <div className="text-[10px] text-gray-500 italic">Rules: {ach.condition}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingAchievement(ach)}
                          className="bg-[#333] hover:bg-[#444] text-white px-2 py-1 rounded text-[10px]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Delete achievement?')) {
                              setConfig({
                                ...config,
                                gamification: {
                                  ...config.gamification,
                                  achievements: config.gamification.achievements.filter(a => a.id !== ach.id)
                                }
                              });
                            }
                          }}
                          className="bg-red-950 text-red-400 px-2 py-1 rounded text-[10px]"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {editingAchievement && (
                  <div className="bg-black/60 p-4 rounded border border-[#333] space-y-3">
                    <h4 className="text-xs font-mono text-[#00ff66]">{editingAchievement.id ? 'Edit' : 'Create'} Achievement</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-gray-400">Badge Title</label>
                        <input
                          type="text"
                          value={editingAchievement.name || ''}
                          onChange={(e) => setEditingAchievement({ ...editingAchievement, name: e.target.value })}
                          className="w-full bg-[#111] border border-[#333] rounded px-2 py-1 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400">Badge Icon Emoji</label>
                        <input
                          type="text"
                          value={editingAchievement.icon || ''}
                          onChange={(e) => setEditingAchievement({ ...editingAchievement, icon: e.target.value })}
                          className="w-full bg-[#111] border border-[#333] rounded px-2 py-1 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400">XP Reward</label>
                        <input
                          type="number"
                          value={editingAchievement.xpReward || 0}
                          onChange={(e) => setEditingAchievement({ ...editingAchievement, xpReward: parseInt(e.target.value) || 0 })}
                          className="w-full bg-[#111] border border-[#333] rounded px-2 py-1 text-xs text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400">Condition Instruction</label>
                        <input
                          type="text"
                          value={editingAchievement.condition || ''}
                          onChange={(e) => setEditingAchievement({ ...editingAchievement, condition: e.target.value })}
                          className="w-full bg-[#111] border border-[#333] rounded px-2 py-1 text-xs text-white"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-2 border-t border-[#222]">
                      <button onClick={() => setEditingAchievement(null)} className="bg-transparent border border-[#333] px-3 py-1 rounded text-xs">Cancel</button>
                      <button
                        onClick={() => {
                          const list = [...config.gamification.achievements];
                          if (editingAchievement.id) {
                            const idx = list.findIndex(p => p.id === editingAchievement.id);
                            list[idx] = editingAchievement as Achievement;
                          } else {
                            list.push({
                              ...(editingAchievement as Achievement),
                              id: `ach-${Date.now()}`
                            });
                          }
                          setConfig({ ...config, gamification: { ...config.gamification, achievements: list } });
                          setEditingAchievement(null);
                        }}
                        className="bg-[#00ff66] text-black font-bold px-3 py-1 rounded text-xs"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* LEVEL THRESHOLDS */}
              <div className="bg-[#111] p-4 rounded border border-[#222] space-y-3">
                <span className="text-xs font-mono font-bold text-white block">📊 Level-Up XP Scaling (thresholds)</span>
                <div className="space-y-2">
                  {config.gamification.levels.map((lvl, index) => (
                    <div key={lvl.level} className="flex items-center gap-4 text-xs font-mono">
                      <span className="w-16">Level {lvl.level}:</span>
                      <input
                        type="number"
                        value={lvl.xpNeeded}
                        onChange={(e) => {
                          const copy = [...config.gamification.levels];
                          copy[index].xpNeeded = parseInt(e.target.value) || 0;
                          setConfig({ ...config, gamification: { ...config.gamification, levels: copy } });
                        }}
                        className="w-32 bg-black border border-[#333] rounded px-2.5 py-1 text-xs text-white"
                      />
                      <span className="text-[10px] text-gray-500">XP accumulated to hit level {lvl.level}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* LEADERBOARD / RESET */}
              <div className="bg-[#111] p-4 rounded border border-[#222] space-y-4">
                <h4 className="text-xs font-mono text-white block border-b border-[#222] pb-1.5">🏆 Leaderboard Reset Controls</h4>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-300 font-mono">Show Ranking Tab</span>
                  <input
                    type="checkbox"
                    checked={config.gamification.leaderboardVisible}
                    onChange={(e) => setConfig({
                      ...config,
                      gamification: { ...config.gamification, leaderboardVisible: e.target.checked }
                    })}
                    className="w-4 h-4 text-[#00ff66] bg-black border-[#333] rounded focus:ring-0 cursor-pointer"
                  />
                </div>
                <button
                  onClick={() => {
                    if (confirm('Reset simulated users leaderboard? This will wipe user XP scores back to default levels.')) {
                      const resetUsers = config.users.map(u => ({ ...u, xp: u.id === 'usr-1' ? 4000 : 0, level: u.id === 'usr-1' ? 4 : 1 }));
                      setConfig({ ...config, users: resetUsers });
                      if (previewUser) {
                        const found = resetUsers.find(u => u.id === previewUser.id);
                        if (found) {
                          setPreviewUserXP(found.xp);
                          setPreviewUserLevel(found.level);
                        }
                      }
                      alert('Leaderboard reset complete.');
                    }
                  }}
                  className="w-full bg-red-950/40 text-red-400 border border-red-900/50 py-2 rounded text-xs font-mono font-bold hover:bg-red-900/40 transition"
                >
                  ⚠️ WIPE LEADERBOARD RANKS
                </button>
              </div>
            </div>
          )}

          {/* 10. INTEGRATIONS */}
          {activeAdminTab === 'integrations' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-[#00ff66] font-mono text-sm uppercase tracking-wider mb-2">API Keys & Service Integrations</h3>
                <p className="text-xs text-gray-400 mb-4">Manage service connections (Clerk, Stripe, Anthropic Claude, OpenAI, Discord Bot, Resend emails).</p>
              </div>

              {[
                { label: 'Clerk Auth Key', key: 'clerkKey', status: true },
                { label: 'Stripe Payments Private Key', key: 'stripeKey', status: true },
                { label: 'Anthropic Claude SDK API Key', key: 'claudeKey', status: true },
                { label: 'OpenAI API Key', key: 'openaiKey', status: true },
                { label: 'Discord Bot Client Token', key: 'discordToken', status: false },
                { label: 'Resend Transactional Email Key', key: 'resendKey', status: false }
              ].map(field => {
                const isConnected = !!(config.integrations as any)[field.key];
                return (
                  <div key={field.key} className="p-3 bg-[#111] rounded border border-[#222] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex-1 w-full">
                      <span className="text-xs font-bold text-gray-300 font-mono block mb-1">{field.label}</span>
                      <input
                        type="text"
                        value={(config.integrations as any)[field.key]}
                        onChange={(e) => setConfig({
                          ...config,
                          integrations: { ...config.integrations, [field.key]: e.target.value }
                        })}
                        placeholder="sk_live_..."
                        className="w-full bg-black border border-[#333] rounded px-3 py-1.5 text-xs text-gray-400 font-mono focus:border-[#00ff66]"
                      />
                    </div>
                    <div className="flex items-center gap-2 self-end md:self-center">
                      <span className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-[#00ff66] animate-pulse' : 'bg-red-500'}`}></span>
                      <span className="text-[10px] font-mono text-gray-400 uppercase">{isConnected ? 'Connected' : 'Missing'}</span>
                    </div>
                  </div>
                );
              })}

              {/* WELCOME / UPGRADE MAILS */}
              <div className="bg-[#111] p-4 rounded border border-[#222] space-y-4">
                <span className="text-xs font-mono font-bold text-white block border-b border-[#222] pb-1.5">📧 Resend Email Automation Templates</span>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] text-gray-400 font-mono">Welcome Onboarding Subject</label>
                    <input
                      type="text"
                      value={config.email.welcomeSubject}
                      onChange={(e) => setConfig({
                        ...config,
                        email: { ...config.email, welcomeSubject: e.target.value }
                      })}
                      className="w-full bg-black border border-[#333] rounded px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-400 font-mono">Welcome Onboarding Body Text</label>
                    <textarea
                      rows={4}
                      value={config.email.welcomeBody}
                      onChange={(e) => setConfig({
                        ...config,
                        email: { ...config.email, welcomeBody: e.target.value }
                      })}
                      className="w-full bg-black border border-[#333] rounded p-2.5 text-xs text-white font-mono"
                    />
                  </div>

                  <div className="h-px bg-[#222]"></div>

                  <div>
                    <label className="block text-[10px] text-gray-400 font-mono">Elite Upgrade Nudge Subject</label>
                    <input
                      type="text"
                      value={config.email.upgradeSubject}
                      onChange={(e) => setConfig({
                        ...config,
                        email: { ...config.email, upgradeSubject: e.target.value }
                      })}
                      className="w-full bg-black border border-[#333] rounded px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-400 font-mono">Elite Upgrade Nudge Body Text</label>
                    <textarea
                      rows={4}
                      value={config.email.upgradeBody}
                      onChange={(e) => setConfig({
                        ...config,
                        email: { ...config.email, upgradeBody: e.target.value }
                      })}
                      className="w-full bg-black border border-[#333] rounded p-2.5 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 11. ANALYTICS SNAPSHOT */}
          {activeAdminTab === 'analytics' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-[#00ff66] font-mono text-sm uppercase tracking-wider mb-2">System Analytics & Revenue Snapshot</h3>
                <p className="text-xs text-gray-400 mb-4">Sleek read-only metrics of conversions and product views (Dynamic Sandbox Mock).</p>
              </div>

              {/* METRIC GRID */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { title: 'Total Registered', value: '5,244', sub: '+12% this week', icon: '👥' },
                  { title: 'Active Earning', value: '4,102', sub: '78.2% Active Rate', icon: '🎯' },
                  { title: 'Monthly Conversion', value: '18.4%', sub: 'Avg conversion', icon: '📈' },
                  { title: 'Estimated MRR', value: '$84,210', sub: 'USD per month', icon: '💰' }
                ].map((metric, idx) => (
                  <div key={idx} className="bg-[#111] p-3.5 rounded border border-[#222]">
                    <div className="text-xl mb-1">{metric.icon}</div>
                    <div className="text-lg font-bold text-white font-mono">{metric.value}</div>
                    <div className="text-[10px] text-gray-300 font-mono">{metric.title}</div>
                    <div className="text-[9px] text-[#00ff66] font-mono mt-1">{metric.sub}</div>
                  </div>
                ))}
              </div>

              {/* REVENUE TIER BREAKDOWN */}
              <div className="bg-[#111] p-4 rounded border border-[#222]">
                <span className="text-xs font-mono font-bold text-white block border-b border-[#222] pb-2 mb-3">💰 Monthly Revenue Tier Distribution</span>
                <div className="space-y-2 text-xs font-mono">
                  {[
                    { tier: 'Free Access ($0/mo)', count: '1,142 users', mrr: '$0.00', pct: '21%', w: 'w-[21%]', c: 'bg-gray-600' },
                    { tier: 'Starter Pro ($19/mo)', count: '2,890 users', mrr: '$54,910.00', pct: '55%', w: 'w-[55%]', c: 'bg-teal-500' },
                    { tier: 'Pro Member ($49/mo)', count: '984 users', mrr: '$48,216.00', pct: '18%', w: 'w-[18%]', c: 'bg-[#C8A869]' },
                    { tier: 'Elite Mastermind ($149/mo)', count: '228 users', mrr: '$33,972.00', pct: '6%', w: 'w-[6%]', c: 'bg-[#34C792]' }
                  ].map((row, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-white font-bold">{row.tier}</span>
                        <span className="text-gray-400">{row.count} ({row.pct}) • <span className="text-[#00ff66]">{row.mrr}</span></span>
                      </div>
                      <div className="w-full bg-[#222] rounded-full h-2">
                        <div className={`h-2 rounded-full ${row.c} ${row.w}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* TOP PERFORMERS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#111] p-4 rounded border border-[#222] text-xs font-mono">
                  <span className="text-xs font-bold text-white block border-b border-[#222] pb-1.5 mb-2">📖 Top Side Hustles Started</span>
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-300"><span>1. AI Content Agency</span><span className="text-emerald-400 font-bold">1,894 active</span></div>
                    <div className="flex justify-between text-gray-300"><span>2. AI Automation Freelance</span><span className="text-emerald-400 font-bold">982 active</span></div>
                    <div className="flex justify-between text-gray-300"><span>3. Digital Products Vault</span><span className="text-emerald-400 font-bold">642 active</span></div>
                  </div>
                </div>

                <div className="bg-[#111] p-4 rounded border border-[#222] text-xs font-mono">
                  <span className="text-xs font-bold text-white block border-b border-[#222] pb-1.5 mb-2">⚡ Most Saved Prompt Packs</span>
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-300"><span>1. Gen-Z Viral Hook Gen</span><span className="text-purple-400 font-bold">8,542 copys</span></div>
                    <div className="flex justify-between text-gray-300"><span>2. Cold Email Lead Pitch</span><span className="text-purple-400 font-bold">4,120 copys</span></div>
                    <div className="flex justify-between text-gray-300"><span>3. SEO Outline Architect</span><span className="text-purple-400 font-bold">3,890 copys</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ==========================================
            RIGHT SIDE: HIGH-FIDELITY SIMULATED PREVIEW
           ========================================== */}
        <div
          className="p-6 overflow-y-auto max-h-[calc(100vh-80px)] border-t lg:border-t-0 border-[#222] transition-colors duration-300"
          style={{
            backgroundColor: config.branding.backgroundColor,
            fontFamily: config.branding.fontFamily === 'serif' ? '"DM Serif Display", Georgia, serif' : config.branding.fontFamily === 'mono' ? '"Fira Code", monospace' : '"DM Sans", sans-serif'
          }}
        >
          {/* FLOATING REAL-TIME XP Splash Notification */}
          {xpFloater && (
            <div className="fixed top-24 right-6 bg-[#00ff66] text-black font-mono font-bold text-sm px-4 py-2 rounded-lg shadow-lg shadow-[#00ff66]/20 animate-fade-up z-50 flex items-center gap-2">
              <span>⚡ +{xpFloater.amount} XP</span>
              <span className="text-xs opacity-80">({xpFloater.text})</span>
            </div>
          )}

          {/* ACHIEVEMENT UNLOCKED ALERT DIALOG */}
          {unlockedAchievementAlert && (
            <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
              <div className="bg-[#141413] border border-[#C8A869] rounded-xl p-8 max-w-sm text-center space-y-4 shadow-2xl">
                <span className="text-6xl block animate-bounce">{unlockedAchievementAlert.icon}</span>
                <h3 className="text-xl font-bold font-serif text-[#C8A869] italic">ACHIEVEMENT UNLOCKED!</h3>
                <h4 className="text-lg font-bold text-white">{unlockedAchievementAlert.name}</h4>
                <p className="text-xs text-gray-400">{unlockedAchievementAlert.condition}</p>
                <div className="inline-block bg-[#C8A869]/10 text-[#C8A869] border border-[#C8A869]/30 rounded-full px-4 py-1.5 font-mono text-sm font-bold">
                  +{unlockedAchievementAlert.xpReward} XP Reward!
                </div>
                <button
                  onClick={() => {
                    triggerXPFeedback(unlockedAchievementAlert.xpReward, 'Achievement Badge');
                    setUnlockedAchievementAlert(null);
                  }}
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#C8A869] to-[#E8D4A0] text-black font-bold text-sm"
                >
                  CLAIM XP SPLASH 🚀
                </button>
              </div>
            </div>
          )}

          {/* SIMULATED EMAIL NOTIFICATIONS POPUP IN APP PREVIEW */}
          <div className="mb-4 bg-[#111] p-3 rounded-lg border border-[#222] text-xs font-mono flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">📧</span>
              <div>
                <span className="text-gray-400 block font-bold">Active Onboarding Mail Preview:</span>
                <span className="text-white block font-semibold truncate max-w-sm">{config.email.welcomeSubject}</span>
              </div>
            </div>
            <button
              onClick={() => {
                alert(`WELCOME EMAIL BODY:\n\nSubject: ${config.email.welcomeSubject}\n\n${config.email.welcomeBody}`);
                triggerXPFeedback(50, 'Viewed Welcome Mail');
              }}
              className="bg-[#222] border border-[#333] px-3 py-1 rounded text-[10px] hover:bg-[#333] font-bold"
            >
              Simulate Send
            </button>
          </div>

          {/* ANNOUNCEMENT BANNER */}
          {config.community.announcement.enabled && (
            <div
              className="p-3 mb-6 rounded-lg text-center text-xs font-semibold relative overflow-hidden transition-all"
              style={{
                background: `linear-gradient(135deg, ${config.branding.primaryColor}30 0%, ${config.branding.accentColor}30 100%)`,
                border: `1px solid ${config.branding.primaryColor}50`,
                color: '#fff'
              }}
            >
              <span>{config.community.announcement.text}</span>
            </div>
          )}

          {/* SIMULATED APP NAVBAR */}
          <nav className="flex items-center justify-between pb-6 border-b border-[#222] mb-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{config.branding.logoEmoji}</span>
              <div>
                <span className="text-lg font-serif font-bold italic tracking-wide text-white block uppercase">
                  {config.branding.appName}
                </span>
                <span className="text-[10px] text-gray-400 block">
                  {config.branding.tagline}
                </span>
              </div>
            </div>

            {/* Simulated stats profile card in App Header */}
            {previewUser && (
              <div className="text-right text-xs font-mono bg-[#111]/70 border border-[#222] px-3.5 py-1.5 rounded-lg">
                <span className="text-white block font-bold">{previewUser.displayName}</span>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-0.5 justify-end">
                  <span className="uppercase text-[#00ff66] font-bold">{previewUser.tier} TIER</span>
                  <span>•</span>
                  <span>LVL {previewUserLevel}</span>
                  <span>•</span>
                  <span className="text-yellow-400">{previewUserXP} XP</span>
                </div>
              </div>
            )}
          </nav>

          {/* SIMULATED APP SIDEBAR TABS */}
          <div className="flex gap-1.5 overflow-x-auto pb-4 mb-6 border-b border-[#222]/80">
            {[
              { id: 'dashboard', label: '📊 Dashboard', enabled: true },
              { id: 'playbooks', label: '📖 Side Hustles', enabled: true },
              { id: 'prompts', label: '✨ Prompt Vault', enabled: config.features.promptVault },
              { id: 'resources', label: '🛠️ Resource Library', enabled: config.features.resourceLibrary },
              { id: 'aiTools', label: '🤖 AI Tools DB', enabled: config.features.aiToolsDb },
              { id: 'aiMentor', label: '💬 AI Mentor Coach', enabled: config.features.aiMentor },
              { id: 'community', label: '👥 Community', enabled: config.features.communityTab },
              { id: 'leaderboard', label: '🏆 Leaderboard', enabled: config.features.leaderboard && config.gamification.leaderboardVisible }
            ].map(tab => {
              if (!tab.enabled) return null;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedPlaybook(null);
                    setPreviewTab(tab.id);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                    previewTab === tab.id
                      ? 'bg-white/10 text-white font-bold'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                  style={{
                    borderColor: previewTab === tab.id ? config.branding.primaryColor : 'transparent',
                    borderWidth: previewTab === tab.id ? '1px' : '0px'
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* ==========================================
              TAB 1: SIMULATED APP USER DASHBOARD
             ========================================== */}
          {previewTab === 'dashboard' && (
            <div className="space-y-6">
              {/* WELCOME SECTION */}
              <div className="space-y-1">
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Welcome back, {previewUser?.displayName?.split(' ')[0] || 'Builder'}!
                </h2>
                <p className="text-sm text-gray-400">
                  You are completing side hustles and digital templates today. Keep the cash flowing.
                </p>
              </div>

              {/* SCORE STATS PANEL */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Platform Ranks', value: `#${previewUser?.id === 'usr-1' ? '1' : previewUser?.id === 'usr-2' ? '2' : '3'}`, desc: 'Top rankings', icon: '🏆' },
                  { label: 'Level Milestone', value: `LVL ${previewUserLevel}`, desc: 'Threshold scaling', icon: '🎯' },
                  { label: 'Weekly Hours committed', value: '12 hours', desc: 'Consistency active', icon: '🔥' },
                  { label: 'Total XP Accumulation', value: `${previewUserXP} XP`, desc: `Next Level: ${previewUserXP < 500 ? '500' : previewUserXP < 1200 ? '1200' : previewUserXP < 2500 ? '2500' : '5000'} XP`, icon: '⚡' }
                ].map((stat, idx) => (
                  <div key={idx} className="p-4 bg-[#111]/70 border border-[#222] rounded-xl text-left">
                    <span className="text-2xl block mb-1">{stat.icon}</span>
                    <span className="text-lg font-bold block text-white font-mono">{stat.value}</span>
                    <span className="text-xs text-gray-400 block font-semibold">{stat.label}</span>
                    <span className="text-[9px] text-[#00ff66] block font-mono mt-1">{stat.desc}</span>
                  </div>
                ))}
              </div>

              {/* ROADMAPS PROGRESS TRACK */}
              {config.features.roadmaps && (
                <div className="p-6 bg-[#111]/70 border border-[#222] rounded-xl space-y-4 text-left">
                  <div className="border-b border-[#222] pb-3">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span>🎯 90-Day Income Roadmap Milestone</span>
                      <span
                        className="text-[10px] font-mono border px-2 py-0.5 rounded-full"
                        style={{ borderColor: config.branding.primaryColor, color: config.branding.primaryColor }}
                      >
                        $0 → $10,000/mo Goal
                      </span>
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">Check off milestone steps live below to unlock cash methods and score XP rewards!</p>
                  </div>

                  {/* THREE ROADMAP PHASES */}
                  <div className="space-y-4">
                    {[
                      { key: 'starter', stage: config.roadmap.milestones.starter, tier: 'free' as SubscriptionTier },
                      { key: 'growth', stage: config.roadmap.milestones.growth, tier: 'starter' as SubscriptionTier },
                      { key: 'scale', stage: config.roadmap.milestones.scale, tier: 'pro' as SubscriptionTier }
                    ].map(stage => {
                      const hasAccess = checkTierAccess(stage.tier);
                      const completedCount = stage.stage.steps.filter(s => previewUserCompletedSteps.includes(s)).length;
                      const pct = Math.floor((completedCount / stage.stage.steps.length) * 100) || 0;

                      return (
                        <div key={stage.key} className="p-4 bg-[#181818] rounded-lg border border-[#222] relative overflow-hidden">
                          {!hasAccess && (
                            <div className="absolute inset-0 bg-[#000]/80 backdrop-blur-xs flex items-center justify-center p-4 text-center z-10">
                              <div>
                                <span className="text-lg font-bold text-white block mb-1">🔐 Locked for {stage.stage.title}</span>
                                <p className="text-[10px] text-gray-400 mb-2">Requires premium <span className="uppercase text-[#00ff66] font-mono font-bold">{stage.tier}</span> level membership.</p>
                                <button
                                  onClick={() => checkTierAccess(stage.tier)}
                                  className="text-[10px] font-bold uppercase px-3 py-1 rounded bg-[#C8A869] text-black"
                                >
                                  Unlock Now
                                </button>
                              </div>
                            </div>
                          )}

                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2">
                            <div>
                              <span className="text-sm font-bold text-white block font-serif italic">{stage.stage.title} Stage</span>
                              <span className="text-[10px] text-gray-400 block">{stage.stage.target}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-mono font-bold text-[#00ff66]">{pct}% Done</span>
                            </div>
                          </div>

                          <div className="w-full bg-[#333] rounded-full h-1.5 mb-4">
                            <div className="h-1.5 rounded-full transition-all duration-300" style={{ width: `${pct}%`, backgroundColor: config.branding.primaryColor }}></div>
                          </div>

                          <div className="space-y-2">
                            {stage.stage.steps.map((step, idx) => {
                              const isCompleted = previewUserCompletedSteps.includes(step);
                              return (
                                <label key={idx} className="flex items-start gap-2.5 text-xs text-gray-300 cursor-pointer hover:text-white transition">
                                  <input
                                    type="checkbox"
                                    checked={isCompleted}
                                    onChange={() => {
                                      if (isCompleted) {
                                        setPreviewUserCompletedSteps(prev => prev.filter(s => s !== step));
                                      } else {
                                        setPreviewUserCompletedSteps(prev => [...prev, step]);
                                        triggerXPFeedback(config.gamification.xpValues.completePlaybookStep, 'Milestone Step Done');
                                      }
                                    }}
                                    className="mt-0.5 rounded text-[#00ff66] bg-black border-[#333] focus:ring-0"
                                  />
                                  <span className={isCompleted ? 'line-through text-gray-500' : ''}>{step}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ACHIEVEMENTS GRID */}
              {config.features.gamification && (
                <div className="p-6 bg-[#111]/70 border border-[#222] rounded-xl text-left space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-white">🏆 Unlocked Achievements Badges</h3>
                    <p className="text-[10px] text-gray-400">Complete methods and actions inside STACK to unlock these high-yield achievements!</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {config.gamification.achievements.map((ach, idx) => {
                      const isUnlocked = previewUserXP >= (idx * 1000 + 50);
                      return (
                        <div
                          key={ach.id}
                          className={`p-3 rounded-lg border text-xs flex items-center gap-3 transition ${
                            isUnlocked ? 'bg-[#181818] border-[#C8A869]/30 text-white' : 'bg-[#111]/30 border-[#222] opacity-40 text-gray-500'
                          }`}
                        >
                          <span className="text-3xl">{ach.icon}</span>
                          <div>
                            <span className="font-bold block text-white">{ach.name}</span>
                            <span className="text-[9px] text-gray-400 block">{ach.condition}</span>
                            {isUnlocked && <span className="text-[9px] text-[#C8A869] font-bold block mt-0.5">+{ach.xpReward} XP Earned</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==========================================
              TAB 2: SIMULATED APP WEEKLY PLAYBOOKS
             ========================================== */}
          {previewTab === 'playbooks' && (
            <div className="space-y-6 text-left">
              {!selectedPlaybook ? (
                <>
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold font-serif italic text-white">
                      Side Hustle Playbooks
                    </h2>
                    <p className="text-xs text-gray-400">
                      Step-by-step digital cash-flow generation guides built for high-performance execution.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {config.content.playbooks.map(pb => {
                      return (
                        <div
                          key={pb.id}
                          onClick={() => {
                            if (checkTierAccess(pb.tier)) {
                              setSelectedPlaybook(pb);
                            }
                          }}
                          className="p-5 rounded-xl border border-[#222] bg-[#111]/70 hover-lift cursor-pointer space-y-4 hover:border-[#333] transition"
                        >
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <span className="text-xs font-mono uppercase bg-[#222] border px-2 py-0.5 rounded font-bold text-gray-300">
                                {pb.category}
                              </span>
                              <h3 className="text-lg font-bold text-white font-serif italic mt-2">{pb.title}</h3>
                            </div>
                            <span className="text-lg text-emerald-400 font-bold font-mono whitespace-nowrap bg-emerald-950/20 border border-emerald-900/30 px-2 py-1 rounded">
                              {pb.estimatedEarnings}
                            </span>
                          </div>

                          <p className="text-xs text-gray-400 line-clamp-2">{pb.content}</p>

                          <div className="flex justify-between items-center text-[10px] text-gray-500 border-t border-[#222] pt-3">
                            <span className="font-mono">{pb.stepCount} Execution Steps</span>
                            <span className="uppercase text-[#00ff66] font-bold font-mono">Requires: {pb.tier}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="p-6 bg-[#111]/70 border border-[#222] rounded-xl space-y-5">
                  <button
                    onClick={() => setSelectedPlaybook(null)}
                    className="text-xs text-gray-400 hover:text-white flex items-center gap-1.5 mb-2 font-mono"
                  >
                    ← Back to Playbooks List
                  </button>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#222] pb-4">
                    <div>
                      <span className="text-xs font-mono uppercase text-gray-400 bg-[#222] px-2 py-0.5 rounded font-bold">{selectedPlaybook.category}</span>
                      <h2 className="text-2xl font-bold font-serif italic text-white mt-1">{selectedPlaybook.title}</h2>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold font-mono text-[#34C792] block">{selectedPlaybook.estimatedEarnings}</span>
                      <span className="text-[10px] text-gray-400 block font-mono">Estimated Monthly Earnings</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider mb-2">Strategy Overview:</h3>
                    <p className="text-xs text-gray-300 leading-relaxed bg-black/40 p-4 rounded-lg border border-[#222]">
                      {selectedPlaybook.content}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider">Step-by-Step Action Guide:</h3>
                    <div className="space-y-3">
                      {(selectedPlaybook.stepsList || []).map((stepText, idx) => (
                        <div key={idx} className="flex gap-4 p-3 bg-[#181818] rounded-lg border border-[#222] items-start hover:border-[#333] transition">
                          <span className="w-6 h-6 rounded-full bg-[#00ff66]/10 border border-[#00ff66]/30 text-[#00ff66] font-bold font-mono text-xs flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <div className="flex-1">
                            <p className="text-xs text-gray-300 leading-relaxed">{stepText}</p>
                            <button
                              onClick={() => {
                                triggerXPFeedback(config.gamification.xpValues.completePlaybookStep, 'Playbook Checklist step completed!');
                                alert(`Step ${idx + 1} marked completed! Added +${config.gamification.xpValues.completePlaybookStep} XP`);
                              }}
                              className="text-[10px] font-mono text-[#00ff66] hover:underline font-bold mt-2 block"
                            >
                              ✓ Mark step completed and claim XP reward
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==========================================
              TAB 3: SIMULATED APP PROMPT VAULT
             ========================================== */}
          {previewTab === 'prompts' && (
            <div className="space-y-6 text-left">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold font-serif italic text-white">
                  1,000+ AI Prompt Vault
                </h2>
                <p className="text-xs text-gray-400">
                  Instantly copy optimized ChatGPT & Claude prompts built to streamline copywriting and client outreach.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {config.content.prompts.map(pr => {
                  const hasAccess = checkTierAccess(pr.tier);
                  const isSaved = previewUserSavedPrompts.includes(pr.id);

                  return (
                    <div
                      key={pr.id}
                      className="p-5 rounded-xl border border-[#222] bg-[#111]/70 relative overflow-hidden space-y-4 hover:border-[#333] transition"
                    >
                      {!hasAccess && (
                        <div className="absolute inset-0 bg-[#000]/80 backdrop-blur-xs flex items-center justify-center p-4 text-center z-10">
                          <div>
                            <span className="text-base font-bold text-white block mb-1">🔐 {pr.title} Locked</span>
                            <p className="text-[10px] text-gray-400 mb-2.5">Requires premium <span className="uppercase text-[#00ff66] font-mono font-bold">{pr.tier}</span> level membership.</p>
                            <button
                              onClick={() => checkTierAccess(pr.tier)}
                              className="text-[10px] font-bold uppercase px-3 py-1 rounded bg-[#C8A869] text-black"
                            >
                              Upgrade Subscription
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#222] pb-3">
                        <div>
                          <span className="text-[10px] uppercase font-mono bg-teal-950/30 text-teal-400 border border-teal-900/30 px-2 py-0.5 rounded font-bold">
                            {pr.category}
                          </span>
                          <h3 className="text-base font-bold text-white mt-1.5">{pr.title}</h3>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {pr.tags.map((tg, i) => (
                            <span key={i} className="text-[9px] font-mono text-gray-500 bg-[#222] px-1.5 py-0.5 rounded">
                              #{tg}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-black/60 rounded-lg p-4 border border-[#222] text-xs font-mono text-gray-300 select-all overflow-x-auto whitespace-pre-wrap">
                        {pr.content}
                      </div>

                      <div className="flex justify-between items-center pt-2 text-[10px]">
                        <span className="text-gray-500 uppercase font-mono font-bold">Access Level: {pr.tier}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSavePrompt(pr.id)}
                            className={`px-3 py-1 rounded border font-bold ${
                              isSaved
                                ? 'bg-yellow-950/20 border-yellow-900/50 text-[#C8A869]'
                                : 'bg-[#181818] border-[#333] text-white hover:bg-[#222]'
                            }`}
                          >
                            {isSaved ? '★ Saved to Vault' : '☆ Save to Vault'}
                          </button>
                          <button
                            onClick={() => handleCopyPrompt(pr.content)}
                            className="bg-[#C8A869] text-black font-bold px-3 py-1 rounded"
                          >
                            Copy Prompt
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ==========================================
              TAB 4: SIMULATED APP RESOURCE LIBRARY
             ========================================== */}
          {previewTab === 'resources' && (
            <div className="space-y-6 text-left">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold font-serif italic text-white">
                  Resource Library Templates
                </h2>
                <p className="text-xs text-gray-400">
                  Download client contracts, Make.com operations blueprints, and Premiere presets to execute workflows.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {config.content.resources.map(res => {
                  const hasAccess = checkTierAccess(res.tier);
                  const isDownloaded = previewUserDownloadedResources.includes(res.id);

                  return (
                    <div
                      key={res.id}
                      className="p-5 rounded-xl border border-[#222] bg-[#111]/70 relative overflow-hidden space-y-4 hover:border-[#333] transition flex flex-col justify-between"
                    >
                      {!hasAccess && (
                        <div className="absolute inset-0 bg-[#000]/80 backdrop-blur-xs flex items-center justify-center p-4 text-center z-10">
                          <div>
                            <span className="text-base font-bold text-white block mb-1">🔐 {res.title} Locked</span>
                            <p className="text-[10px] text-gray-400 mb-2.5">Requires premium <span className="uppercase text-[#00ff66] font-mono font-bold">{res.tier}</span> level membership.</p>
                            <button
                              onClick={() => checkTierAccess(res.tier)}
                              className="text-[10px] font-bold uppercase px-3 py-1 rounded bg-[#C8A869] text-black"
                            >
                              Upgrade Subscription
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono uppercase bg-purple-950/30 text-purple-400 border border-purple-900/30 px-2 py-0.5 rounded font-bold">
                            {res.type}
                          </span>
                          <span className="text-[9px] uppercase font-mono text-gray-500 font-bold">Requires: {res.tier}</span>
                        </div>
                        <h3 className="text-base font-bold text-white font-serif italic">{res.title}</h3>
                        <p className="text-xs text-gray-400 line-clamp-3">{res.description}</p>
                      </div>

                      <div className="border-t border-[#222] pt-4 mt-2">
                        <button
                          onClick={() => {
                            if (!isDownloaded) {
                              setPreviewUserDownloadedResources(prev => [...prev, res.id]);
                            }
                            triggerXPFeedback(config.gamification.xpValues.downloadResource, 'Resource Downloaded');
                            alert(`File "${res.title}" successfully downloaded! Check your browser logs.`);
                          }}
                          className="w-full py-2 bg-gradient-to-r from-purple-900/40 to-purple-800/40 border border-purple-700/50 hover:bg-purple-900/60 rounded-lg text-xs font-mono font-bold text-white transition"
                        >
                          {isDownloaded ? '📥 Download File Again' : '📥 Download Template Assets'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ==========================================
              TAB 5: SIMULATED APP AI TOOLS DATABASE
             ========================================== */}
          {previewTab === 'aiTools' && (
            <div className="space-y-6 text-left">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold font-serif italic text-white">
                  AI Tools Database
                </h2>
                <p className="text-xs text-gray-400">
                  Search, review, and exploit SaaS applications and integration hubs designed to deliver 10x agency scale.
                </p>
              </div>

              <div className="space-y-3">
                {config.content.aiTools.map(tl => (
                  <div key={tl.id} className="p-4 bg-[#111]/70 border border-[#222] rounded-xl hover:border-[#333] transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white font-mono">{tl.name}</h3>
                        <span className="text-[9px] font-mono bg-emerald-950/20 text-[#34C792] border border-[#34C792]/30 px-1.5 py-0.5 rounded uppercase">
                          {tl.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400"><span className="text-[#C8A869] font-semibold">Income Angle:</span> {tl.incomeAngle}</p>
                      <div className="text-[10px] text-gray-500 font-mono">Pricing Index: {tl.pricing}</div>
                    </div>

                    <a
                      href={tl.tutorialLink}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-[#222] border border-[#333] hover:bg-[#333] text-white px-3.5 py-2 rounded-lg text-xs font-mono font-bold text-center"
                    >
                      🔗 Open Website
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==========================================
              TAB 6: SIMULATED AI COACH INTERACTION
             ========================================== */}
          {previewTab === 'aiMentor' && (
            <div className="space-y-4 text-left">
              <div className="space-y-1 pb-2 border-b border-[#222]">
                <h2 className="text-2xl font-bold font-serif italic text-white">
                  🤖 AI mentor Chat ({config.aiMentor.agentName})
                </h2>
                <p className="text-xs text-gray-400">
                  Tone Calibrated: <span className="text-[#00ff66] font-mono">{config.aiMentor.tone}</span> • Response constraint: <span className="uppercase text-yellow-400 font-mono">{config.aiMentor.responseStyle}</span>
                </p>
              </div>

              {/* CHAT THREAD VIEW */}
              <div className="bg-black/50 border border-[#222] rounded-xl p-4 h-80 overflow-y-auto space-y-3 flex flex-col justify-end">
                <div className="space-y-3 overflow-y-auto max-h-full">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`p-3 rounded-lg max-w-[85%] text-xs leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-[#C8A869]/10 text-[#C8A869] border border-[#C8A869]/30 rounded-br-none'
                            : 'bg-[#181818] text-gray-200 border border-[#222] rounded-bl-none whitespace-pre-wrap'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-[#181818] text-gray-400 border border-[#222] p-3 rounded-lg rounded-bl-none text-xs flex items-center gap-1.5 font-mono">
                        <span>{config.aiMentor.agentName} is formulating client outline</span>
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* SUGGESTIONS CARDS */}
              {config.aiMentor.showStarterPrompts && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {config.aiMentor.starterPrompts.map((sg, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSendMessage(sg)}
                      className="p-2.5 rounded-lg border border-[#222] bg-[#111]/30 hover:bg-[#181818] cursor-pointer text-[10px] text-gray-400 hover:text-white transition"
                    >
                      💡 {sg}
                    </div>
                  ))}
                </div>
              )}

              {/* CHAT INPUT AREA */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask about high-ticket retainers, cold email setups..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage() }}
                  className="flex-1 bg-[#111] border border-[#333] rounded-lg px-4 py-2.5 text-xs text-white"
                />
                <button
                  onClick={() => handleSendMessage()}
                  className="bg-gradient-to-r from-[#C8A869] to-[#E8D4A0] text-black font-bold px-4 py-2.5 rounded-lg text-xs"
                >
                  Ask Coach
                </button>
              </div>
            </div>
          )}

          {/* ==========================================
              TAB 7: SIMULATED APP COMMUNITY
             ========================================== */}
          {previewTab === 'community' && (
            <div className="space-y-6 text-left">
              <div className="space-y-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold font-serif italic text-white">
                    Private Creators Community
                  </h2>
                  <p className="text-xs text-gray-400">
                    Connect with {config.community.memberCount} digital builders, creators, and automation engineers.
                  </p>
                </div>

                <a
                  href={config.community.discordInvite}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gradient-to-r from-teal-900/50 to-emerald-900/50 border border-teal-700 hover:bg-teal-950 text-white font-mono font-bold px-4 py-2 rounded-lg text-xs"
                >
                  💬 Join Discord Server Role
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Simulated Channels Sidebar */}
                <div className="bg-[#111]/70 border border-[#222] p-4 rounded-xl space-y-3 font-mono text-xs text-gray-400">
                  <span className="font-bold text-white uppercase block text-[10px] border-b border-[#222] pb-1">💬 Active Channels Feed</span>
                  <div className="space-y-1.5">
                    <div className="text-white bg-white/5 p-1 rounded font-bold"># announcements</div>
                    <div># wins-cash-out</div>
                    <div># playbook-triage</div>
                    <div># agency-chat</div>
                    <div># dynamic-automations</div>
                  </div>
                </div>

                {/* Simulated Discussions */}
                <div className="md:col-span-2 bg-[#111]/70 border border-[#222] p-5 rounded-xl space-y-4">
                  <div className="flex justify-between items-center border-b border-[#222] pb-2">
                    <span className="text-xs font-mono font-bold text-white">📝 Wins Channel Live Stream</span>
                    <span className="text-[10px] text-emerald-400 font-mono">18 Active Wins Today</span>
                  </div>

                  <div className="space-y-3 text-xs leading-relaxed">
                    <div className="bg-[#181818] p-3 rounded-lg border border-[#222] space-y-1">
                      <div className="flex justify-between text-gray-400 text-[10px]">
                        <span className="font-bold text-white">Sarah (Elite Member)</span>
                        <span>2 hours ago</span>
                      </div>
                      <p className="text-gray-300">Just finalized a $1,200/mo retainer for dynamic CapCut edits with a client I pitched using the hook presets! Incredible velocity.</p>
                    </div>

                    <div className="bg-[#181818] p-3 rounded-lg border border-[#222] space-y-1">
                      <div className="flex justify-between text-gray-400 text-[10px]">
                        <span className="font-bold text-white">Marcus the Builder</span>
                        <span>4 hours ago</span>
                      </div>
                      <p className="text-gray-300">Wrote an auto lead-nudge scenario in Make.com. Operational overhead reduced from 4 hours to 5 minutes flat. Thanks AI Coach!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              TAB 8: SIMULATED APP LEADERBOARD
             ========================================== */}
          {previewTab === 'leaderboard' && (
            <div className="space-y-6 text-left">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold font-serif italic text-white">
                  Leaderboard & Creator Rankings
                </h2>
                <p className="text-xs text-gray-400">
                  Earn XP rewards for checking roadmap tasks and playbooks to climb global standings.
                </p>
              </div>

              {/* DYNAMIC LEADERBOARD LIST */}
              <div className="bg-[#111]/70 border border-[#222] rounded-xl overflow-hidden">
                <div className="bg-[#1c1c1c]/50 p-4 border-b border-[#222] font-mono text-xs font-bold text-gray-400 grid grid-cols-6 gap-2">
                  <span className="col-span-1">Rank</span>
                  <span className="col-span-3">Builder Display Name</span>
                  <span className="col-span-1 text-center">Level</span>
                  <span className="col-span-1 text-right">Total XP</span>
                </div>

                <div className="divide-y divide-[#222]">
                  {/* Map over config users, sort by XP, and render dynamically */}
                  {[...config.users]
                    .map(u => (u.id === previewUser?.id ? { ...u, xp: previewUserXP, level: previewUserLevel } : u))
                    .sort((a, b) => b.xp - a.xp)
                    .map((usr, idx) => (
                      <div
                        key={usr.id}
                        className={`p-4 font-mono text-xs grid grid-cols-6 gap-2 items-center ${
                          usr.id === previewUser?.id ? 'bg-[#C8A869]/10 text-white font-bold' : 'text-gray-300'
                        }`}
                      >
                        <span className="col-span-1 flex items-center gap-1.5 font-bold">
                          {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : ''} #{idx + 1}
                        </span>
                        <span className="col-span-3 font-semibold flex items-center gap-1">
                          {usr.displayName}
                          {usr.id === previewUser?.id && <span className="text-[8px] bg-[#00ff66] text-black px-1 rounded uppercase font-bold shrink-0">YOU</span>}
                        </span>
                        <span className="col-span-1 text-center font-bold text-gray-400">Lvl {usr.level}</span>
                        <span className="col-span-1 text-right text-[#00ff66] font-bold">{usr.xp} XP</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              PREVIEW PAYWALL LOCK MODAL OVERLAY
             ========================================== */}
          {paywallTarget && (
            <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
              <div className="bg-[#141413] border border-[#C8A869] rounded-2xl p-8 max-w-lg w-full text-center space-y-6 shadow-2xl relative">
                <button
                  onClick={() => setPaywallTarget(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white font-mono text-lg"
                >
                  ✕
                </button>

                <div className="space-y-2">
                  <span className="text-4xl block animate-bounce">🏆</span>
                  <h3 className="text-2xl font-bold font-serif italic text-[#C8A869]">UPGRADE REQUIRED</h3>
                  <p className="text-xs text-gray-400">
                    To access this Side Hustle Method, AI Prompt, or operational template, you need to unlock the
                    <span className="uppercase text-[#00ff66] font-mono font-bold px-1.5">{paywallTarget}</span> tier.
                  </p>
                </div>

                {/* DYNAMIC CARD SHOWING THE CUSTOM PRICING DETAIL */}
                {config.pricing.plans[paywallTarget] && (
                  <div className="bg-black/40 border border-[#222] p-5 rounded-xl text-left space-y-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-lg font-serif italic text-white font-bold">{config.pricing.plans[paywallTarget].name}</span>
                      <span className="text-2xl font-bold text-[#C8A869] font-mono">
                        ${config.pricing.plans[paywallTarget].price}
                        <span className="text-xs text-gray-500 font-normal">/mo</span>
                      </span>
                    </div>

                    <p className="text-xs text-gray-300">{config.pricing.plans[paywallTarget].description}</p>

                    <div className="h-px bg-[#222]"></div>

                    <ul className="space-y-1.5 text-xs text-gray-400">
                      {config.pricing.plans[paywallTarget].features.map((ft, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-[#C8A869]">✓</span> {ft}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPaywallTarget(null)}
                    className="py-2.5 rounded-lg border border-[#333] text-gray-400 font-bold text-xs"
                  >
                    Keep Browsing
                  </button>
                  <button
                    onClick={() => {
                      alert(`Successfully upgraded user "${previewUser.displayName}" to ${paywallTarget.toUpperCase()} membership!`);
                      // update database
                      const list = [...config.users];
                      const idx = list.findIndex(u => u.id === previewUser.id);
                      list[idx].tier = paywallTarget;
                      setConfig({ ...config, users: list });
                      setPreviewUser({ ...previewUser, tier: paywallTarget });

                      // trigger upgrade email
                      alert(`Elite notification email triggered! Resend Template:\n\nSubject: ${config.email.upgradeSubject}\n\n${config.email.upgradeBody}`);

                      setPaywallTarget(null);
                    }}
                    className="py-2.5 rounded-lg text-black font-bold text-xs"
                    style={{
                      background: `linear-gradient(135deg, ${config.branding.primaryColor} 0%, #E8D4A0 100%)`
                    }}
                  >
                    {config.pricing.plans[paywallTarget]?.ctaText || 'Upgrade Now'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              PREVIEW FOOTER: SOCIALS & LEGAL POLICIES
             ========================================== */}
          <footer className="border-t border-[#222]/80 pt-8 mt-12 text-center text-xs space-y-4">
            {/* Dynamic socials links */}
            <div className="flex justify-center gap-6 flex-wrap">
              {config.socials.filter(s => s.visible).map(soc => (
                <a
                  key={soc.id}
                  href={soc.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-white transition flex items-center gap-1 font-mono text-[11px]"
                >
                  <span className="text-base">{soc.icon}</span>
                  <span>{soc.platform}</span>
                </a>
              ))}
            </div>

            {/* Dynamic legal links */}
            <div className="flex justify-center gap-4 text-[10px] font-mono text-gray-500">
              <button onClick={() => setPolicyOverlay(config.policies.termsOfService)} className="hover:underline">Terms of Service</button>
              <span>•</span>
              <button onClick={() => setPolicyOverlay(config.policies.privacyPolicy)} className="hover:underline">Privacy Policy</button>
              <span>•</span>
              <button onClick={() => setPolicyOverlay(config.policies.refundPolicy)} className="hover:underline">Refund Policy</button>
            </div>

            <div className="text-[10px] text-gray-600 font-mono">
              &copy; {new Date().getFullYear()} {config.branding.appName}. Powered fully by Codeless Control Panel.
            </div>
          </footer>

          {/* FULL SCREEN LEGAL POLICY POPUP OVERLAY */}
          {policyOverlay !== null && (
            <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6 overflow-y-auto">
              <div className="bg-[#141413] border border-[#222] rounded-2xl p-8 max-w-2xl w-full text-left space-y-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
                <button
                  onClick={() => setPolicyOverlay(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white font-mono text-lg"
                >
                  ✕ Close Policy
                </button>

                <div className="prose prose-invert text-xs leading-relaxed text-gray-300 font-mono whitespace-pre-wrap">
                  {policyOverlay}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
