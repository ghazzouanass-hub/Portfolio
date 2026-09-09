import React, { useState, useEffect } from 'react';
import { FileText, Send, Menu, X, Sun, Moon, ArrowLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavbarProps {
  onOpenAiModal?: () => void;
  onOpenResumeModal: () => void;
  onOpenContactModal: () => void;
  onBackToPortfolio?: () => void;
  isDetailPage?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenResumeModal,
  onOpenContactModal,
  onBackToPortfolio,
  isDetailPage = false
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.experience'), href: '#experience' },
  ];

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    if (isDetailPage) {
      e.preventDefault();
      onBackToPortfolio?.();
      if (href !== '#') {
        const targetId = href.replace('#', '');
        setTimeout(() => {
          const targetElem = document.getElementById(targetId);
          if (targetElem) {
            targetElem.scrollIntoView({ behavior: 'smooth' });
          }
        }, 120);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (href === '#') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBrandClick = (e: React.MouseEvent) => {
    if (isDetailPage) {
      e.preventDefault();
      onBackToPortfolio?.();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-3 bg-white/85 dark:bg-[#07080e]/90 backdrop-blur-2xl border-b border-black/10 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/60' 
        : 'py-4 sm:py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Title */}
        <a 
          href="#" 
          onClick={handleBrandClick}
          className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
          aria-label="Anass Ghazzou Home"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 border border-black/10 dark:border-white/20 flex items-center justify-center font-black font-display text-sm sm:text-base shadow-md group-hover:scale-105 transition-all duration-200">
            AG
          </div>
          <div>
            <span className="text-sm sm:text-base lg:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white font-display block leading-none">
              ANASS GHAZZOU
            </span>
            <span className="text-[9px] sm:text-[10px] text-blue-600 dark:text-blue-400 font-mono tracking-widest uppercase block mt-1 font-semibold">
              {t('hero.founderTag', 'Marketing & E-com Founder')}
            </span>
          </div>
        </a>

        {/* Center Section: Detail Page Back Pill OR Desktop Navigation Links */}
        {isDetailPage ? (
          <div className="hidden md:flex items-center">
            <button
              onClick={onBackToPortfolio}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-600 dark:text-blue-400 font-mono text-xs font-bold tracking-wide transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t('projectDetail.backToPortfolio', 'Back to Portfolio')}</span>
            </button>
          </div>
        ) : (
          <nav className="hidden lg:flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1.5 rounded-full border border-black/10 dark:border-white/10 backdrop-blur-2xl text-xs uppercase tracking-widest font-bold text-slate-700 dark:text-white/80 shadow-inner">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3.5 py-1.5 rounded-full hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/15 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>
        )}

        {/* Right Action Bar (Desktop / Laptop) */}
        <div className="hidden lg:flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Light / Dark Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/10 dark:border-white/15 text-slate-800 dark:text-white transition-all duration-200 backdrop-blur-md flex items-center justify-center hover:scale-105 active:scale-95"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-blue-600 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Resume Viewer Button */}
          <button
            onClick={onOpenResumeModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 border border-black/10 dark:border-white/15 text-slate-800 dark:text-white/90 text-xs uppercase tracking-wider font-bold transition-all duration-200 backdrop-blur-md hover:scale-[1.02] active:scale-95"
          >
            <FileText className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
            <span>{t('nav.resume')}</span>
          </button>

          {/* Contact Button */}
          <button
            onClick={onOpenContactModal}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs uppercase tracking-widest transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t('nav.contact')}</span>
          </button>
        </div>

        {/* Mobile & Tablet Controls (Below 1024px) */}
        <div className="flex lg:hidden items-center gap-2 shrink-0">
          <LanguageSwitcher compact />
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 text-slate-800 dark:text-white"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 text-slate-800 dark:text-white flex items-center justify-center"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Responsive Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 mx-3 sm:mx-4 p-4 rounded-2xl bg-white/95 dark:bg-[#0c0d12]/95 border border-black/10 dark:border-white/15 shadow-2xl flex flex-col gap-3 backdrop-blur-2xl animate-fadeIn">
          {isDetailPage && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBackToPortfolio?.();
              }}
              className="min-h-[44px] flex items-center justify-center gap-2 p-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 active:bg-blue-500/30 border border-blue-500/30 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('projectDetail.backToPortfolio', 'Back to Portfolio')}</span>
            </button>
          )}

          <nav className="flex flex-col gap-1">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleLinkClick(e, link.href);
                }}
                className="min-h-[44px] px-4 py-3 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/10 active:bg-black/10 transition-colors text-sm font-bold flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-xs text-slate-400 font-mono">→</span>
              </a>
            ))}
          </nav>
          
          <div className="h-px bg-black/10 dark:bg-white/10 my-1" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenResumeModal(); }}
              className="min-h-[44px] w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 active:scale-98 border border-black/10 dark:border-white/15 text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider font-bold transition-all"
            >
              <FileText className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              <span>{t('nav.resume')}</span>
            </button>

            <button
              onClick={() => { setMobileMenuOpen(false); onOpenContactModal(); }}
              className="min-h-[44px] w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 active:scale-98 text-white dark:text-slate-900 font-extrabold text-xs uppercase tracking-widest shadow-lg transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{t('nav.contact')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};



