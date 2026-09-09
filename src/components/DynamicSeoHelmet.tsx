import React, { useMemo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PERSONAL_INFO, CONTACT_INFO, FEATURED_PROJECTS } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

interface DynamicSeoHelmetProps {
  activeProjectId: string | null;
}

interface SectionMetadata {
  title: string;
  description: string;
  keywords: string;
  breadcrumbName: string;
}

const SECTION_METADATA_MAP: Record<string, SectionMetadata> = {
  hero: {
    title: `${PERSONAL_INFO.name} — Digital Marketing Specialist • Growth & E-Commerce Founder`,
    description: `Executive portfolio of ${PERSONAL_INFO.name}: 7+ years scaling digital marketing ROI, e-commerce ventures (Boostega LLC, Smmcent LTD), Python web automation, and multi-channel ad campaigns.`,
    keywords: `${PERSONAL_INFO.name}, Digital Marketing Specialist, E-Commerce Founder, Paid Media Director, Google Ads, Meta Ads, Python Automation, Kuwait, Morocco, Boostega LLC`,
    breadcrumbName: 'Home'
  },
  about: {
    title: `About ${PERSONAL_INFO.name} — Digital Marketing Specialist & E-Commerce Founder`,
    description: `Learn about ${PERSONAL_INFO.name}'s track record: founding 2 digital businesses from zero, managing $500K+ in ad spend, and engineering custom Python web automation.`,
    keywords: `About ${PERSONAL_INFO.name}, Digital Marketing Background, Boostega LLC Founder, Smmcent LTD, Lulu Hypermarket Marketing, E-commerce Kuwait`,
    breadcrumbName: 'About'
  },
  companies: {
    title: `Companies, Brands & Clients — ${PERSONAL_INFO.name} Portfolio`,
    description: `Explore companies and brands built and managed by ${PERSONAL_INFO.name}: Lulu Hypermarket, MAK United, Boostega LLC, Smmcent LTD, CosmetikLab, Rare Design, and Support Print.`,
    keywords: `${PERSONAL_INFO.name} Clients, Companies Managed, Lulu Hypermarket Kuwait, Boostega LLC, MAK United, Smmcent LTD, CosmetikLab Morocco, Roland Engraving`,
    breadcrumbName: 'Companies & Brands'
  },
  skills: {
    title: `Technical Skills & AI Prompt Masterclass — ${PERSONAL_INFO.name}`,
    description: `Comprehensive technical skill set: Google Ads, Meta Ads, AI Prompt Masterclass workflows, Python web scraping, Adobe Illustrator, Shopify, and Conversion Rate Optimization (CRO).`,
    keywords: `Digital Marketing Skills, AI Prompt Masterclass, Google Ads Certification, Meta Blueprint, Python Scraping, Shopify Liquid, Adobe Illustrator Branding`,
    breadcrumbName: 'Skills & Stacks'
  },
  projects: {
    title: `Featured Projects & Case Studies — ${PERSONAL_INFO.name}`,
    description: `Real-world case studies in Python catalogue scraping, 60%+ organic revenue growth, high-converting Meta ad funnels, and custom WordPress plugins.`,
    keywords: `Digital Marketing Case Studies, Web Scraping Projects, E-commerce Platform Architecture, Meta Ads Case Study, Python Automation Examples`,
    breadcrumbName: 'Featured Case Studies'
  },
  experience: {
    title: `Work Experience & Career Timeline — ${PERSONAL_INFO.name}`,
    description: `Detailed career history: Social Media Manager at MAK United, Founder & CEO at Boostega LLC, Digital Marketing Specialist at Lulu Hypermarket Kuwait, and E-commerce Lead.`,
    keywords: `${PERSONAL_INFO.name} Resume, Career Experience, Marketing Specialist Experience, E-commerce Founder Track Record, Lulu Hypermarket Regional Office`,
    breadcrumbName: 'Work Experience'
  },
  'roi-calculator': {
    title: `Interactive Marketing ROAS & ROI Calculator — ${PERSONAL_INFO.name}`,
    description: `Simulate your paid ad campaigns, calculate customer lifetime value (LTV), target cost per acquisition (CPA), and projected monthly revenue with ${PERSONAL_INFO.name}'s ROI model.`,
    keywords: `Marketing ROI Calculator, ROAS Calculator, Paid Ads Return Simulator, CPA Estimator, E-commerce Profit Calculator, ${PERSONAL_INFO.name}`,
    breadcrumbName: 'ROI Calculator'
  },
  certifications: {
    title: `50+ Professional Certifications & Credentials — ${PERSONAL_INFO.name}`,
    description: `Verified certifications in AI Prompt Engineering, Google Ads, Meta Certified Media Planning, Advanced Python Automation, SEO 2024, and Graphic Design.`,
    keywords: `${PERSONAL_INFO.name} Certifications, Google Ads Certified, Meta Blueprint Certified, AI MasterClass Certification, Udemy Verified Credentials, OFPPT Diploma`,
    breadcrumbName: 'Certifications'
  },
  languages: {
    title: `Multilingual & Global Market Reach — ${PERSONAL_INFO.name}`,
    description: `Fluent in Arabic (Native), English (Professional Working), French (Fluent), and Moroccan Darija, managing global campaigns across Middle East, GCC, US, and Europe.`,
    keywords: `Multilingual Marketer, Arabic Digital Marketing, English Marketing Specialist, French Marketing Agency, GCC E-commerce, Kuwait Digital Marketer`,
    breadcrumbName: 'Global Reach'
  },
  contact: {
    title: `Contact & Hire ${PERSONAL_INFO.name} — Digital Marketing & Growth`,
    description: `Get in touch with ${PERSONAL_INFO.name} for growth marketing consultancy, e-commerce platform scaling, paid media management, and Python scraping automation.`,
    keywords: `Contact ${PERSONAL_INFO.name}, Hire Digital Marketing Specialist Kuwait, E-commerce Consultant, Performance Marketer for Hire, Kuwait Marketing Director`,
    breadcrumbName: 'Contact'
  }
};

