import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";

const privacyMessages = [
  "We don't sell your data",
  "We don't show ads", 
  "We don't invasively track",
  "We value your privacy",
  "Your second mind, private to you and only you",
  "Full disclosure of the accounts we need access to, to make your Vault functional for you"
];

interface HeroSectionProps {
  onAuthClick: (mode: 'login' | 'register') => void;
}

export function HeroSection({ onAuthClick }: HeroSectionProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % privacyMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate opacity for hero text - fade in as header text fades out
  const heroOpacity = Math.min(1, Math.max(0, (scrollY - 200) / 200));

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/20" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold text-foreground mb-8"
            style={{ opacity: heroOpacity }}
          >
            Vault
          </motion.h1>
          
          <div className="h-16 flex items-center justify-center mb-12">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentMessageIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-2xl text-muted-foreground max-w-2xl"
              >
                {privacyMessages[currentMessageIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg" 
              className="px-8 py-6 text-lg"
              onClick={() => onAuthClick('register')}
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-6 text-lg"
              onClick={() => onAuthClick('login')}
            >
              Sign In
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
}