import { Certification, ContactInfo, LanguageSkill, ProjectCaseStudy, SkillItem, WorkExperience } from '../types';

export const PERSONAL_INFO = {
  name: "Anass Ghazzou",
  title: "Digital Marketing Specialist & E-commerce Entrepreneur",
  subtitle: "Growth Strategist • Paid Media Specialist • Automation Developer • UI/UX Designer",
  summary: "Digital Marketing Specialist with 7+ years driving measurable growth across SEO, paid media (Google & Meta), and e-commerce. Managed 5-figure monthly Meta Ads budgets, built two profitable online businesses from zero, grew Google Maps reviews 7→200+ for a regional brand, and currently delivering marketing strategy for MAK United & Varsity.",
  bioShort: "7+ years combining data-driven digital marketing, hands-on e-commerce execution, custom web scraping & automation, and graphic design across Middle East & global markets.",
  avatarUrl: "/avatar.webp", // High quality executive portrait photo
  location: "Kuwait / Morocco / Middle East",
  experienceYears: "7+",
  platformsBuilt: "2",
  adSpendManaged: "$500K+",
  certificationsCount: "50+",
};

export const CONTACT_INFO: ContactInfo = {
  email: "ghazzouanass@gmail.com",
  phoneUS: "+1 (505) 916-8220",
  phoneKuwait: "+965 6584 3536",
  phoneMorocco: "+212 622 326 219",
  linkedIn: "https://linkedin.com/in/anass-ghazzou",
  location: "Kuwait, USA & Morocco (Available for Global / Remote & Regional Contracts)"
};

export const SKILLS_DATA: SkillItem[] = [
  // Digital Marketing
  { id: 'seo-sem', name: 'SEO & SEM Optimization', category: 'marketing', level: 96, description: 'Organic ranking strategies, technical audits, keyword research, and Search Engine Marketing.', featured: true },
  { id: 'google-ads', name: 'Google Ads & PPC', category: 'marketing', level: 95, description: 'Search, Shopping, Display, and Video campaigns with high ROAS optimization.', featured: true },
  { id: 'meta-ads', name: 'Meta Ads (FB & Instagram)', category: 'marketing', level: 95, description: 'Custom audience retargeting, lookalike modeling, conversion tracking, creative A/B testing.', featured: true },
  { id: 'tiktok-ads', name: 'TikTok Ads & SMM', category: 'marketing', level: 90, description: 'Short-form video strategy, TikTok Shop ads, influencer collaborations, and viral hooks.' },
  { id: 'cro-funnels', name: 'CRO & Funnel Building', category: 'marketing', level: 92, description: 'Conversion rate optimization, landing page friction reduction, order bump & upsell architecture.' },
  { id: 'email-marketing', name: 'Email & SMS Marketing', category: 'marketing', level: 88, description: 'Klaviyo/Mailchimp automated sequences, abandoned cart recovery, customer lifecycle segmentation.' },
  { id: 'analytics', name: 'Google Analytics & Data', category: 'marketing', level: 94, description: 'GA4 event tracking, UTM attribution models, campaign ROI weekly reporting.' },
  
  // Design & Web
  { id: 'illustrator', name: 'Adobe Illustrator & Branding', category: 'design', level: 94, description: 'Full brand identities, vector logos, social media visual kits, print prepress artwork.', featured: true },
  { id: 'ai-design', name: 'AI Design & Generative Visuals', category: 'design', level: 95, description: 'Generative AI visual creation, Midjourney & Stable Diffusion design pipelines, visual brand synthesis, and creative AI tools.', featured: true },
  { id: 'wordpress', name: 'WordPress Development', category: 'design', level: 92, description: 'Custom theme & plugin integration, WooCommerce optimization, site speed tuning.' },
  { id: 'shopify', name: 'Shopify E-commerce', category: 'design', level: 95, description: 'Store architecture, liquid customization, payment gateways, product SEO titles & descriptions.' },
  { id: 'html-css-js', name: 'HTML5 / CSS3 / JavaScript', category: 'design', level: 88, description: 'Custom landing page front-end development, responsive layouts, micro-interactions.' },
  { id: 'ui-ux', name: 'UI/UX Fundamentals', category: 'design', level: 90, description: 'Wireframing, user journey design, mobile-first design system creation.' },

  // Tech & AI Automation
  { id: 'ai-prompt-masterclass', name: 'AI Prompt Masterclass', category: 'tech', level: 98, description: 'Advanced prompt engineering, system instruction design, context window optimization, custom AI persona architecture, and LLM output structuring.', featured: true },
  { id: 'ai-masterclass', name: 'AI Masterclass & Strategy', category: 'tech', level: 97, description: 'Enterprise AI implementation, generative model workflows, autonomous AI agents, multi-modal AI strategy, and AI process automation.', featured: true },
  { id: 'social-media-downloader', name: '50+ Platform Media Downloader', category: 'tech', level: 95, description: 'Engineered high-performance media & video downloader script supporting 50+ social networks.', featured: true },
  { id: 'wp-plugin-dev', name: 'Custom WP Plugin Development', category: 'tech', level: 93, description: 'Developing custom WordPress & WooCommerce PHP plugins, custom REST endpoints, and API webhooks.', featured: true },
  { id: 'qr-generator-script', name: 'Dynamic QR Code Script Generator', category: 'tech', level: 92, description: 'Coded custom dynamic QR code generator script with logo overlays, customization & redirection analytics.', featured: true },
  { id: 'ai-prompting', name: 'AI & Prompt Engineering', category: 'tech', level: 96, description: 'Custom LLM workflows, automated copy generation, generative image workflows, AI agents.', featured: true },
  { id: 'python-scripting', name: 'Python Scripting', category: 'tech', level: 90, description: 'Web scraping, data extraction scripts, API integrations, automated file processing.' },
  { id: 'web-scraping', name: 'Web Scraping & Automation', category: 'tech', level: 94, description: 'Extracting product catalogues, competitor price tracking, browser automation bots.' },
  { id: 'api-integration', name: 'API & Cloudflare Security', category: 'tech', level: 88, description: 'RESTful API integration, Cloudflare firewall, SSL, order workflow automation.' },

  // Business & Management
  { id: 'ecom-ops', name: 'E-commerce Operations', category: 'business', level: 96, description: 'End-to-end platform management, digital inventory, payment routing, customer support.', featured: true },
  { id: 'project-mgmt', name: 'Project & Timeline Mgmt', category: 'business', level: 92, description: 'Agile execution, cross-functional team coordination, turnaround time reduction.' },
  { id: 'budget-pnl', name: 'Budget & P&L Management', category: 'business', level: 90, description: 'Ad spend allocation, margin optimization, revenue reporting, unit economics.' }
];

