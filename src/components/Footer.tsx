import React, { useState } from 'react';
import { ArrowUp, Download, Linkedin, Mail, Phone, Quote, Loader2, Check } from 'lucide-react';
import { CONTACT_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { exportCustomizedPortfolioZip } from '../lib/exportPortfolioZip';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState<string | null>(null);

  const handleExportCode = async () => {
    try {
      setIsExporting(true);
      await exportCustomizedPortfolioZip((status) => {
        setExportProgress(status);
      });
      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(null);
      }, 1500);
    } catch {
      setIsExporting(false);
      setExportProgress(null);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100/80 dark:bg-black/60 border-t border-black/10 dark:border-white/10 backdrop-blur-xl pt-16 pb-12 text-slate-600 dark:text-white/60 text-xs relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black font-extrabold flex items-center justify-center font-display shadow-lg">
                AG
              </div>
              <span className="text-base font-bold text-slate-900 dark:text-white font-display tracking-widest">
                ANASS GHAZZOU
              </span>
            </div>
            <p className="text-slate-600 dark:text-white/60 text-xs leading-relaxed max-w-sm">
              {t('footer.tagline')}
            </p>
            <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 font-serif italic max-w-sm">
              <Quote className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5 not-italic" />
              <span>{t('footer.optimizedNote')}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase text-slate-900 dark:text-white font-bold tracking-widest mb-3">{t('footer.navTitle')}</h4>
            <ul className="space-y-2 text-slate-600 dark:text-white/70">
              <li><a href="#about" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t('nav.about')}</a></li>
              <li><a href="#skills" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t('nav.skills')}</a></li>
              <li><a href="#projects" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t('nav.projects')}</a></li>
              <li><a href="#experience" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t('nav.experience')}</a></li>
              <li><a href="#roi-calculator" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t('nav.roi')}</a></li>
              <li><a href="#certifications" className="hover:text-slate-900 dark:hover:text-white transition-colors">{t('nav.certifications')}</a></li>
            </ul>
          </div>

          {/* Direct Contacts */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono uppercase text-slate-900 dark:text-white font-bold tracking-widest mb-3">{t('footer.directConnect')}</h4>
            <div className="space-y-2 text-slate-600 dark:text-white/70">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <a href={`tel:${CONTACT_INFO.phoneUS.replace(/[^0-9+]/g, '')}`} className="hover:text-slate-900 dark:hover:text-white font-medium">USA: {CONTACT_INFO.phoneUS}</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-slate-900 dark:hover:text-white">{CONTACT_INFO.email}</a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <a href={`https://wa.me/${CONTACT_INFO.phoneKuwait.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white">WhatsApp Kuwait: {CONTACT_INFO.phoneKuwait}</a>
              </p>
              <p className="flex items-center gap-2">
                <Linkedin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <a href={CONTACT_INFO.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-white">LinkedIn: linkedin.com/in/anass-ghazzou</a>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Anass Ghazzou. {t('footer.rights')}</p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleExportCode}
              disabled={isExporting}
              className="p-2.5 rounded-xl bg-slate-200/80 dark:bg-white/10 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white hover:bg-slate-300/80 dark:hover:bg-white/20 active:scale-95 transition-all flex items-center gap-2 text-xs font-mono font-medium disabled:opacity-50"
              title="Download full project source code as .ZIP with all uploaded images and custom configurations included"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" />
                  <span>{exportProgress || 'Packaging Project...'}</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                  <span>{t('footer.exportCode', 'Export Code (.ZIP)')}</span>
                </>
              )}
            </button>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-all flex items-center gap-2 text-xs font-mono uppercase tracking-widest"
            >
              <span>{t('footer.backToTop')}</span>
              <ArrowUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};


