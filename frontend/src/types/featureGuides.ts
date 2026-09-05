import type { Language } from '@/context/LanguageContext';

export type FeatureKey =
  | 'dashboard'
  | 'myWork'
  | 'clients'
  | 'tasks'
  | 'compliance'
  | 'documents'
  | 'requests'
  | 'messages'
  | 'reports'
  | 'notifications'
  | 'settings'
  | 'portal';

export interface ButtonGuideItem {
  id: string;
  selector: string;
  name: string;
  description: string;
  proTip?: string;
  iconName?: string;
}

export interface WorkflowStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface FeatureGuideContent {
  title: string;
  subtitle: string;
  badge: string;
  simpleExplanation: string;
  whyItMatters: string;
  howItWorks: WorkflowStep[];
  buttons: ButtonGuideItem[];
  proTips: string[];
}

export interface FeatureGuide {
  id: FeatureKey;
  defaultRoute: string;
  iconName: string;
  translations: Record<Language, FeatureGuideContent>;
}