export const FEATURED_PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'mak-united',
    title: 'MAK United - Global Logistics & Marketing Leadership',
    subtitle: 'Social Media Manager & Marketing Specialist leading digital brand growth for makunited.com',
    role: 'Social Media Manager & Marketing Specialist',
    period: '2026 – Present',
    category: 'marketing',
    clientOrBrand: 'MAK United W.L.L',
    companyLogo: '/makunited_logo.svg',
    summary: 'Driving brand growth, social media management, and paid media marketing campaigns at MAK United (makunited.com). Overseeing cross-channel social strategies, supply chain marketing visuals, B2B procurement leads, and performance attribution.',
    fullDescription: 'As Social Media Manager and Marketing Specialist at MAK United, Anass leads cross-functional digital marketing initiatives across Instagram, Meta Ads, Search, and short-form video platforms. The role combines high-level audience analytics with hands-on creative execution—leveraging AI-powered prompt workflows, high-converting ad copy, visual design in Adobe Illustrator, and weekly performance attribution for MAK United’s global logistics, supply chain, and trading services.',
    challenge: 'Establish a unified digital presence and scalable performance marketing engine across multiple regional verticals, driving qualified B2B/B2C leads while maintaining strict cost-per-acquisition (CPA) targets.',
    impactMetrics: [
      { label: 'Current Role', value: 'Social Media Mgr', change: 'Active 2026' },
      { label: 'Strategy', value: 'Omnichannel SMM', change: 'Growth Focused' },
      { label: 'Ad Tech', value: 'Meta & Search Ads', change: 'Performance' },
    ],
    keyDeliverables: [
      'Executing social media management, brand architecture, and multi-channel content calendars for makunited.com.',
      'Designing and launching high-converting paid ad campaigns on Meta, Instagram, and search platforms.',
      'Utilizing AI Prompt Masterclass workflows to automate content ideas, copywriting, and performance reporting.',
      'Collaborating with creative and executive teams to ensure consistent brand voice and market positioning.'
    ],
    techAndTools: ['Social Media Management', 'Meta Ads', 'Content Strategy', 'Adobe Illustrator', 'AI Prompt Engineering', 'Google Analytics'],
    featuredImage: '/makunited_banner.svg',
    galleryImages: [
      {
        url: '/makunited_banner.svg',
        caption: 'MAK United Global Supply Chain & Logistics Official Graphic Banner',
        description: 'Official corporate marketing graphic displaying air/sea freight forwarding, cargo shipping containers, and B2B procurement.'
      },
      {
        url: '/makunited_logo.svg',
        caption: 'MAK United Vector Identity & Brand Icon',
        description: 'Interlocking supply chain arrow monogram designed for MAK United W.L.L.'
      }
    ],
    liveUrl: 'https://makunited.com',
    featured: true,
  },
  {
    id: 'boostega-llc',
    title: 'Boostega LLC - All-In-One Digital Product Store',
    subtitle: 'Built & scaled digital product platform from scratch to global customers',
    role: 'Founder & CEO',
    period: '2019 – Present',
    category: 'ecommerce',
    clientOrBrand: 'Boostega.com',
    companyLogo: '/boostega_logo.svg',
    summary: 'Conceived, engineered, and scaled an entire online e-commerce platform selling digital products, software subscriptions, scripts, media plugins, and design assets. Executed domain setup, web architecture, Adobe Illustrator brand identity, SEO product copywriting, Meta/Google ad campaigns, Cloudflare security, automated order processing, and direct Trustpilot customer service.',
    fullDescription: 'Boostega LLC is an all-in-one digital goods store built 100% in-house from concept to international scaling. As Founder & CEO, Anass designed the complete visual identity in Adobe Illustrator, developed custom website templates, integrated automated checkout and instant script delivery, established Trustpilot reviews, and managed performance marketing channels.',
    challenge: 'Build a secure, frictionless digital store with zero delivery lag, robust Cloudflare DDoS protection, and high-converting search/social sales funnels without relying on external dev agencies.',
    impactMetrics: [
      { label: 'Platform Creation', value: '100% In-House', change: 'Zero to Live' },
      { label: 'Customer Support', value: 'Top Rating', change: 'Trustpilot Rated' },
      { label: 'Automation Flow', value: 'Instant Delivery', change: 'Scripted' },
      { label: 'Acquisition Channels', value: 'SEO + Meta Ads', change: 'Multi-channel' },
    ],
    keyDeliverables: [
      'Full brand identity designed in Adobe Illustrator (logo, palette, typography, brand assets).',
      'Custom web platform development with payment gateway setup and Cloudflare security rules.',
      'SEO-optimized product catalog listings with high-converting titles, descriptions, and thumbnails.',
      'Custom Python & web automation scripts for rapid order fulfillment and automated customer support.',
      'Managed all ad budgets across Meta Ads, Google Search, and email marketing funnels.'
    ],
    techAndTools: ['Shopify/WordPress', 'Meta Ads', 'Google Ads', 'Python Scripts', 'Adobe Illustrator', 'Cloudflare', 'SEO / CRO'],
    featuredImage: '/boostega_banner.svg',
    galleryImages: [
      {
        url: '/boostega_banner.svg',
        caption: 'Top Digital Provider - Boostega Official Platform Marketing Banner',
        description: 'Official store banner showcasing digital products, software licenses, premium tools, media scripts, and instant delivery.'
      },
      {
        url: '/boostega_logo.svg',
        caption: 'Boostega Brand Vector Identity in Adobe Illustrator',
        description: 'Vibrant orange and magenta brand mark created in Adobe Illustrator for web, app, and social assets.'
      }
    ],
    liveUrl: 'https://boostega.com',
    featured: true,
  },
  {
    id: 'cosmetiklab',
    title: 'CosmetikLab - White-Label Cosmetic Formulation Lab',
    subtitle: 'White-label cosmetic lab, skincare formulation & private label beauty brand manager',
    role: 'Project & Brand Manager',
    period: '2023 – Present',
    category: 'marketing',
    clientOrBrand: 'CosmetikLab',
    companyLogo: '/cosmetiklab_logo.svg',
    summary: 'Managed brand launch, skincare laboratory formulations, private-label packaging designs, and digital marketing funnels for CosmetikLab—a premier white-label cosmetic manufacturing lab.',
    fullDescription: 'CosmetikLab provides B2B cosmetic formulations, ISO-certified laboratory development, and white-label manufacturing for luxury skincare brands. Anass coordinated brand strategy, packaging artwork, lab compliance, and influencer outreach.',
    challenge: 'Create an elegant B2B and direct-to-consumer brand identity highlighting laboratory quality, luxury ingredients, and seamless white-label order execution.',
    impactMetrics: [
      { label: 'Lab Services', value: 'White-Label', change: 'ISO Standard' },
      { label: 'Formulations', value: 'Skincare & Beauty', change: 'Custom Formulated' },
      { label: 'Brand Launch', value: 'Private Label', change: '100% Turnkey' }
    ],
    keyDeliverables: [
      'Coordinated custom cosmetic packaging artwork and label design in Adobe Illustrator.',
      'Established private label product catalog with serum, lotion, and cosmetic jar formulations.',
      'Managed digital ad campaigns and influencer gifting to launch new white-label client lines.'
    ],
    techAndTools: ['Cosmetic Formulation', 'White-Label Branding', 'Adobe Illustrator', 'Product Packaging', 'Influencer Marketing'],
    featuredImage: '/cosmetiklab_banner.svg',
    galleryImages: [
      {
        url: '/cosmetiklab_banner.svg',
        caption: 'CosmetikLab Official White-Label Laboratory Banner',
        description: 'Bespoke skincare serum dropper bottles, cosmetic cream jars, and lab formulation workspace.'
      },
      {
        url: '/cosmetiklab_logo.svg',
        caption: 'CosmetikLab Vector Logo in Gold & Rose Fuchsia',
        description: 'Luxury cosmetic laboratory flask emblem with golden organic leaf motif.'
      }
    ],
    featured: true,
  },
  {
    id: 'lulu-hypermarket',
    title: 'Lulu Hypermarket Middle East - Digital & Web Scraping',
    subtitle: 'Regional ad campaign execution & automated catalogue scraper for pricing intelligence',
    role: 'Digital Marketing Specialist',
    period: '2024 – 2025',
    category: 'retail',
    clientOrBrand: 'Lulu Hypermarket Regional Office (Kuwait)',
    companyLogo: '/lulu_logo.svg',
    summary: 'Ran high-volume digital marketing campaigns for one of the Middle East\'s premier hypermarket retail chains across Google and Meta. Engineered a custom Python web scraper that systematically extracted Lulu\'s entire product catalogue for competitive price analysis and inventory insights.',
    fullDescription: 'At Lulu Hypermarket\'s regional headquarters in Kuwait, Anass drove digital marketing strategies for high-frequency retail promotions while engineering an automated Python scraping engine that extracted thousands of store products, promotional pricing, and stock levels to fuel price intelligence dashboards.',
    challenge: 'Monitor dynamic grocery and retail pricing across competitive Middle Eastern markets while managing massive multi-segment ad campaigns during peak seasonal shopping periods.',
    impactMetrics: [
      { label: 'Catalogue Scraped', value: 'Full Catalogue', change: '100% Automated' },
      { label: 'Regional Reach', value: 'Kuwait & Gulf', change: 'Google & Meta' },
      { label: 'Organic Growth', value: 'Improved Rank', change: 'Via SEO Audits' },
    ],
    keyDeliverables: [
      'Managed multi-channel ad budgets targeting consumer segments across Kuwait & GCC.',
      'Built custom Python web scraper extracting full product catalogue for competitor price tracking.',
      'Executed technical SEO audits and keyword strategy that boosted organic search traffic.',
      'Delivered weekly executive reports analyzing ROI, CAC, and channel performance.'
    ],
    techAndTools: ['Python Web Scraping', 'Google Ads', 'Meta Ads', 'SEO Audits', 'Data Analytics', 'Competitor Intelligence'],
    featuredImage: '/lulu_banner.svg',
    galleryImages: [
      {
        url: '/lulu_banner.svg',
        caption: 'Lulu Hypermarket Official Retail & Python Scraper Banner',
        description: 'Regional promotional ad visual campaign banner and automated catalogue python parser.'
      },
      {
        url: '/lulu_logo.svg',
        caption: 'Lulu Hypermarket Vector Logo Emblem',
        description: 'Emerald green vector shopping badge for regional hypermarket campaign assets.'
      }
    ],
    featured: true,
  },
  {
    id: 'fashion-lifestyle-portfolio',
    title: 'Rare Design • Fennec • Yomikwt • Mugmug Apparel Portfolio',
    subtitle: 'Marketing direction & brand graphics for Rare Design, Fennec, Yomikwt & Mugmug',
    role: 'Marketing Manager & Creative Director',
    period: 'Jan 2026 – Present',
    category: 'marketing',
    clientOrBrand: 'Rare Design • Fennec • Yomikwt • Mugmug Kuwait',
    companyLogo: '/raredesign_logo.svg',
    summary: 'Directed full digital marketing and creative strategy for four fashion and lifestyle brands simultaneously: Rare Design (luxury streetwear clothing), Fennec (modern activewear), Yomikwt (luxury towels & shower apparel), and Mugmug (custom mugs & tumblers).',
    fullDescription: 'Rare Design along with Fennec, Yomikwt, and Mugmug represent a high-growth apparel and consumer lifestyle portfolio in Kuwait. Anass acted as Marketing Director and Creative Strategist—overseeing brand identity, custom graphics, lookbook photography direction, Shopify store development, influencer seeding, and high-ROAS social advertising.',
    challenge: 'Differentiate 4 distinct apparel lines in a saturated fashion market while driving direct-to-consumer e-commerce sales with sustainable customer acquisition costs.',
    impactMetrics: [
      { label: 'Brands Managed', value: '4 Fashion Brands', change: 'Simultaneous' },
      { label: 'Ad Channels', value: 'Meta, Google, TikTok', change: 'Omnichannel' },
      { label: 'Creative Direction', value: '100% On-Brand', change: 'Graphics & Assets' },
    ],
    keyDeliverables: [
      'Rare Design: Developed luxury streetwear clothing brand graphics, hoodies, and t-shirt cuts.',
      'Fennec: Designed athleticwear clothing brand graphics with geometric desert fox icon.',
      'Yomi KWT: Created luxury Egyptian cotton towel and shower bathrobe bathware brand graphics.',
      'MugMug: Engineered custom insulated stainless steel tumbler and ceramic mug product lines.'
    ],
    techAndTools: ['Meta Ads', 'TikTok Ads', 'Google Ads', 'Content Strategy', 'Adobe Illustrator', 'E-commerce Photography', 'Influencer Marketing'],
    featuredImage: '/raredesign_banner.svg',
    galleryImages: [
      {
        url: '/raredesign_banner.svg',
        caption: 'Rare Design Luxury Streetwear Clothing Official Graphic Banner',
        description: 'Bespoke streetwear hoodies, t-shirts, custom cuts, and luxury dark lookbook aesthetics.'
      },
      {
        url: '/raredesign_logo.svg',
        caption: 'Rare Design Monogram Silver Emblem',
        description: 'Luxury monochrome streetwear brand mark designed in Adobe Illustrator.'
      },
      {
        url: '/fennec_banner.svg',
        caption: 'Fennec Activewear Clothing Brand Banner',
        description: 'Modern activewear clothing brand featuring geometric desert fox icon.'
      },
      {
        url: '/fennec_logo.svg',
        caption: 'Fennec Fox Vector Logo',
        description: 'Minimalist desert fox vector emblem in charcoal and flame orange.'
      },
      {
        url: '/yomikwt_banner.svg',
        caption: 'Yomi KWT Luxury Towels & Shower Apparel Banner',
        description: 'Kuwait luxury bathware brand with Egyptian cotton towels and plush bathrobes.'
      },
      {
        url: '/yomikwt_logo.svg',
        caption: 'Yomi KWT Towel & Bathware Icon',
        description: 'Golden towel fold wave and water drop luxury emblem.'
      },
      {
        url: '/mugmug_banner.svg',
        caption: 'MugMug Custom Mugs & Insulated Tumblers Banner',
        description: 'Stainless steel insulated tumblers and ceramic coffee mug collection.'
      },
      {
        url: '/mugmug_logo.svg',
        caption: 'MugMug Drinkware Vector Icon',
        description: 'Warm terracotta ceramic mug and steaming coffee emblem.'
      }
    ],
    featured: true,
  },
  {
    id: 'national-arabic-company',
    title: 'National Arabic Company - Wood, Melamine & Accessories',
    subtitle: 'Integrated digital and print marketing strategy, Meta ad campaigns, and local SEO growth',
    role: 'Marketing Manager',
    period: '2025 – 2026',
    category: 'marketing',
    clientOrBrand: 'National Arabic Company',
    companyLogo: '/national_arabic_logo.svg',
    summary: 'Led end-to-end marketing campaigns for National Arabic Company—managing high-ROAS Meta ad campaigns, social media posts, and scaling Google Maps reviews from 5 to 200+ across 3 business accounts while supporting wood, melamine panel & cabinet hardware marketing.',
    fullDescription: 'At National Arabic Company, Anass managed Meta campaigns, daily social media content publishing, and local SEO optimizations—scaling Google Business / Maps reviews from 5 to over 200 positive reviews across 3 company Google Business accounts, while bridging traditional timber & melamine trade marketing with digital lead acquisition funnels.',
    challenge: 'Unify corporate brand guidelines, scale local Google Business visibility across 3 company accounts, and execute consistent social media & Meta ad campaigns for timber and hardware lines.',
    impactMetrics: [
      { label: 'Google Maps Reviews', value: '5 ➔ 200+', change: 'Across 3 Accounts' },
      { label: 'Meta Ad Campaigns', value: 'High ROAS', change: 'Lead Gen & Brand' },
      { label: 'Social Media', value: 'Daily Management', change: 'Multi-Platform' }
    ],
    keyDeliverables: [
      'Scaled Google Business / Google Maps reviews from 5 to 200+ active positive reviews across 3 company accounts.',
      'Managed end-to-end Meta ad campaigns and daily high-engagement social media posts.',
      'Designed wood sample book collateral, melamine panel catalog sheets, and trade exhibition graphics.',
      'Planned campaign lifecycle from budget allocation to monthly executive performance reporting.'
    ],
    techAndTools: ['Google Maps Local SEO', 'Meta Ads', 'Social Media Management', 'Campaign Planning', 'Wood & Melamine Marketing', 'Print Prepress'],
    featuredImage: '/national_arabic_banner.svg',
    galleryImages: [
      {
        url: '/national_arabic_banner.svg',
        caption: 'National Arabic Company Official Wood & Melamine Supplier Banner',
        description: 'Architectural timber wood beams, stacked melamine panels, and cabinet hardware accessories.'
      },
      {
        url: '/national_arabic_logo.svg',
        caption: 'National Arabic Company Timber Wood Logo Emblem',
        description: 'Golden timber wood grain N monogram and melamine edge line accent.'
      }
    ],
    featured: false,
  },
  {
    id: 'social-media-downloader-script',
    title: 'Smoader - Universal Social Media Downloader Plugin (50+ Platforms)',
    subtitle: 'Proprietary WordPress plugin by Anass Ghazzou (Boostega.com) extracting media from 50+ social platforms',
    role: 'Lead Developer & Plugin Author',
    period: '2024 – Present',
    category: 'saas',
    clientOrBrand: 'Smoader • Boostega.com',
    companyLogo: '/boostega_logo.svg',
    summary: 'Engineered "Smoader", a high-performance proprietary WordPress plugin enabling users to download high-resolution video, audio, and images from over 50+ social networks (Instagram, TikTok, YouTube, Twitter/X, Facebook, Pinterest, and more) using the shortcode [boostega_downloader]. Integrates RapidAPI autolink backend, AJAX proxy with WP Nonce security, IP rate limiting, automated SEO Generator, and a Premium System.',
    fullDescription: 'Smoader is an all-in-one social media media extractor built as a custom WordPress plugin by Anass Ghazzou. It features a responsive front-end interface with platform detection pills, asynchronous AJAX fetching, backend RapidAPI proxying with x-rapidapi-key security, transient-based IP rate limiting (30 requests/min), automated SEO meta tag generation (seo-generator.php), and a built-in premium tier system (premium.php). Compatible with Flatsome UX Builder, Elementor, and Gutenberg.',
    challenge: 'Deliver zero-latency media fetching across 50+ changing social video/photo endpoints while enforcing strict backend API key security, IP rate limits, and seamless WordPress theme integration.',
    impactMetrics: [
      { label: 'Platform Coverage', value: '50+ Social Networks', change: 'Instagram, TikTok, YT & More' },
      { label: 'Shortcode System', value: '[boostega_downloader]', change: 'Flatsome & Elementor Ready' },
      { label: 'Security & Limits', value: 'WP Nonce + Transients', change: '30 Req/Min IP Rate Limit' },
      { label: 'Integrated Modules', value: 'SEO + Premium System', change: 'Built-in Monetization' }
    ],
    keyDeliverables: [
      'Developed complete Smoader WordPress plugin codebase with shortcode [boostega_downloader] and localized AJAX scripts.',
      'Constructed secure backend proxy handler (wp_ajax_boostega_download) preventing front-end exposure of API keys.',
      'Implemented transient-based IP rate limiting (30 requests per minute) and WP nonce verification for exploit prevention.',
      'Integrated RapidAPI autolink endpoint parsing direct HD/4K videos, MP3 audio, thumbnails, and story downloads.',
      'Engineered sub-modules including seo-generator.php for auto meta tagging and premium.php for subscription tiers.'
    ],
    techAndTools: ['WordPress PHP', 'AJAX & WP Nonce', 'RapidAPI Integration', 'JavaScript App.js', 'CSS3 Styling', 'Flatsome UX Builder', 'SEO & Premium Modules'],
    featuredImage: '/smoader_banner.svg',
    galleryImages: [
      {
        url: '/smoader_banner.svg',
        caption: 'Smoader Universal Social Media Downloader Banner [boostega_downloader]',
        description: 'Official plugin graphics with 50+ platform extraction pills, RapidAPI proxy security, and shortcode system.'
      },
      {
        url: '/boostega_logo.svg',
        caption: 'Boostega LLC Vector Logo',
        description: 'Official plugin author brand identity for Boostega.com.'
      }
    ],
    liveUrl: 'https://boostega.com',
    featured: true,
  },
  {
    id: 'custom-wp-plugins',
    title: 'Custom WordPress Plugins & WooCommerce Suite',
    subtitle: 'Bespoke WordPress plugin development for e-commerce, marketing automation & API integrations',
    role: 'WordPress & Full-Stack Developer',
    period: '2021 – Present',
    category: 'automation',
    clientOrBrand: 'Custom WordPress Extensions',
    companyLogo: '/wordpress_suite_logo.svg',
    summary: 'Coded multiple custom PHP / WordPress plugins from scratch to extend WooCommerce store capabilities, automate marketing workflows, build custom payment routing hooks, synchronize external inventory APIs, and construct specialized user portal dashboards.',
    fullDescription: 'A suit of lightweight, bespoke PHP plugins engineered for WooCommerce stores and enterprise WordPress sites. Features include automated inventory sync with external supplier APIs, custom checkout rules, customer loyalty point engines, and secure REST webhooks.',
    challenge: 'Deliver heavy e-commerce custom logic without causing plugin conflicts or slowing down page load times.',
    impactMetrics: [
      { label: 'Plugins Developed', value: 'Multiple Custom Plugins', change: '100% Bespoke PHP' },
      { label: 'WooCommerce Sync', value: 'Automated Real-time', change: 'Zero Bloat' },
      { label: 'Performance Rank', value: 'Fast Execution', change: 'Secure Hook Arch' }
    ],
    keyDeliverables: [
      'Engineered custom WooCommerce extensions for dynamic pricing rules, custom checkout fields, and webhook triggers.',
      'Coded administrative dashboards, custom Gutenberg blocks, shortcodes, and user account portals.',
      'Optimized database queries and hook structures to guarantee rapid page loads with zero plugin conflict.',
      'Implemented security sanitization, nonce protection, and custom REST API endpoints.'
    ],
    techAndTools: ['PHP / WordPress Core', 'WooCommerce Hooks', 'REST API', 'MySQL', 'JavaScript / AJAX', 'Custom Gutenberg Blocks'],
    featuredImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200',
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200',
        caption: 'WordPress & WooCommerce Plugin Codebase',
        description: 'Custom PHP class structures adhering to WordPress standard security guidelines.'
      },
      {
        url: '/wordpress_suite_logo.svg',
        caption: 'WordPress & WooCommerce Suite Vector Emblem',
        description: 'Custom WooCommerce and PHP extension architecture vector badge.'
      }
    ],
    featured: true,
  },
  {
    id: 'qr-code-generator-script',
    title: 'Custom Dynamic QR Code Generator Script',
    subtitle: 'High-speed dynamic QR code generation tool with brand logo overlays & scan analytics',
    role: 'Full-Stack Script Developer',
    period: '2023 – Present',
    category: 'saas',
    clientOrBrand: 'Dynamic QR Tool Script',
    companyLogo: '/qrcode_logo.svg',
    summary: 'Engineered a standalone, lightweight QR Code Generator script enabling users and marketers to build customizable QR codes featuring custom brand colors, logo overlays, frame styles, high-resolution vector exports (SVG, PNG, PDF), and dynamic URL redirection tracking.',
    fullDescription: 'Built with client-side Canvas and vector SVG generation, this script creates high-precision QR codes with embedded center logos, custom eye styling, and dynamic redirection tracking so target links can be updated anytime after printing.',
    challenge: 'Generate high-contrast print-ready SVG vectors on the fly with reliable error-correction when logo overlays are embedded.',
    impactMetrics: [
      { label: 'Export Formats', value: 'SVG, PNG, PDF', change: 'Print Ready' },
      { label: 'Styling Options', value: 'Logo & Color Custom', change: 'Branded Codes' },
      { label: 'Script Speed', value: 'Instant (<50ms)', change: 'Client-Side Canvas' }
    ],
    keyDeliverables: [
      'Built canvas and vector rendering engine for custom eye patterns, color gradients, and logo insertion.',
      'Developed dynamic link tracking enabling marketers to change target destination URLs without reprinting QR graphics.',
      'Designed an accessible frontend interface featuring live real-time visual rendering as parameters change.'
    ],
    techAndTools: ['JavaScript / Canvas API', 'PHP / Node.js', 'Vector SVG Output', 'Dynamic Redirection', 'UI/UX Design'],
    featuredImage: 'https://images.unsplash.com/photo-1595079672139-625aa3d3fbfe?auto=format&fit=crop&q=80&w=1200',
    galleryImages: [
      {
        url: '/qrcode_logo.svg',
        caption: 'Dynamic QR Code Script Vector Identity',
        description: 'Real-time interactive preview with logo overlay and color customization controls.'
      },
      {
        url: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200',
        caption: 'High-Resolution Vector Export (SVG & PDF)',
        description: 'Print-ready vector rendering for packaging, flyers, and merchandise.'
      }
    ],
    featured: true,
  }
];

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    id: 'exp-mak',
    role: 'Marketing Strategist & Analyst',
    company: 'MAK United & Varsity',
    companyLogo: '/makunited_logo.svg',
    period: '2026 (3-Month Project)',
    type: 'Project-Based',
    category: 'management',
    highlights: [
      'Conducted full competitive analysis using SEMrush and multiple analytics platforms, mapping all direct competitors for both MAK United and Varsity.',
      'Delivered comprehensive PDF marketing strategy reports covering ads strategy, content roadmap, and 6-month execution plan for both companies.',
      'Audited websites and provided detailed development recommendations for UX improvements, SEO optimization, and conversion funnel architecture.',
      'Designed paid media strategy across Google & Meta with targeting frameworks, budget allocation models, and projected KPIs for the next 6 months.'
    ],
    skillsUsed: ['SEMrush', 'Competitive Analysis', 'Marketing Strategy', 'Google Ads', 'Meta Ads', 'Website Audit', 'PDF Reporting']
  },
  {
    id: 'exp-1',
    role: 'Digital Marketing Consultant',
    company: 'Rare Design • Fennec • Yomikwt • Mugmug Kuwait',
    companyLogo: '/raredesign_logo.svg',
    period: 'Jan – Jun 2026',
    type: 'Contract',
    category: 'freelance',
    highlights: [
      'Managed digital marketing for 4 fashion brands simultaneously — drove Yomikwt to complete sold-out status.',
      'Managed 5-figure monthly Meta Ads budgets across all 4 brands — increased Rare Design ROI by more than 4x through optimized funnels and audience targeting.',
      'Set up and launched paid ad campaigns for Rare Design and Fennec from scratch, building full campaign structures.',
      'Fully set up and optimized Google My Business (GMB) profiles for Rare Design and Fennec, boosting local discovery.'
    ],
    skillsUsed: ['Meta Ads', 'Google Ads', 'GMB Optimization', 'E-commerce', 'Adobe Illustrator', 'Multi-Brand Management']
  },
  {
    id: 'exp-2',
    role: 'Digital Marketing Specialist',
    company: 'National Arabic Company',
    companyLogo: '/national_arabic_logo.svg',
    period: '2025 – 2026',
    type: 'Full-time',
    category: 'management',
    highlights: [
      'Grew Google Maps reviews from 7 to 200+ with fully optimized Google My Business profiles across 3 accounts.',
      'Generated 20,000+ leads through social media campaigns and bulk WhatsApp outreach strategies.',
      'Redesigned the physical showroom layout to improve foot traffic and customer experience, driving in-store conversions.',
      'Produced AI-generated product videos and high-quality visual content, elevating the brand to premium positioning.',
      'Managed end-to-end Meta advertising campaigns and social media management for B2B customer acquisition.'
    ],
    skillsUsed: ['Google Maps/GMB', 'Meta Ads', 'WhatsApp Marketing', 'AI Video Production', 'Showroom Design', 'Lead Generation']
  },
  {
    id: 'exp-3',
    role: 'Digital Marketing Specialist',
    company: 'Lulu Hypermarket - Kuwait Regional Office',
    companyLogo: '/lulu_logo.svg',
    period: '2024 – 2025',
    type: 'Hybrid',
    category: 'enterprise',
    highlights: [
      'Built custom Python web scraper extracting 100,000+ product SKUs for competitive pricing analysis across the full Lulu catalogue.',
      'Set up a full-year content calendar and automated social media posts for the company\'s product lines.',
      'Served as final approver for the weekly promotional booklet — reviewing, approving, or declining before print distribution.',
      'Executed technical SEO audits and keyword research, improving organic search rankings for priority product categories.',
      'Delivered weekly campaign performance dashboards to executive leadership with actionable optimization recommendations.'
    ],
    skillsUsed: ['Google Ads', 'Meta Ads', 'Python Web Scraping', 'SEO Audits', 'Data Analytics', 'Retail Marketing']
  },

  {
    id: 'exp-5',
    role: 'Founder & E-commerce Operator',
    company: 'Boostega LLC (Boostega.com)',
    companyLogo: '/boostega_logo.svg',
    period: '2019 – 2024',
    type: 'Founder',
    category: 'founder',
    highlights: [
      'Built the entire e-commerce platform from zero — domain, code, branding, product design, and website design — achieving first sale through organic SEO alone.',
      'Single-handedly managed all operations: product listings, brand identity in Adobe Illustrator, inventory, customer service, and fulfillment.',
      'Drove customer acquisition through SEO copywriting, Google Ads, Meta Ads, and automated email funnels.',
      'Implemented Cloudflare security, payment processing integration, and Python automation scripts for order handling.'
    ],
    skillsUsed: ['E-commerce Platform', 'Adobe Illustrator', 'SEO Copywriting', 'Paid Ads', 'Python Scripts', 'Full Operations']
  },
  
  {
    id: 'exp-7',
    role: 'Project Manager',
    company: 'CosmetikLab',
    companyLogo: '/cosmetiklab_logo.svg',
    period: '2023 (6 Months)',
    type: 'Full-time',
    category: 'management',
    highlights: [
      'Managed project timelines and coordinated multi-disciplinary teams.',
      'Optimized internal workflows, significantly reducing turnaround times on deliverables.'
    ],
    skillsUsed: ['Project Management', 'Workflow Optimization', 'Team Leadership']
  },
  {
    id: 'exp-8',
    role: 'Graphic Designer & Print Production Manager',
    company: 'Support (Print & Engraving)',
    companyLogo: '/supportprint_logo.svg',
    period: '2021 (1 Year)',
    type: 'Full-time',
    category: 'management',
    highlights: [
      'Managed staff operations and all printing machines including Roland large-format plotters and Roland MPX-90 metal engravers.',
      'Created graphic charts and brand identity packages for luxury companies in Adobe Illustrator.',
      'Designed and produced all types of printed materials: business cards, banners, vehicle wraps, signage, and engraved items.',
      'Handled pre-press workflows, color calibration, and quality assurance for high-end print production.'
    ],
    skillsUsed: ['Adobe Illustrator', 'Staff Management', 'Roland Printers', 'Pre-press', 'Luxury Branding', 'Print Production']
  },
  {
    id: 'exp-9',
    role: 'Store Manager & Sales Specialist',
    company: 'Antique & Decoration Furniture Store (Marrakech)',
    companyLogo: '/marrakech_art_logo.svg',
    period: '2015 – 2020 (5 Years)',
    type: 'Full-time',
    category: 'management',
    highlights: [
      'Managed full store operations, inventory control, and a team of staff — consistently exceeding monthly sales targets.',
      'Closed high-value deals with international tourists and local B2B clients, negotiating prices and upselling premium decoration pieces.',
      'Built long-term client relationships driving 40%+ repeat purchase rate through personalized service and follow-up.',
      'Conducted multilingual sales (Arabic, French, English) with strong consultative selling, achieving top conversion rates in the Marrakech Medina district.'
    ],
    skillsUsed: ['Sales & Revenue Growth', 'Client Negotiation', 'Upselling & Cross-selling', 'Team Management', 'Multilingual Sales', 'Customer Retention']
  }
];

