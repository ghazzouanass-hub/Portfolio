import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, User, RefreshCw, ChevronLeft, PhoneCall, Sparkles, ArrowRight, Home } from 'lucide-react';
import { CONTACT_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

interface Message {
  sender: 'ai' | 'user';
  text: string;
  menuOptions?: MenuOption[];
  categoryBadge?: string;
}

interface MenuOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
  targetMenuId?: string;
  answerText?: string;
  isBack?: boolean;
  isHome?: boolean;
  isContactAction?: boolean;
  parentMenuId?: string;
  followUpOptions?: MenuOption[];
}

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContactModal: () => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  onOpenContactModal
}) => {
  const { t } = useLanguage();
  const [currentMenuId, setCurrentMenuId] = useState<string>('main');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Define Main Menu & Sub-menu hierarchies
  const getMainMenuOptions = (): MenuOption[] => [
    {
      id: 'recruiter',
      label: "💼 I'm a Recruiter / Hiring Manager",
      targetMenuId: 'recruiter'
    },
    {
      id: 'ecommerce',
      label: "🛒 I'm an E-commerce & Business Owner",
      targetMenuId: 'ecommerce'
    },
    {
      id: 'ai_tech',
      label: "🤖 AI & Technical Skills (Prompt Masterclass, Python)",
      targetMenuId: 'ai_tech'
    },
    {
      id: 'marketing',
      label: "📊 Digital Marketing & Paid Ads (Google, Meta, SEO)",
      targetMenuId: 'marketing'
    },
    {
      id: 'design',
      label: "🎨 Creative & AI Design (Adobe Illustrator, Generative AI)",
      targetMenuId: 'design'
    },
    {
      id: 'contact_action',
      label: "📞 Contact Anass Directly / Hire For Growth",
      isContactAction: true
    }
  ];

  // Initialize opening welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          sender: 'ai',
          text: "Hello! I am Anass's Interactive AI Assistant. How can I assist you today? Select a option below or ask any question freely!",
          menuOptions: getMainMenuOptions(),
          categoryBadge: "Main Menu • Choose Your Interest"
        }
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  // Custom AI Answer Engine for text input and menu clicks
  const getAnswerForTopic = (optionId: string): { text: string; followUps: MenuOption[]; categoryBadge: string } => {
    switch (optionId) {
      // RECRUITER SUBMENU & ANSWERS
      case 'recruiter':
        return {
          categoryBadge: "Recruiter / Hiring Manager Hub",
          text: "Welcome! Anass Ghazzou currently serves as Social Media Manager & Marketing Specialist at MAK United, bringing 7+ years of multi-channel expertise across Kuwait, USA, Morocco, and Middle East markets. What specific information would you like to review?",
          followUps: [
            { id: 'rec_mak', label: '🏢 MAK United Current Role', answerText: 'rec_mak', parentMenuId: 'recruiter' },
            { id: 'rec_national', label: '🪵 National Arabic Co. (5➔200+ Reviews, Meta Ads)', answerText: 'rec_national', parentMenuId: 'recruiter' },
            { id: 'rec_lulu', label: '🏬 Lulu Hypermarket Growth Role', answerText: 'rec_lulu', parentMenuId: 'recruiter' },
            { id: 'rec_roi', label: '📈 Proven ROIs & Measurable Outcomes', answerText: 'rec_roi', parentMenuId: 'recruiter' },
            { id: 'rec_certs', label: '📜 50+ Certifications & Degrees', answerText: 'rec_certs', parentMenuId: 'recruiter' },
            { id: 'rec_langs', label: '🌍 Languages & Contact Options', answerText: 'rec_langs', parentMenuId: 'recruiter' },
            { id: 'back_main', label: '⬅️ Back to Main Menu', isHome: true }
          ]
        };

      case 'rec_national':
        return {
          categoryBadge: "National Arabic Company Growth Case",
          text: "At National Arabic Company (Wood, Melamine & Accessories Supplier), Anass achieved major growth outcomes:\n• Scaled Google Maps / Google Business reviews from 5 to 200+ positive reviews across 3 company accounts.\n• Directed end-to-end Meta ad campaigns for timber, melamine panels, and hardware lines.\n• Managed daily social media post publishing, content strategy, and customer engagement.",
          followUps: [
            { id: 'rec_mak', label: '🏢 MAK United Experience', answerText: 'rec_mak', parentMenuId: 'recruiter' },
            { id: 'rec_lulu', label: '🏬 Lulu Hypermarket Experience', answerText: 'rec_lulu', parentMenuId: 'recruiter' },
            { id: 'rec_roi', label: '📈 See Proven ROIs & Accomplishments', answerText: 'rec_roi', parentMenuId: 'recruiter' },
            { id: 'back_recruiter', label: '⬅️ Back to Recruiter Menu', targetMenuId: 'recruiter', isBack: true },
            { id: 'back_main', label: '🏠 Main Menu', isHome: true }
          ]
        };

      case 'rec_mak':
        return {
          categoryBadge: "MAK United Social Media & Marketing Leadership",
          text: "At MAK United (2026–Present), Anass serves as Social Media Manager & Marketing Specialist. He directs social media architecture, brand campaign strategy, performance ad spend on Meta & Search, content editorial planning, and AI Prompt Masterclass automation for multi-channel growth.",
          followUps: [
            { id: 'rec_lulu', label: '🏬 Lulu Hypermarket Experience', answerText: 'rec_lulu', parentMenuId: 'recruiter' },
            { id: 'rec_roi', label: '📈 See Proven ROIs & Accomplishments', answerText: 'rec_roi', parentMenuId: 'recruiter' },
            { id: 'back_recruiter', label: '⬅️ Back to Recruiter Menu', targetMenuId: 'recruiter', isBack: true },
            { id: 'back_main', label: '🏠 Main Menu', isHome: true }
          ]
        };

      case 'rec_lulu':
        return {
          categoryBadge: "Lulu Hypermarket Executive Experience",
          text: "At Lulu Hypermarket's Regional Office in Kuwait (2024–2025), Anass served as Digital Marketing & E-commerce Specialist. Key achievements included managing regional Meta/Google ad spend, auditing technical SEO structure to boost organic search presence, and writing a custom Python web scraper that extracted Lulu's entire product catalogue for competitive pricing intelligence.",
          followUps: [
            { id: 'rec_roi', label: '📈 See Proven ROIs & Accomplishments', answerText: 'rec_roi', parentMenuId: 'recruiter' },
            { id: 'rec_certs', label: '📜 View Certifications', answerText: 'rec_certs', parentMenuId: 'recruiter' },
            { id: 'back_recruiter', label: '⬅️ Back to Recruiter Menu', targetMenuId: 'recruiter', isBack: true },
            { id: 'back_main', label: '🏠 Main Menu', isHome: true }
          ]
        };

      case 'rec_roi':
        return {
          categoryBadge: "Proven Performance & ROIs",
          text: "Key Career Achievements:\n• Scaled Boostega LLC to 60%+ organic revenue growth through targeted funnel optimization.\n• Managed $500K+ cumulative ad spend across Google Search, Shopping, Meta Retargeting, and TikTok Ads with a 3.5x+ average ROAS.\n• Automated price intelligence for 10,000+ retail SKUs using custom Python web scrapers.\n• Built 2 complete e-commerce businesses from zero without external dev teams.",
          followUps: [
            { id: 'rec_lulu', label: '🏢 Lulu Hypermarket Experience', answerText: 'rec_lulu', parentMenuId: 'recruiter' },
            { id: 'contact_action', label: '📞 Contact Anass for Interview', isContactAction: true },
            { id: 'back_recruiter', label: '⬅️ Back to Recruiter Menu', targetMenuId: 'recruiter', isBack: true },
            { id: 'back_main', label: '🏠 Main Menu', isHome: true }
          ]
        };

      case 'rec_certs':
        return {
          categoryBadge: "Certifications & Academic Background",
          text: "Anass holds 50+ industry-recognized certifications (with extensive Udemy mastery) across key domains:\n• Digital Marketing, E-Marketing & Advertising (Meta, Google Ads, TikTok Ads)\n• Social Media Marketing (SMM Strategy & Content Calendars)\n• AI & Prompt Engineering (AI Prompt Masterclass, AI Agents, Generative Visuals)\n• Design & Branding (Adobe Illustrator, Vector Identity Systems, UI/UX)\n• WordPress & Software Development (Custom WP Plugins, PHP, WooCommerce)\n• SEO & SEM (Technical Audits, Keyword Acceleration, E-com SEO)\n• Education: Diploma in Graphic Design (OFPPT) & Bachelor's Degree in Life Sciences.",
          followUps: [
            { id: 'rec_langs', label: '🌍 Languages & Visa Status', answerText: 'rec_langs', parentMenuId: 'recruiter' },
            { id: 'back_recruiter', label: '⬅️ Back to Recruiter Menu', targetMenuId: 'recruiter', isBack: true },
            { id: 'back_main', label: '🏠 Main Menu', isHome: true }
          ]
        };

      case 'rec_langs':
        return {
          categoryBadge: "Global Location & Languages",
          text: "Anass is currently based in Kuwait and open to Executive Growth Contracts, Full-time roles, and Global consulting. He is trilingual:\n• Arabic (Native fluency & GCC dialect copywriting)\n• English (Professional working proficiency)\n• French (Professional working proficiency)",
          followUps: [
            { id: 'contact_action', label: '📞 Schedule Call / Send Message', isContactAction: true },
            { id: 'back_recruiter', label: '⬅️ Back to Recruiter Menu', targetMenuId: 'recruiter', isBack: true },
            { id: 'back_main', label: '🏠 Main Menu', isHome: true }
          ]
        };

      // E-COMMERCE SUBMENU & ANSWERS
      case 'ecommerce':
        return {
          categoryBadge: "E-commerce & Business Owner Hub",
          text: "Anass is the sole Founder & CEO of Boostega LLC (boostega.com) and Smmcent LTD. He builds full-stack e-commerce platforms completely from zero — combining web architecture, payment gateways, brand visual identities, ad funnels, and automated order processing. What would you like to explore?",
          followUps: [
            { id: 'ecom_boostega', label: '🚀 How Boostega LLC was built from zero', answerText: 'ecom_boostega', parentMenuId: 'ecommerce' },
            { id: 'ecom_stacks', label: '🛍️ WooCommerce, Shopify & Payment Gateways', answerText: 'ecom_stacks', parentMenuId: 'ecommerce' },
            { id: 'ecom_security', label: '🛡️ Cloudflare Security & Order Webhooks', answerText: 'ecom_security', parentMenuId: 'ecommerce' },
            { id: 'ecom_smmcent', label: '🌟 Smmcent & Trustpilot Support Automation', answerText: 'ecom_smmcent', parentMenuId: 'ecommerce' },
            { id: 'back_main', label: '⬅️ Back to Main Menu', isHome: true }
          ]
        };

      case 'ecom_boostega':
        return {
          categoryBadge: "Boostega LLC Case Study",
          text: "Boostega LLC was launched, designed, and operated independently by Anass. He handled domain registration, WooCommerce/Shopify store setup, Cloudflare WAF setup, product copywriting, Google & Meta conversion ads, order processing webhooks, and customer reputation on Trustpilot.",
          followUps: [
            { id: 'ecom_security', label: '🛡️ Cloudflare & Automation Scripts', answerText: 'ecom_security', parentMenuId: 'ecommerce' },
            { id: 'ecom_stacks', label: '🛍️ E-commerce Tech Stack', answerText: 'ecom_stacks', parentMenuId: 'ecommerce' },
            { id: 'back_ecom', label: '⬅️ Back to E-commerce Menu', targetMenuId: 'ecommerce', isBack: true },
            { id: 'back_main', label: '🏠 Main Menu', isHome: true }
          ]
        };

      case 'ecom_stacks':
        return {
          categoryBadge: "E-commerce Tech & Conversion Stacks",
          text: "Anass builds stores on WooCommerce, Shopify, and custom PHP/React landing pages. He integrates payment processors (Stripe, PayPal, local GCC gateways), configures abandoned cart recoveries, sets up Google Tag Manager conversion tracking, and speeds up page load times under 1.5 seconds.",
          followUps: [
            { id: 'ecom_boostega', label: '🚀 Boostega LLC Overview', answerText: 'ecom_boostega', parentMenuId: 'ecommerce' },
            { id: 'back_ecom', label: '⬅️ Back to E-commerce Menu', targetMenuId: 'ecommerce', isBack: true },
            { id: 'back_main', label: '🏠 Main Menu', isHome: true }
          ]
        };

      case 'ecom_security':
        return {
          categoryBadge: "Cloudflare Security & Order Automation",
          text: "To protect e-commerce stores from bot attacks, fake orders, and scrapers, Anass deploys Cloudflare Enterprise rules, SSL/TLS, and rate limiting. Additionally, he codes Python scripts connected to webhooks to automate order routing and customer SMS/Email notifications.",
          followUps: [
            { id: 'ai_tech', label: '🤖 Explore AI & Python Scripts', targetMenuId: 'ai_tech' },
            { id: 'back_ecom', label: '⬅️ Back to E-commerce Menu', targetMenuId: 'ecommerce', isBack: true },
            { id: 'back_main', label: '🏠 Main Menu', isHome: true }
          ]
        };

      case 'ecom_smmcent':
        return {
          categoryBadge: "Smmcent & Trustpilot Reputation Management",
          text: "Through Smmcent LTD, Anass built automated customer support ticketers, Trustpilot review verification pipelines, and AI chatbot flows that maintained 4.8/5.0 star customer satisfaction while processing thousands of digital delivery orders.",
          followUps: [
            { id: 'contact_action', label: '📞 Work with Anass on Your Store', isContactAction: true },
            { id: 'back_ecom', label: '⬅️ Back to E-commerce Menu', targetMenuId: 'ecommerce', isBack: true },
            { id: 'back_main', label: '🏠 Main Menu', isHome: true }
          ]
        };

      // AI & TECHNICAL SUBMENU & ANSWERS
      case 'ai_tech':
        return {
          categoryBadge: "AI & Technical Skills Hub",
          text: "Anass combines enterprise AI strategy with practical execution. His technical repertoire spans AI Prompt Masterclass, Artificial Intelligence Masterclass, AI Design, and custom Python web automation. Choose a topic below:",
          followUps: [
            { id: 'tech_prompt_masterclass', label: '🎯 AI Prompt Masterclass & Prompt Engineering', answerText: 'tech_prompt_masterclass', parentMenuId: 'ai_tech' },
            { id: 'tech_ai_masterclass', label: '🧠 AI Masterclass & Agent Strategy', answerText: 'tech_ai_masterclass', parentMenuId: 'ai_tech' },
            { id: 'tech_ai_design', label: '🎨 AI Design & Generative Visuals', answerText: 'tech_ai_design', parentMenuId: 'ai_tech' },
            { id: 'tech_python', label: '🐍 Python Web Scraping & Lulu Catalogue Bot', answerText: 'tech_python', parentMenuId: 'ai_tech' },
            { id: 'back_main', label: '⬅️ Back to Main Menu', isHome: true }
          ]
        };

      case 'tech_prompt_masterclass':
        return {
          categoryBadge: "AI Prompt Masterclass Specialty",
          text: "Certified in AI Prompt Masterclass, Anass designs high-precision prompt architectures, system instructions, context window optimizations, and custom AI personas for business workflows. He creates LLM chains that write on-brand ad copy, generate automated SEO articles, and extract structured JSON data.",
          followUps: [
            { id: 'tech_ai_masterclass', label: '🧠 AI Masterclass & Strategy', answerText: 'tech_ai_masterclass', parentMenuId: 'ai_tech' },
            { id: 'tech_ai_design', label: '🎨 AI Design & Generative Visuals', answerText: 'tech_ai_design', parentMenuId: 'ai_tech' },
            { id: 'back_aitech', label: '⬅️ Back to AI & Tech Menu', targetMenuId: 'ai_tech', isBack: true },
            { id: 'back_main', label: '🏠 Main Menu', isHome: true }
          ]
        };

      case 'tech_ai_masterclass':
        return {
          categoryBadge: "AI Masterclass & Enterprise Strategy",
          text: "Certified in Artificial Intelligence Masterclass, Anass helps businesses integrate generative AI models, multi-agent AI assistants, and process automation to cut operational overhead. From automated lead scoring to custom customer support bots.",
          followUps: [
            { id: 'tech_prompt_masterclass', label: '🎯 AI Prompt Masterclass Details', answerText: 'tech_prompt_masterclass', parentMenuId: 'ai_tech' },
            { id: 'tech_python', label: '🐍 Python Scraping & Web Automation', answerText: 'tech_python', parentMenuId: 'ai_tech' },
            { id: 'back_aitech', label: '⬅️ Back to AI & Tech Menu', targetMenuId: 'ai_tech', isBack: true },
            { id: 'back_main', label: '🏠 Main Menu', isHome: true }
          ]
        };

      case 'tech_ai_design':
        return {
          categoryBadge: "AI Design & Visual Pipelines",
          text: "Anass utilizes AI Design pipelines (Midjourney, Stable Diffusion, DALL-E) alongside Adobe Illustrator to rapidly synthesize high-converting ad graphics, social media content kits, and product visual mocks in minutes.",
          followUps: [
            { id: 'design', label: '🎨 Explore All Creative & Design Skills', targetMenuId: 'design' },
            { id: 'back_aitech', label: '⬅️ Back to AI & Tech Menu', targetMenuId: 'ai_tech', isBack: true },
            { id: 'back_main', label: '🏠 Main Menu', isHome: true }
          ]
        };

      case 'tech_python':
        return {
          categoryBadge: "Python Web Scraping & Automation",
          text: "Anass builds custom Python scripts using BeautifulSoup, Selenium, Requests, and Playwright. Notable builds include a full Lulu Hypermarket product catalogue scraper for real-time price monitoring, automated e-commerce webhooks, and automated data cleaner scripts.",
          followUps: [
            { id: 'tech_prompt_masterclass', label: '🎯 AI Prompt Masterclass', answerText: 'tech_prompt_masterclass', parentMenuId: 'ai_tech' },
            { id: 'back_aitech', label: '⬅️ Back to AI & Tech Menu', targetMenuId: 'ai_tech', isBack: true },
            { id: 'back_main', label: '🏠 Main Menu', isHome: true }
          ]
        };

      // DIGITAL MARKETING & ADVERT SUBMENU & ANSWERS
      case 'marketing':
        return {
          categoryBadge: "Digital Marketing & Paid Media Hub",
          text: "With 7+ years of experience across Google, Meta, and TikTok, Anass specializes in performance marketing, paid user acquisition, and search engine optimization. Select a area below:",
          followUps: [
            { id: 'mkt_google', label: '🎯 Google Ads (Search, Shopping, Display)', answerText: 'mkt_google', parentMenuId: 'marketing' },
            { id: 'mkt_meta', label: '📱 Meta (FB/IG) & TikTok Ad Funnels', answerText: 'mkt_meta', parentMenuId: 'marketing' },
            { id: 'mkt_seo', label: '🔍 Technical SEO Audits & Keyword Ranking', answerText: 'mkt_seo', parentMenuId: 'marketing' },
            { id: 'mkt_budgets', label: '💰 Spend Budgets & ROAS Optimization', answerText: 'mkt_budgets', parentMenuId: 'marketing' },
            { id: 'back_main', label: '⬅️ Back to Main Menu', isHome: true }
          ]
        };

      case 'mkt_google':
        return {
          categoryBadge: "Google Ads & Analytics",
          text: "Certified in Google Ads Search and Google Analytics, Anass structures search keyword campaigns, Google Shopping feed optimizations, negative keyword lists, and GA4 event tracking to ensure every dollar spent yields traceable ROI.",
          followUps: [
            { id: 'mkt_meta', label: '📱 Meta & TikTok Ads', answerText: 'mkt_meta', parentMenuId: 'marketing' },
            { id: 'mkt_seo', label: '🔍 Technical SEO Audits', answerText: 'mkt_seo', parentMenuId: 'marketing' },
            { id: 'back_mkt', label: '⬅️ Back to Marketing Menu', targetMenuId: 'marketing', isBack: true },
            { id: 'back_main', label: '🏠 Main Menu', isHome: true }
          ]
        };

      case 'mkt_meta':
        return {
          categoryBadge: "Meta & TikTok Conversion Funnels",
          text: "Anass builds high-ROAS Meta (Facebook & Instagram) and TikTok ad funnels. He creates UGC ad variations, designs retargeting custom audiences, sets up Conversions API (CAPI) pixel tracking, and tests hook angles.",
          followUps: [
            { id: 'mkt_google', label: '🎯 Google Ads Experience', answerText: 'mkt_google', parentMenuId: 'marketing' },
            { id: 'back_mkt', label: '⬅️ Back to Marketing Menu', targetMenuId: 'marketing', isBack: true },
            { id: 'back_main', label: '🏠 Main Menu', isHome: true }
          ]
        };

      case 'mkt_seo':
        return {
          categoryBadge: "Technical SEO & Organic Traffic",
          text: "From technical site speed audits and schema markups to keyword research and backlink strategies, Anass has ranked e-commerce products and retail brands on page 1 of Google across GCC and North Africa.",
          followUps: [
            { id: 'mkt_budgets', label: '💰 Ad Budgets & ROAS', answerText: 'mkt_budgets', parentMenuId: 'marketing' },
            { id: 'back_mkt', label: '⬅️ Back to Marketing Menu', targetMenuId: 'marketing', isBack: true },
            { id: 'back_main', label: '🏠 Main Menu', isHome: true }
          ]
        };

      case 'mkt_budgets':
        return {
          categoryBadge: "Ad Budgets & ROAS Performance",
          text: "Anass has managed cumulative budgets exceeding $500,000+ with average Return on Ad Spend (ROAS) ranging from 3.2x to 5.5x across search, retargeting, and cold interest audiences.",
          followUps: [
            { id: 'contact_action', label: '📞 Request Marketing Strategy Call', isContactAction: true },
            { id: 'back_mkt', label: '⬅️ Back to Marketing Menu', targetMenuId: 'marketing', isBack: true },
            { id: 'back_main', label: '🏠 Main Menu', isHome: true }
          ]
        };

      // CREATIVE & AI DESIGN SUBMENU & ANSWERS
      case 'design':
        return {
          categoryBadge: "Creative & AI Design Hub",
          text: "Anass holds a Diploma in Graphic Design and specializes in Adobe Illustrator visual brand identities, prepress print artwork, and AI Design pipelines. Select a creative topic below:",
          followUps: [
            { id: 'dsg_aidesign', label: '🎨 AI Design & Generative Visual Pipelines', answerText: 'dsg_aidesign', parentMenuId: 'design' },
            { id: 'dsg_illustrator', label: '🖌️ Adobe Illustrator & Vector Brand Packages', answerText: 'dsg_illustrator', parentMenuId: 'design' },
            { id: 'dsg_print', label: '🖨️ Roland Engraving & Print Prepress', answerText: 'dsg_print', parentMenuId: 'design' },
            { id: 'back_main', label: '⬅️ Back to Main Menu', isHome: true }
          ]
        };

      case 'dsg_aidesign':
        return {
          categoryBadge: "AI Design & Generative Visuals",
          text: "Combining generative tools with professional typography and design theory, Anass produces studio-quality ad banners, brand concept artwork, and marketing assets in record speed.",
          followUps: [
            { id: 'dsg_illustrator', label: '🖌️ Adobe Illustrator Branding', answerText: 'dsg_illustrator', parentMenuId: 'design' },
            { id: 'back_dsg', label: '⬅️ Back to Design Menu', targetMenuId: 'design', isBack: true },
            { id: 'back_main', label: '🏠 Main Menu', isHome: true }
          ]
        };

      case 'dsg_illustrator':
        return {
          categoryBadge: "Adobe Illustrator & Branding",
          text: "Anass designs complete visual identity packages in Adobe Illustrator: vector logos, typography guidelines, brand stylebooks, social media ad templates, and packaging files.",
          followUps: [
            { id: 'dsg_print', label: '🖨️ Print Prepress & Roland Engraving', answerText: 'dsg_print', parentMenuId: 'design' },
            { id: 'back_dsg', label: '⬅️ Back to Design Menu', targetMenuId: 'design', isBack: true },
            { id: 'back_main', label: '🏠 Main Menu', isHome: true }
          ]
        };

      case 'dsg_print':
        return {
          categoryBadge: "Print Production & Roland Engraving",
          text: "Anass has hands-on prepress experience preparing CMYK vector files for Roland large-format vinyl printers and Roland MPX-90 impact photo engravers for high-grade physical media.",
          followUps: [
            { id: 'back_dsg', label: '⬅️ Back to Design Menu', targetMenuId: 'design', isBack: true },
            { id: 'back_main', label: '🏠 Main Menu', isHome: true }
          ]
        };

      default:
        return {
          categoryBadge: "Anass AI Knowledge Base",
          text: `Anass Ghazzou is a Digital Marketing Specialist & E-commerce Founder with 7+ years of experience in Google/Meta Ads, Python scraping, AI Prompt Masterclass, and e-commerce growth. How else can I assist you?`,
          followUps: getMainMenuOptions()
        };
    }
  };

  // General free-form Query Answer Fallback
  const answerFreeQuery = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('prompt masterclass') || q.includes('prompt engineering') || q.includes('system prompt')) {
      return "Anass is certified in AI Prompt Masterclass. He designs custom prompt architectures, system instructions, context window setups, and custom AI personas for business process automation.";
    }

    if (q.includes('ai masterclass') || q.includes('artificial intelligence masterclass')) {
      return "Anass holds an AI Masterclass certification focusing on enterprise AI workflows, autonomous agent design, multi-modal LLM integration, and AI-driven growth strategies.";
    }

    if (q.includes('ai design') || q.includes('generative design') || q.includes('midjourney')) {
      return "In AI Design, Anass uses Midjourney, Stable Diffusion, and DALL-E alongside Adobe Illustrator to create rapid visual concepts, marketing artwork, and high-converting ad graphics.";
    }

    if (q.includes('national') || q.includes('arabic company') || q.includes('review') || q.includes('maps') || q.includes('google map') || q.includes('google business')) {
      return "At National Arabic Company (Wood, Melamine & Accessories Supplier), Anass scaled Google Maps reviews from 5 to over 200+ positive reviews across 3 company accounts. He also managed high-ROAS Meta advertising campaigns and daily social media content creation.";
    }

    if (q.includes('social media') || q.includes('post') || q.includes('content') || q.includes('campaign')) {
      return "Anass manages end-to-end social media strategy, content publishing, ad creative design, and Meta & Google performance campaigns across MAK United, National Arabic Company, and Boostega LLC.";
    }

    if (q.includes('mak') || q.includes('mak united') || q.includes('current job') || q.includes('current role')) {
      return "Anass currently works at MAK United as Social Media Manager & Marketing Specialist (2026–Present). He leads multi-channel social media growth, Meta/Search ad campaigns, brand content strategies, and AI Prompt Masterclass workflows for MAK United.";
    }

    if (q.includes('lulu') || q.includes('hypermarket') || q.includes('retail')) {
      return "At Lulu Hypermarket's Kuwait Regional Office (2024–2025), Anass managed regional Google and Meta ad campaigns, audited SEO, and coded a custom Python web scraper for full retail catalogue price intelligence.";
    }

    if (q.includes('boostega') || q.includes('e-commerce') || q.includes('founder') || q.includes('smmcent')) {
      return "Anass is the Founder & CEO of Boostega LLC (boostega.com) and Smmcent LTD. He built Boostega completely by himself from zero — domain, hosting, store design, Adobe branding, Google/Meta ad funnels, Cloudflare security, and Python order scripts.";
    }

    if (q.includes('wordpress') || q.includes('wp') || q.includes('plugin') || q.includes('qr') || q.includes('downloader') || q.includes('50 platform')) {
      return "Anass has engineered several custom software scripts and plugins: 1) A multi-platform social media video downloader supporting 50+ networks (Instagram, TikTok, YouTube, etc.); 2) Multiple custom PHP/WordPress and WooCommerce plugins for dynamic pricing, API webhooks, and custom user portals; 3) A standalone dynamic QR code generator script with brand logo overlays and scan analytics.";
    }

    if (q.includes('python') || q.includes('scraping') || q.includes('automation') || q.includes('script')) {
      return "Anass writes Python scripts for web scraping (BeautifulSoup, Selenium), browser automation, price monitoring, API webhooks, and prompt engineering pipelines.";
    }

    if (q.includes('ad') || q.includes('google') || q.includes('meta') || q.includes('facebook') || q.includes('tiktok') || q.includes('budget')) {
      return "Anass has managed over $500K+ in ad spend across Google Ads, Meta Ads (FB/IG), and TikTok Ads with average 3.5x+ ROAS. He holds Google Ads Search and Meta Blueprint certifications.";
    }

    if (q.includes('language') || q.includes('speak') || q.includes('arabic') || q.includes('french') || q.includes('english')) {
      return "Anass is trilingual: Arabic (Native fluency & GCC dialect copywriting), English (Professional working proficiency), and French (Professional working proficiency).";
    }

    if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone') || q.includes('whatsapp')) {
      return `You can reach Anass directly via Email at ${CONTACT_INFO.email}, WhatsApp Kuwait at ${CONTACT_INFO.phoneKuwait}, or WhatsApp Morocco at ${CONTACT_INFO.phoneMorocco}.`;
    }

    return "Anass Ghazzou is a Digital Marketing Specialist & E-commerce Founder with 7+ years of experience in Google/Meta Ads, Python scraping, AI Prompt Masterclass, AI Masterclass, AI Design, and Adobe Illustrator branding. Select an option from the menu below or ask a custom question!";
  };

  const handleMenuClick = (opt: MenuOption) => {
    if (opt.isContactAction) {
      onOpenContactModal();
      return;
    }

    if (opt.isHome) {
      setCurrentMenuId('main');
      const userMsg: Message = { sender: 'user', text: "🏠 Return to Main Menu" };
      setMessages(prev => [...prev, userMsg]);
      setIsTyping(true);
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: "Welcome back to the Main Menu! What area would you like to explore next?",
            menuOptions: getMainMenuOptions(),
            categoryBadge: "Main Menu • Select Interest"
          }
        ]);
        setIsTyping(false);
      }, 350);
      return;
    }

    const actionId = opt.targetMenuId || opt.answerText || opt.id;
    const userLabel = opt.label;

    const userMsg: Message = { sender: 'user', text: userLabel };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const { text, followUps, categoryBadge } = getAnswerForTopic(actionId);
      setCurrentMenuId(actionId);
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text,
          menuOptions: followUps,
          categoryBadge
        }
      ]);
      setIsTyping(false);
    }, 450);
  };

  const handleSendText = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const queryText = input.trim();
    setInput('');

    const userMsg: Message = { sender: 'user', text: queryText };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const responseText = answerFreeQuery(queryText);
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: responseText,
          categoryBadge: "Custom Answer",
          menuOptions: [
            { id: 'recruiter', label: '💼 Recruiter Info', targetMenuId: 'recruiter' },
            { id: 'ai_tech', label: '🤖 AI & Technical Skills', targetMenuId: 'ai_tech' },
            { id: 'ecommerce', label: '🛒 E-commerce & Boostega', targetMenuId: 'ecommerce' },
            { id: 'contact_action', label: '📞 Contact Anass', isContactAction: true },
            { id: 'back_main', label: '🏠 Main Menu', isHome: true }
          ]
        }
      ]);
      setIsTyping(false);
    }, 500);
  };

  const handleResetChat = () => {
    setMessages([
      {
        sender: 'ai',
        text: "Chat reset! Welcome back to Anass AI. Select a topic below to explore his 7+ years of experience:",
        menuOptions: getMainMenuOptions(),
        categoryBadge: "Main Menu • Choose Your Interest"
      }
    ]);
    setCurrentMenuId('main');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-white/20 rounded-3xl max-w-2xl w-full h-[650px] flex flex-col shadow-2xl overflow-hidden relative backdrop-blur-2xl">
        
        {/* Chat Header */}
        <div className="p-4 sm:p-5 bg-slate-100/90 dark:bg-black/50 border-b border-slate-200 dark:border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 dark:border-blue-400/30 flex items-center justify-center text-blue-600 dark:text-blue-300 shadow-sm">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
                <span>Ask Anass AI</span>
                <span className="text-[10px] bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 font-mono px-2 py-0.5 rounded-full border border-blue-500/20 dark:border-blue-400/30 uppercase tracking-widest font-semibold">
                  Interactive Guidance
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-white/60">Guided topic explorer & instant answers</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetChat}
              title="Reset Chat / Back to Main Menu"
              className="px-2.5 py-1.5 rounded-xl bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-700 dark:text-white/80 text-xs font-mono flex items-center gap-1 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-700 dark:text-white/80 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Main Category Nav Pills */}
        <div className="p-2.5 bg-slate-50 dark:bg-black/30 border-b border-slate-200 dark:border-white/10 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
          <button
            onClick={() => handleMenuClick({ id: 'main', label: '🏠 Main Menu', isHome: true })}
            className="px-3 py-1.5 rounded-full bg-blue-600 text-white font-bold text-xs shrink-0 flex items-center gap-1 shadow-md hover:bg-blue-700 transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Main Menu</span>
          </button>
          <button
            onClick={() => handleMenuClick({ id: 'recruiter', label: '💼 Recruiter', targetMenuId: 'recruiter' })}
            className="px-3 py-1.5 rounded-full bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-800 dark:text-white/90 text-xs shrink-0 font-medium transition-all"
          >
            💼 Recruiter
          </button>
          <button
            onClick={() => handleMenuClick({ id: 'ai_tech', label: '🤖 AI & Tech', targetMenuId: 'ai_tech' })}
            className="px-3 py-1.5 rounded-full bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-800 dark:text-white/90 text-xs shrink-0 font-medium transition-all"
          >
            🤖 AI & Tech
          </button>
          <button
            onClick={() => handleMenuClick({ id: 'ecommerce', label: '🛒 E-commerce', targetMenuId: 'ecommerce' })}
            className="px-3 py-1.5 rounded-full bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-800 dark:text-white/90 text-xs shrink-0 font-medium transition-all"
          >
            🛒 E-commerce
          </button>
          <button
            onClick={() => handleMenuClick({ id: 'marketing', label: '📊 Ads & Marketing', targetMenuId: 'marketing' })}
            className="px-3 py-1.5 rounded-full bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-800 dark:text-white/90 text-xs shrink-0 font-medium transition-all"
          >
            📊 Ads & Marketing
          </button>
          <button
            onClick={() => handleMenuClick({ id: 'design', label: '🎨 Design', targetMenuId: 'design' })}
            className="px-3 py-1.5 rounded-full bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-800 dark:text-white/90 text-xs shrink-0 font-medium transition-all"
          >
            🎨 Design
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-slate-100/50 dark:bg-black/30">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} space-y-2`}
            >
              <div className={`flex items-start gap-2.5 max-w-[90%] sm:max-w-[85%] ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                    m.sender === 'user'
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-black font-bold'
                      : 'bg-blue-600 text-white border border-blue-400/30'
                  }`}
                >
                  {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className="space-y-2 flex-1">
                  {/* Category Badge Header if present */}
                  {m.categoryBadge && m.sender === 'ai' && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/20 text-[10px] font-mono font-semibold uppercase tracking-wider">
                      <Sparkles className="w-3 h-3 text-blue-500" />
                      <span>{m.categoryBadge}</span>
                    </div>
                  )}

                  <div
                    className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                      m.sender === 'user'
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-black font-medium rounded-tr-none shadow-md'
                        : 'bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white rounded-tl-none backdrop-blur-md shadow-md'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              </div>

              {/* Interactive Menu Options Card below AI message if options exist */}
              {m.sender === 'ai' && m.menuOptions && m.menuOptions.length > 0 && (
                <div className="w-full pl-10 pr-2 pt-1 animate-fadeIn">
                  <div className="p-3 sm:p-4 rounded-2xl bg-white/90 dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-lg backdrop-blur-md space-y-2">
                    <p className="text-[11px] font-mono text-slate-500 dark:text-white/60 uppercase tracking-wider font-semibold flex items-center gap-1">
                      <ChevronLeft className="w-3.5 h-3.5 text-blue-500 rotate-180" />
                      <span>Select an option to continue:</span>
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {m.menuOptions.map((opt, oIdx) => {
                        const isBackOrHome = opt.isBack || opt.isHome;
                        const isContact = opt.isContactAction;

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleMenuClick(opt)}
                            className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between group ${
                              isContact
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500/40 shadow-md col-span-1 sm:col-span-2'
                                : isBackOrHome
                                ? 'bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-800 dark:text-white border-slate-300 dark:border-white/20 font-bold'
                                : 'bg-slate-50 dark:bg-white/5 hover:bg-blue-50 dark:hover:bg-blue-500/10 border-slate-200 dark:border-white/10 hover:border-blue-500/40 text-slate-800 dark:text-white'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              {isContact && <PhoneCall className="w-4 h-4 text-emerald-200" />}
                              <span>{opt.label}</span>
                            </span>
                            <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-1 ${
                              isContact ? 'text-white' : 'text-blue-500 dark:text-blue-400'
                            }`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-300 font-mono pl-10">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>{t('ai.typing')}</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSendText}
          className="p-3 bg-slate-100/90 dark:bg-black/50 border-t border-slate-200 dark:border-white/10 flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            placeholder={t('ai.askPlaceholder')}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/40 text-xs focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shrink-0 shadow-md"
          >
            <span>{t('ai.askButton')}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
};
