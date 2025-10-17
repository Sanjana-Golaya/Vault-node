import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { NetworkVisualization } from "./NetworkVisualization";

export function FeatureSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" ref={ref} className="py-32 bg-accent/10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              background: 'linear-gradient(180deg, #B8B8B8 0%, #E3E3E3 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25))',
              textShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            What We Do
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're building the future of personal data management. A place where your digital life 
            is organized, private, and truly yours.
          </p>
        </motion.div>

        {/* Network Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-24"
        >
          <div className="max-w-4xl mx-auto mb-12">
            <NetworkVisualization />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
