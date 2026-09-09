import React, { useState, useEffect } from 'react';
import { Target, ShoppingBag, Code, Palette, CheckCircle2, Award, Zap, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { getPersistentItem } from '../lib/imageStorage';

export const AboutSummary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'marketing' | 'ecommerce' | 'tech' | 'design'>('marketing');
  const [avatar, setAvatar] = useState<string>(PERSONAL_INFO.avatarUrl);
  const { t } = useLanguage();

  useEffect(() => {
    const loadAvatar = async () => {
      const persisted = await getPersistentItem('custom_anass_avatar');
      if (persisted) {
        setAvatar(persisted);
      } else {
        const local = localStorage.getItem('custom_anass_avatar');
        if (local) setAvatar(local);
      }
    };

    loadAvatar();

    const handleAvatarUpdate = () => {
      loadAvatar();
    };

    window.addEventListener('avatarUpdated', handleAvatarUpdate);
    return () => window.removeEventListener('avatarUpdated', handleAvatarUpdate);
  }, []);

  const pillars = [
    {
      id: 'marketing',
      title: t('about.pillar.marketing.title', 'Digital Marketing & Paid Media'),
      icon: Target,
      badge: t('about.pillar.marketing.badge', '7+ Yrs Exp'),
      description: t('about.pillar.marketing.desc', 'End-to-end performance marketing across Google Ads, Meta Ads (Facebook/Instagram), TikTok Ads, and Search Engine Optimization.'),
      keyPoints: [
        t('about.pillar.marketing.p0', 'Multi-channel campaign strategy and ROI optimization for retail & consumer brands.'),
        t('about.pillar.marketing.p1', 'Technical SEO audits, keyword strategy, and organic rank acceleration.'),
        t('about.pillar.marketing.p2', 'Conversion Rate Optimization (CRO), A/B creative testing, and funnel building.'),
        t('about.pillar.marketing.p3', 'Audience segmentation, retargeting models, and weekly executive analytics.')
      ]
    },
    {
      id: 'ecommerce',
      title: t('about.pillar.ecommerce.title', 'E-commerce Entrepreneurship'),
      icon: ShoppingBag,
      badge: t('about.pillar.ecommerce.badge', '2 Platforms'),
      description: t('about.pillar.ecommerce.desc', 'Founded and operated two online businesses from scratch (Boostega LLC and Smmcent LTD), taking full ownership from ideation to revenue.'),
      keyPoints: [
        t('about.pillar.ecommerce.p0', 'Domain setup, hosting architecture, Shopify & WordPress customization.'),
        t('about.pillar.ecommerce.p1', 'SEO-optimized product listings, pricing structures, and inventory management.'),
        t('about.pillar.ecommerce.p2', 'Payment gateway integration, fraud protection, and Cloudflare security.'),
        t('about.pillar.ecommerce.p3', 'Direct customer support, reputation management, and high Trustpilot ratings.')
      ]
    },
    {
      id: 'tech',
      title: t('about.pillar.tech.title', 'AI Automation & Python Scripting'),
      icon: Code,
      badge: t('about.pillar.tech.badge', 'AI Masterclass Lead'),
      description: t('about.pillar.tech.desc', 'AI Prompt Masterclass & AI Masterclass execution: engineering custom LLM workflows, Python scripts, and web scrapers to automate growth.'),
      keyPoints: [
        t('about.pillar.tech.p0', 'AI Prompt Masterclass & AI Masterclass strategies for advanced LLM prompt engineering, agent pipelines, and system instructions.'),
        t('about.pillar.tech.p1', 'Built full Lulu Hypermarket product catalogue scraper for competitor pricing tracking.'),
        t('about.pillar.tech.p2', 'Automated order processing scripts connecting payment webhooks to delivery systems.'),
        t('about.pillar.tech.p3', 'Browser automation for data extraction and multi-account social workflow automation.')
      ]
    },
    {
      id: 'design',
      title: t('about.pillar.design.title', 'Brand Strategy, Visuals & AI Design'),
      icon: Palette,
      badge: t('about.pillar.design.badge', 'Adobe & AI Design'),
      description: t('about.pillar.design.desc', 'Combining Adobe Illustrator vector branding with AI Design pipelines, visual brand synthesis, and directing e-commerce photography.'),
      keyPoints: [
        t('about.pillar.design.p0', 'AI Design & generative visual creation for social media ad creatives, brand synthesis, and digital graphics.'),
        t('about.pillar.design.p1', 'Complete brand identity packages in Adobe Illustrator: logos, color systems, fonts.'),
        t('about.pillar.design.p2', 'Print specialist experience with Roland large-format & MPX-90 impact engravers.'),
        t('about.pillar.design.p3', 'E-commerce photography direction and visual social media calendar creation.')
      ]
    }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden border-t border-b border-black/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-blue-600 dark:text-blue-400 text-[11px] font-mono uppercase tracking-[0.2em] mb-4 backdrop-blur-xl">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('about.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            {t('about.title')}
          </h2>
          <p className="mt-4 text-slate-600 dark:text-white/60 text-base leading-relaxed">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Interactive Pillar Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8 sm:mb-10">
          {pillars.map((pillar) => {
            const IconComponent = pillar.icon;
            const isActive = activeTab === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setActiveTab(pillar.id as any)}
                className={`min-h-[44px] p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 backdrop-blur-xl flex flex-col justify-between gap-3 min-w-0 overflow-hidden ${
                  isActive
                    ? 'bg-slate-900 dark:bg-white/15 border-slate-900 dark:border-white/30 shadow-2xl shadow-blue-500/10 text-white'
                    : 'bg-white/80 dark:bg-white/5 border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 text-slate-700 dark:text-white/60 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2 gap-2 w-full min-w-0">
                  <div className={`p-2 sm:p-2.5 rounded-xl shrink-0 ${
                    isActive 
                      ? 'bg-white text-black dark:bg-white dark:text-black' 
                      : 'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white'
                  }`}>
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className={`text-[9px] sm:text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full whitespace-nowrap shrink-0 ${
                    isActive 
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30' 
                      : 'bg-slate-200/60 dark:bg-white/5 text-slate-600 dark:text-white/50'
                  }`}>
                    {pillar.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold font-display leading-snug break-words">{pillar.title}</p>
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Detailed Card */}
        {pillars.map((pillar) => {
          if (pillar.id !== activeTab) return null;
          const IconComponent = pillar.icon;
          return (
            <div 
              key={pillar.id}
              className="p-5 sm:p-8 md:p-10 rounded-3xl bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/15 backdrop-blur-xl shadow-2xl animate-fadeIn"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                <div className="lg:col-span-5 flex flex-col gap-3 sm:gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-black flex items-center justify-center font-bold shadow-xl">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-600 dark:text-white/70 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                  <div className="pt-2">
                    <span className="inline-block text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-xl border border-blue-500/20 dark:border-blue-400/20">
                      {t('about.masteryPillar')}: {pillar.badge}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-slate-100/90 dark:bg-black/40 p-4 sm:p-6 md:p-8 rounded-2xl border border-black/10 dark:border-white/10">
                  <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500 dark:text-white/50 mb-3 sm:mb-4">
                    {t('about.keyHighlights')}
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5 sm:gap-3">
                    {pillar.keyPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-800 dark:text-white/80">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Professional Summary Quote Box with Portrait */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-xl flex flex-col md:flex-row items-center gap-6 shadow-2xl">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border border-black/10 dark:border-white/20 shadow-lg relative group">
            <img
              src={avatar}
              alt={PERSONAL_INFO.name}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top filter brightness-[1.02] transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-blue-600 dark:text-blue-400 text-xs font-mono uppercase tracking-wider mb-1">
              <Award className="w-4 h-4" />
              <span>{t('quote.title')}</span>
            </div>
            <p className="text-sm sm:text-base text-slate-800 dark:text-white/90 font-medium italic leading-relaxed">
              {t('quote.text')}
            </p>
            <p className="text-xs text-slate-500 dark:text-white/60 font-mono tracking-wider mt-2 uppercase">{t('quote.author')}</p>
          </div>
        </div>

      </div>
    </section>
  );
};
