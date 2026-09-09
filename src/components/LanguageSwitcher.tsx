import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage, LANGUAGES, Language } from '../context/LanguageContext';

export const LanguageSwitcher: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { currentLanguage, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative inline-block text-left z-[70]" ref={dropdownRef}>
      {/* Selector Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 rounded-xl transition-all duration-200 border backdrop-blur-xl shadow-sm hover:scale-[1.02] active:scale-95 ${
          compact
            ? 'px-2.5 py-1.5 text-xs bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 border-black/10 dark:border-white/20 text-slate-800 dark:text-white'
            : 'px-3 py-1.5 text-xs font-semibold bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 border-black/10 dark:border-white/20 text-slate-800 dark:text-white'
        }`}
        aria-label="Select Language"
        aria-expanded={isOpen}
      >
        <span className="text-base leading-none select-none">{currentLanguage.flag}</span>
        <span className="font-mono uppercase font-bold tracking-wider text-xs">{currentLanguage.abbrev}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-500 dark:text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white/95 dark:bg-[#0b0c10]/95 border border-black/10 dark:border-white/20 shadow-2xl backdrop-blur-2xl py-2 z-[80] animate-fadeIn origin-top-right">
          <div className="px-3 py-1.5 mb-1 border-b border-black/5 dark:border-white/10 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-400 font-bold">
            <div className="flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-blue-500" />
              <span>Language</span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[9px]">
              {LANGUAGES.length} Available
            </span>
          </div>

          <div className="max-h-64 overflow-y-auto custom-scrollbar px-1.5 space-y-0.5">
            {LANGUAGES.map((lang: Language) => {
              const isSelected = lang.code === currentLanguage.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all duration-150 ${
                    isSelected
                      ? 'bg-blue-500/15 dark:bg-blue-500/25 text-blue-600 dark:text-blue-400 font-bold shadow-xs'
                      : 'hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none select-none">{lang.flag}</span>
                    <div className="flex items-center gap-1.5 text-left">
                      <span className="font-mono uppercase text-[10px] font-bold text-slate-400 dark:text-slate-500 w-5">{lang.abbrev}</span>
                      <span className="font-medium text-slate-900 dark:text-slate-100">{lang.nativeName}</span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

