import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Bot, FileText, Globe2, ShieldCheck, Zap, PhoneCall, Camera, Check } from 'lucide-react';
import { PERSONAL_INFO, CONTACT_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { NeuralNetworkCanvas } from './NeuralNetworkCanvas';
import { getPersistentItem, setPersistentItem, compressImage } from '../lib/imageStorage';

interface HeroProps {
  onOpenAiModal: () => void;
  onOpenResumeModal: () => void;
  onOpenContactModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenAiModal,
  onOpenResumeModal,
  onOpenContactModal
}) => {
  const [avatar, setAvatar] = useState<string>(PERSONAL_INFO.avatarUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const handleImageFile = async (file: File) => {
    if (!file) return;
    try {
      setIsUploading(true);
      const compressed = await compressImage(file, 2000, 2000, 0.92);
      if (compressed) {
        setAvatar(compressed);
        await setPersistentItem('custom_anass_avatar', compressed);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Failed to process image:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageFile(file);
  };

  useEffect(() => {
    const loadAvatar = async () => {
      const persisted = await getPersistentItem('custom_anass_avatar');
      if (persisted) {
        setAvatar(persisted);
      } else {
        const local = localStorage.getItem('custom_anass_avatar');
        if (local) {
          setAvatar(local);
        }
      }
    };

    loadAvatar();

    const handleAvatarUpdate = () => {
      loadAvatar();
    };

    window.addEventListener('avatarUpdated', handleAvatarUpdate);
    return () => window.removeEventListener('avatarUpdated', handleAvatarUpdate);
  }, []);

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Ambient background glow and grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.12),rgba(255,255,255,0))]" />
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d0a_1px,transparent_1px),linear-gradient(to_bottom,#1f293d0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          
          {/* Left Column - Main Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6 text-center lg:text-left min-w-0">
            
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 backdrop-blur-xl text-blue-600 dark:text-blue-400 text-[11px] uppercase tracking-[0.2em] font-semibold self-center lg:self-start shadow-xl">
              <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 -ml-4" />
              <span>{t('hero.badge')}</span>
            </div>

            {/* Name & Main Display Headline */}
            <div className="min-w-0">
              <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-[clamp(1.75rem,2.4vw,3.25rem)] xl:text-[clamp(2.4rem,3vw,3.75rem)] font-extrabold font-display tracking-tight sm:tracking-tighter text-slate-900 dark:text-white leading-[1.08] sm:leading-[0.98] uppercase">
                <span className="block whitespace-normal sm:whitespace-nowrap">ANASS GHAZZOU</span>
                <span className="text-stroke-white block mt-1 whitespace-normal sm:whitespace-nowrap">{t('hero.titleP2')}</span>
              </h1>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg lg:text-base xl:text-lg font-medium text-blue-600 dark:text-blue-300/90 tracking-wide max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </div>

            {/* Value Proposition Description */}
            <p className="text-slate-600 dark:text-white/60 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t('hero.bio')}
            </p>

            {/* Key Skill Highlights Pills */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {[
                'SEO / SEM',
                'Google & Meta Ads',
                'Boostega LLC Founder',
                'Python Web Scraping',
                'Adobe Illustrator',
                'Shopify & WordPress'
              ].map((skill) => (
                <span 
                  key={skill}
                  className="px-3 py-1.5 rounded-xl bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 text-slate-800 dark:text-white/80 text-[11px] sm:text-xs font-mono backdrop-blur-md hover:bg-black/10 dark:hover:bg-white/10 transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2 justify-center lg:justify-start w-full">
              <a
                href="#projects"
                className="min-h-[44px] flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs uppercase tracking-widest shadow-xl shadow-slate-900/15 dark:shadow-white/10 hover:shadow-2xl hover:shadow-blue-500/25 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
              >
                <span>{t('nav.projects')}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenAiModal}
                className="min-h-[44px] flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 dark:border-blue-400/40 text-blue-600 dark:text-blue-300 font-bold text-xs uppercase tracking-widest backdrop-blur-md shadow-md hover:shadow-lg hover:shadow-blue-500/15 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
              >
                <Bot className="w-4 h-4 text-blue-500 dark:text-blue-400 animate-pulse" />
                <span>{t('hero.btnAsk')}</span>
              </button>

              <button
                onClick={onOpenResumeModal}
                className="min-h-[44px] flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-slate-900/5 dark:bg-white/5 hover:bg-slate-900/10 dark:hover:bg-white/10 border border-slate-900/10 dark:border-white/15 hover:border-slate-400 dark:hover:border-white/30 text-slate-900 dark:text-white font-bold text-xs uppercase tracking-widest backdrop-blur-md shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
              >
                <FileText className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                <span>{t('hero.btnResume')}</span>
              </button>
            </div>

            {/* Direct Contact Links */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <a 
                href={`https://wa.me/${CONTACT_INFO.phoneKuwait.replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>{t('hero.phoneWa', 'WhatsApp Kuwait')}: {CONTACT_INFO.phoneKuwait}</span>
              </a>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-600">•</span>
              <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                <Globe2 className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
                <span>{t('hero.langsSpoken', 'Arabic • English • French')}</span>
              </div>
            </div>

          </div>

          {/* Right Column - Executive Hero Image Frame & Animated Neural Canvas */}
          <div className="lg:col-span-5 flex justify-center relative">
            
            {/* Animated Neural Network Canvas Background */}
            <div className="absolute inset-0 max-w-lg mx-auto flex items-center justify-center">
              <NeuralNetworkCanvas />
            </div>

            {/* Outer Decorative Frame with High-Tech Edge */}
            <div className="relative z-10 w-full max-w-md aspect-[3/4] rounded-3xl p-2.5 bg-white/40 dark:bg-slate-900/40 border border-blue-500/30 dark:border-blue-400/30 shadow-[0_0_50px_rgba(0,240,255,0.2)] dark:shadow-[0_0_60px_rgba(0,240,255,0.15)] backdrop-blur-2xl group transition-all duration-500 hover:border-cyan-400/60">
              
              {/* Tech Edge Corner Reticles */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 rounded-tl-xl pointer-events-none z-20" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400 rounded-tr-xl pointer-events-none z-20" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400 rounded-bl-xl pointer-events-none z-20" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 rounded-br-xl pointer-events-none z-20" />

              {/* Profile Image Frame */}
              <div 
                className="w-full h-full rounded-2xl overflow-hidden relative bg-slate-100 dark:bg-black/40 border border-slate-900/10 dark:border-white/10 group cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleImageFile(file);
                }}
                title="Click or drag a photo to update profile picture"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <img
                  src={avatar}
                  alt={PERSONAL_INFO.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top filter brightness-[1.03] contrast-[1.02] transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle gradient vignette over image */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 dark:from-[#050508] via-transparent to-transparent opacity-85 pointer-events-none" />

                {/* Interactive Change Photo Hover Pill */}
                <div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 text-white border border-white/20 text-[11px] font-mono font-bold shadow-xl backdrop-blur-md">
                    {uploadSuccess ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Updated!</span>
                      </>
                    ) : isUploading ? (
                      <span className="animate-pulse">Uploading...</span>
                    ) : (
                      <>
                        <Camera className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Change Photo</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Name Badge Overlay inside Image */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/85 dark:bg-slate-950/85 backdrop-blur-xl border border-blue-500/30 dark:border-cyan-500/30 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white font-display flex items-center gap-1.5">
                        Anass Ghazzou
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      </p>
                      <p className="text-xs text-cyan-300 dark:text-cyan-400 font-mono font-semibold">{t('hero.founderTag', 'Growth & E-com Founder')}</p>
                    </div>
                    <div className="px-2.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-200 dark:text-cyan-300 text-[10px] font-extrabold uppercase tracking-wider font-mono">
                      {t('hero.verified', 'VERIFIED')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stat Card 1 - Experience */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 p-2 sm:p-3 rounded-2xl bg-white/95 dark:bg-[#0c0e17]/95 border border-cyan-500/30 dark:border-blue-400/30 backdrop-blur-2xl shadow-xl hidden sm:flex items-center gap-2.5 animate-float z-20 max-w-[calc(100%-2rem)]">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-500 dark:text-cyan-400 shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display leading-none whitespace-nowrap">7+ Years</p>
                  <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono mt-1 whitespace-nowrap">{t('hero.statYears')}</p>
                </div>
              </div>

              {/* Floating Stat Card 2 - Platforms Built */}
              <div className="absolute bottom-20 sm:bottom-24 right-3 sm:right-4 p-2 sm:p-3 rounded-2xl bg-white/95 dark:bg-[#0c0e17]/95 border border-blue-500/30 dark:border-blue-400/30 backdrop-blur-2xl shadow-xl hidden sm:flex items-center gap-2.5 animate-float [animation-delay:2s] z-20 max-w-[calc(100%-2rem)]">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-display leading-none whitespace-nowrap">2 Platforms</p>
                  <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono mt-1 whitespace-nowrap">Boostega & Smmcent</p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Quick Highlights Grid Bar */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 p-3 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 backdrop-blur-xl shadow-xl">
          <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-slate-50/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 text-center transition-all duration-300 hover:border-blue-500/40 hover:shadow-lg hover:-translate-y-0.5">
            <p className="text-lg sm:text-2xl lg:text-3xl font-black text-blue-600 dark:text-blue-400 font-display tracking-tight leading-tight">
              7+ Years
            </p>
            <p className="text-[10px] sm:text-xs text-slate-600 dark:text-white/70 font-mono uppercase tracking-wider mt-1 sm:mt-1.5 font-semibold">
              {t('hero.statYears')}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-slate-50/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 text-center transition-all duration-300 hover:border-cyan-500/40 hover:shadow-lg hover:-translate-y-0.5">
            <p className="text-lg sm:text-2xl lg:text-3xl font-black text-cyan-600 dark:text-cyan-400 font-display tracking-tight leading-tight">
              2 Platforms
            </p>
            <p className="text-[10px] sm:text-xs text-slate-600 dark:text-white/70 font-mono uppercase tracking-wider mt-1 sm:mt-1.5 font-semibold">
              {t('hero.statBuilt')}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-slate-50/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 text-center transition-all duration-300 hover:border-indigo-500/40 hover:shadow-lg hover:-translate-y-0.5">
            <p className="text-lg sm:text-2xl lg:text-3xl font-black text-indigo-600 dark:text-indigo-400 font-display tracking-tight leading-tight">
              Python & JS
            </p>
            <p className="text-[10px] sm:text-xs text-slate-600 dark:text-white/70 font-mono uppercase tracking-wider mt-1 sm:mt-1.5 font-semibold">
              {t('hero.statScraped')}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-slate-50/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 text-center transition-all duration-300 hover:border-purple-500/40 hover:shadow-lg hover:-translate-y-0.5">
            <p className="text-lg sm:text-2xl lg:text-3xl font-black text-purple-600 dark:text-purple-400 font-display tracking-tight leading-tight">
              50+ Certs
            </p>
            <p className="text-[10px] sm:text-xs text-slate-600 dark:text-white/70 font-mono uppercase tracking-wider mt-1 sm:mt-1.5 font-semibold">
              {t('hero.statLanguages')}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
