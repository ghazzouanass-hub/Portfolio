import React, { useState } from 'react';
import { Send, Phone, Mail, Linkedin, CheckCircle2, MessageSquare } from 'lucide-react';
import { CONTACT_INFO } from '../data/portfolioData';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';

interface ContactSectionProps {
  isOpenModal?: boolean;
  onCloseModal?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  isOpenModal,
  onCloseModal
}) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Digital Marketing / Ad Campaign Management',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: 'Digital Marketing / Ad Campaign Management',
        message: ''
      });
      if (onCloseModal) onCloseModal();
    }, 4000);
  };

  const content = (
    <div id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-blue-600 dark:text-blue-400 text-[11px] font-mono uppercase tracking-[0.2em] mb-4 backdrop-blur-xl">
            <Send className="w-3.5 h-3.5" />
            <span>{t('contact.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            {t('contact.title')}
          </h2>
          <p className="mt-4 text-slate-600 dark:text-white/60 text-base">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Contact Cards Column */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* USA Phone & SMS Card */}
            <div className="p-4 sm:p-6 rounded-2xl bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-xl hover:border-black/20 dark:hover:border-white/20 hover:bg-white dark:hover:bg-white/10 transition-all shadow-xl flex flex-col justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20 dark:border-indigo-400/30 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="text-[11px] sm:text-xs text-slate-500 dark:text-white/50 font-mono uppercase tracking-wider flex items-center gap-1.5">
                    <span>{t('contact.usaPhoneLabel')}</span>
                  </p>
                  <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display mt-0.5">{CONTACT_INFO.phoneUS}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 pt-2 border-t border-black/5 dark:border-white/10">
                <a
                  href={`tel:${CONTACT_INFO.phoneUS.replace(/[^0-9+]/g, '')}`}
                  className="min-h-[44px] flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold font-mono uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{t('contact.callNow')}</span>
                </a>
                <a
                  href={`sms:${CONTACT_INFO.phoneUS.replace(/[^0-9+]/g, '')}`}
                  className="min-h-[44px] flex-1 py-2 px-3 rounded-xl bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-900 dark:text-white text-xs font-bold font-mono uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{t('contact.sendSms')}</span>
                </a>
              </div>
            </div>

            {/* Email Card */}
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="p-4 sm:p-6 rounded-2xl bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-xl hover:border-black/20 dark:hover:border-white/20 hover:bg-white dark:hover:bg-white/10 transition-all flex items-center gap-3 sm:gap-4 group shadow-xl"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/20 dark:border-blue-400/30 flex items-center justify-center shrink-0 group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-colors">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-white/50 font-mono uppercase tracking-wider">{t('contact.emailLabel')}</p>
                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display mt-0.5 break-all">{CONTACT_INFO.email}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 font-mono uppercase tracking-wider">{t('contact.sendEmailAction')}</p>
              </div>
            </a>

            {/* WhatsApp Kuwait Card */}
            <a
              href={`https://wa.me/${CONTACT_INFO.phoneKuwait.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-6 rounded-2xl bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-xl hover:border-black/20 dark:hover:border-white/20 hover:bg-white dark:hover:bg-white/10 transition-all flex items-center gap-3 sm:gap-4 group shadow-xl"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20 dark:border-emerald-400/30 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 dark:group-hover:bg-emerald-400 group-hover:text-white dark:group-hover:text-black transition-colors">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-white/50 font-mono uppercase tracking-wider">{t('contact.waKuwaitLabel')}</p>
                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display mt-0.5">{CONTACT_INFO.phoneKuwait}</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-mono uppercase tracking-wider">{t('contact.openWaAction')}</p>
              </div>
            </a>

            {/* WhatsApp Morocco Card */}
            <a
              href={`https://wa.me/${CONTACT_INFO.phoneMorocco.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-6 rounded-2xl bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-xl hover:border-black/20 dark:hover:border-white/20 hover:bg-white dark:hover:bg-white/10 transition-all flex items-center gap-3 sm:gap-4 group shadow-xl"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20 dark:border-emerald-400/30 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 dark:group-hover:bg-emerald-400 group-hover:text-white dark:group-hover:text-black transition-colors">
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-white/50 font-mono uppercase tracking-wider">{t('contact.waMoroccoLabel')}</p>
                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display mt-0.5">{CONTACT_INFO.phoneMorocco}</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-mono uppercase tracking-wider">{t('contact.openWaAction')}</p>
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href={CONTACT_INFO.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-6 rounded-2xl bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-xl hover:border-black/20 dark:hover:border-white/20 hover:bg-white dark:hover:bg-white/10 transition-all flex items-center gap-3 sm:gap-4 group shadow-xl"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/20 dark:border-blue-400/30 flex items-center justify-center shrink-0 group-hover:bg-blue-600 dark:group-hover:bg-blue-400 group-hover:text-white dark:group-hover:text-black transition-colors">
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-white/50 font-mono uppercase tracking-wider">{t('contact.linkedinLabel')}</p>
                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display mt-0.5 break-all">linkedin.com/in/anass-ghazzou</p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 font-mono uppercase tracking-wider">{t('contact.connectLinkedinAction')}</p>
              </div>
            </a>

          </div>

          {/* Right Direct Message Form Column */}
          <div className="lg:col-span-7 p-5 sm:p-8 rounded-3xl bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/15 backdrop-blur-xl shadow-2xl relative">
            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center justify-center gap-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20 dark:border-emerald-400/30 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                  {t('contact.deliveredTitle')}
                </h3>
                <p className="text-slate-600 dark:text-white/70 text-sm max-w-md leading-relaxed">
                  {t('contact.deliveredDesc')} ({formData.email}).
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display mb-2">
                  {t('contact.formTitle')}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-white/60 block mb-1">
                      {t('contact.fieldName')} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('contact.placeholderName')}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="min-h-[44px] w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-black/40 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-white/60 block mb-1">
                      {t('contact.fieldEmail')} *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={t('contact.placeholderEmail')}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="min-h-[44px] w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-black/40 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-white/60 block mb-1">
                    {t('contact.fieldCategory')}
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="min-h-[44px] w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-black/40 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-blue-500"
                  >
                    <option value="Digital Marketing / Ad Campaign Management">{t('contact.optMarketing')}</option>
                    <option value="E-commerce & Growth Consulting">{t('contact.optEcommerce')}</option>
                    <option value="Python Automation / Web Scraping Project">{t('contact.optPython')}</option>
                    <option value="Full-Time Executive Offer">{t('contact.optFulltime')}</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-white/60 block mb-1">
                    {t('contact.fieldMessage')} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={t('contact.placeholderMessage')}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-black/40 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="min-h-[48px] mt-2 py-3.5 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs uppercase tracking-widest shadow-xl shadow-slate-900/15 dark:shadow-white/10 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('contact.submitButton')}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );

  if (isOpenModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
        <div className="relative w-full max-w-4xl my-8">
          <button
            onClick={onCloseModal}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800 border border-white/10 text-slate-300 hover:text-white"
          >
            ✕
          </button>
          {content}
        </div>
      </div>
    );
  }

  return content;
};
