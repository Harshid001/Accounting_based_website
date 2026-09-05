import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  detectFeatureKeyFromPath,
  FEATURE_GUIDES,
} from '@/lib/featureGuides/featureGuideData';
import type { ButtonGuideItem, FeatureKey } from '@/types/featureGuides';
import { useLanguage } from '@/context/LanguageContext';

export interface FeatureGuideContextValue {
  isGuideOpen: boolean;
  activeGuideFeature: FeatureKey;
  currentFeatureKey: FeatureKey;
  openGuide: (feature?: FeatureKey) => void;
  closeGuide: () => void;
  isTourActive: boolean;
  currentTourFeature: FeatureKey;
  tourStepIndex: number;
  totalTourSteps: number;
  currentTourStep: ButtonGuideItem | null;
  startTour: (feature?: FeatureKey) => void;
  nextTourStep: () => void;
  prevTourStep: () => void;
  stopTour: () => void;
}

const defaultContext: FeatureGuideContextValue = {
  isGuideOpen: false,
  activeGuideFeature: 'dashboard',
  currentFeatureKey: 'dashboard',
  openGuide: () => undefined,
  closeGuide: () => undefined,
  isTourActive: false,
  currentTourFeature: 'dashboard',
  tourStepIndex: 0,
  totalTourSteps: 0,
  currentTourStep: null,
  startTour: () => undefined,
  nextTourStep: () => undefined,
  prevTourStep: () => undefined,
  stopTour: () => undefined,
};

const FeatureGuideContext = createContext<FeatureGuideContextValue>(defaultContext);

export function FeatureGuideProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { language } = useLanguage();

  const currentFeatureKey = useMemo(() => {
    return detectFeatureKeyFromPath(location.pathname);
  }, [location.pathname]);

  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [activeGuideFeature, setActiveGuideFeature] = useState<FeatureKey>(currentFeatureKey);

  const [isTourActive, setIsTourActive] = useState(false);
  const [currentTourFeature, setCurrentTourFeature] = useState<FeatureKey>(currentFeatureKey);
  const [tourStepIndex, setTourStepIndex] = useState(0);

  const openGuide = useCallback(
    (feature?: FeatureKey) => {
      setActiveGuideFeature(feature ?? currentFeatureKey);
      setIsGuideOpen(true);
      // Close tour if starting guide
      setIsTourActive(false);
    },
    [currentFeatureKey],
  );

  const closeGuide = useCallback(() => {
    setIsGuideOpen(false);
  }, []);

  const tourButtons = useMemo(() => {
    const guide = FEATURE_GUIDES[currentTourFeature];
    if (!guide) return [];
    const content = guide.translations[language] ?? guide.translations.en;
    return content.buttons ?? [];
  }, [currentTourFeature, language]);

  const totalTourSteps = tourButtons.length;
  const currentTourStep = tourButtons[tourStepIndex] ?? null;

  const startTour = useCallback(
    (feature?: FeatureKey) => {
      const targetFeature = feature ?? activeGuideFeature ?? currentFeatureKey;
      setCurrentTourFeature(targetFeature);
      setTourStepIndex(0);
      setIsGuideOpen(false); // smoothly close information sheet/modal
      setIsTourActive(true);
    },
    [activeGuideFeature, currentFeatureKey],
  );

  const stopTour = useCallback(() => {
    setIsTourActive(false);
    setTourStepIndex(0);
  }, []);

  const nextTourStep = useCallback(() => {
    setTourStepIndex((current) => {
      if (current + 1 >= totalTourSteps) {
        setIsTourActive(false);
        return 0;
      }
      return current + 1;
    });
  }, [totalTourSteps]);

  const prevTourStep = useCallback(() => {
    setTourStepIndex((current) => Math.max(0, current - 1));
  }, []);

  const value = useMemo<FeatureGuideContextValue>(
    () => ({
      isGuideOpen,
      activeGuideFeature,
      currentFeatureKey,
      openGuide,
      closeGuide,
      isTourActive,
      currentTourFeature,
      tourStepIndex,
      totalTourSteps,
      currentTourStep,
      startTour,
      nextTourStep,
      prevTourStep,
      stopTour,
    }),
    [
      isGuideOpen,
      activeGuideFeature,
      currentFeatureKey,
      openGuide,
      closeGuide,
      isTourActive,
      currentTourFeature,
      tourStepIndex,
      totalTourSteps,
      currentTourStep,
      startTour,
      nextTourStep,
      prevTourStep,
      stopTour,
    ],
  );

  return <FeatureGuideContext.Provider value={value}>{children}</FeatureGuideContext.Provider>;
}

export function useFeatureGuide(): FeatureGuideContextValue {
  return useContext(FeatureGuideContext);
}
