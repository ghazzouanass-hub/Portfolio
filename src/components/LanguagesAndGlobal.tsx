import React from 'react';
import { LANGUAGES } from '../data/portfolioData';
import { Globe2, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LanguagesAndGlobal: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="languages" className="py-20 relative border-t border-b border-black/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Languages Cards Column */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-blue-600 dark:text-blue-400 text-[11px] font-mono uppercase tracking-[0.2em] mb-3 backdrop-blur-xl">
                <Globe2 className="w-3.5 h-3.5" />
                <span>{t('languages.badge')}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
                {t('languages.title')}
              </h2>
              <p className="mt-2 text-slate-600 dark:text-white/60 text-sm">
                {t('languages.subtitle')}
              </p>
            </div>

            <div className="space-y-4">
              {LANGUAGES.map((lang) => {
                const langKey = lang.name.toLowerCase().includes('arabic') ? 'arabic'
                  : lang.name.toLowerCase().includes('english') ? 'english'
                  : lang.name.toLowerCase().includes('french') ? 'french'
                  : 'darija';
                return (
                  <div key={lang.name} className="p-5 rounded-2xl bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-xl hover:bg-white dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{lang.flag}</span>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                          {t(`lang.${langKey}.name`, lang.name)}
                        </h3>
                      </div>
                      <span className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-300 bg-blue-500/10 dark:bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/20 dark:border-blue-400/30">
                        {t(`lang.${langKey}.level`, lang.level)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-white/70 mt-2">
                      {t(`lang.${langKey}.desc`, lang.description)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Regional Experience Map Callout Column */}
          <div className="lg:col-span-6 bg-white/80 dark:bg-white/5 p-5 sm:p-8 rounded-3xl border border-black/10 dark:border-white/15 backdrop-blur-xl relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <span className="text-xs font-mono uppercase text-blue-600 dark:text-blue-400 tracking-widest">
              {t('languages.footprintBadge')}
            </span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display mt-2">
              {t('languages.footprintTitle')}
            </h3>

            <div className="mt-6 space-y-4 text-sm text-slate-700 dark:text-white/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white block font-display">{t('languages.regionGccTitle')}</strong>
                  <p className="text-xs text-slate-600 dark:text-white/60 mt-0.5">
                    {t('languages.regionGccDesc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white block font-display">{t('languages.regionAfricaTitle')}</strong>
                  <p className="text-xs text-slate-600 dark:text-white/60 mt-0.5">
                    {t('languages.regionAfricaDesc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 dark:text-white block font-display">{t('languages.regionGlobalTitle')}</strong>
                  <p className="text-xs text-slate-600 dark:text-white/60 mt-0.5">
                    {t('languages.regionGlobalDesc')}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-slate-100 dark:bg-black/40 border border-black/10 dark:border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{t('languages.availableTitle')}</p>
                <p className="text-[11px] text-slate-500 dark:text-white/50 font-mono mt-0.5">{t('languages.availableSubtitle')}</p>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