export const CERTIFICATIONS: Certification[] = [
  // AI & Prompt Engineering
  { id: 'c1', title: 'AI Automation & Prompt Engineering MasterClass', issuer: 'Udemy / MasterClass', year: '2024–2026', category: 'ai', verified: true },
  { id: 'c2', title: 'Artificial Intelligence MasterClass', issuer: 'Udemy', year: '2024–2025', category: 'ai', verified: true },
  { id: 'c3', title: 'Generative AI & LLM Prompting Masterclass', issuer: 'Udemy', year: '2024', category: 'ai', verified: true },
  { id: 'c4', title: 'ChatGPT & Midjourney for Marketers & Designers', issuer: 'Udemy', year: '2024', category: 'ai', verified: true },
  { id: 'c5', title: 'Autonomous AI Agents & Automation Pipelines', issuer: 'Udemy', year: '2025', category: 'ai', verified: true },
  { id: 'c6', title: 'Leading with Innovation in the Age of AI', issuer: 'LinkedIn Learning', year: 'Jan 2025', category: 'ai', verified: true },

  // Digital Marketing, E-Marketing & Advertising
  { id: 'c7', title: 'The Complete Digital Marketing Course - 12 Courses in 1', issuer: 'Udemy', year: '2023', category: 'marketing', verified: true },
  { id: 'c8', title: 'Google Ads (Search, Shopping, Display & Video) Masterclass', issuer: 'Udemy / Google', year: '2023–2024', category: 'marketing', verified: true },
  { id: 'c9', title: 'Google Ads Search Certification', issuer: 'Google Certified', year: '2023', category: 'marketing', verified: true },
  { id: 'c10', title: 'Google Analytics 4 (GA4) Mastery', issuer: 'Udemy / Google', year: '2023', category: 'marketing', verified: true },
  { id: 'c11', title: 'Meta Blueprint - Advanced Facebook & Instagram Advertising', issuer: 'Meta / Udemy', year: '2023–2024', category: 'marketing', verified: true },
  { id: 'c12', title: 'TikTok Ads & Short-Form Video Marketing Strategy', issuer: 'Udemy', year: '2024', category: 'marketing', verified: true },
  { id: 'c13', title: 'E-Marketing & Sales Funnel Conversion Optimization (CRO)', issuer: 'Udemy', year: '2023', category: 'marketing', verified: true },
  { id: 'c14', title: 'Email Marketing & Automated Customer Journeys (Klaviyo)', issuer: 'Udemy', year: '2023', category: 'marketing', verified: true },
  { id: 'c15', title: 'PPC Advertising & Media Buying Strategy', issuer: 'Udemy', year: '2022', category: 'marketing', verified: true },
  { id: 'c16', title: 'Performance Marketing & ROAS Analytics', issuer: 'Udemy', year: '2024', category: 'marketing', verified: true },

  // Social Media Marketing (SMM)
  { id: 'c17', title: 'Social Media Marketing Mastery (SMM - All Platforms)', issuer: 'Udemy', year: '2023–2024', category: 'marketing', verified: true },
  { id: 'c18', title: 'Instagram Marketing & Reels Growth Strategy', issuer: 'Udemy', year: '2023', category: 'marketing', verified: true },
  { id: 'c19', title: 'Social Media Content Calendar & Editorial Design', issuer: 'Udemy', year: '2023', category: 'marketing', verified: true },
  { id: 'c20', title: 'Viral Organic Growth & Short-Form Content Creation', issuer: 'Udemy', year: '2024', category: 'marketing', verified: true },
  { id: 'c21', title: 'LinkedIn B2B Marketing & Brand Positioning', issuer: 'Udemy', year: '2023', category: 'marketing', verified: true },
  { id: 'c22', title: 'Social Media Agency & Client Account Management', issuer: 'Udemy', year: '2024', category: 'marketing', verified: true },

  // SEO & Content Strategy
  { id: 'c23', title: 'SEO 2024: Complete Search Engine Optimization Training', issuer: 'Udemy', year: '2023–2024', category: 'marketing', verified: true },
  { id: 'c24', title: 'Technical SEO & Keyword Research Masterclass', issuer: 'Udemy', year: '2023', category: 'marketing', verified: true },
  { id: 'c25', title: 'E-commerce SEO & Product Listing Optimization', issuer: 'Udemy', year: '2023', category: 'marketing', verified: true },
  { id: 'c26', title: 'Content Marketing & High-Converting Copywriting', issuer: 'Udemy / Skillshare', year: '2022–2023', category: 'marketing', verified: true },
  { id: 'c27', title: 'Local SEO & Google Business Profile Growth', issuer: 'Udemy', year: '2023', category: 'marketing', verified: true },
  { id: 'c28', title: 'Link Building & Domain Authority Acceleration', issuer: 'Udemy', year: '2023', category: 'marketing', verified: true },

  // Design, Branding & Adobe
  { id: 'c29', title: 'Adobe Illustrator CC - Vector Graphics & Brand Design', issuer: 'Udemy', year: '2021–2022', category: 'design', verified: true },
  { id: 'c30', title: 'Graphic Design Masterclass - Learn GREAT Design', issuer: 'Udemy', year: '2021', category: 'design', verified: true },
  { id: 'c31', title: 'Logo Design & Brand Identity Systems', issuer: 'Udemy', year: '2022', category: 'design', verified: true },
  { id: 'c32', title: 'UI/UX Design Essentials (Figma & Prototyping)', issuer: 'Udemy', year: '2022', category: 'design', verified: true },
  { id: 'c33', title: 'Generative AI Visual Design & Midjourney Art Direction', issuer: 'Udemy', year: '2024', category: 'design', verified: true },
  { id: 'c34', title: 'Diploma in Graphic Design', issuer: 'OFPPT State Diploma', year: '2021–2022', category: 'design', verified: true },
  { id: 'c35', title: 'Prepress, Print & Color Calibration Certification', issuer: 'Support Print Industry', year: '2021', category: 'design', verified: true },

  // WordPress, Development & Technical Scripts
  { id: 'c36', title: 'WordPress Development: Custom Plugin & Theme Architecture', issuer: 'Udemy', year: '2022–2023', category: 'tech', verified: true },
  { id: 'c37', title: 'WooCommerce Complete Guide: Build Custom E-commerce Stores', issuer: 'Udemy', year: '2022', category: 'tech', verified: true },
  { id: 'c38', title: 'PHP & MySQL Web Development for WordPress Engineers', issuer: 'Udemy', year: '2022', category: 'tech', verified: true },
  { id: 'c39', title: 'JavaScript & HTML5 Canvas Scripting', issuer: 'Udemy', year: '2023', category: 'tech', verified: true },
  { id: 'c40', title: 'Python Programming & Automation Scripting', issuer: 'Udemy', year: '2023', category: 'tech', verified: true },
  { id: 'c41', title: 'Python Web Scraping & Data Extraction (BeautifulSoup / Selenium)', issuer: 'Udemy', year: '2023–2024', category: 'tech', verified: true },
  { id: 'c42', title: 'REST API Design, Webhooks & Cloudflare Security', issuer: 'Udemy', year: '2023', category: 'tech', verified: true },
  { id: 'c43', title: 'WebMaster & Server Architecture Course', issuer: 'Web Academy', year: '2018–2019', category: 'tech', verified: true },

  // E-commerce & Business Strategy
  { id: 'c44', title: 'E-commerce Business Masterclass - Product Sourcing & Logistics', issuer: 'Udemy', year: '2021–2023', category: 'business', verified: true },
  { id: 'c45', title: 'Shopify Store Building & Dropshipping Excellence', issuer: 'Udemy', year: '2022', category: 'business', verified: true },
  { id: 'c46', title: 'Strategic Thinking for Growth Executives', issuer: 'LinkedIn Learning', year: 'Jan 2025', category: 'business', verified: true },
  { id: 'c47', title: 'Super Connecting: Secret of Professional Networking', issuer: 'LinkedIn Learning', year: 'Jan 2025', category: 'business', verified: true },
  { id: 'c48', title: 'What They Don\'t Teach You at Harvard Business School', issuer: 'LinkedIn Learning', year: 'Jan 2025', category: 'business', verified: true },
  { id: 'c49', title: 'Project Management Fundamentals & Workflow Scaling', issuer: 'Udemy', year: '2023', category: 'business', verified: true },
  { id: 'c50', title: 'Customer Success & Reputation Management (Trustpilot)', issuer: 'Udemy', year: '2023', category: 'business', verified: true },
  { id: 'c51', title: 'Microsoft Office 2021 Pro Plus Certification', issuer: 'Microsoft', year: '2022', category: 'tech', verified: true },
];

export const LANGUAGES: LanguageSkill[] = [
  { name: 'Arabic', level: 'Native / Bilingual', percentage: 100, flag: '🇲🇦 / 🇰🇼', description: 'Native fluency. Fluent in GCC dialects and standard modern Arabic for regional ad copy.' },
  { name: 'English', level: 'Professional Working Proficiency', percentage: 95, flag: '🇬🇧 / 🇺🇸', description: 'Full professional command for international business, ad copy, documentation, and client relations.' },
  { name: 'French', level: 'Professional Working Proficiency', percentage: 90, flag: '🇫🇷', description: 'Fluent communication for North African and European markets.' },
];

export const EDUCATION_LIST = [
  {
    degree: "Diploma in Graphic Design",
    institution: "OFPPT (Office of Professional Training and Work Promotion)",
    period: "2021 – 2022 (2 Years)",
    details: "Comprehensive design training covering vector illustration, prepress, color theory, and typography."
  },
  {
    degree: "Bachelor's Degree - Life & Earth Sciences",
    institution: "University Studies",
    period: "2016 – 2017",
    details: "Scientific analytical methodology, data observation, and structured research principles."
  }
];
