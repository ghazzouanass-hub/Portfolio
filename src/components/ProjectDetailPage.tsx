import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  User, 
  Building2, 
  Layers, 
  Clock,
  TrendingUp, 
  MessageSquare, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X,
  Share2,
  Check,
  Zap,
  BarChart3,
  Target,
  Award,
  Activity,
  ShieldCheck,
  Cpu,
  ArrowUpRight,
  ShoppingBag,
  ShoppingCart,
  Shirt,
  Printer,
  Globe,
  Rocket,
  Laptop,
  Crown,
  Star,
  Flame,
  Shield,
  Heart,
  Database,
  Code
} from 'lucide-react';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { ProjectCaseStudy } from '../types';
import { getPersistentItem } from '../lib/imageStorage';
import { useLanguage } from '../context/LanguageContext';

const PRESET_ICONS_MAP: Record<string, React.ElementType> = {
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

interface ProjectDetailPageProps {
  projectId: string;
  onBack: () => void;
  onSelectProject: (projectId: string) => void;
  onOpenContactModal?: () => void;
}

interface CustomGalleryItem {
  url: string;
  caption: string;
  description?: string;
  isCustom?: boolean;
}

const getMetricIcon = (label: string, index: number) => {
  const l = label.toLowerCase();
  if (l.includes('role') || l.includes('strategy') || l.includes('growth') || l.includes('sale') || l.includes('roi')) {
    return TrendingUp;
  }
  if (l.includes('ad') || l.includes('tech') || l.includes('automation') || l.includes('speed') || l.includes('script')) {
    return Zap;
  }
  if (l.includes('customer') || l.includes('support') || l.includes('rating') || l.includes('quality') || l.includes('trust')) {
    return Award;
  }
  if (l.includes('platform') || l.includes('channel') || l.includes('acquisition') || l.includes('store')) {
    return BarChart3;
  }
  if (l.includes('security') || l.includes('flow') || l.includes('metric')) {
    return ShieldCheck;
  }
  const defaultIcons = [Activity, Target, Cpu, Zap, BarChart3, TrendingUp];
  return defaultIcons[index % defaultIcons.length];
};

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  projectId,
  onBack,
  onSelectProject,
  onOpenContactModal
}) => {
  const { t } = useLanguage();
  const project: ProjectCaseStudy | undefined = FEATURED_PROJECTS.find(p => p.id === projectId);
  
  const readingTime = useMemo(() => {
    if (!project) return '3 min read';
    const textBlocks = [
      project.title,
      project.subtitle,
      project.summary,
      project.fullDescription || '',
      project.challenge || '',
      ...(project.keyDeliverables || []),
      ...(project.impactMetrics || []).map(m => `${m.label} ${m.value}`),
      ...(project.techAndTools || []),
    ];
    const totalWords = textBlocks.join(' ').trim().split(/\s+/).length;
    const mins = Math.max(3, Math.ceil(totalWords / 180));
    return `${mins} min read`;
  }, [project]);

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const [customBanner, setCustomBanner] = useState<string | null>(() => {
    return localStorage.getItem(`custom_banner_${projectId}`);
  });

  const [customLogo, setCustomLogo] = useState<string | null>(() => {
    return localStorage.getItem(`custom_logo_${projectId}`);
  });

  const [companyLogosSync, setCompanyLogosSync] = useState<Record<string, { logoUrl?: string; iconName?: string }>>(() => {
    try {
      const saved = localStorage.getItem('custom_company_logos');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [customGallery, setCustomGallery] = useState<CustomGalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(`custom_gallery_${projectId}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [galleryOverrides, setGalleryOverrides] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem(`gallery_overrides_${projectId}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    let isMounted = true;
    async function loadFromIDB() {
      const banner = await getPersistentItem(`custom_banner_${projectId}`);
      if (banner && isMounted) setCustomBanner(banner);

      const logo = await getPersistentItem(`custom_logo_${projectId}`);
      if (logo && isMounted) setCustomLogo(logo);

      const companyLogos = await getPersistentItem('custom_company_logos');
      if (companyLogos && isMounted) {
        try { setCompanyLogosSync(JSON.parse(companyLogos)); } catch {}
      }

      const gallery = await getPersistentItem(`custom_gallery_${projectId}`);
      if (gallery && isMounted) {
        try { setCustomGallery(JSON.parse(gallery)); } catch {}
      }

      const overrides = await getPersistentItem(`gallery_overrides_${projectId}`);
      if (overrides && isMounted) {
        try { setGalleryOverrides(JSON.parse(overrides)); } catch {}
      }
    }
    loadFromIDB();
    return () => { isMounted = false; };
  }, [projectId]);

  useEffect(() => {
    const handleStorageUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ key?: string }>;
      const updatedKey = customEvent.detail?.key;
      if (!updatedKey || updatedKey === 'custom_company_logos' || updatedKey === `custom_logo_${projectId}` || updatedKey === `custom_banner_${projectId}`) {
        getPersistentItem('custom_company_logos').then(res => {
          if (res) {
            try { setCompanyLogosSync(JSON.parse(res)); } catch {}
          }
        });
        getPersistentItem(`custom_logo_${projectId}`).then(res => {
          if (res) setCustomLogo(res);
        });
      }
    };

    window.addEventListener('portfolio_storage_updated', handleStorageUpdate);
    return () => window.removeEventListener('portfolio_storage_updated', handleStorageUpdate);
  }, [projectId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCustomBanner(localStorage.getItem(`custom_banner_${projectId}`));
    setCustomLogo(localStorage.getItem(`custom_logo_${projectId}`));
    try {
      const savedGallery = localStorage.getItem(`custom_gallery_${projectId}`);
      setCustomGallery(savedGallery ? JSON.parse(savedGallery) : []);
    } catch {
      setCustomGallery([]);
    }
    try {
      const savedOverrides = localStorage.getItem(`gallery_overrides_${projectId}`);
      setGalleryOverrides(savedOverrides ? JSON.parse(savedOverrides) : {});
    } catch {
      setGalleryOverrides({});
    }
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen pt-28 pb-16 px-4 max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-white">{t('detail.projectNotFound')}</h2>
        <p className="text-sm text-slate-500 mt-2">{t('detail.projectNotFoundDesc')}</p>
        <button
          onClick={onBack}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-600 text-white font-medium hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/25"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('detail.backToPortfolio')}</span>
        </button>
      </div>
    );
  }

  // Combined Gallery: Custom items first, then default project gallery (with overrides applied)
  const defaultGalleryList: CustomGalleryItem[] = (project.galleryImages || []).map((item, idx) => ({
    ...item,
    url: galleryOverrides[idx] || item.url,
    isCustom: Boolean(galleryOverrides[idx])
  }));

  const allGalleryImages: CustomGalleryItem[] = [
    ...customGallery.map(item => ({ ...item, isCustom: true })),
    ...defaultGalleryList
  ];

  const activeBanner = customBanner || project.featuredImage;
  const syncedCompany = companyLogosSync[projectId];
  const syncedLogoUrl = syncedCompany?.logoUrl;
  const syncedIconName = syncedCompany?.iconName;
  const SyncedPresetIcon = syncedIconName ? PRESET_ICONS_MAP[syncedIconName] : null;

  const activeLogo = customLogo || syncedLogoUrl || project.companyLogo;

  // Related projects navigation (excluding current)
  const currentIndex = FEATURED_PROJECTS.findIndex(p => p.id === projectId);
  const prevProject = FEATURED_PROJECTS[(currentIndex - 1 + FEATURED_PROJECTS.length) % FEATURED_PROJECTS.length];
  const nextProject = FEATURED_PROJECTS[(currentIndex + 1) % FEATURED_PROJECTS.length];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Next and prev lightbox navigation
  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + allGalleryImages.length) % allGalleryImages.length);
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % allGalleryImages.length);
    }
  };

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fadeIn text-slate-900 dark:text-white relative">
      
      {/* Ambient Radial Background Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-r from-blue-600/15 via-indigo-600/15 to-purple-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Top Glassmorphic Navigation & Control Bar */}
      <div className="sticky top-20 z-30 mb-8 p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider transition-all border border-black/5 dark:border-white/5 shrink-0"
        >
          <ArrowLeft className="w-4 h-4 text-blue-500" />
          <span>{t('detail.backToPortfolio')}</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 text-xs font-medium border border-black/5 dark:border-white/5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5 text-blue-500" />}
            <span>{copied ? t('detail.linkCopied') : t('detail.share')}</span>
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold transition-all shadow-md"
            >
              <span>{t('detail.visitLive')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="relative rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-slate-900 shadow-2xl mb-12 group/banner">
        
        {/* Banner Cover Image Container */}
        <div 
          className="relative h-80 sm:h-[420px] w-full overflow-hidden bg-slate-950 flex items-center justify-center group/bannercard"
        >
          <img 
            src={activeBanner} 
            alt={project.title} 
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className={`w-full h-full ${activeBanner.endsWith('.svg') ? 'object-contain p-4 sm:p-8 bg-slate-900' : 'object-cover'} transform group-hover/banner:scale-105 transition-transform duration-700`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/20 pointer-events-none" />
          
          {/* Top Badges */}
          <div className="absolute top-6 left-6 flex flex-wrap items-center gap-2 z-10">
            <span className="px-3.5 py-1.5 rounded-full bg-blue-600/90 backdrop-blur-md text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg">
              {t(`proj.${project.id}.cat`, project.category)}
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-medium">
              {t(`proj.${project.id}.period`, project.period)}
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>{readingTime}</span>
            </span>
          </div>

          {/* Header Overlay Content */}
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 text-white space-y-3 z-10 max-w-4xl">
            <div className="flex items-center gap-3">
              {/* Company Logo */}
              <div 
                className="relative w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md p-1.5 flex items-center justify-center border border-white/20 shadow-lg overflow-hidden shrink-0"
              >
                {activeLogo ? (
                  <img 
                    src={activeLogo} 
                    alt={project.clientOrBrand} 
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                ) : SyncedPresetIcon ? (
                  <SyncedPresetIcon className="w-5 h-5 text-blue-400" />
                ) : (
                  <Building2 className="w-5 h-5 text-blue-400" />
                )}
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold block">
                  {t(`proj.${project.id}.client`, project.clientOrBrand)}
                </span>
                <span className="text-[11px] text-slate-300 font-mono">
                  {t(`proj.${project.id}.role`, project.role)}
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-tight tracking-tight text-white drop-shadow-md">
              {t(`proj.${project.id}.title`, project.title)}
            </h1>
            <p className="text-sm sm:text-base text-slate-200/90 leading-relaxed font-normal">
              {t(`proj.${project.id}.subtitle`, project.subtitle)}
            </p>
          </div>
        </div>

        {/* Executive Meta Bar */}
        <div className="p-4 sm:p-6 md:p-8 bg-slate-50 dark:bg-slate-900/80 border-t border-black/10 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 text-xs">
          <div className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5">
            <span className="text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5 mb-1.5 font-semibold">
              <User className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              {t('detail.role')}
            </span>
            <span className="font-bold text-slate-900 dark:text-slate-100 text-sm block break-words">{t(`proj.${project.id}.role`, project.role)}</span>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5">
            <span className="text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5 mb-1.5 font-semibold">
              <Building2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              {t('detail.clientBrand')}
            </span>
            <span className="font-bold text-slate-900 dark:text-slate-100 text-sm block break-words">{t(`proj.${project.id}.client`, project.clientOrBrand)}</span>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5">
            <span className="text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5 mb-1.5 font-semibold">
              <Calendar className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              {t('detail.timeline')}
            </span>
            <span className="font-bold text-slate-900 dark:text-slate-100 text-sm block break-words">{t(`proj.${project.id}.period`, project.period)}</span>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5">
            <span className="text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5 mb-1.5 font-semibold">
              <Layers className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              {t('detail.category')}
            </span>
            <span className="font-bold text-slate-900 dark:text-slate-100 text-sm block uppercase break-words">{t(`proj.${project.id}.cat`, project.category)}</span>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 sm:col-span-2 lg:col-span-1">
            <span className="text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5 mb-1.5 font-semibold">
              <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              {t('detail.readTime')}
            </span>
            <span className="font-bold text-slate-900 dark:text-slate-100 text-sm block break-words">{readingTime}</span>
          </div>
        </div>
      </div>

      {/* Impact Metrics Row */}
      {project.impactMetrics && project.impactMetrics.length > 0 && (
        <div className="mb-12 sm:mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 pb-2 border-b border-black/5 dark:border-white/5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 shadow-sm flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base sm:text-lg font-extrabold font-display text-slate-900 dark:text-white">
                    {t('detail.measurableImpact')}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-[10px] sm:text-[11px] font-mono font-bold">
                    {project.impactMetrics.length} {t('detail.verifiedKpis')}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                  {t('detail.measurableImpactDesc')}
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{t('detail.realtimeMatrix')}</span>
            </div>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 ${
            project.impactMetrics.length >= 4 
              ? 'lg:grid-cols-4' 
              : project.impactMetrics.length === 3 
              ? 'lg:grid-cols-3' 
              : ''
          } gap-4 sm:gap-6`}>
            {project.impactMetrics.map((metric, idx) => {
              const MetricIcon = getMetricIcon(metric.label, idx);
              return (
                <div 
                  key={idx}
                  className="relative overflow-hidden p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-black/10 dark:border-white/10 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between group"
                >
                  {/* Top Animated Accent Beam */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 opacity-80 group-hover:opacity-100 group-hover:h-1.5 transition-all duration-300" />
                  
                  {/* Background Soft Radial Glow */}
                  <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

                  {/* Top Header: Label & Icon */}
                  <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-semibold uppercase tracking-wider block">
                      {t(`proj.${project.id}.metric.${idx}.label`, metric.label)}
                    </span>
                    <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-white/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 group-hover:scale-110 shrink-0 shadow-sm">
                      <MetricIcon className="w-4 h-4" />
                    </div>
                  </div>
                  
                  {/* Metric Value & Change Pill */}
                  <div className="my-2 flex flex-col gap-2">
                    <span className="text-2xl sm:text-3xl font-black font-display tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {t(`proj.${project.id}.metric.${idx}.val`, metric.value)}
                    </span>
                    
                    {metric.change && (
                      <div className="flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-2xs">
                          <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                          <span>{t(`proj.${project.id}.metric.${idx}.change`, metric.change)}</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Footer Line */}
                  <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500">
                    <span className="font-semibold uppercase tracking-widest">{t('detail.metricNumber')} #{idx + 1}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity font-bold text-blue-500">{t('detail.verifiedOutcome')} →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
        
        {/* Left 2 Columns: Overview, Problem & Deliverables */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          
          {/* Executive Overview */}
          <div className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-3 sm:space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-500 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white">
                {t('detail.execSummary')}
              </h3>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base font-normal pt-1 sm:pt-2">
              {t(`proj.${project.id}.fullDesc`, project.fullDescription || project.summary)}
            </p>
          </div>

          {/* Strategic Challenge */}
          {project.challenge && (
            <div className="p-5 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 border border-blue-500/20 space-y-3">
              <h3 className="text-base sm:text-lg font-bold font-display text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <span>{t('detail.theChallenge')}</span>
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                {t(`proj.${project.id}.challenge`, project.challenge)}
              </p>
            </div>
          )}

          {/* Key Deliverables List */}
          <div className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-4 sm:space-y-6 shadow-sm">
            <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-white">
              {t('detail.keyDeliverables')}
            </h3>
            <div className="space-y-2.5 sm:space-y-3">
              {project.keyDeliverables.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-blue-500/30 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                    {t(`proj.${project.id}.deliv.${idx}`, item)}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sidebar: Tech Stack & Lead Contact */}
        <div className="space-y-6 sm:space-y-8">
          
          {/* Tech Stack & Tools Card */}
          <div className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-4 shadow-sm">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
              {t('detail.techStack')}
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techAndTools.map((tool, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-slate-100 dark:bg-white/10 border border-black/5 dark:border-white/10 text-xs font-mono font-semibold text-slate-800 dark:text-slate-200"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Contact / Collaboration Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white space-y-4 sm:space-y-5 shadow-2xl relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-extrabold font-display">{t('detail.needSimilar')}</h4>
              <p className="text-xs text-blue-100 mt-2 leading-relaxed font-normal">
                {t('detail.needSimilarDesc')}
              </p>
            </div>
            {onOpenContactModal && (
              <button
                onClick={onOpenContactModal}
                className="min-h-[44px] w-full py-3 rounded-2xl bg-white text-blue-700 font-bold text-xs uppercase tracking-wider hover:bg-blue-50 transition-all shadow-lg text-center flex items-center justify-center"
              >
                {t('detail.discussRequirements')}
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Project Assets & Gallery Section */}
      <div className="mb-16 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-4">
          <div>
            <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
              {t('detail.galleryTitle')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
              {t('detail.gallerySubtitle')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Render Gallery Images */}
          {allGalleryImages.map((img, idx) => (
            <div 
              key={idx}
              onClick={() => setSelectedImageIndex(idx)}
              className="group relative rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 cursor-pointer shadow-md hover:shadow-2xl transition-all"
            >
              <div className="h-60 w-full overflow-hidden bg-slate-900/5 dark:bg-black/40 flex items-center justify-center relative">
                <img 
                  src={img.url} 
                  alt={img.caption} 
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className={`w-full h-full ${img.url.endsWith('.svg') ? 'object-contain p-6 group-hover:scale-110' : 'object-cover group-hover:scale-105'} transition-transform duration-500`}
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-white pointer-events-none">
                <p className="text-xs font-bold text-white mb-1">{img.caption}</p>
                {img.description && <p className="text-[10px] text-slate-300 line-clamp-2">{img.description}</p>}
                <div className="mt-3 self-end p-2 rounded-xl bg-white/20 backdrop-blur-md">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Lightbox Modal with Prev/Next Controls */}
      {selectedImageIndex !== null && allGalleryImages[selectedImageIndex] && (
        <div 
          onClick={() => setSelectedImageIndex(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            title="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Button */}
          {allGalleryImages.length > 1 && (
            <button
              onClick={handlePrevImage}
              className="absolute left-4 sm:left-8 p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 z-50"
              title="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Next Button */}
          {allGalleryImages.length > 1 && (
            <button
              onClick={handleNextImage}
              className="absolute right-4 sm:right-8 p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 z-50"
              title="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Image Container */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="max-w-5xl max-h-[85vh] flex flex-col items-center"
          >
            <img 
              src={allGalleryImages[selectedImageIndex].url} 
              alt={allGalleryImages[selectedImageIndex].caption} 
              referrerPolicy="no-referrer"
              className="max-h-[72vh] object-contain rounded-3xl border border-white/15 shadow-2xl"
            />
            <div className="mt-4 text-center text-white space-y-1">
              <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest block">
                Image {selectedImageIndex + 1} of {allGalleryImages.length}
              </span>
              {allGalleryImages[selectedImageIndex].description && (
                <p className="text-xs text-slate-300 max-w-xl mx-auto">
                  {allGalleryImages[selectedImageIndex].description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Prev / Next Project Navigation Footer */}
      <div className="pt-10 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => onSelectProject(prevProject.id)}
          className="w-full sm:w-auto flex items-center gap-4 p-4 sm:p-5 rounded-3xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-blue-500/40 transition-all text-left group shadow-sm hover:shadow-md"
        >
          <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-500 group-hover:-translate-x-1 transition-transform">
            <ChevronLeft className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">{t('detail.prevProject')}</span>
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{t(`proj.${prevProject.id}.title`, prevProject.title)}</span>
          </div>
        </button>

        <button
          onClick={() => onSelectProject(nextProject.id)}
          className="w-full sm:w-auto flex items-center justify-end gap-4 p-4 sm:p-5 rounded-3xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-blue-500/40 transition-all text-right group shadow-sm hover:shadow-md"
        >
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold">{t('detail.nextProject')}</span>
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{t(`proj.${nextProject.id}.title`, nextProject.title)}</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-500 group-hover:translate-x-1 transition-transform">
            <ChevronRight className="w-5 h-5" />
          </div>
        </button>
      </div>

    </div>
  );
};
