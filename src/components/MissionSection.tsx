import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { MessageCircle, Lock, Cloud } from "lucide-react";
import { Button } from "./ui/button";

export function MissionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Headline */}
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Our Mission
          </h2>
          
          {/* Subhead / Bold Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <p className="text-xl md:text-3xl font-bold leading-relaxed mb-8">
              To free people from the burden of organizing, so memory becomes effortless.
            </p>
          </motion.div>

          {/* Visual Placeholder - Fragment Cloud Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center items-center mb-12"
          >
            <div className="relative">
              {/* Central Vault Icon */}
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Lock className="w-10 h-10 text-primary" />
              </div>
              
              {/* Floating Fragment Clouds */}
              <div className="absolute -top-4 -left-8 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <Cloud className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="absolute -top-6 right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <Cloud className="w-3 h-3 text-muted-foreground" />
              </div>
              <div className="absolute -bottom-4 -right-6 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <Cloud className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="absolute -bottom-2 -left-4 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <Cloud className="w-3 h-3 text-muted-foreground" />
              </div>
            </div>
          </motion.div>

          {/* Body Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl leading-relaxed mb-16 space-y-4 max-w-3xl mx-auto"
          >
            <p>
              We believe your ideas, notes, and fragments shouldn't be trapped in folders or forgotten in files.
            </p>
            <p>
              Vault is built to capture everything instantly, and surface what matters when you need it most.
            </p>
            <p className="font-medium">
              No clutter. No chasing. Just focus.
            </p>
          </motion.div>

          {/* Separator */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={isInView ? { opacity: 1, width: "100px" } : { opacity: 0, width: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="h-px bg-border mx-auto mb-16"
          />

          {/* WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="bg-card/50 rounded-3xl p-8 md:p-12 backdrop-blur-sm border border-border/50"
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
        </motion.div>
      </div>
    </section>
  );
}