import React, { useState, useEffect } from 'react';
import { 
  Building, 
  ShoppingBag, 
  ShoppingCart, 
  Share2, 
  TrendingUp, 
  Building2, 
  Shirt, 
  Sparkles, 
  Printer, 
  CheckCircle2, 
  Award, 
  Briefcase,
  Globe,
  Zap,
  Target,
  Layers,
  Rocket,
  Laptop,
  Crown,
  Star,
  Flame,
  Shield,
  Heart,
  Cpu,
  Database,
  Code
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getPersistentItem } from '../lib/imageStorage';

export interface ImpactedCompany {
  id: string;
  name: string;
  role: string;
  category: 'enterprise' | 'founder' | 'marketing' | 'print';
  categoryLabel: string;
  badge: string;
  icon: React.ElementType;
  logoUrl?: string;
  gradient: string;
  borderHover: string;
  badgeColor: string;
  highlights: string[];
}

export const PRESET_ICONS: Record<string, React.ElementType> = {
  TrendingUp,
  ShoppingBag,
  ShoppingCart,
  Share2,
  Building2,
  Shirt,
  Sparkles,
  Printer,
  Globe,
  Zap,
  Target,
  Layers,
  Briefcase,
  Award,
  Rocket,
  Laptop,
  Crown,
  Star,
  Flame,
  Shield,
  Heart,
  Cpu,
  Database,
  Code
};

