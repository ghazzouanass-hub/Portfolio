import React, { useState } from 'react';
import { FileText, Printer, Copy, Check, X, Mail, Phone, Linkedin } from 'lucide-react';
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
      <div className="bg-white/95 dark:bg-[#090a0f]/95 border border-black/10 dark:border-white/20 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl relative text-slate-900 dark:text-slate-100 backdrop-blur-2xl print:bg-white print:text-black print:p-0 print:border-none print:shadow-none">
        
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
        <div className="space-y-8 bg-slate-100 dark:bg-black/40 p-8 rounded-2xl border border-black/10 dark:border-white/10 print:bg-white print:text-black print:p-0 print:border-none">
          
          {/* Resume Header */}
          <div className="border-b border-black/10 dark:border-white/10 pb-6 print:border-black">
            <h1 className="text-3xl font-bold font-display text-slate-900 dark:text-white print:text-black">
              ANASS GHAZZOU
            </h1>
            <p className="text-blue-600 dark:text-blue-400 font-mono text-sm mt-1 print:text-gray-800 uppercase tracking-widest">
              {t('hero.role')}
            </p>
            
            <div className="flex flex-wrap gap-4 text-xs text-slate-600 dark:text-white/70 mt-3 print:text-gray-700">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> {CONTACT_INFO.email}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-semibold text-slate-900 dark:text-white">
                <Phone className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /> USA: {CONTACT_INFO.phoneUS}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> WhatsApp: {CONTACT_INFO.phoneKuwait} / {CONTACT_INFO.phoneMorocco}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> {CONTACT_INFO.linkedIn}
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2 font-bold print:text-black">
              {t('about.badge')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-white/80 leading-relaxed print:text-gray-800">
              {t('hero.bio', PERSONAL_INFO.summary)}
            </p>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4 font-bold print:text-black">
              {t('experience.badge')}
            </h2>
            <div className="space-y-6">
              {WORK_EXPERIENCE.map((exp) => (
                <div key={exp.id} className="border-l-2 border-blue-500/40 dark:border-blue-400/30 pl-4 print:border-gray-400">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white print:text-black">
                      {t(`exp.${exp.id}.role`, exp.role)}
                    </h3>
                    <span className="text-xs font-mono text-blue-600 dark:text-blue-300 print:text-gray-700">
                      {t(`exp.${exp.id}.period`, exp.period)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-white/60 font-medium mt-0.5 print:text-gray-600">
                    {t(`exp.${exp.id}.company`, exp.company)}
                  </p>
                  <ul className="mt-2 space-y-1 text-xs text-slate-700 dark:text-white/80 list-disc list-inside print:text-gray-800">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{t(`exp.${exp.id}.h${i}`, h)}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Languages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3 font-bold print:text-black">
                {t('resume.education', 'Education')}
              </h2>
              {EDUCATION_LIST.map((e, idx) => (
                <div key={idx} className="mb-3">
                  <p className="text-xs font-bold text-slate-900 dark:text-white print:text-black">{e.degree}</p>
                  <p className="text-[11px] text-slate-600 dark:text-white/60 print:text-gray-600">{e.institution} ({e.period})</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3 font-bold print:text-black">
                {t('languages.badge')}
              </h2>
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-white/80 print:text-gray-800">
                {LANGUAGES.map((l) => {
                  const langKey = l.name.toLowerCase().includes('arabic') ? 'arabic'
                    : l.name.toLowerCase().includes('english') ? 'english'
                    : l.name.toLowerCase().includes('french') ? 'french'
                    : 'darija';
                  return (
                    <p key={l.name}>
                      <strong>{t(`lang.${langKey}.name`, l.name)}:</strong> {t(`lang.${langKey}.level`, l.level)}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Certifications List */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3 font-bold print:text-black">
              {t('certifications.badge')}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-700 dark:text-white/80 print:text-gray-800">
              {CERTIFICATIONS.map((c) => (
                <div key={c.id} className="p-2 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 print:bg-gray-100">
                  <p className="font-semibold text-slate-900 dark:text-white print:text-black text-[11px]">{c.title}</p>
                  <p className="text-[10px] text-slate-500 dark:text-white/50 print:text-gray-600">{c.issuer} ({c.year})</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

