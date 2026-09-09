import React, { useState } from 'react';
import { CERTIFICATIONS, EDUCATION_LIST } from '../data/portfolioData';
import { Award, GraduationCap, Search, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CertificationsGrid: React.FC = () => {
  const { t } = useLanguage();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const filteredCerts = CERTIFICATIONS.filter((c) => {
    const matchesCat = filterCategory === 'all' || c.category === filterCategory;
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
                          c.issuer.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="certifications" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-blue-600 dark:text-blue-400 text-[11px] font-mono uppercase tracking-[0.2em] mb-4 backdrop-blur-xl">
            <Award className="w-3.5 h-3.5" />
            <span>{t('certifications.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            {t('certifications.title')}
          </h2>
          <p className="mt-4 text-slate-600 dark:text-white/60 text-base">
            {t('certifications.subtitle')}
          </p>
        </div>

        {/* Education Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {EDUCATION_LIST.map((edu, idx) => (
            <div key={idx} className="p-5 sm:p-8 rounded-3xl bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/15 backdrop-blur-xl flex items-start gap-3 sm:gap-4 shadow-xl">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/20 dark:border-blue-400/30 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="text-[11px] sm:text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-widest">{edu.period}</span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display mt-0.5">
                  {t(`edu.${idx}.degree`, edu.degree)}
                </h3>
                <p className="text-xs text-slate-600 dark:text-white/60 font-medium">
                  {t(`edu.${idx}.inst`, edu.institution)}
                </p>
                <p className="text-xs text-slate-800 dark:text-white/80 mt-2 leading-relaxed">
                  {t(`edu.${idx}.details`, edu.details)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Filter and Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          <div className="flex flex-wrap gap-1.5 sm:gap-2 w-full md:w-auto">
            {[
              { id: 'all', label: t('certifications.catAll') },
              { id: 'marketing', label: t('certifications.catMarketing') },
              { id: 'ai', label: t('certifications.catAi') },
              { id: 'tech', label: t('certifications.catTech') },
              { id: 'business', label: t('certifications.catBusiness') },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterCategory(tab.id)}
                className={`min-h-[44px] px-3 sm:px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all backdrop-blur-md flex items-center justify-center ${
                  filterCategory === tab.id
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-md shadow-slate-900/10 dark:shadow-white/10'
                    : 'bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 dark:text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t('certifications.searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="min-h-[44px] w-full pl-9 pr-3 py-2 rounded-xl bg-white/90 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/40 text-xs focus:outline-none focus:border-blue-500 backdrop-blur-md"
            />
          </div>

        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="p-5 rounded-2xl bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-xl hover:bg-white dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all flex flex-col justify-between gap-3 group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono text-blue-600 dark:text-blue-300 px-2.5 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 dark:border-blue-400/30 uppercase tracking-widest">
                    {cert.year}
                  </span>
                  {cert.verified && (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-mono uppercase tracking-wider">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{t('hero.verified', 'Verified')}</span>
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                  {t(`cert.${cert.id}.title`, cert.title)}
                </h4>
                <p className="text-xs text-slate-600 dark:text-white/60 mt-1">{cert.issuer}</p>
              </div>

              <div className="pt-2 border-t border-black/10 dark:border-white/10 text-[10px] text-slate-500 dark:text-white/40 font-mono uppercase tracking-widest">
                {t('certifications.catLabel', 'Category')}: {cert.category}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
