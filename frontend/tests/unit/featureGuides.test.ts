import { describe, expect, it } from 'vitest';

import {
  detectFeatureKeyFromPath,
  FEATURE_GUIDES,
} from '@/lib/featureGuides/featureGuideData';
import type { FeatureKey } from '@/types/featureGuides';

const SUPPORTED_LANGUAGES = ['en', 'hi', 'gu', 'mr'] as const;

const EXPECTED_FEATURES: FeatureKey[] = [
  'dashboard',
  'clients',
  'tasks',
  'compliance',
  'documents',
  'requests',
  'messages',
  'myWork',
  'reports',
  'notifications',
  'settings',
  'portal',
];

describe('FEATURE_GUIDES configuration', () => {
  it('contains entries for all core application features', () => {
    for (const key of EXPECTED_FEATURES) {
      expect(FEATURE_GUIDES[key]).toBeDefined();
      expect(FEATURE_GUIDES[key].id).toBe(key);
      expect(FEATURE_GUIDES[key].defaultRoute).toBeTruthy();
    }
  });

  it('provides translations for all 4 supported languages for every feature', () => {
    for (const key of EXPECTED_FEATURES) {
      const guide = FEATURE_GUIDES[key];
      for (const lang of SUPPORTED_LANGUAGES) {
        const content = guide.translations[lang];
        expect(content, `Missing ${lang} translation for ${key}`).toBeDefined();
        expect(content.title.length).toBeGreaterThan(0);
        expect(content.subtitle.length).toBeGreaterThan(0);
        expect(content.badge.length).toBeGreaterThan(0);
        expect(content.simpleExplanation.length).toBeGreaterThan(20);
        expect(content.whyItMatters.length).toBeGreaterThan(10);
        expect(content.howItWorks.length).toBeGreaterThanOrEqual(1);
        expect(content.buttons.length).toBeGreaterThanOrEqual(1);

        for (const btn of content.buttons) {
          expect(btn.id).toBeTruthy();
          expect(btn.name).toBeTruthy();
          expect(btn.selector).toMatch(/^\[data-tour="[\w-]+"]$/);
          expect(btn.description.length).toBeGreaterThan(5);
        }
      }
    }
  });
});

describe('detectFeatureKeyFromPath', () => {
  it('detects correct feature key from pathnames', () => {
    expect(detectFeatureKeyFromPath('/dashboard')).toBe('dashboard');
    expect(detectFeatureKeyFromPath('/my-work')).toBe('myWork');
    expect(detectFeatureKeyFromPath('/clients')).toBe('clients');
    expect(detectFeatureKeyFromPath('/clients/123/edit')).toBe('clients');
    expect(detectFeatureKeyFromPath('/tasks')).toBe('tasks');
    expect(detectFeatureKeyFromPath('/tasks/abc')).toBe('tasks');
    expect(detectFeatureKeyFromPath('/compliance')).toBe('compliance');
    expect(detectFeatureKeyFromPath('/compliance/generate')).toBe('compliance');
    expect(detectFeatureKeyFromPath('/documents')).toBe('documents');
    expect(detectFeatureKeyFromPath('/requests')).toBe('requests');
    expect(detectFeatureKeyFromPath('/messages')).toBe('messages');
    expect(detectFeatureKeyFromPath('/reports/compliance')).toBe('reports');
    expect(detectFeatureKeyFromPath('/reports/workload')).toBe('reports');
    expect(detectFeatureKeyFromPath('/notifications')).toBe('notifications');
    expect(detectFeatureKeyFromPath('/settings/firm')).toBe('settings');
    expect(detectFeatureKeyFromPath('/settings/users')).toBe('settings');
    expect(detectFeatureKeyFromPath('/portal')).toBe('portal');
    expect(detectFeatureKeyFromPath('/portal/documents')).toBe('portal');
  });

  it('falls back to dashboard for root or unrecognized path', () => {
    expect(detectFeatureKeyFromPath('/')).toBe('dashboard');
    expect(detectFeatureKeyFromPath('/unknown-path')).toBe('dashboard');
  });
});
