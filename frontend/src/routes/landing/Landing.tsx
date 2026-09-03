import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import { RouteAnnouncer, SkipLink } from '@/components/domain/SkipLink';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useSession } from '@/context/SessionContext';
import { homePathFor } from '@/lib/permissions';

import { LandingNavbar } from './components/LandingNavbar';
import { HeroSection } from './components/HeroSection';
import { InteractiveProductShowcase } from './components/InteractiveProductShowcase';
import { ComplianceRadarSection } from './components/ComplianceRadarSection';
import { BentoFeaturesSection } from './components/BentoFeaturesSection';
import { DualExperienceSection } from './components/DualExperienceSection';
import { EntityRoadmapWidget } from './components/EntityRoadmapWidget';
import { SecurityTrustSection } from './components/SecurityTrustSection';
import { FaqSection } from './components/FaqSection';
import { CtaBanner } from './components/CtaBanner';
import { LandingFooter } from './components/LandingFooter';

export function Landing() {
  usePageTitle('Statutory Practice Operations & Client Portal');
  const { status, user } = useSession();

  const isAuthenticated = status === 'authenticated' && user !== null;
  const userHome = isAuthenticated ? homePathFor(user.role) : '/dashboard';

  return (
    <div className="flex min-h-dvh flex-col bg-[var(--fd-bg)] text-[var(--fd-text-primary)]">
      <SkipLink />

      {/* Authenticated Fast Banner */}
      {isAuthenticated && (
        <div className="border-b border-[var(--fd-border-subtle)] bg-[var(--fd-accent-subtle-bg)] px-4 py-2 text-center text-xs font-medium text-[var(--fd-accent)]">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-2">
            <span>
              Signed in as <strong>{user.name}</strong> ({user.role === 'client' ? 'Client' : 'Practice Staff'}).
            </span>
            <Link
              to={userHome}
              className="inline-flex items-center gap-1 font-bold underline underline-offset-2 hover:text-[var(--fd-accent-hover)]"
            >
              <span>Go to your {user.role === 'client' ? 'Client Portal' : 'Workspace'}</span>
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}

      {/* Navigation */}
      <LandingNavbar />

      {/* Main Content */}
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <HeroSection />
        <InteractiveProductShowcase />
        <ComplianceRadarSection />
        <BentoFeaturesSection />
        <DualExperienceSection />
        <EntityRoadmapWidget />
        <SecurityTrustSection />
        <FaqSection />
        <CtaBanner />
      </main>

      {/* Footer */}
      <LandingFooter />

      <RouteAnnouncer />
    </div>
  );
}
