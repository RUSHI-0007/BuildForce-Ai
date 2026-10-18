import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { SocialProof } from './components/SocialProof';
import { InteractiveAgentTabs } from './components/InteractiveAgentTabs';
import { FeaturesGrid } from './components/FeaturesGrid';
import { EnterpriseStats } from './components/EnterpriseStats';
import { Footer } from './components/Footer';
import { BuildSitePortal } from './components/portal/BuildSitePortal';
import { LoginPage } from './pages/auth/LoginPage';
import { AskBuildForceAIChat } from './components/AskBuildForceAIChat';
import { DemoRequestModal, VideoPlayerModal } from './components/Modals';

export function App() {
  // Views: 'landing' | 'portal' | 'login'
  const [currentView, setCurrentView] = useState('portal'); // Default to portal so user directly sees the rebuilt system
  const [initialAgentForPortal, setInitialAgentForPortal] = useState(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Switch to portal with a specific agent highlighted
  const handleLaunchPortalWithAgent = (agentId) => {
    setInitialAgentForPortal(agentId);
    setCurrentView('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLaunchGeneralPortal = () => {
    setInitialAgentForPortal(null);
    setCurrentView('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AuthProvider>
      <AppProvider>
        <div className="app-container" style={{ minHeight: '100vh' }}>
          {currentView === 'landing' ? (
            <>
              {/* Top Bar & Navbar */}
              <Navbar 
                currentView={currentView}
                setCurrentView={setCurrentView}
                onOpenDemoModal={() => setIsDemoModalOpen(true)}
                onOpenVideoModal={() => setIsVideoModalOpen(true)}
              />

              {/* Hero Section */}
              <LandingHero 
                onOpenDemoModal={() => setIsDemoModalOpen(true)}
                onOpenVideoModal={() => setIsVideoModalOpen(true)}
                onLaunchPortal={handleLaunchGeneralPortal}
              />

              {/* Trusted Partners Proof Bar */}
              <SocialProof />

              {/* "Win projects, and deliver them with ✦ AI agents" */}
              <InteractiveAgentTabs 
                onLaunchPortalWithAgent={handleLaunchPortalWithAgent}
              />

              {/* Bento Grid */}
              <FeaturesGrid 
                onLaunchPortalWithAgent={handleLaunchPortalWithAgent}
              />

              {/* Enterprise Security & Stats */}
              <EnterpriseStats />

              {/* Footer */}
              <Footer 
                onOpenDemoModal={() => setIsDemoModalOpen(true)}
                onLaunchPortal={handleLaunchGeneralPortal}
              />
            </>
          ) : currentView === 'login' ? (
            <LoginPage 
              onLoginSuccess={() => setCurrentView('portal')}
            />
          ) : (
            /* Full Working Powerplay-Architecture Portal */
            <BuildSitePortal 
              onBackToLanding={() => setCurrentView('landing')}
              initialAgent={initialAgentForPortal}
            />
          )}

          {/* Floating Construction AI Copilot Assistant */}
          {currentView === 'landing' && <AskBuildForceAIChat />}

          {/* Interactive Modals */}
          <DemoRequestModal 
            isOpen={isDemoModalOpen}
            onClose={() => setIsDemoModalOpen(false)}
            onLaunchPortal={handleLaunchGeneralPortal}
          />

          <VideoPlayerModal 
            isOpen={isVideoModalOpen}
            onClose={() => setIsVideoModalOpen(false)}
          />
        </div>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
