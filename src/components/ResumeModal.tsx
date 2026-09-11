import React, { useState } from 'react';
import { FileText, Printer, Copy, Check, X, Mail, Phone, Linkedin, Globe, MapPin } from 'lucide-react';
import { PERSONAL_INFO, CONTACT_INFO, WORK_EXPERIENCE, CERTIFICATIONS, LANGUAGES, EDUCATION_LIST } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Top certifications to feature on resume (official/high-value only)
const RESUME_CERT_IDS = ['c9', 'c11', 'c34', 'c1', 'c41', 'c8'];

// Experience IDs to show in each section
const PROFESSIONAL_IDS = ['exp-mak', 'exp-1', 'exp-2', 'exp-3'];
const ENTREPRENEURIAL_IDS = ['exp-5'];
const EARLIER_IDS = ['exp-7', 'exp-8', 'exp-9'];

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => { window.print(); };

  const professionalExp = WORK_EXPERIENCE.filter(e => PROFESSIONAL_IDS.includes(e.id));
  const entrepreneurialExp = WORK_EXPERIENCE.filter(e => ENTREPRENEURIAL_IDS.includes(e.id));
  const earlierExp = WORK_EXPERIENCE.filter(e => EARLIER_IDS.includes(e.id));
  const featuredCerts = CERTIFICATIONS.filter(c => RESUME_CERT_IDS.includes(c.id));
  const remainingCertCount = CERTIFICATIONS.length - featuredCerts.length;

  const fullResumeText = `ANASS GHAZZOU\nDigital Marketing Specialist | Kuwait City, Kuwait | Open to GCC & Remote\n${CONTACT_INFO.email} | USA: ${CONTACT_INFO.phoneUS} | WhatsApp: ${CONTACT_INFO.phoneKuwait}\nLinkedIn: ${CONTACT_INFO.linkedIn} | Portfolio: https://anassghazzou.vercel.app\n\n${PERSONAL_INFO.summary}\n\nPROFESSIONAL EXPERIENCE\n${professionalExp.map(e => `${e.role} — ${e.company} (${e.period})\n${e.highlights.map(h => `• ${h}`).join('\n')}`).join('\n\n')}\n\nENTREPRENEURIAL VENTURES\n${entrepreneurialExp.map(e => `${e.role} — ${e.company} (${e.period})\n${e.highlights.map(h => `• ${h}`).join('\n')}`).join('\n\n')}\n\nEARLIER CAREER\n${earlierExp.map(e => `${e.role} — ${e.company} (${e.period})\n${e.highlights.map(h => `• ${h}`).join('\n')}`).join('\n\n')}\n\nKEY CERTIFICATIONS\n${featuredCerts.map(c => `• ${c.title} — ${c.issuer} (${c.year})`).join('\n')}\n+ ${remainingCertCount} additional professional development courses\n\nEDUCATION\n${EDUCATION_LIST.map(e => `• ${e.degree} | ${e.institution} (${e.period})`).join('\n')}\n\nLANGUAGES\n${LANGUAGES.map(l => `• ${l.name}: ${l.level}`).join('\n')}`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(fullResumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Section header component for consistency
  const SectionHeader = ({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) => (
    <h2 className={`text-[11px] font-mono uppercase tracking-[0.2em] ${muted ? 'text-slate-400 dark:text-white/35' : 'text-blue-600 dark:text-blue-400'} mb-3 font-bold print:text-black flex items-center gap-2`}>
      <span>{children}</span>
      <span className={`flex-1 h-px ${muted ? 'bg-slate-200 dark:bg-white/10' : 'bg-blue-600/15 dark:bg-blue-400/15'} print:bg-black/15`} />
    </h2>
  );

  const renderExpEntry = (exp: typeof WORK_EXPERIENCE[0], compact = false) => (
    <div key={exp.id} className={`print:break-inside-avoid ${compact ? 'pb-3' : 'pb-4'}`}>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5">
        <h3 className="text-[13px] font-bold text-slate-900 dark:text-white print:text-black leading-snug">
          {t(`exp.${exp.id}.role`, exp.role)}
        </h3>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-500/20 font-mono font-bold print:bg-gray-100 print:text-gray-700 print:border-gray-300 uppercase tracking-wider">
            {exp.type}
          </span>
          <span className="text-[11px] font-mono text-slate-500 dark:text-white/40 print:text-gray-600 font-medium whitespace-nowrap">
            {t(`exp.${exp.id}.period`, exp.period)}
          </span>
        </div>
      </div>
      <p className="text-[11px] text-blue-600/80 dark:text-blue-400/70 font-semibold mt-0.5 print:text-gray-600">
        {t(`exp.${exp.id}.company`, exp.company)}
      </p>
      <ul className="mt-1.5 space-y-0.5 text-[11.5px] text-slate-700 dark:text-white/70 print:text-gray-800 leading-relaxed">
        {exp.highlights.map((h, i) => (
          <li key={i} className="flex items-start gap-1.5">
            <span className="text-blue-500 dark:text-blue-400 mt-[3px] shrink-0 text-[8px]">●</span>
            <span>{t(`exp.${exp.id}.h${i}`, h)}</span>
          </li>
        ))}
      </ul>
      {!compact && exp.skillsUsed.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1.5">
          {exp.skillsUsed.map((skill, i) => (
            <span key={i} className="text-[8px] px-1.5 py-[2px] rounded bg-slate-100 dark:bg-white/[0.04] text-slate-500 dark:text-white/40 font-mono border border-slate-200/60 dark:border-white/5 print:bg-gray-50 print:text-gray-500 print:border-gray-200 uppercase tracking-wider">
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-[#0a0b10] border border-black/10 dark:border-white/15 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-slate-900 dark:text-slate-100 print:bg-white print:text-black print:p-6 print:border-none print:shadow-none print:max-h-none print:overflow-visible print:rounded-none">
        
        {/* Top Bar */}
        <div className="sticky top-0 z-10 bg-white/95 dark:bg-[#0a0b10]/95 backdrop-blur-xl border-b border-black/5 dark:border-white/10 px-6 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:hidden rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-display text-slate-900 dark:text-white leading-none">
                {t('resume.title', 'Anass Ghazzou')}
              </h3>
              <p className="text-[10px] text-slate-400 dark:text-white/40 font-mono uppercase tracking-wider mt-0.5">Professional Resume</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={handleCopyText}
              className="h-9 px-3 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button onClick={handlePrint}
              className="h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shadow-blue-600/20">
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button onClick={onClose} aria-label="Close"
              className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Resume Body */}
        <div className="px-6 sm:px-8 py-6 space-y-6 print:px-0 print:py-0">
          
          {/* ═══════════ HEADER ═══════════ */}
          <div className="pb-5 border-b-2 border-slate-900 dark:border-white print:border-black">
            <h1 className="text-3xl sm:text-4xl font-black font-display text-slate-900 dark:text-white print:text-black tracking-tight leading-none">
              ANASS GHAZZOU
            </h1>
            <p className="text-blue-600 dark:text-blue-400 text-xs sm:text-sm mt-2 print:text-gray-800 uppercase tracking-[0.15em] font-bold">
              Digital Marketing Specialist & E-commerce Entrepreneur
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin className="w-3 h-3 text-slate-400 dark:text-white/30" />
              <p className="text-[11px] text-slate-400 dark:text-white/40 font-medium">
                Kuwait City, Kuwait · Open to GCC & Remote Opportunities
              </p>
            </div>
            
            {/* Contact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-[11px] text-slate-600 dark:text-white/60 mt-4 print:text-gray-700">
              <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                <Mail className="w-3 h-3 text-blue-600 dark:text-blue-400 shrink-0" />{CONTACT_INFO.email}
              </a>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-blue-600 dark:text-blue-400 shrink-0" />
                <span className="font-semibold text-slate-800 dark:text-white/80">USA: {CONTACT_INFO.phoneUS}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-emerald-500 shrink-0" />
                WhatsApp: {CONTACT_INFO.phoneKuwait} / {CONTACT_INFO.phoneMorocco}
              </span>
              <a href={CONTACT_INFO.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                <Linkedin className="w-3 h-3 text-blue-600 dark:text-blue-400 shrink-0" />linkedin.com/in/anass-ghazzou
              </a>
              <a href="https://anassghazzou.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 sm:col-span-2 hover:text-blue-600 transition-colors font-semibold text-blue-600 dark:text-blue-400">
                <Globe className="w-3 h-3 shrink-0" />
                anassghazzou.vercel.app
                <span className="text-[8px] px-1 py-[1px] rounded bg-blue-600 text-white font-mono font-bold uppercase tracking-wider">Portfolio</span>
              </a>
            </div>
          </div>

          {/* ═══════════ SUMMARY ═══════════ */}
          <div>
            <SectionHeader>Professional Summary</SectionHeader>
            <p className="text-[12px] text-slate-700 dark:text-white/70 leading-[1.7] print:text-gray-800">
              {t('hero.bio', PERSONAL_INFO.summary)}
            </p>
          </div>

          {/* ═══════════ CORE SKILLS (moved up for ATS scanning) ═══════════ */}
          <div>
            <SectionHeader>Core Competencies</SectionHeader>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2">
              {[
                { label: 'Paid Media', skills: 'Google Ads · Meta Ads · TikTok Ads' },
                { label: 'SEO & Analytics', skills: 'SEO/SEM · GA4 · SEMrush · GMB' },
                { label: 'Technical', skills: 'Python · WordPress · Shopify · APIs' },
                { label: 'Design & AI', skills: 'Illustrator · Prompt Eng · AI Video' },
              ].map((group) => (
                <div key={group.label}>
                  <p className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider font-mono print:text-black">{group.label}</p>
                  <p className="text-[10.5px] text-slate-600 dark:text-white/50 print:text-gray-700 mt-0.5 leading-snug">{group.skills}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ═══════════ PROFESSIONAL EXPERIENCE ═══════════ */}
          <div>
            <SectionHeader>Professional Experience</SectionHeader>
            {professionalExp.map(exp => renderExpEntry(exp))}
          </div>

          {/* ═══════════ ENTREPRENEURIAL VENTURES ═══════════ */}
          <div>
            <SectionHeader>Entrepreneurial Ventures</SectionHeader>
            {entrepreneurialExp.map(exp => renderExpEntry(exp))}
          </div>

          {/* ═══════════ EARLIER CAREER ═══════════ */}
          <div>
            <SectionHeader muted>Earlier Career</SectionHeader>
            {earlierExp.map(exp => renderExpEntry(exp, true))}
          </div>

          {/* ═══════════ PAGE 2 BREAK ═══════════ */}
          <div className="border-t border-slate-200 dark:border-white/10 pt-5 print:border-black/15 print:break-before-page">
            
            {/* Education & Languages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <SectionHeader>Education</SectionHeader>
                <div className="space-y-2.5">
                  {EDUCATION_LIST.map((e, idx) => (
                    <div key={idx}>
                      <p className="text-[12px] font-bold text-slate-900 dark:text-white print:text-black leading-tight">{e.degree}</p>
                      <p className="text-[10.5px] text-slate-500 dark:text-white/40 print:text-gray-600">{e.institution}</p>
                      <p className="text-[10px] font-mono text-blue-600/70 dark:text-blue-400/50 mt-0.5 print:text-gray-500">{e.period}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SectionHeader>Languages</SectionHeader>
                <div className="space-y-2">
                  {LANGUAGES.map((l) => {
                    const langKey = l.name.toLowerCase().includes('arabic') ? 'arabic'
                      : l.name.toLowerCase().includes('english') ? 'english'
                      : l.name.toLowerCase().includes('french') ? 'french' : 'darija';
                    return (
                      <div key={l.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs">{l.flag?.split('/')[0]?.trim()}</span>
                          <span className="text-[12px] font-bold text-slate-900 dark:text-white print:text-black">
                            {t(`lang.${langKey}.name`, l.name)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <div className="w-16 h-1 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden print:bg-gray-200">
                            <div className="h-full rounded-full bg-blue-500" style={{ width: `${l.percentage}%` }} />
                          </div>
                          <span className="text-[9px] font-mono text-slate-400 dark:text-white/35 print:text-gray-500 w-[100px] text-right">
                            {t(`lang.${langKey}.level`, l.level)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Key Certifications */}
            <div className="mb-6">
              <SectionHeader>Key Certifications</SectionHeader>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
                {featuredCerts.map((c) => (
                  <div key={c.id} className="flex items-start gap-1.5 text-[11px] print:break-inside-avoid py-0.5">
                    <Check className="w-3 h-3 text-blue-500 mt-[2px] shrink-0" />
                    <span>
                      <span className="font-semibold text-slate-800 dark:text-white/80 print:text-black">{c.title}</span>
                      <span className="text-slate-400 dark:text-white/30 print:text-gray-500"> · {c.issuer}</span>
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[9px] text-slate-400 dark:text-white/25 font-mono mt-2 print:text-gray-400 tracking-wide">
                + {remainingCertCount} additional professional development courses in AI, SEO, Design, WordPress & E-commerce
              </p>
            </div>

            {/* Additional Keywords for ATS */}
            <div>
              <SectionHeader muted>Additional Keywords</SectionHeader>
              <p className="text-[10px] text-slate-400 dark:text-white/30 print:text-gray-500 leading-relaxed">
                Sales Funnels · Lead Generation · WhatsApp Marketing · CRO · Email Marketing · Klaviyo · Content Strategy · 
                Brand Identity · UI/UX · Figma · Cloudflare · REST APIs · Firebase · Conversion Optimization · 
                A/B Testing · Audience Segmentation · Retargeting · Lookalike Audiences · Campaign Attribution · 
                E-commerce Operations · Inventory Management · Customer Success · Trustpilot · B2B Marketing · B2C Marketing
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
