import React, { useState, useEffect } from 'react';
import { WORK_EXPERIENCE } from '../data/portfolioData';
import { 
  Briefcase, 
  Calendar, 
  Building, 
  Building2,
  ChevronDown, 
  ChevronUp, 
  CheckCircle2,
  TrendingUp,
  ShoppingBag,
  ShoppingCart,
  Share2,
  Sparkles,
  Shirt,
  Printer,
  Globe,
  Zap,
  Target,
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
  Code,
  Layers,
  Store,
  Compass,
  FileCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getPersistentItem } from '../lib/imageStorage';
import { WorkExperience } from '../types';

export const EXPERIENCE_PRESET_ICONS: Record<string, React.ElementType> = {
  Briefcase,
  Building,
  Building2,
  Store,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Share2,
  Sparkles,
  Printer,
  Shirt,
  Globe,
  Zap,
  Target,
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
  Code,
  Layers,
  Compass,
  FileCheck
};

export const ExperienceTimeline: React.FC = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>('exp-1');

  // Custom Icon/Logo state
  const [customExpLogos, setCustomExpLogos] = useState<Record<string, { logoUrl?: string; iconName?: string }>>({});
  const [companyLogosSync, setCompanyLogosSync] = useState<Record<string, { logoUrl?: string; iconName?: string }>>({});

  const loadLogos = async () => {
    const expData = await getPersistentItem('custom_experience_logos');
    if (expData) {
      try {
        setCustomExpLogos(JSON.parse(expData));
      } catch (err) {
        console.error('Error parsing custom_experience_logos:', err);
      }
    }

    const companyData = await getPersistentItem('custom_company_logos');
    if (companyData) {
      try {
        setCompanyLogosSync(JSON.parse(companyData));
      } catch (err) {
        console.error('Error parsing custom_company_logos:', err);
      }
    }
  };

  useEffect(() => {
    loadLogos();

    const handleStorageUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ key?: string }>;
      const updatedKey = customEvent.detail?.key;
      if (!updatedKey || updatedKey === 'custom_experience_logos' || updatedKey === 'custom_company_logos') {
        loadLogos();
      }
    };

    window.addEventListener('portfolio_storage_updated', handleStorageUpdate);
    return () => window.removeEventListener('portfolio_storage_updated', handleStorageUpdate);
  }, []);

  const filteredExperience = WORK_EXPERIENCE.filter((exp) => {
    return filter === 'all' || exp.category === filter;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-blue-600 dark:text-blue-400 text-[11px] font-mono uppercase tracking-[0.2em] mb-4 backdrop-blur-xl">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{t('experience.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            {t('experience.title')}
          </h2>
          <p className="mt-4 text-slate-600 dark:text-white/60 text-base">
            {t('experience.subtitle')}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12">
          {[
            { id: 'all', label: t('experience.filterAll') },
            { id: 'enterprise', label: t('experience.filterEnterprise') },
            { id: 'founder', label: t('experience.filterFounder') },
            { id: 'freelance', label: t('experience.filterBrand') },
            { id: 'management', label: t('experience.filterMgmt') },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`min-h-[44px] px-3.5 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs uppercase tracking-wider font-semibold transition-all backdrop-blur-md flex items-center justify-center ${
                filter === tab.id
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-xl shadow-slate-900/10 dark:shadow-white/10'
                  : 'bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Chronological Timeline Container */}
        <div className="relative border-l-2 border-slate-300 dark:border-white/15 ml-3 sm:ml-8 pl-4 sm:pl-10 space-y-6 sm:space-y-8">
          {filteredExperience.map((exp) => {
            const isExpanded = expandedId === exp.id;
            
            // Resolve custom icon or logo
            const customExp = customExpLogos[exp.id];
            const syncedComp = companyLogosSync[exp.id];
            const customConfig = customExp || syncedComp;

            let displayLogoUrl: string | undefined = undefined;
            let ActivePresetIcon: React.ElementType | null = null;

            if (customConfig?.logoUrl) {
              displayLogoUrl = customConfig.logoUrl;
            } else if (customConfig?.iconName && EXPERIENCE_PRESET_ICONS[customConfig.iconName]) {
              ActivePresetIcon = EXPERIENCE_PRESET_ICONS[customConfig.iconName];
            } else if (exp.companyLogo) {
              displayLogoUrl = exp.companyLogo;
            }

            return (
              <div key={exp.id} className="relative group">
                
                {/* Timeline Dot Node */}
                <div className="absolute -left-[23px] sm:-left-[47px] top-6 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white dark:bg-black border-2 border-slate-800 dark:border-white group-hover:bg-blue-600 dark:group-hover:bg-blue-400 transition-colors flex items-center justify-center shadow-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-white" />
                </div>

                {/* Experience Card */}
                <div className="p-4 sm:p-6 md:p-8 rounded-3xl bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-xl hover:border-black/20 dark:hover:border-white/20 hover:bg-white dark:hover:bg-white/10 transition-all shadow-2xl">
                  
                  {/* Top Bar Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4">
                    <div className="flex items-start gap-3">
                      
                      {/* Logo / Icon */}
                      <div className="relative group/icon shrink-0">
                        <div 
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 shadow-md flex items-center justify-center p-2 overflow-hidden"
                        >
                          {displayLogoUrl ? (
                            <img 
                              src={displayLogoUrl} 
                              alt={exp.company}
                              loading="lazy"
                              decoding="async"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-contain filter drop-shadow-sm rounded-lg"
                            />
                          ) : ActivePresetIcon ? (
                            <ActivePresetIcon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 dark:text-blue-400" />
                          ) : (
                            <Building className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 dark:text-blue-400" />
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          <h3 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white font-display">
                            {t(`exp.${exp.id}.role`, exp.role)}
                          </h3>
                          <span className="px-2 sm:px-2.5 py-0.5 rounded-md bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/20 dark:border-blue-400/30 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider">
                            {t(`exp.${exp.id}.type`, exp.type)}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-white/80 font-medium flex items-center gap-1.5 mt-1">
                          <Building className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                          <span>{t(`exp.${exp.id}.company`, exp.company)}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-slate-600 dark:text-white/60 bg-slate-100 dark:bg-black/40 px-3 sm:px-3.5 py-1.5 rounded-xl border border-black/10 dark:border-white/10 self-start sm:self-auto">
                      <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span>{t(`exp.${exp.id}.period`, exp.period)}</span>
                    </div>
                  </div>

                  {/* Highlights Bullet Points */}
                  <div className="space-y-2 mt-4">
                    {exp.highlights.slice(0, isExpanded ? exp.highlights.length : 2).map((h, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-white/80">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{t(`exp.${exp.id}.h${idx}`, h)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Toggle View More if more than 2 highlights */}
                  {exp.highlights.length > 2 && (
                    <button
                      onClick={() => toggleExpand(exp.id)}
                      className="min-h-[44px] mt-2 text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 focus:outline-none"
                    >
                      <span>{isExpanded ? t('experience.showLess') : `+ ${exp.highlights.length - 2} ${t('experience.moreHighlights')}`}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  )}

                  {/* Skills Used Tags */}
                  <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-black/10 dark:border-white/10 flex flex-wrap gap-1.5 items-center">
                    <span className="text-[11px] sm:text-xs text-slate-500 dark:text-white/40 font-mono uppercase tracking-wider mr-1">{t('experience.skillsLabel')}:</span>
                    {exp.skillsUsed.map((skill) => (
                      <span key={skill} className="px-2 sm:px-2.5 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-slate-800 dark:text-white/80 text-[10px] sm:text-xs font-mono border border-black/10 dark:border-white/10">
                        {skill}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

