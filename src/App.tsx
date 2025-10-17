import { useState } from "react";
import { motion } from "motion/react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { FeatureSection } from "./components/FeatureSection";
import { MissionSection } from "./components/MissionSection";
import { SupportSection } from "./components/SupportSection";
import { VaultPage } from "./components/VaultPage";
import { AuthDialog } from "./components/AuthDialog";
import { CustomCursor } from "./components/CustomCursor";

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'vault'>('landing');
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleNavigate = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  const handleShowVault = () => {
    setCurrentPage('vault');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  if (currentPage === 'vault') {
    return <VaultPage onBack={handleBackToLanding} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Header 
        onNavigate={handleNavigate}
        onShowVault={handleShowVault}
      />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <HeroSection onAuthClick={handleAuthClick} />
        <AboutSection />
        <FeatureSection />
        <MissionSection />
      </motion.main>

      <SupportSection />

      <AuthDialog 
        open={authOpen} 
        onOpenChange={setAuthOpen}
        mode={authMode}
        onModeChange={setAuthMode}
      />

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-accent/5">
        <div className="container mx-auto px-6 text-center">
          <div className="text-2xl font-bold mb-4">Vault</div>
          <p className="text-muted-foreground mb-6">
            Your privacy, our priority. Always.
          </p>
          <div className="text-sm text-muted-foreground">
            © 2025 Vault. Built with respect for your privacy.
          </div>
        </div>
      </footer>
    </div>
  );
}