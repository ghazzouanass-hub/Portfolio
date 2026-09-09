import React, { useState, useEffect } from 'react';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { ProjectCaseStudy } from '../types';
import { 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  ArrowUpRight, 
  X, 
  Building, 
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
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getPersistentItem } from '../lib/imageStorage';

export const PROJECT_PRESET_ICONS: Record<string, React.ElementType> = {
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

interface FeaturedProjectsProps {
  onSelectProject?: (projectId: string) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ onSelectProject }) => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Synchronously initialize from localStorage + memory cache to prevent any visual delay or flash
  const [customLogos, setCustomLogos] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (typeof window !== 'undefined') {
      for (const proj of FEATURED_PROJECTS) {
        const saved = localStorage.getItem(`custom_logo_${proj.id}`);
        if (saved) initial[proj.id] = saved;
      }
    }
    return initial;
  });

  const [companyLogosSync, setCompanyLogosSync] = useState<Record<string, { logoUrl?: string; iconName?: string }>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('custom_company_logos');
        return saved ? JSON.parse(saved) : {};
      } catch {
        return {};
      }
    }
    return {};
  });

  const loadAllLogos = async () => {
    const loaded: Record<string, string> = {};
    for (const proj of FEATURED_PROJECTS) {
      const saved = await getPersistentItem(`custom_logo_${proj.id}`);
      if (saved) {
        loaded[proj.id] = saved;
      }
    }
    setCustomLogos(prev => ({ ...prev, ...loaded }));

    // Sync from Trusted Brand & Enterprise Experience (custom_company_logos)
    const companyLogosRaw = await getPersistentItem('custom_company_logos');
    if (companyLogosRaw) {
      try {
        const parsed = JSON.parse(companyLogosRaw);
        setCompanyLogosSync(parsed);
      } catch (err) {
        console.error('Failed to parse custom_company_logos:', err);
      }
    }
  };

  useEffect(() => {
    loadAllLogos();

    const handleStorageUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ key?: string }>;
      const updatedKey = customEvent.detail?.key;
      if (!updatedKey || updatedKey.startsWith('custom_logo_') || updatedKey === 'custom_company_logos') {
        loadAllLogos();
      }
    };

    window.addEventListener('portfolio_storage_updated', handleStorageUpdate);
    return () => window.removeEventListener('portfolio_storage_updated', handleStorageUpdate);
  }, []);

  const filteredProjects = FEATURED_PROJECTS.filter((proj) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'saas') {
      return proj.category === 'saas' || (proj.category as string) === 'automation';
    }
    return proj.category === activeCategory;
  });

  return (
    <section id="projects" className="py-24 relative border-t border-b border-black/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-blue-600 dark:text-blue-400 text-[11px] font-mono uppercase tracking-[0.2em] mb-4 backdrop-blur-xl">
            <Layers className="w-3.5 h-3.5" />
            <span>{t('projects.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            {t('projects.title')}
          </h2>
          <p className="mt-4 text-slate-600 dark:text-white/60 text-base">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: 'all', label: t('projects.catAll') },
            { id: 'ecommerce', label: t('projects.catEcom') },
            { id: 'retail', label: t('projects.catRetail') },
            { id: 'marketing', label: t('projects.catMarketing') },
            { id: 'saas', label: t('projects.catSaas') },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all backdrop-blur-md ${
                activeCategory === cat.id
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-xl shadow-slate-900/10 dark:shadow-white/10'
                  : 'bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project) => {
            const customStoredLogo = customLogos[project.id];
            const syncedCompany = companyLogosSync[project.id];
            const syncedLogoUrl = syncedCompany?.logoUrl;
            const syncedIconName = syncedCompany?.iconName;
            const SyncedPresetIcon = syncedIconName ? PROJECT_PRESET_ICONS[syncedIconName] : null;

            const displayLogo = customStoredLogo || syncedLogoUrl || project.companyLogo;
            const hasCustomLogo = Boolean(customStoredLogo || syncedLogoUrl || syncedIconName);

            return (
              <div
                key={project.id}
                className="rounded-3xl bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-xl p-5 sm:p-7 lg:p-8 hover:border-black/20 dark:hover:border-white/20 hover:bg-white dark:hover:bg-white/10 transition-all duration-300 flex flex-col justify-between gap-5 sm:gap-6 group shadow-xl"
              >
                <div>
                  {/* Card Header: Company Icon + Badges + External Link */}
                  <div className="flex items-start justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                      <div className="relative group/logo shrink-0">
                        <div 
                          onClick={() => onSelectProject ? onSelectProject(project.id) : setSelectedProject(project)}
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-100 dark:bg-white/10 border border-black/10 dark:border-white/15 p-2 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform cursor-pointer overflow-hidden"
                        >
                          {displayLogo ? (
                            <img 
                              src={displayLogo} 
                              alt={project.clientOrBrand || project.title}
                              loading="lazy"
                              decoding="async"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-contain filter drop-shadow-sm" 
                            />
                          ) : SyncedPresetIcon ? (
                            <SyncedPresetIcon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-500" />
                          ) : (
                            <Building className="w-6 h-6 sm:w-7 sm:h-7 text-blue-500" />
                          )}
                        </div>
                      </div>

                      <div className="min-w-0">
                        <span className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold block break-words">
                          {project.clientOrBrand}
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1">
                          <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-300 border border-blue-500/20 text-[10px] sm:text-[11px] font-mono font-medium">
                            {t(`proj.${project.id}.role`, project.role)}
                          </span>
                          <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-slate-600 dark:text-white/70 border border-black/10 dark:border-white/10 text-[10px] sm:text-[11px] font-mono">
                            {t(`proj.${project.id}.period`, project.period)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 sm:p-2.5 rounded-2xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 border border-black/10 dark:border-white/10 text-slate-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors shrink-0"
                        title="Visit Live Platform"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div 
                    onClick={() => onSelectProject ? onSelectProject(project.id) : setSelectedProject(project)}
                    className="cursor-pointer group/title"
                  >
                    <h3 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white font-display group-hover/title:text-blue-600 dark:group-hover/title:text-blue-400 transition-colors leading-snug">
                      {t(`proj.${project.id}.title`, project.title)}
                    </h3>
                    <p className="text-slate-600 dark:text-white/70 text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed">
                      {t(`proj.${project.id}.summary`, project.summary)}
                    </p>
                  </div>
                </div>

                {/* Metrics Highlights Bar */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-slate-100 dark:bg-black/40 border border-black/10 dark:border-white/10">
                  {project.impactMetrics.slice(0, 2).map((metric, idx) => (
                    <div key={idx}>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-white/50 uppercase font-mono tracking-wider break-words">
                        {t(`proj.${project.id}.metricLabel${idx}`, metric.label)}
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display mt-0.5 break-words">
                        {t(`proj.${project.id}.metricVal${idx}`, metric.value)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techAndTools.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-700 dark:text-white/80 text-[10px] sm:text-[11px] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Open Full Case Study Button */}
                <button
                  onClick={() => onSelectProject ? onSelectProject(project.id) : setSelectedProject(project)}
                  className="min-h-[44px] w-full py-3 sm:py-3.5 rounded-xl bg-slate-900/10 hover:bg-slate-900 dark:bg-white/10 dark:hover:bg-white text-slate-900 hover:text-white dark:text-white dark:hover:text-slate-900 border border-black/15 dark:border-white/15 font-bold text-xs uppercase tracking-widest transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2 group/btn"
                >
                  <span>{t('projects.viewCase')}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Project Case Study Deep-Dive Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
            <div className="bg-white dark:bg-[#0b0f19] border border-black/10 dark:border-white/20 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-slate-800 dark:text-slate-100">
              
              {/* Close Modal Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 text-slate-700 dark:text-white/70 hover:text-black dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="pr-12">
                <div className="flex items-center gap-3 mb-3">
                  {(() => {
                    const customStoredLogo = customLogos[selectedProject.id];
                    const syncedCompany = companyLogosSync[selectedProject.id];
                    const syncedLogoUrl = syncedCompany?.logoUrl;
                    const syncedIconName = syncedCompany?.iconName;
                    const SyncedPresetIcon = syncedIconName ? PROJECT_PRESET_ICONS[syncedIconName] : null;
                    const displayLogo = customStoredLogo || syncedLogoUrl || selectedProject.companyLogo;

                    return (
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/10 border border-black/10 dark:border-white/15 p-1.5 flex items-center justify-center shadow-sm overflow-hidden shrink-0">
                        {displayLogo ? (
                          <img 
                            src={displayLogo} 
                            alt={selectedProject.clientOrBrand || selectedProject.title} 
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        ) : SyncedPresetIcon ? (
                          <SyncedPresetIcon className="w-5 h-5 text-blue-500" />
                        ) : (
                          <Building className="w-5 h-5 text-blue-500" />
                        )}
                      </div>
                    );
                  })()}
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/20 dark:border-blue-400/30 text-xs font-mono uppercase tracking-widest">
                    {t(`proj.${selectedProject.id}.role`, selectedProject.role)} • {t(`proj.${selectedProject.id}.period`, selectedProject.period)}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display mt-1">
                  {t(`proj.${selectedProject.id}.title`, selectedProject.title)}
                </h3>
                <p className="text-slate-500 dark:text-white/60 text-sm mt-1">{selectedProject.clientOrBrand}</p>
              </div>

              {/* Summary */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10">
                <p className="text-slate-800 dark:text-white/80 text-sm leading-relaxed">
                  {t(`proj.${selectedProject.id}.summary`, selectedProject.summary)}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="mt-6">
                <h4 className="text-xs font-mono uppercase text-blue-600 dark:text-blue-400 tracking-widest mb-3">
                  {t('projects.keyMetrics')}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {selectedProject.impactMetrics.map((m, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-center">
                      <p className="text-lg font-bold text-slate-900 dark:text-white font-display">
                        {t(`proj.${selectedProject.id}.metricVal${i}`, m.value)}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-white/50">
                        {t(`proj.${selectedProject.id}.metricLabel${i}`, m.label)}
                      </p>
                      {m.change && <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 font-mono">{m.change}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables List */}
              <div className="mt-6">
                <h4 className="text-xs font-mono uppercase text-blue-600 dark:text-blue-400 tracking-widest mb-3">
                  {t('projects.keyDeliverables')}
                </h4>
                <div className="space-y-2.5">
                  {selectedProject.keyDeliverables.map((deliv, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-slate-800 dark:text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span>{t(`proj.${selectedProject.id}.deliv${idx}`, deliv)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10 flex flex-wrap gap-2 items-center">
                <span className="text-xs font-mono text-slate-500 dark:text-white/50 mr-2">{t('projects.toolsUsed')}</span>
                {selectedProject.techAndTools.map((tool) => (
                  <span key={tool} className="px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/10 text-slate-800 dark:text-white/90 text-xs font-mono">
                    {tool}
                  </span>
                ))}
              </div>

              {/* Modal Actions */}
              <div className="mt-8 flex justify-end gap-3">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-slate-800 dark:hover:bg-white/90 transition-colors"
                  >
                    <span>{t('projects.visitSite')}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 text-slate-800 dark:text-white font-medium text-xs uppercase tracking-widest hover:bg-black/10 dark:hover:bg-white/20"
                >
                  {t('projects.close')}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

