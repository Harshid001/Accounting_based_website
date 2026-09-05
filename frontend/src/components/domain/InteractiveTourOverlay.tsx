import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  Sparkles,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { useFeatureGuide } from '@/context/FeatureGuideContext';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/cn';

interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const UI_TEXT = {
  en: {
    step: 'Step',
    of: 'of',
    next: 'Next Control',
    prev: 'Previous',
    finish: 'Finish Tour',
    exit: 'Exit Tour',
    proTip: 'Pro Tip',
    completedTitle: 'Tour Completed!',
    completedDesc: 'You now know all the key functions of this screen. You can reopen the guide or tour anytime from the Guide button in the header.',
    openGuide: 'Open Full Manual',
    elementNotVisible: 'This control is currently in a collapsed section or requires admin rights.',
  },
  hi: {
    step: 'कदम',
    of: 'का',
    next: 'अगला बटन',
    prev: 'पिछला',
    finish: 'टूर समाप्त करें',
    exit: 'बाहर निकलें',
    proTip: 'सुझाव',
    completedTitle: 'ट्यूटोरियल पूरा हुआ!',
    completedDesc: 'अब आप इस स्क्रीन के सभी मुख्य बटनों के काम से भली-भांति परिचित हैं। आप कभी भी हेडर के "गाइड" बटन से इसे दोबारा देख सकते हैं।',
    openGuide: 'पूर्ण गाइड खोलें',
    elementNotVisible: 'यह बटन वर्तमान में स्क्रीन पर उपलब्ध नहीं है या व्यवस्थापक अधिकार चाहिए।',
  },
  gu: {
    step: 'પગલું',
    of: 'માંથી',
    next: 'આગળનું બટન',
    prev: 'પાછળ',
    finish: 'ટૂર પૂર્ણ કરો',
    exit: 'બહાર નીકળો',
    proTip: 'ઉપયોગી ટિપ',
    completedTitle: 'ટ્યુટોરિયલ પૂર્ણ થયું!',
    completedDesc: 'તમે હવે આ સ્ક્રીનના તમામ મુખ્ય બટનોની કામગીરી સમજી ચૂક્યા છો. તમે હેડરમાં રહેલા "માર્ગદર્શિકા" બટનથી ગમે ત્યારે ફરી આ જોઈ શકો છો.',
    openGuide: 'સંપૂર્ણ ગાઇડ ખોલો',
    elementNotVisible: 'આ કંટ્રોલ હાલમાં સ્ક્રીન પર દેખાતું નથી અથવા એડમિન પરવાનગી જરૂરી છે.',
  },
  mr: {
    step: 'पायरी',
    of: 'पैकी',
    next: 'पुढील बटण',
    prev: 'मागे',
    finish: 'टूर पूर्ण करा',
    exit: 'बाहेर पडा',
    proTip: 'महत्त्वाची टीप',
    completedTitle: 'ट्युटोरियल पूर्ण झाले!',
    completedDesc: 'तुम्ही आता या स्क्रीनवरील सर्व मुख्य बटणांची कार्ये समजून घेतली आहेत. तुम्ही हेडरमधील "मार्गदर्शक" बटणावरून कधीही पुन्हा पाहू शकता.',
    openGuide: 'संपूर्ण माहिती उघडा',
    elementNotVisible: 'हे बटण सध्या स्क्रीनवर उपलब्ध नाही किंवा यासाठी ॲडमिन परवानगी आवश्यक आहे.',
  },
};

