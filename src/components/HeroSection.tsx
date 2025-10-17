import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";

const privacyMessages = [
  "value your privacy",
  "don't invasively track",
  "don't sell your data",
  "don't show ads"
];

interface HeroSectionProps {
  onAuthClick: (mode: 'login' | 'register') => void;
}

export function HeroSection({ onAuthClick }: HeroSectionProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [sparkleVariant, setSparkleVariant] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % privacyMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Cycle through sparkle animation variants
  useEffect(() => {
    const interval = setInterval(() => {
      setSparkleVariant((prev) => (prev + 1) % 4);
    }, 1800); // 1.8s average between 1.6-2.0s

    return () => clearInterval(interval);
  }, []);

  // Generate sparkle dots with random positions, sizes, and opacity
  const sparkleDots = useMemo(() => {
    const dots = [];
    const dotCount = 200;
    
    for (let i = 0; i < dotCount; i++) {
      const xRandom = Math.random();
      const yRandom = Math.random();
      
      // Distribute across entire bottom area (0-100%)
      const x = Math.random() * 100; // Full width
      const y = 40 + Math.pow(yRandom, 0.8) * 60; // 40-100% (bottom half)
      
      dots.push({
        id: i,
        x: x,
        y: y,
        size: Math.random() * 1.5 + 1, // 1-2.5px (smaller)
        opacity: Math.random() * 0.48 + 0.24, // 0.24-0.72
        // Pre-calculate 4 animation variants for each dot - 25% more movement
        variants: [
          { x: 0, y: 0 },
          { x: (Math.random() - 0.5) * 25, y: (Math.random() - 0.5) * 25 }, // ±12.5px (was ±10px)
          { x: (Math.random() - 0.5) * 30, y: (Math.random() - 0.5) * 30 }, // ±15px (was ±12px)
          { x: (Math.random() - 0.5) * 35, y: (Math.random() - 0.5) * 35 }, // ±17.5px (was ±14px)
        ],
        // Only ~35% of dots move in each variant
        shouldAnimate: Math.random() < 0.35,
      });
    }
    
    return dots;
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient with sparkle bed */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/20">
        {/* Sparkle bed container with gradient fade mask for entire bottom */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.6) 60%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.6) 60%, black 100%)',
          }}
        >
          {sparkleDots.map((dot) => (
            <motion.div
              key={dot.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${dot.x}%`,
                top: `${dot.y}%`,
                width: `${dot.size}px`,
                height: `${dot.size}px`,
                opacity: dot.opacity,
                boxShadow: '0 0 1.5px rgba(255, 255, 255, 0.4)',
              }}
              animate={
                dot.shouldAnimate
                  ? {
                      x: dot.variants[sparkleVariant].x,
                      y: dot.variants[sparkleVariant].y,
                    }
                  : {}
              }
              transition={{
                duration: 1.8,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Hero Vault title with brushed steel effect */}
          <h1 
            className="text-6xl md:text-8xl font-bold mb-8 tracking-wide"
            style={{
              fontFamily: "'Zen Dots', cursive",
              background: 'linear-gradient(180deg, #B8B8B8 0%, #E3E3E3 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25))',
              textShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            Vault
          </h1>
          
          <div className="flex flex-col items-center justify-center mb-12 space-y-4">
            {/* Part A - Static text */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
              Your second mind, private to you and only you
            </p>
            
            {/* Part B - Animated text with static "we" */}
            <div className="h-8 flex items-center justify-center gap-1">
              <span className="text-xl md:text-2xl text-muted-foreground">We </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentMessageIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl md:text-2xl text-muted-foreground"
                >
                  {privacyMessages[currentMessageIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
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