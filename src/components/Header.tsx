import { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet";
import { Menu } from "lucide-react";
import { AuthDialog } from "./AuthDialog";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  onNavigate: (section: string) => void;
  onShowVault: () => void;
}

export function Header({ onNavigate, onShowVault }: HeaderProps) {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const navItems = [
    { label: "Who We Are", section: "about" },
    { label: "What We Do", section: "features" },
    { label: "Our Mission", section: "mission" },
  ];

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 p-6">
        <div className="flex justify-between items-center">
          {/* Left - Burger Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="bg-background/80 backdrop-blur-sm border-border/50">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetTitle>Vault Menu</SheetTitle>
              <SheetDescription>Access your vault and account settings</SheetDescription>
              <div className="flex flex-col space-y-4 mt-8">
                <Button 
                  variant="ghost" 
                  className="justify-start"
                  onClick={onShowVault}
                >
                  My Vault
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start"
                  onClick={() => handleAuthClick('login')}
                >
                  Login
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start"
                  onClick={() => handleAuthClick('register')}
                >
                  Register
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          {/* Right - Navigation */}
          <div className="flex items-center space-x-2">
            {navItems.map((item) => (
              <Button
                key={item.section}
                variant="outline"
                size="sm"
                className="bg-background/80 backdrop-blur-sm border-border/50 hover:bg-accent/50"
                onClick={() => onNavigate(item.section)}
              >
                {item.label}
              </Button>
            ))}
            <ThemeToggle />
          </div>
        </div>
      </header>

      <AuthDialog 
        open={authOpen} 
        onOpenChange={setAuthOpen}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
}