export const COMPANY_LIST: ImpactedCompany[] = [
  {
    id: 'mak-united',
    name: 'MAK United',
    role: 'Social Media Manager & Marketing Specialist',
    category: 'marketing',
    categoryLabel: 'Digital Marketing',
    badge: 'Current Role (2026)',
    icon: TrendingUp,
    logoUrl: '/makunited_logo.svg',
    gradient: 'from-cyan-500/20 to-blue-500/20 text-cyan-600 dark:text-cyan-400',
    borderHover: 'hover:border-cyan-500/50 hover:shadow-cyan-500/10',
    badgeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border-cyan-500/20',
    highlights: ['Multi-Channel Campaign Strategy', 'Meta & Google Ads Optimization', 'Content Strategy & Lead Gen']
  },
  {
    id: 'lulu-hypermarket',
    name: 'Lulu Hypermarket',
    role: 'Digital Marketing & Web Scraping Lead',
    category: 'enterprise',
    categoryLabel: 'Enterprise Retail',
    badge: 'Regional Enterprise (Kuwait)',
    icon: ShoppingBag,
    logoUrl: '/lulu_logo.svg',
    gradient: 'from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400',
    borderHover: 'hover:border-emerald-500/50 hover:shadow-emerald-500/10',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/20',
    highlights: ['Automated Full Catalogue Scraping', 'Regional Retail Campaigns', 'Data-Driven Price Analysis']
  },
  {
    id: 'boostega',
    name: 'Boostega LLC',
    role: 'Founder & E-commerce CEO',
    category: 'founder',
    categoryLabel: 'E-Commerce Founder',
    badge: 'Boostega.com Platform',
    icon: ShoppingCart,
    logoUrl: '/boostega_logo.svg',
    gradient: 'from-rose-500/20 to-orange-500/20 text-rose-600 dark:text-rose-400',
    borderHover: 'hover:border-rose-500/50 hover:shadow-rose-500/10',
    badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-300 border-rose-500/20',
    highlights: ['100% Built In-House Platform', 'Automated Digital Fulfillment', 'Trustpilot Verified Brand']
  },
  {
    id: 'smmcent',
    name: 'Smmcent LTD',
    role: 'Founder & SaaS Operations Lead',
    category: 'founder',
    categoryLabel: 'SaaS & Automation',
    badge: 'Global SMM Platform',
    icon: Share2,
    logoUrl: '/smmcent_logo.svg',
    gradient: 'from-purple-500/20 to-indigo-500/20 text-purple-600 dark:text-purple-400',
    borderHover: 'hover:border-purple-500/50 hover:shadow-purple-500/10',
    badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-300 border-purple-500/20',
    highlights: ['API Integration & Order Dispatch', 'Global Client Base Scaling', 'Automated Payment Systems']
  },
  {
    id: 'national-arabic',
    name: 'National Arabic Company',
    role: 'Marketing Manager',
    category: 'marketing',
    categoryLabel: 'Corporate Brand',
    badge: 'Wood & Accessories Supplier',
    icon: Building2,
    logoUrl: '/national_arabic_logo.svg',
    gradient: 'from-amber-500/20 to-yellow-500/20 text-amber-600 dark:text-amber-400',
    borderHover: 'hover:border-amber-500/50 hover:shadow-amber-500/10',
    badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/20',
    highlights: ['Google Maps Reviews: 5 ➔ 200+ (3 Accounts)', 'Meta Ads & Social Media Management', 'Wood & Melamine B2B Strategy']
  },
  {
    id: 'fashion-portfolio',
    name: 'Rare Design • Fennec • Yomikwt • Mugmug',
    role: 'Fashion & E-Commerce Lead',
    category: 'marketing',
    categoryLabel: 'Fashion & Apparel',
    badge: 'Apparel & Lifestyle Portfolio',
    icon: Shirt,
    logoUrl: '/raredesign_logo.svg',
    gradient: 'from-pink-500/20 to-rose-500/20 text-pink-600 dark:text-pink-400',
    borderHover: 'hover:border-pink-500/50 hover:shadow-pink-500/10',
    badgeColor: 'bg-pink-500/10 text-pink-600 dark:text-pink-300 border-pink-500/20',
    highlights: [
      'Brand Identity & Graphic Packages in Adobe Illustrator',
      'Multi-Brand E-Commerce Scaling (4 Apparel Lines)',
      'Art Direction for Studio Lookbooks & High-ROAS Meta Ads'
    ]
  },
  {
    id: 'cosmetiklab',
    name: 'CosmetikLab',
    role: 'Project & Brand Manager',
    category: 'marketing',
    categoryLabel: 'Cosmetics & Products',
    badge: 'White-Label Cosmetic Lab',
    icon: Sparkles,
    logoUrl: '/cosmetiklab_logo.svg',
    gradient: 'from-fuchsia-500/20 to-purple-500/20 text-fuchsia-600 dark:text-fuchsia-400',
    borderHover: 'hover:border-fuchsia-500/50 hover:shadow-fuchsia-500/10',
    badgeColor: 'bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-300 border-fuchsia-500/20',
    highlights: [
      'White-Label Lab Product Line Planning & Formulations',
      'Luxury Packaging Art Direction & Vector Dielines',
      'Launch Funnels, Influencer Gifting & Meta Ad Scaling'
    ]
  },
  {
    id: 'support-print',
    name: 'Support Print & Roland Engraving',
    role: 'Prepress & Engraving Specialist',
    category: 'print',
    categoryLabel: 'Manufacturing & Print',
    badge: 'Roland Equipment',
    icon: Printer,
    logoUrl: '/supportprint_logo.svg',
    gradient: 'from-blue-500/20 to-slate-500/20 text-blue-600 dark:text-blue-400',
    borderHover: 'hover:border-blue-500/50 hover:shadow-blue-500/10',
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-300 border-blue-500/20',
    highlights: [
      'Roland Large-Format Vinyl Plotting & Cut Alignment',
      'Roland MPX-90 Photo Impact Metal Engraving Calibration',
      'Vector Prepress Color Profiling & Substrate Optimization'
    ]
  }
];

