import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Shield, Lock, Eye, Database, Zap, Heart } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const features = [
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data stays yours. We built Vault with privacy as the foundation, not an afterthought."
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "Everything is encrypted before it leaves your device. Even we can't see your data."
  },
  {
    icon: Eye,
    title: "Zero Tracking",
    description: "No analytics, no behavioral tracking, no data collection for advertising purposes."
  },
  {
    icon: Database,
    title: "Your Data, Your Control",
    description: "Export, delete, or migrate your data anytime. You're never locked in."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built for speed and efficiency. Access your second brain instantly."
  },
  {
    icon: Heart,
    title: "Made with Care",
    description: "Crafted by a team that believes technology should serve humanity, not exploit it."
  }
];

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
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            What We Do
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're building the future of personal data management. A place where your digital life 
            is organized, private, and truly yours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <feature.icon className="w-12 h-12 text-primary mb-6" />
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}