import React, { useState } from 'react';
import { FileText, Printer, Copy, Check, X, Mail, Phone, Linkedin, Globe } from 'lucide-react';
import { PERSONAL_INFO, CONTACT_INFO, WORK_EXPERIENCE, CERTIFICATIONS, LANGUAGES, EDUCATION_LIST } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const fullResumeText = `
ANASS GHAZZOU
${CONTACT_INFO.email} | USA: ${CONTACT_INFO.phoneUS} | WhatsApp: ${CONTACT_INFO.phoneKuwait} / ${CONTACT_INFO.phoneMorocco} | ${CONTACT_INFO.linkedIn}
Portfolio: https://anassghazzou.vercel.app

PROFESSIONAL SUMMARY
${PERSONAL_INFO.summary}

WORK EXPERIENCE
${WORK_EXPERIENCE.map(exp => `
${exp.role} - ${exp.company} (${exp.period}) [${exp.type}]
Highlights:
${exp.highlights.map(h => `- ${h}`).join('\n')}
Skills: ${exp.skillsUsed.join(', ')}
`).join('\n')}

CERTIFICATIONS & TRAINING
${CERTIFICATIONS.map(c => `- ${c.title} (${c.issuer}, ${c.year})`).join('\n')}

EDUCATION
${EDUCATION_LIST.map(e => `- ${e.degree} | ${e.institution} (${e.period})`).join('\n')}

LANGUAGES
${LANGUAGES.map(l => `- ${l.name}: ${l.level}`).join('\n')}
  `;

  const handleCopyText = () => {
    navigator.clipboard.writeText(fullResumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white/95 dark:bg-[#090a0f]/95 border border-black/10 dark:border-white/20 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl relative text-slate-900 dark:text-slate-100 backdrop-blur-2xl print:bg-white print:text-black print:p-6 print:border-none print:shadow-none print:max-h-none print:overflow-visible print:rounded-none">
        
        {/* Top Actions Bar (Hidden on Print) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 print:hidden">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/20 dark:border-blue-400/30 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white">
                {t('resume.title', 'Anass Ghazzou Resume')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-white/60">
                {t('resume.subtitle', 'Complete Document Overview')}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyText}
              className="min-h-[44px] px-3.5 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-slate-800 dark:text-white text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? t('resume.copied', 'Copied') : t('resume.copyText', 'Copy Text')}</span>
            </button>

            <button
              onClick={handlePrint}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-white/90 text-white dark:text-black font-bold text-xs uppercase tracking-widest flex items-center gap-1.5 transition-all shadow-lg"
            >
              <Printer className="w-4 h-4" />
              <span>{t('hero.downloadCv')}</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close"
              className="min-h-[44px] min-w-[44px] p-2 rounded-xl sm:rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center ml-auto sm:ml-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formatted Resume Body */}
        <div className="space-y-7 bg-slate-100 dark:bg-black/40 p-6 sm:p-8 rounded-2xl border border-black/10 dark:border-white/10 print:bg-white print:text-black print:p-0 print:border-none">
          
          {/* ═══════════════ PAGE 1: Header + Summary + Experience ═══════════════ */}
          
          {/* Resume Header */}
          <div className="border-b-2 border-blue-600/30 dark:border-blue-400/30 pb-5 print:border-black/30">
            <h1 className="text-3xl sm:text-4xl font-black font-display text-slate-900 dark:text-white print:text-black tracking-tight">
              ANASS GHAZZOU
            </h1>
            <p className="text-blue-600 dark:text-blue-400 font-mono text-xs sm:text-sm mt-1.5 print:text-gray-800 uppercase tracking-[0.15em] font-bold">
              {t('hero.role')}
            </p>
            
            {/* Contact Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-slate-600 dark:text-white/70 mt-4 print:text-gray-700">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{CONTACT_INFO.email}</a>
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span className="font-semibold text-slate-900 dark:text-white">USA: {CONTACT_INFO.phoneUS}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>WhatsApp: {CONTACT_INFO.phoneKuwait} / {CONTACT_INFO.phoneMorocco}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                <a href={CONTACT_INFO.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">linkedin.com/in/anass-ghazzou</a>
              </span>
              <span className="flex items-center gap-1.5 sm:col-span-2">
                <Globe className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                <a href="https://anassghazzou.vercel.app" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                  anassghazzou.vercel.app
                </a>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/20 font-mono font-bold uppercase tracking-wider">Portfolio</span>
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-[11px] font-mono uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-2 font-bold print:text-black border-b border-blue-600/20 dark:border-blue-400/20 pb-1 print:border-black/20">
              {t('about.badge')}
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-700 dark:text-white/80 leading-relaxed print:text-gray-800">
              {t('hero.bio', PERSONAL_INFO.summary)}
            </p>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-[11px] font-mono uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-4 font-bold print:text-black border-b border-blue-600/20 dark:border-blue-400/20 pb-1 print:border-black/20">
              {t('experience.badge')}
            </h2>
            <div className="space-y-5">
              {WORK_EXPERIENCE.map((exp) => (
                <div key={exp.id} className="border-l-2 border-blue-500/40 dark:border-blue-400/30 pl-4 print:border-gray-400 print:break-inside-avoid">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white print:text-black leading-tight">
                      {t(`exp.${exp.id}.role`, exp.role)}
                    </h3>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/20 font-mono font-bold print:bg-gray-100 print:text-gray-700 print:border-gray-300">
                        {exp.type}
                      </span>
                      <span className="text-xs font-mono text-blue-600 dark:text-blue-300 print:text-gray-700 font-semibold whitespace-nowrap">
                        {t(`exp.${exp.id}.period`, exp.period)}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-white/50 font-semibold mt-0.5 print:text-gray-600">
                    {t(`exp.${exp.id}.company`, exp.company)}
                  </p>
                  <ul className="mt-2 space-y-1 text-xs text-slate-700 dark:text-white/75 print:text-gray-800">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-blue-500 dark:text-blue-400 mt-0.5 shrink-0">▸</span>
                        <span>{t(`exp.${exp.id}.h${i}`, h)}</span>
                      </li>
                    ))}
                  </ul>
                  {exp.skillsUsed.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {exp.skillsUsed.map((skill, i) => (
                        <span key={i} className="text-[9px] px-1.5 py-0.5 rounded-md bg-slate-200/80 dark:bg-white/5 text-slate-600 dark:text-white/50 font-mono print:bg-gray-100 print:text-gray-600">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ═══════════════ PAGE 2: Education + Languages + Certifications ═══════════════ */}
          
          <div className="border-t-2 border-blue-600/20 dark:border-blue-400/20 pt-6 print:border-black/20 print:break-before-page">
            {/* Education & Languages Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-7">
              <div>
                <h2 className="text-[11px] font-mono uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-3 font-bold print:text-black border-b border-blue-600/20 dark:border-blue-400/20 pb-1 print:border-black/20">
                  {t('resume.education', 'Education')}
                </h2>
                <div className="space-y-3">
                  {EDUCATION_LIST.map((e, idx) => (
                    <div key={idx} className="border-l-2 border-slate-300 dark:border-white/15 pl-3 print:border-gray-300">
                      <p className="text-xs font-bold text-slate-900 dark:text-white print:text-black">{e.degree}</p>
                      <p className="text-[11px] text-slate-500 dark:text-white/50 print:text-gray-600 font-medium">{e.institution}</p>
                      <p className="text-[10px] font-mono text-blue-600 dark:text-blue-300 mt-0.5 print:text-gray-600">{e.period}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-[11px] font-mono uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-3 font-bold print:text-black border-b border-blue-600/20 dark:border-blue-400/20 pb-1 print:border-black/20">
                  {t('languages.badge')}
                </h2>
                <div className="space-y-2.5">
                  {LANGUAGES.map((l) => {
                    const langKey = l.name.toLowerCase().includes('arabic') ? 'arabic'
                      : l.name.toLowerCase().includes('english') ? 'english'
                      : l.name.toLowerCase().includes('french') ? 'french'
                      : 'darija';
                    return (
                      <div key={l.name} className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{l.flag?.split('/')[0]?.trim()}</span>
                          <span className="text-xs font-bold text-slate-900 dark:text-white print:text-black">
                            {t(`lang.${langKey}.name`, l.name)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="w-20 h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden print:bg-gray-200">
                            <div className="h-full rounded-full bg-blue-500 dark:bg-blue-400" style={{ width: `${l.percentage}%` }} />
                          </div>
                          <span className="text-[10px] font-mono text-slate-500 dark:text-white/50 print:text-gray-600 w-16 text-right">
                            {t(`lang.${langKey}.level`, l.level)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Certifications List */}
            <div>
              <h2 className="text-[11px] font-mono uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-3 font-bold print:text-black border-b border-blue-600/20 dark:border-blue-400/20 pb-1 print:border-black/20">
                {t('certifications.badge')} ({CERTIFICATIONS.length}+)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 print:grid-cols-3">
                {CERTIFICATIONS.map((c) => (
                  <div key={c.id} className="flex items-start gap-1.5 p-1.5 rounded-lg bg-white/60 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 print:bg-gray-50 print:border-gray-200 print:break-inside-avoid">
                    <span className="text-blue-500 dark:text-blue-400 text-[10px] mt-0.5 shrink-0">✓</span>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 dark:text-white print:text-black text-[10px] leading-tight truncate" title={c.title}>{c.title}</p>
                      <p className="text-[9px] text-slate-400 dark:text-white/40 print:text-gray-500 font-mono truncate">{c.issuer} · {c.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
