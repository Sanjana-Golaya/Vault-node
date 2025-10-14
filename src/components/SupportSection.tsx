import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Heart, Coffee, Users } from "lucide-react";

export function SupportSection() {
  const handleDonationClick = (platform: string) => {
    // These would be replaced with actual donation platform URLs
    const donationLinks = {
      paypal: "https://paypal.me/vault", // Replace with actual PayPal link
      stripe: "#", // Replace with actual Stripe payment link
      crypto: "#" // Replace with actual crypto wallet address
    };
    
    console.log(`Donation via ${platform}`);
    // In production, this would redirect to the actual donation platform
  };

  return (
    <section className="py-16 bg-accent/5 border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center mb-6">
            <Heart className="w-8 h-8 text-red-500 mr-3" />
            <h2 className="text-3xl font-bold">Support Our Team</h2>
          </div>
          
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Building privacy-first tools takes time and dedication. If Vault has helped you reclaim control 
            of your digital life, consider supporting our mission to keep your data truly yours.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <Coffee className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Buy us a coffee</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Small contribution, big impact
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDonationClick('paypal')}
                >
                  ₹250
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 border-primary/50">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Support Development</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Help us build new features
                </p>
                <Button 
                  size="sm"
                  onClick={() => handleDonationClick('stripe')}
                >
                  ₹1000
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <Heart className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Champion Privacy</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Become a privacy advocate
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDonationClick('crypto')}
                >
                  Custom Amount
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted/50 rounded-2xl p-6">
            <p className="text-sm text-muted-foreground">
              <strong>100% Transparency:</strong> Your donations go directly toward development, 
              infrastructure, and keeping Vault free for everyone. We'll never sell your data to fund our operations.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}