export function InteractiveTourOverlay() {
  const {
    isTourActive,
    currentTourStep,
    tourStepIndex,
    totalTourSteps,
    nextTourStep,
    prevTourStep,
    stopTour,
    openGuide,
    activeGuideFeature,
  } = useFeatureGuide();
  const { language } = useLanguage();

  const [rect, setRect] = useState<TargetRect | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const ui = UI_TEXT[language] ?? UI_TEXT.en;

  // Scroll element into view when tour step changes
  useEffect(() => {
    if (!isTourActive || !currentTourStep) return;

    const timer = window.setTimeout(() => {
      try {
        const el = document.querySelector(currentTourStep.selector);
        if (el) {
          const r = el.getBoundingClientRect();
          const inViewport =
            r.top >= 60 &&
            r.bottom <= (window.innerHeight || document.documentElement.clientHeight) - 60;
          if (!inViewport) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      } catch {
        // ignore selector errors
      }
    }, 50);

    return () => window.clearTimeout(timer);
  }, [isTourActive, currentTourStep]);

  // Handle Target Rect calculation and real-time scroll/resize tracking
  useEffect(() => {
    if (!isTourActive || !currentTourStep) return;

    const updateRect = () => {
      try {
        const el = document.querySelector(currentTourStep.selector);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.height > 0) {
            setRect({
              top: r.top,
              left: r.left,
              width: r.width,
              height: r.height,
            });
            return;
          }
        }
        setRect(null);
      } catch {
        setRect(null);
      }
    };

    const animFrame = window.requestAnimationFrame(updateRect);
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, true);

    return () => {
      window.cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect, true);
    };
  }, [isTourActive, currentTourStep]);

  // Keyboard navigation
  useEffect(() => {
    if (!isTourActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        stopTour();
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (tourStepIndex + 1 >= totalTourSteps) {
          setIsCompleted(true);
        } else {
          nextTourStep();
        }
      } else if (e.key === 'ArrowLeft') {
        prevTourStep();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTourActive, tourStepIndex, totalTourSteps, nextTourStep, prevTourStep, stopTour]);

  if (!isTourActive) return null;

  // Position calculation for popover card
  let popoverStyle: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999,
  };

  if (rect) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const popoverWidth = Math.min(420, viewportWidth - 32);
    const popoverHeight = 280;

    // Viewport-relative center of target element
    const targetCenterX = rect.left + rect.width / 2;
    let computedLeft = targetCenterX - popoverWidth / 2;

    // Place below target by default
    let computedTop = rect.top + rect.height + 14;

    // If overflowing bottom of viewport, place above target
    if (computedTop + popoverHeight > viewportHeight - 20) {
      computedTop = Math.max(16, rect.top - popoverHeight - 14);
    }

    // Horizontal bounds protection
    if (computedLeft < 16) {
      computedLeft = 16;
    } else if (computedLeft + popoverWidth > viewportWidth - 16) {
      computedLeft = viewportWidth - popoverWidth - 16;
    }

    popoverStyle = {
      position: 'fixed',
      top: `${computedTop}px`,
      left: `${computedLeft}px`,
      width: `${popoverWidth}px`,
      zIndex: 9999,
    };
  }

  const handleNextOrFinish = () => {
    if (tourStepIndex + 1 >= totalTourSteps) {
      setIsCompleted(true);
    } else {
      nextTourStep();
    }
  };

  const progressPercent = Math.round(((tourStepIndex + 1) / totalTourSteps) * 100);

  return (
    <div className="fixed inset-0 z-[9990] select-none" aria-modal="true" role="dialog">
      {/* Invisible backdrop click catcher to exit tour */}
      <button
        type="button"
        aria-label={ui.exit}
        className="fixed inset-0 h-full w-full cursor-default border-none bg-transparent outline-none"
        style={{ zIndex: 9990 }}
        onClick={stopTour}
      />

      {/* SVG Masked Backdrop: Darkens outside, keeps target hole 100% crystal clear & unblurred */}
      <svg
        className="fixed inset-0 h-full w-full pointer-events-none transition-all duration-300"
        style={{ zIndex: 9991 }}
        aria-hidden="true"
      >
        <defs>
          <mask id="tour-spotlight-mask">
            {/* White fills entire viewport (makes dark backdrop visible) */}
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {/* Black cuts out a 100% transparent, unblurred cutout hole */}
            {rect && (
              <rect
                x={Math.max(0, rect.left - 6)}
                y={Math.max(0, rect.top - 6)}
                width={rect.width + 12}
                height={rect.height + 12}
                rx="12"
                ry="12"
                fill="black"
              />
            )}
          </mask>
        </defs>
        {/* Shaded backdrop rectangle with cutout mask */}
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(5, 8, 16, 0.74)"
          mask="url(#tour-spotlight-mask)"
        />
      </svg>

      {/* Spotlight frame with bright illumination and glowing borders */}
      {rect && (
        <div
          style={{
            position: 'fixed',
            top: `${Math.max(0, rect.top - 6)}px`,
            left: `${Math.max(0, rect.left - 6)}px`,
            width: `${rect.width + 12}px`,
            height: `${rect.height + 12}px`,
            borderRadius: '12px',
            zIndex: 9993,
            transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
          }}
          className="pointer-events-none border-2 border-indigo-400 ring-4 ring-indigo-500/25 shadow-[0_0_35px_rgba(99,102,241,0.5),inset_0_0_20px_rgba(255,255,255,0.06)] bg-white/[0.04]"
        >
          {/* Animated beacon ring */}
          <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-500 shadow-md ring-2 ring-white" />
          </span>
        </div>
      )}

      {/* Tour Completed Modal Card */}
      {isCompleted ? (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            width: '90%',
            maxWidth: '440px',
          }}
          className="rounded-2xl border border-[var(--fd-border)] bg-[var(--fd-surface-1)] p-6 shadow-2xl text-center space-y-4"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-lg font-bold text-[var(--fd-text-primary)]">
              {ui.completedTitle}
            </h3>
            <p className="text-xs text-[var(--fd-text-secondary)] leading-relaxed">
              {ui.completedDesc}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setIsCompleted(false);
                stopTour();
                openGuide(activeGuideFeature);
              }}
              className="rounded-lg border border-[var(--fd-border)] bg-[var(--fd-surface-2)] px-4 py-2 text-xs font-semibold text-[var(--fd-text-primary)] hover:bg-[var(--fd-surface-3)] transition-colors"
            >
              {ui.openGuide}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsCompleted(false);
                stopTour();
              }}
              className="rounded-lg bg-[var(--fd-accent)] px-5 py-2 text-xs font-bold text-white hover:bg-[var(--fd-accent-hover)] transition-colors shadow-sm"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        /* Floating Interactive Step Popover Card */
        <div
          ref={cardRef}
          style={popoverStyle}
          className={cn(
            'flex flex-col rounded-2xl border border-indigo-500/40 bg-[var(--fd-surface-1)] shadow-2xl overflow-hidden',
            'transition-all duration-200 animate-in fade-in zoom-in-95',
          )}
        >
          {/* Progress Bar at top of card */}
          <div className="h-1.5 w-full bg-[var(--fd-surface-3)]">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="p-4 sm:p-5 space-y-3.5">
            {/* Step Counter & Controls */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-bold text-indigo-400 border border-indigo-500/20">
                  <Sparkles className="h-3 w-3" />
                  <span>
                    {ui.step} {tourStepIndex + 1} {ui.of} {totalTourSteps}
                  </span>
                </span>
                {!rect && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-400">
                    <HelpCircle className="h-2.5 w-2.5" />
                    <span>Control</span>
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={stopTour}
                aria-label={ui.exit}
                className="rounded-md p-1 text-[var(--fd-text-tertiary)] hover:bg-[var(--fd-surface-3)] hover:text-[var(--fd-text-primary)] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Target Button Name & Explanation */}
            {currentTourStep && (
              <div className="space-y-1.5">
                <h4 className="text-base font-bold text-[var(--fd-text-primary)] flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-600/20 text-indigo-400 text-xs font-bold">
                    #{tourStepIndex + 1}
                  </span>
                  <span>{currentTourStep.name}</span>
                </h4>
                <p className="text-xs text-[var(--fd-text-secondary)] leading-relaxed">
                  {currentTourStep.description}
                </p>

                {!rect && (
                  <div className="mt-1 text-[11px] text-amber-400/90 italic">
                    {ui.elementNotVisible}
                  </div>
                )}
              </div>
            )}

            {/* Pro Tip Callout */}
            {currentTourStep?.proTip && (
              <div className="flex items-start gap-1.5 rounded-lg bg-[var(--fd-surface-2)] p-2.5 text-[11px] text-[var(--fd-text-secondary)] border border-[var(--fd-border-subtle)]">
                <Lightbulb className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[var(--fd-text-primary)]">{ui.proTip}:</strong>{' '}
                  {currentTourStep.proTip}
                </span>
              </div>
            )}

            {/* Navigation Footer */}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-[var(--fd-border-subtle)]">
              <button
                type="button"
                onClick={stopTour}
                className="text-xs font-medium text-[var(--fd-text-tertiary)] hover:text-[var(--fd-text-primary)] transition-colors"
              >
                {ui.exit}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevTourStep}
                  disabled={tourStepIndex === 0}
                  className="inline-flex items-center gap-1 rounded-lg border border-[var(--fd-border)] bg-[var(--fd-surface-2)] px-2.5 py-1.5 text-xs font-semibold text-[var(--fd-text-secondary)] hover:bg-[var(--fd-surface-3)] hover:text-[var(--fd-text-primary)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="h-3 w-3" />
                  <span className="hidden sm:inline">{ui.prev}</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextOrFinish}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-500 transition-all"
                >
                  <span>
                    {tourStepIndex + 1 >= totalTourSteps ? ui.finish : ui.next}
                  </span>
                  {tourStepIndex + 1 < totalTourSteps && (
                    <ArrowRight className="h-3 w-3" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
