import React, { useState } from 'react';
import { Calculator, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';

interface RoiCalculatorProps {
  onOpenContactModal: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenContactModal }) => {
  const { t } = useLanguage();
  const [monthlyBudget, setMonthlyBudget] = useState<number>(5000);
  const [channel, setChannel] = useState<'meta' | 'google' | 'tiktok' | 'omnichannel'>('omnichannel');
  const [industry, setIndustry] = useState<'ecommerce' | 'fashion' | 'retail' | 'saas'>('ecommerce');

  // ROI multiplier logic based on channel strategy & industry benchmarks
  const channelMultipliers = {
    meta: 3.8,
    google: 4.2,
    tiktok: 3.5,
    omnichannel: 5.1,
  };

  const industryBoosts = {
    ecommerce: 1.15,
    fashion: 1.25,
    retail: 1.1,
    saas: 1.3,
  };

  const baseRoas = channelMultipliers[channel] * industryBoosts[industry];
  const estimatedRevenue = Math.round(monthlyBudget * baseRoas);
  const netProfit = Math.round(estimatedRevenue - monthlyBudget);

  const handleCelebrate = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f59e0b', '#3b82f6', '#10b981']
    });
  };

  return (
    <section id="roi-calculator" className="py-24 relative border-t border-b border-black/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-blue-600 dark:text-blue-400 text-[11px] font-mono uppercase tracking-[0.2em] mb-4 backdrop-blur-xl">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t('roi.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            {t('roi.title')}
          </h2>
          <p className="mt-4 text-slate-600 dark:text-white/60 text-base">
            {t('roi.subtitle')}
          </p>
        </div>

        {/* Simulator Grid Card */}
        <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8 rounded-3xl bg-white/80 dark:bg-white/5 border border-black/10 dark:border-white/15 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Left Inputs Column */}
            <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
              
              {/* Monthly Budget Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-white/70">
                    {t('roi.monthlyBudgetLabel')}
                  </label>
                  <span className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400 font-display">
                    ${monthlyBudget.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="1000"
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-black/40 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:accent-white"
                />
                <div className="flex justify-between text-[10px] text-slate-400 dark:text-white/40 font-mono mt-1">
                  <span>$1,000</span>
                  <span>$25,000</span>
                  <span>$50,000+</span>
                </div>
              </div>

              {/* Channel Selector */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-white/70 block mb-2">
                  {t('roi.channelMixLabel')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'meta', label: t('roi.channelMeta', 'Meta Ads (FB/IG)') },
                    { id: 'google', label: t('roi.channelGoogle', 'Google Ads & SEO') },
                    { id: 'tiktok', label: t('roi.channelTiktok', 'TikTok & SMM') },
                    { id: 'omnichannel', label: t('roi.channelOmni', 'Full Omnichannel') },
                  ].map((ch) => (
                    <button
                      key={ch.id}
                      onClick={() => setChannel(ch.id as any)}
                      className={`min-h-[44px] p-2.5 sm:p-3 rounded-xl border text-[11px] sm:text-xs font-medium text-left transition-all backdrop-blur-md flex items-center ${
                        channel === ch.id
                          ? 'bg-slate-900 dark:bg-white/20 border-slate-900 dark:border-white text-white font-bold shadow-lg'
                          : 'bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-700 dark:text-white/60 hover:text-slate-900 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10'
                      }`}
                    >
                      <span className="leading-tight">{ch.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Industry Selector */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-white/70 block mb-2">
                  {t('roi.industryLabel')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'ecommerce', label: t('roi.indDigital') },
                    { id: 'fashion', label: t('roi.indFashion') },
                    { id: 'retail', label: t('roi.indRetail') },
                    { id: 'saas', label: t('roi.indSaas') },
                  ].map((ind) => (
                    <button
                      key={ind.id}
                      onClick={() => setIndustry(ind.id as any)}
                      className={`min-h-[44px] p-2.5 sm:p-3 rounded-xl border text-[11px] sm:text-xs font-medium text-left transition-all backdrop-blur-md flex items-center ${
                        industry === ind.id
                          ? 'bg-blue-500/20 border-blue-500 text-blue-700 dark:text-blue-300 font-bold shadow-lg'
                          : 'bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-700 dark:text-white/60 hover:text-slate-900 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10'
                      }`}
                    >
                      <span className="leading-tight">{ind.label}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Projected Results Column */}
            <div className="lg:col-span-5 bg-slate-100 dark:bg-black/40 p-5 sm:p-6 md:p-8 rounded-2xl border border-black/10 dark:border-white/10 text-center flex flex-col justify-between gap-5 sm:gap-6 shadow-inner">
              <div>
                <span className="inline-block px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 text-[11px] font-mono uppercase tracking-widest border border-blue-500/20 dark:border-blue-400/30">
                  {t('roi.projectedPerformance')}
                </span>

                <div className="mt-5 sm:mt-6">
                  <p className="text-xs text-slate-500 dark:text-white/50 font-mono uppercase tracking-widest">{t('roi.estRevenue')}</p>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white font-display mt-1">
                    ${estimatedRevenue.toLocaleString()}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-black/10 dark:border-white/10 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-white/50 uppercase font-mono tracking-wider">{t('roi.targetRoas')}</p>
                    <p className="text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400 font-display">
                      {baseRoas.toFixed(1)}x ROAS
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-white/50 uppercase font-mono tracking-wider">{t('roi.netReturn')}</p>
                    <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-display">
                      +${netProfit.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    handleCelebrate();
                    onOpenContactModal();
                  }}
                  className="min-h-[44px] w-full py-3.5 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs uppercase tracking-widest shadow-xl shadow-slate-900/15 dark:shadow-white/10 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>{t('roi.discussStrategy')}</span>
                </button>
                <p className="text-[10px] text-slate-400 dark:text-white/40 font-mono">
                  {t('roi.benchmarkDisclaimer')}
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

