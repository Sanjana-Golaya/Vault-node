import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowLeft, Plus, Folder, FileText, Image, Link } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface VaultPageProps {
  onBack: () => void;
}

export function VaultPage({ onBack }: VaultPageProps) {
  const vaultItems = [
    { icon: FileText, name: "Personal Notes", count: 23, type: "notes" },
    { icon: Image, name: "Photos", count: 156, type: "media" },
    { icon: Link, name: "Bookmarks", count: 45, type: "links" },
    { icon: Folder, name: "Documents", count: 12, type: "files" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">My Vault</h1>
              <p className="text-muted-foreground">Your private digital space</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Welcome Section */}
          <div className="mb-12">
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-xl font-semibold mb-2">Welcome to your Vault</h2>
                <p className="text-muted-foreground mb-4">
                  This is your private space where your data remains encrypted and secure. 
                  Start by adding your first item to get organized.
                </p>
                <Button variant="outline">
                  Take a Tour
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Vault Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vaultItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{item.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {item.count} items
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-24 bg-accent/20 rounded-lg flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">
                        {item.count === 0 ? 'Empty' : `${item.count} items`}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="mt-16">
            <h3 className="text-xl font-semibold mb-6">Recent Activity</h3>
            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-muted-foreground">
                  <Folder className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">No recent activity</p>
                  <p className="text-sm">
                    Start adding items to your Vault to see your activity here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>
    </div>
  );
}