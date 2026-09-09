import React, { useState, useEffect, lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { hydrateFromCloudStorage } from './lib/imageStorage';
import { DynamicSeoHelmet } from './components/DynamicSeoHelmet';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSummary } from './components/AboutSummary';
import { CompanyLogosShowcase } from './components/CompanyLogosShowcase';
import { SkillsMatrix } from './components/SkillsMatrix';
import { FeaturedProjects } from './components/FeaturedProjects';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { RoiCalculator } from './components/RoiCalculator';
import { CertificationsGrid } from './components/CertificationsGrid';
import { LanguagesAndGlobal } from './components/LanguagesAndGlobal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

// Lazily load modal components and project detail page to optimize initial bundle size & responsiveness
const AiAssistantModal = lazy(() => import('./components/AiAssistantModal').then(m => ({ default: m.AiAssistantModal })));
const ResumeModal = lazy(() => import('./components/ResumeModal').then(m => ({ default: m.ResumeModal })));
const ProjectDetailPage = lazy(() => import('./components/ProjectDetailPage').then(m => ({ default: m.ProjectDetailPage })));

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

function MainApp() {
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const { theme } = useTheme();

  // Hydrate persistent cloud media on mount
  useEffect(() => {
    hydrateFromCloudStorage();
  }, []);

  // Listen to hash changes for project pages
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#project-')) {
        const id = hash.replace('#project-', '');
        setActiveProjectId(id);
      } else {
        setActiveProjectId(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectProject = (id: string) => {
    setActiveProjectId(id);
    window.location.hash = `#project-${id}`;
  };

  const handleBackToPortfolio = () => {
    setActiveProjectId(null);
    if (window.location.hash.startsWith('#project-')) {
      window.history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  };

  const handleOpenContact = () => {
    if (activeProjectId) {
      handleBackToPortfolio();
      setTimeout(() => {
        const element = document.getElementById('contact');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        setContactModalOpen(true);
      }
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-blue-500 selection:text-white relative overflow-x-hidden transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#050508] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <DynamicSeoHelmet activeProjectId={activeProjectId} />

      {/* Background Mesh Gradients for Frosted Glass Atmosphere */}
      <div className={`fixed top-[-10%] left-[-10%] w-[50%] h-[60%] rounded-full blur-[120px] pointer-events-none z-0 transition-opacity duration-300 ${
        theme === 'dark' ? 'bg-blue-600/20' : 'bg-blue-400/20'
      }`} />
      <div className={`fixed bottom-[-10%] right-[-10%] w-[60%] h-[50%] rounded-full blur-[120px] pointer-events-none z-0 transition-opacity duration-300 ${
        theme === 'dark' ? 'bg-purple-600/20' : 'bg-purple-300/30'
      }`} />
      <div className={`fixed top-[45%] right-[15%] w-[35%] h-[35%] rounded-full blur-[140px] pointer-events-none z-0 transition-opacity duration-300 ${
        theme === 'dark' ? 'bg-indigo-600/15' : 'bg-indigo-300/25'
      }`} />

      {/* Sticky Navigation Bar */}
      <Navbar
        onOpenAiModal={() => setAiModalOpen(true)}
        onOpenResumeModal={() => setResumeModalOpen(true)}
        onOpenContactModal={handleOpenContact}
        onBackToPortfolio={handleBackToPortfolio}
        isDetailPage={!!activeProjectId}
      />

      {/* Main Page Content */}
      <main className="flex-1 relative z-10">
        {activeProjectId ? (
          <Suspense fallback={
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-12 text-center">
              <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4" />
              <p className="text-xs font-mono tracking-wider uppercase text-slate-500 dark:text-slate-400">Loading Case Study...</p>
            </div>
          }>
            <ProjectDetailPage
              projectId={activeProjectId}
              onBack={handleBackToPortfolio}
              onSelectProject={handleSelectProject}
              onOpenContactModal={handleOpenContact}
            />
          </Suspense>
        ) : (
          <>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={sectionVariants}>
              <Hero
                onOpenAiModal={() => setAiModalOpen(true)}
                onOpenResumeModal={() => setResumeModalOpen(true)}
                onOpenContactModal={handleOpenContact}
              />
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={sectionVariants}>
              <AboutSummary />
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={sectionVariants}>
              <CompanyLogosShowcase />
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={sectionVariants}>
              <SkillsMatrix />
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={sectionVariants}>
              <FeaturedProjects onSelectProject={handleSelectProject} />
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={sectionVariants}>
              <ExperienceTimeline />
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={sectionVariants}>
              <RoiCalculator onOpenContactModal={handleOpenContact} />
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={sectionVariants}>
              <CertificationsGrid />
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={sectionVariants}>
              <LanguagesAndGlobal />
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={sectionVariants}>
              <ContactSection />
            </motion.div>
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive AI Assistant Modal & Resume Modal */}
      <Suspense fallback={null}>
        <AiAssistantModal
          isOpen={aiModalOpen}
          onClose={() => setAiModalOpen(false)}
          onOpenContactModal={handleOpenContact}
        />

        <ResumeModal
          isOpen={resumeModalOpen}
          onClose={() => setResumeModalOpen(false)}
        />
      </Suspense>

      {/* Floating Quick AI Button at Bottom Right */}
      <button
        onClick={() => setAiModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-2xl shadow-blue-500/40 border border-blue-400/30 flex items-center gap-2 group hover:scale-105 transition-all"
        title="Chat with Anass AI Assistant"
      >
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-xs font-bold hidden sm:inline uppercase tracking-wider">Ask Anass AI</span>
      </button>

    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <MainApp />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

