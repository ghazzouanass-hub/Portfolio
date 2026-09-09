import React, { useState } from 'react';
import { SKILLS_DATA } from '../data/portfolioData';
import { SkillCategory } from '../types';
import { Search, Cpu, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const SkillsMatrix: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories: { id: SkillCategory; label: string }[] = [
    { id: 'all', label: t('skills.catAll') },
    { id: 'marketing', label: t('skills.catMarketing') },
    { id: 'design', label: t('skills.catDesign') },
    { id: 'tech', label: t('skills.catTech') },
    { id: 'business', label: t('skills.catBusiness') },
  ];

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-blue-600 dark:text-blue-400 text-[11px] font-mono uppercase tracking-[0.2em] mb-4 backdrop-blur-xl">
            <Cpu className="w-3.5 h-3.5" />
            <span>{t('skills.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            {t('skills.title')}
          </h2>
          <p className="mt-4 text-slate-600 dark:text-white/60 text-base">
            {t('skills.subtitle')}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`min-h-[44px] px-3.5 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs uppercase tracking-wider font-semibold transition-all backdrop-blur-md flex items-center justify-center ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-xl shadow-slate-900/10 dark:shadow-white/10'
                    : 'bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 dark:text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t('skills.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="min-h-[44px] w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/90 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/40 text-xs focus:outline-none focus:border-blue-500 transition-colors backdrop-blur-md"
            />
          </div>

        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="p-4 sm:p-6 rounded-2xl bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-xl hover:bg-white dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all group hover:-translate-y-1 shadow-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 min-w-0 flex-wrap">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display break-words">
                    {t(`skill.${skill.id}.name`, skill.name)}
                  </h3>
                  {skill.featured && (
                    <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 dark:border-blue-400/30 text-blue-600 dark:text-blue-300 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider shrink-0">
                      {t('skills.top', 'Top')}
                    </span>
                  )}
                </div>
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 shrink-0">
                  {skill.level}%
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-white/60 mb-4 line-clamp-2 leading-relaxed">
                {t(`skill.${skill.id}.desc`, skill.description)}
              </p>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden p-0.5 border border-black/5 dark:border-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-500 dark:to-indigo-400 transition-all duration-1000"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 text-slate-500 dark:text-white/40 text-sm">
            {t('skills.noMatches')}
          </div>
        )}

        {/* AI & Web Automation Special Callout Box */}
        <div className="mt-10 sm:mt-12 p-5 sm:p-8 rounded-3xl bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/15 backdrop-blur-xl text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 dark:border-blue-400/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <Zap className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                {t('skills.calloutTitle')}
              </h4>
              <p className="text-xs text-slate-600 dark:text-white/70 mt-1 max-w-xl leading-relaxed">
                {t('skills.calloutDesc')}
              </p>
            </div>
          </div>
          <div className="px-4 py-2 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 dark:border-blue-400/30 text-blue-600 dark:text-blue-300 font-mono text-xs font-semibold uppercase tracking-wider shrink-0">
            {t('skills.calloutBadge')}
          </div>
        </div>

      </div>
    </section>
  );
};
