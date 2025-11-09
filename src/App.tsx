import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { FeatureSection } from "./components/FeatureSection";
import { MissionSection } from "./components/MissionSection";
import { SupportSection } from "./components/SupportSection";
import { VaultPage, VaultFile } from "./components/VaultPage";
import { CustomCursor } from "./components/CustomCursor";
import { useUser, useClerk } from "@clerk/clerk-react";
import { supabase } from "./lib/supabase";
import { error } from "console";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
 } from "./components/ui/dialog";
 import { Input } from "./components/ui/input";
 import { Label } from "./components/ui/label";
 import { Button } from "./components/ui/button";
 import { LucideLoader2 } from "lucide-react";

 import { isValidPhoneNumber } from 'libphonenumber-js';

interface DBUser{
  user_email: string;
  user_no: number;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'vault'>('landing');
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const [files, setFiles] = useState<VaultFile[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(true);
  const [dbUser, setDbUser] = useState<DBUser | null>(null);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [isSavingPhone, setIsSavingPhone] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFilesList() {  
      if(!isSignedIn || !user) return;
      setIsLoadingFiles(true);
      try {

        const userEmail = user.emailAddresses[0]?.emailAddress;
        const {data: userData, error: upsertError} = await supabase
        .from('users')
        .upsert({
          user_email: userEmail,
          
        }, {
          onConflict: 'user_email'
        })
        .select().single();
         
        if(upsertError){
         throw upsertError
        } else {
          console.log("User saved successfully!");
          setDbUser(userData);
        }
       
        // email should be there before querying
        if(!userEmail){
          throw new Error("User has no email, cannot fetch files.");
        }

        let {data: dbData, error: dbError} = await supabase
          .from('files')
          .select('*')
          .eq('user_email', userEmail);

          if(dbError) throw dbError;
        
          //fetch files without url.
          const filesWithoutUrls = dbData?.map(file => ({
            ...file,
            file_url: '', // will be fetched by FilePreview
          }));
          setFiles(filesWithoutUrls || []);

          if (!userData.user_no) {
            console.log("User is missing phone number. Opening dialog.");
            setIsPhoneModalOpen(true);
          }

      } catch(e){
        console.error("Failed to fetch files:", e);
      } finally {
        setIsLoadingFiles(false);
      }
    }
  
    if(isSignedIn && user) {
      fetchFilesList();
    } else {
      setFiles([]);
      setIsLoadingFiles(false);
      setDbUser(null);
    }
      
  },[isSignedIn, user])

  const handleSavePhone = async() => {
    setIsSavingPhone(true);
    setPhoneError(null);

    if(!newPhoneNumber || !isValidPhoneNumber(newPhoneNumber)){
      setPhoneError("Please enter a Valid Phone no. along with your Country Code");
      setIsSavingPhone(false);
      return;
    }

    try {
      const {data: updateUser, error: dbError} = await supabase
      .from('users')
      .update({user_no: newPhoneNumber})
      .eq('user_email', user?.emailAddresses[0]?.emailAddress)
      .select().single();

      if(dbError) throw dbError;

      setDbUser(updateUser);
      setIsPhoneModalOpen(false);
      setNewPhoneNumber("");
    } catch(error: any){
      console.log(error);
      setPhoneError("Failed to save");
    } finally{
      setIsSavingPhone(false);
    }
  } 

  const handleNavigate = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleShowVault = () => {
    if (isSignedIn) {
      setCurrentPage('vault');
    }
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  if (currentPage === 'vault') {
    if (!isSignedIn) {
      setCurrentPage('landing');
      return null; 
    }
    
    return <VaultPage onBack={() => {
     // signOut();
      handleBackToLanding();
    }} 
    files={files}
    isLoadingFiles = {isLoadingFiles}
    setFiles = {setFiles}
    dbUser= {dbUser}
    />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <Header 
        onNavigate={handleNavigate}
        onShowVault={handleShowVault}
      />
      
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <HeroSection/> 
        <AboutSection />
        <FeatureSection />
        <MissionSection />
      </motion.main>

      <SupportSection />

      <footer className="border-t border-border py-12 bg-accent/5">
        <div className="container mx-auto px-6 text-center">
          <div className="text-2xl font-bold mb-4">Vault</div>
          <p className="text-muted-foreground mb-6">
            Your privacy, our priority. Always.
          </p>
          <div className="text-sm text-muted-foreground">
            © 2025 Vault. Built with respect for your privacy.
          </div>
        </div>
      </footer>
      <Dialog open={isPhoneModalOpen} onOpenChange={setIsPhoneModalOpen}>
        <DialogContent className="max-w-[425px]
            bg-background/95         
            backdrop-blur-lg         
            border border-primary/20 
            shadow-2xl              
            rounded-2xl             
            p-8                     
            space-y-6                
            flex flex-col">
          <DialogHeader>
            <DialogTitle>One last step!</DialogTitle>
            <DialogDescription>
              Please add your phone number to complete your profile.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                value={newPhoneNumber}
                onChange={(e) => setNewPhoneNumber(e.target.value)}
                placeholder="Enter you Phone no."
                className="col-span-3"
              />
            </div>
            {phoneError && (
              <p className="col-span-4 text-center text-sm text-red-500">{phoneError}</p>
            )}
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              onClick={handleSavePhone} 
              disabled={isSavingPhone}
            >
              {isSavingPhone ? (
                <LucideLoader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Save Phone Number"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}