export const CompanyLogosShowcase: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'enterprise' | 'founder' | 'marketing' | 'print'>('all');

  // Custom logo/icon persistence
  const [customLogos, setCustomLogos] = useState<Record<string, { logoUrl?: string; iconName?: string }>>({});

  useEffect(() => {
    async function loadLogos() {
      const persisted = await getPersistentItem('custom_company_logos');
      if (persisted) {
        try {
          setCustomLogos(JSON.parse(persisted));
          return;
        } catch {}
      }
      try {
        const saved = localStorage.getItem('custom_company_logos');
        if (saved) setCustomLogos(JSON.parse(saved));
      } catch {}
    }
    loadLogos();

    // Re-load when media backup hydration completes
    const handleStorageUpdate = () => {
      loadLogos();
    };
    window.addEventListener('portfolio_storage_updated', handleStorageUpdate);
    return () => window.removeEventListener('portfolio_storage_updated', handleStorageUpdate);
  }, []);

  const filteredCompanies = activeTab === 'all' 
    ? COMPANY_LIST 
    : COMPANY_LIST.filter(c => c.category === activeTab);

  return (
    <section id="companies" className="py-16 border-y border-black/10 dark:border-white/10 bg-slate-50/80 dark:bg-black/40 backdrop-blur-md relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-mono uppercase tracking-widest font-semibold mb-3">
            <Building className="w-3.5 h-3.5" />
            <span>{t('companyShowcase.title')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-display tracking-tight">
            {t('companyShowcase.subtitle')}
          </h2>
          <p className="text-sm text-slate-600 dark:text-white/70 mt-3 font-sans leading-relaxed">
            {t('companyShowcase.desc')}
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10">
          {[
            { key: 'all', label: t('companyShowcase.tabAll') },
            { key: 'enterprise', label: t('companyShowcase.tabEnterprise') },
            { key: 'founder', label: t('companyShowcase.tabFounder') },
            { key: 'marketing', label: t('companyShowcase.tabMarketing') },
            { key: 'print', label: t('companyShowcase.tabPrint') }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`min-h-[44px] px-3.5 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs font-mono font-medium transition-all flex items-center justify-center ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105'
                  : 'bg-white dark:bg-white/5 text-slate-700 dark:text-white/70 border border-black/10 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Company Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredCompanies.map((comp) => {
            const customConfig = customLogos[comp.id];
            
            // Determine active display logo or icon
            let displayLogoUrl: string | undefined = undefined;
            let ActiveIcon: React.ElementType = comp.icon;

            if (customConfig?.logoUrl) {
              displayLogoUrl = customConfig.logoUrl;
            } else if (customConfig?.iconName && PRESET_ICONS[customConfig.iconName]) {
              ActiveIcon = PRESET_ICONS[customConfig.iconName];
            } else if (comp.logoUrl) {
              displayLogoUrl = comp.logoUrl;
            }

            return (
              <div
                key={comp.id}
                className={`p-6 rounded-2xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-xl shadow-md ${comp.borderHover} transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative`}
              >
                <div>
                  {/* Card Top Header */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="relative group/logo">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${comp.gradient} border border-current/20 flex items-center justify-center p-2 shadow-inner group-hover:scale-105 transition-transform duration-300`}>
                        {displayLogoUrl ? (
                          <img 
                            src={displayLogoUrl} 
                            alt={comp.name} 
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain filter drop-shadow-sm" 
                          />
                        ) : (
                          <ActiveIcon className="w-6 h-6" />
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold border ${comp.badgeColor}`}>
                        {t(`company.${comp.id}.catLabel`, comp.categoryLabel)}
                      </span>
                    </div>
                  </div>

                  {/* Company Name & Role */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                    {comp.name}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400/90 font-mono mt-1 mb-4">
                    {t(`company.${comp.id}.role`, comp.role)}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-1.5 mb-6">
                    {comp.highlights.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-white/70">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                        <span>{t(`company.${comp.id}.h${i}`, item)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Badge Tag */}
                <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-white/60 font-mono">
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>{t(`company.${comp.id}.badge`, comp.badge)}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Metric / Credibility Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 border border-blue-500/20 backdrop-blur-xl grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-display">{t('companyShowcase.stat1Title', '8+ Major Brands')}</span>
            <span className="text-xs text-slate-600 dark:text-white/70 font-mono mt-0.5">{t('companyShowcase.stat1Desc', 'Enterprises, Retailers & SaaS Ventures')}</span>
          </div>
          <div className="flex flex-col items-center justify-center border-y md:border-y-0 md:border-x border-black/10 dark:border-white/10 py-4 md:py-0">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-display">{t('companyShowcase.stat2Title', 'Kuwait & GCC Scope')}</span>
            <span className="text-xs text-slate-600 dark:text-white/70 font-mono mt-0.5">{t('companyShowcase.stat2Desc', 'Regional Campaigns & Automated Solutions')}</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-slate-900 dark:text-white font-display">{t('companyShowcase.stat3Title', 'End-to-End Skillset')}</span>
            <span className="text-xs text-slate-600 dark:text-white/70 font-mono mt-0.5">{t('companyShowcase.stat3Desc', 'Marketing, Web Scraping, E-com & Prepress')}</span>
          </div>
        </div>

      </div>
    </section>
  );
};

