import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-32">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Who We Are
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                We're a team of privacy advocates, engineers, and designers who believe 
                that your personal data should remain personal.
              </p>
              <p>
                Born out of frustration with big tech's data harvesting practices, 
                Vault represents a new approach to digital tools—one that puts you first.
              </p>
              <p>
                We're not here to extract value from your data. We're here to help you 
                extract value from your data.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-12 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-4">100%</div>
                <div className="text-xl text-muted-foreground mb-8">
                  Committed to your privacy
                </div>
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-foreground">0</div>
                    <div className="text-sm text-muted-foreground">Ads shown</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">0</div>
                    <div className="text-sm text-muted-foreground">Data sold</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">0</div>
                    <div className="text-sm text-muted-foreground">Trackers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">∞</div>
                    <div className="text-sm text-muted-foreground">Respect</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}