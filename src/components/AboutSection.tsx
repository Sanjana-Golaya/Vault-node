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
            <h2 
              className="text-4xl md:text-6xl font-bold mb-8"
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
              Who We Are
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                We're a team of engineers and designers who, like you, are drowning in the chaos of our own digital lives with endless notes, chats, files, and scattered thoughts that never seem to connect back to us.
              </p>
              <p>
                Vault was born out of that frustration. We believe that in an age of limitless information, what we're missing isn't more tools. It's a second mind that unifies everything you know, remember, and create.
              </p>
              <p>
                Vault is that space: a calm, private system of recall built for people who think deeply and move fast.
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