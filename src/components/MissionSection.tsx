import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { MessageCircle, Shield, Lock, Eye, Database, Zap, Heart } from "lucide-react";
import { Button } from "./ui/button";
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

export function MissionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleWhatsAppClick = () => {
    // Replace with your actual WhatsApp number
    const phoneNumber = "1234567890";
    const message = "Hi! I'm interested in learning more about Vault.";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <section id="mission" ref={ref} className="py-32 bg-accent/20">
      <div className="container mx-auto px-6">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
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
            Our Mission
          </h2>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Animated gradient border wrapper */}
              <div className="relative p-[2px] rounded-lg h-full overflow-hidden">
                {/* Animated gradient border - only visible on hover */}
                {hoveredIndex === index && (
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'conic-gradient(from 0deg, #ec4899, #f97316, #fbbf24, #14b8a6, #3b82f6, #8b5cf6, #ec4899)',
                      filter: 'blur(8px)',
                      opacity: 0.6,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 0.6,
                      rotate: 360,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      opacity: { duration: 0.3 },
                      rotate: {
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }
                    }}
                  />
                )}
                
                {/* Inner card container with background */}
                <div className="relative bg-card rounded-lg h-full">
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 bg-transparent">
                    <CardContent className="p-8">
                      <feature.icon className="w-12 h-12 text-primary mb-6" />
                      <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="bg-card/50 rounded-3xl p-8 md:p-12 backdrop-blur-sm border border-border/50 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Ready to take control of your digital life?
          </h3>
          
          <Button 
            size="lg"
            variant="secondary"
            className="px-8 py-6 text-lg"
            onClick={handleWhatsAppClick}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Start Chat on WhatsApp
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
