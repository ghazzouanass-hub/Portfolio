export type SkillCategory = 'all' | 'marketing' | 'design' | 'business' | 'tech';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  level: number; // 1-100
  iconName?: string;
  description: string;
  featured?: boolean;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  period: string;
  category: 'ecommerce' | 'retail' | 'saas' | 'marketing' | 'automation';
  clientOrBrand: string;
  summary: string;
  fullDescription?: string;
  challenge?: string;
  impactMetrics: { label: string; value: string; change?: string }[];
  keyDeliverables: string[];
  techAndTools: string[];
  featuredImage: string;
  galleryImages?: { url: string; caption: string; description?: string }[];
  companyLogo?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  companyLogo?: string;
  location?: string;
  period: string;
  type: 'Full-time' | 'Contract' | 'Hybrid' | 'Founder' | 'Freelance';
  category: 'enterprise' | 'founder' | 'freelance' | 'management';
  highlights: string[];
  skillsUsed: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: 'marketing' | 'ai' | 'tech' | 'design' | 'business';
  verified: boolean;
  link?: string;
}

export interface LanguageSkill {
  name: string;
  level: string;
  percentage: number;
  flag: string;
  description: string;
}

export interface ContactInfo {
  email: string;
  phoneUS: string;
  phoneKuwait: string;
  phoneMorocco: string;
  linkedIn: string;
  location: string;
}
