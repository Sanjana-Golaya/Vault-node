import { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet";
import { Menu } from "lucide-react";
import { AuthDialog } from "./AuthDialog";
import { ThemeToggle } from "./ThemeToggle";
import { useUser, SignInButton, UserButton } from "@clerk/clerk-react"; 

interface HeaderProps {
  onNavigate: (section: string) => void;
  onShowVault: () => void;
}

export function Header({ onNavigate, onShowVault }: HeaderProps) {

  // get auth status from clerk
  const { isSignedIn } = useUser();

  const navItems = [
    { label: "Who We Are", section: "about" },
    { label: "What We Do", section: "features" },
    { label: "Our Mission", section: "mission" },
  ];

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
                {isSignedIn ? (
                  <>
                    <Button 
                      variant="ghost" 
                      className="justify-start"
                      onClick={onShowVault}
                    >
                      My Vault
                    </Button>
                    <div className="px-4 py-2">
                    
                    </div>
                  </>
                ) : (                     
                  <>
                    <SignInButton mode="modal">
                      <Button variant="ghost" className="justify-start">
                        Login
                      </Button>
                    </SignInButton>
                    <SignInButton mode="modal">
                      <Button variant="ghost" className="justify-start">
                        Register
                      </Button>
                    </SignInButton>
                  </>
                )}
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
              <UserButton />
          </div>
        </div>
      </header>
    </>
  );
}