const SECTION_IDS = [
  'hero',
  'about',
  'companies',
  'skills',
  'projects',
  'experience',
  'roi-calculator',
  'certifications',
  'languages',
  'contact'
];

export const DynamicSeoHelmet: React.FC<DynamicSeoHelmetProps> = ({ activeProjectId }) => {
  const { currentLanguage } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [currentUrl, setCurrentUrl] = useState<string>('https://anassghazzou.com');
  const [originUrl, setOriginUrl] = useState<string>('https://anassghazzou.com');

  // Track base window URL safely
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
      setOriginUrl(window.location.origin);
    }
  }, [activeProjectId]);

  // Section Observer for scrolling on home page
  useEffect(() => {
    if (activeProjectId || typeof window === 'undefined') return;

    // Check hash on mount or hash change
    const checkHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && SECTION_METADATA_MAP[hash]) {
        setActiveSection(hash);
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);

    // Setup intersection observer for scroll-based section detection
    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Find the most visible section currently intersecting
      const visibleEntries = entries.filter((e) => e.isIntersecting);
      if (visibleEntries.length > 0) {
        // Sort by intersection ratio or proximity to viewport top
        visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const dominant = visibleEntries[0];
        const sectionId = dominant.target.id;
        if (sectionId && SECTION_METADATA_MAP[sectionId]) {
          setActiveSection(sectionId);
        }
      } else if (window.scrollY < 200) {
        setActiveSection('hero');
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-15% 0px -45% 0px',
      threshold: [0.1, 0.3, 0.6]
    });

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('hashchange', checkHash);
      observer.disconnect();
    };
  }, [activeProjectId]);

  // Find active project if route is active
  const currentProject = useMemo(() => {
    if (!activeProjectId) return null;
    return FEATURED_PROJECTS.find((p) => p.id === activeProjectId) || null;
  }, [activeProjectId]);

  // Compute dynamic metadata values
  const seoData = useMemo(() => {
    if (currentProject) {
      const title = `${currentProject.title} — ${currentProject.role} Case Study | ${PERSONAL_INFO.name}`;
      const metricsText = currentProject.impactMetrics?.length
        ? ` • Key Impact: ${currentProject.impactMetrics.map((m) => `${m.label}: ${m.value}`).join(', ')}`
        : '';
      const toolsText = currentProject.techAndTools?.length
        ? ` • Tools & Stack: ${currentProject.techAndTools.slice(0, 5).join(', ')}`
        : '';
      const description = `${currentProject.summary}${metricsText}${toolsText}`;
      const keywords = `${PERSONAL_INFO.name}, ${currentProject.title}, ${currentProject.clientOrBrand || ''}, ${currentProject.role}, ${currentProject.category}, ${(currentProject.techAndTools || []).join(', ')}, Case Study, Growth Marketing, E-commerce, Kuwait`;
      const canonicalUrl = `${originUrl}/#project-${currentProject.id}`;
      const ogImage = currentProject.featuredImage || currentProject.companyLogo || PERSONAL_INFO.avatarUrl;

      return {
        isProject: true,
        title,
        description,
        keywords,
        canonicalUrl,
        ogTitle: `${currentProject.title} | ${PERSONAL_INFO.name} Case Study`,
        ogDescription: currentProject.summary,
        ogType: 'article' as const,
        ogImage,
        ogImageAlt: `${currentProject.title} Case Study Preview`,
        breadcrumbName: currentProject.title,
        project: currentProject
      };
    }

    const sectionMeta = SECTION_METADATA_MAP[activeSection] || SECTION_METADATA_MAP['hero'];
    const canonicalUrl = activeSection === 'hero' ? `${originUrl}/` : `${originUrl}/#${activeSection}`;

    return {
      isProject: false,
      title: sectionMeta.title,
      description: sectionMeta.description,
      keywords: sectionMeta.keywords,
      canonicalUrl,
      ogTitle: sectionMeta.title,
      ogDescription: sectionMeta.description,
      ogType: 'website' as const,
      ogImage: PERSONAL_INFO.avatarUrl,
      ogImageAlt: `${PERSONAL_INFO.name} - Executive Portrait`,
      breadcrumbName: sectionMeta.breadcrumbName,
      project: null
    };
  }, [currentProject, activeSection, originUrl]);

  // Schema.org Person Schema
  const personSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSONAL_INFO.name,
    jobTitle: PERSONAL_INFO.title,
    description: PERSONAL_INFO.summary,
    image: PERSONAL_INFO.avatarUrl,
    email: CONTACT_INFO.email,
    telephone: CONTACT_INFO.phoneUS,
    sameAs: [
      CONTACT_INFO.linkedIn,
      'https://github.com/anassghazzou'
    ].filter(Boolean),
    knowsAbout: [
      'Digital Marketing',
      'SEO & SEM',
      'Google Ads & Meta Ads Manager',
      'E-commerce Growth & Shopify Liquid',
      'Python Automation & Web Scraping',
      'AI Prompt Engineering & Masterclass',
      'Brand Identity & Adobe Illustrator'
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kuwait City',
      addressCountry: 'Kuwait'
    },
    worksFor: [
      {
        '@type': 'Organization',
        name: 'MAK United W.L.L',
        url: 'https://makunited.com'
      },
      {
        '@type': 'Organization',
        name: 'Boostega LLC'
      }
    ]
  }), []);

  // Schema.org Professional Service Schema
  const serviceSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${PERSONAL_INFO.name} — Growth & Digital Marketing Consultancy`,
    image: PERSONAL_INFO.avatarUrl,
    description: PERSONAL_INFO.bioShort,
    telephone: CONTACT_INFO.phoneUS,
    email: CONTACT_INFO.email,
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'Kuwait'
    },
    areaServed: ['Kuwait', 'USA', 'Morocco', 'Global'],
    provider: {
      '@type': 'Person',
      name: PERSONAL_INFO.name
    }
  }), []);

  // Schema.org BreadcrumbList Schema
  const breadcrumbSchema = useMemo(() => {
    if (seoData.isProject && seoData.project) {
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${originUrl}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Featured Projects',
            item: `${originUrl}/#projects`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: seoData.project.title,
            item: `${originUrl}/#project-${seoData.project.id}`
          }
        ]
      };
    }

    if (activeSection !== 'hero') {
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${originUrl}/`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: seoData.breadcrumbName,
            item: `${originUrl}/#${activeSection}`
          }
        ]
      };
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${originUrl}/`
        }
      ]
    };
  }, [seoData, activeSection, originUrl]);

  // Schema.org Project / Article Schema
  const projectSchema = useMemo(() => {
    if (!seoData.isProject || !seoData.project) return null;
    const proj = seoData.project;
    return {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: proj.title,
      alternativeHeadline: proj.subtitle,
      description: proj.fullDescription || proj.summary,
      image: proj.featuredImage || proj.companyLogo || PERSONAL_INFO.avatarUrl,
      author: {
        '@type': 'Person',
        name: PERSONAL_INFO.name,
        url: CONTACT_INFO.linkedIn
      },
      creator: {
        '@type': 'Person',
        name: PERSONAL_INFO.name
      },
      publisher: {
        '@type': 'Organization',
        name: proj.clientOrBrand || 'Boostega LLC',
        logo: {
          '@type': 'ImageObject',
          url: proj.companyLogo || PERSONAL_INFO.avatarUrl
        }
      },
      keywords: proj.techAndTools?.join(', ') || '',
      articleSection: proj.category,
      about: {
        '@type': 'Thing',
        name: proj.challenge || proj.title
      },
      url: `${originUrl}/#project-${proj.id}`
    };
  }, [seoData, originUrl]);

  // Schema.org WebSite Schema
  const websiteSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${PERSONAL_INFO.name} — Portfolio`,
    url: `${originUrl}/`,
    description: PERSONAL_INFO.summary,
    inLanguage: currentLanguage.code
  }), [originUrl, currentLanguage.code]);

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{seoData.title}</title>
      <meta name="title" content={seoData.title} />
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords} />
      <meta name="author" content={PERSONAL_INFO.name} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={seoData.canonicalUrl} />

      {/* Open Graph / Facebook Meta Tags */}
      <meta property="og:site_name" content={`${PERSONAL_INFO.name} Portfolio`} />
      <meta property="og:type" content={seoData.ogType} />
      <meta property="og:title" content={seoData.ogTitle} />
      <meta property="og:description" content={seoData.ogDescription} />
      <meta property="og:url" content={seoData.canonicalUrl} />
      <meta property="og:image" content={seoData.ogImage} />
      <meta property="og:image:alt" content={seoData.ogImageAlt} />
      <meta property="og:locale" content={currentLanguage.code === 'ar' ? 'ar_KW' : currentLanguage.code === 'fr' ? 'fr_FR' : 'en_US'} />

      {/* Article Specific Open Graph Tags when on a Project Page */}
      {seoData.isProject && seoData.project && (
        <>
          <meta property="article:author" content={PERSONAL_INFO.name} />
          <meta property="article:section" content={seoData.project.category} />
          {seoData.project.techAndTools?.map((tool) => (
            <meta key={tool} property="article:tag" content={tool} />
          ))}
        </>
      )}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.ogTitle} />
      <meta name="twitter:description" content={seoData.ogDescription} />
      <meta name="twitter:image" content={seoData.ogImage} />
      <meta name="twitter:image:alt" content={seoData.ogImageAlt} />
      <meta name="twitter:creator" content="@anassghazzou" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      {projectSchema && (
        <script type="application/ld+json">
          {JSON.stringify(projectSchema)}
        </script>
      )}
    </Helmet>
  );
};
