import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Folder, FileText, Search } from "lucide-react"; 
import { ThemeToggle } from "./ThemeToggle";
import { CustomCursor } from "./CustomCursor";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";
import LazyLoad from 'react-lazyload';
import { useUser } from "@clerk/clerk-react";

interface VaultPageProps {
  onBack: () => void;
  files: VaultFile[];
  isLoadingFiles: boolean;
  setFiles: React.Dispatch<React.SetStateAction<VaultFile[]>>;
  dbUser: any;
}

export interface VaultFile {
  id: number;
  file_name: string;
  file_desc: string;
  file_path: string;
  created_at: string;
  file_url: string; 
}

interface FilePreviewProps {
  path: string; 
  alt: string;
  className?: string;
}

const urlCache = new Map<string, string>();

function FilePreview({ path, alt, className = "h-32 w-full object-cover rounded-lg" }: FilePreviewProps) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null); 
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
    setSignedUrl(null); 

    if (!path) return; 

    if(urlCache.has(path)){
      console.log("Found URL in cache for:", path);
      setSignedUrl(urlCache.get(path)!);
      return;
    }

    async function getSignedUrl() {
      console.log("Fetching signed URL for:", path);
      const { data, error } = await supabase.storage.from("vault").createSignedUrl(path, 3600);
      if (error) {
        console.error("Error signing URL:", error);
        setHasError(true);
      } else if(data?.signedUrl) {
        console.log("Signed URL:", data.signedUrl);
        urlCache.set(path,data.signedUrl);
        setSignedUrl(data?.signedUrl);
      }
    }
    getSignedUrl();
  }, [path]); 

  if (hasError || !signedUrl) {
    return (
      <div className={`${className} bg-accent/20 rounded-lg flex items-center justify-center`}>
        <FileText className="h-10 w-10 text-muted-foreground opacity-50" />
      </div>
    );
  }
  
  return (
    <img
      src={signedUrl}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}

export function VaultPage({ onBack, files, isLoadingFiles,setFiles, dbUser }: VaultPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState<VaultFile | null>(null);

  const {user} = useUser();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
 // const [newFileDesc, setNewFileDesc] = useState("");
  const [newFile, setNewFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  const filteredFiles = useMemo(() => {
    if (!searchQuery) {
      return files; 
    }
    return files.filter(file => 
      file.file_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.file_desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [files, searchQuery]); 

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files.length > 0) {
      setNewFile(e.target.files[0]);
    }
  };

  const handleSaveFile = async () => {
    if(!newFile || !user || !dbUser){
      setUploadError("Please select a file to upload");
      return;
    }
    setIsUploading(true);
    setUploadError(null);

    try {
      const uniqueName = `${Date.now()}-${newFile.name}`;
      const filePath = `${user.id}/${newFile.name}`;

      console.log("Uploading file path:", filePath);
      const userEmail = dbUser.user_email;

      const {error: uploadError} = await supabase.storage
      .from('vault')
      .upload(filePath, newFile);

      if(uploadError){
        throw uploadError;
      }

      // dummy call for description
      // const fileDesc = await fetch("/routes/", {
      //   method: 'POST',
      //   body: JSON.stringify({filePath: filePath})
      // }).then(res => res.json());

      const generatedDesc = ""; // put fileDesc here

      const {data:dbData, error: dbError} = await supabase
      .from('files')
      .insert({
        file_name: newFile.name,
        file_desc: generatedDesc,
        file_path: filePath,
        user_email: userEmail,
      })
      .select()
      .single();

      if(dbError) throw dbError;
      if(dbData){
        setFiles(currentFiles => [
          ...currentFiles,
          {...dbData, file_url: ''}
        ]);
      }

      setIsAddDialogOpen(false);
      setNewFile(null);
     // setNewFileDesc("");

    } catch(error: any) {
      console.error("Error saving file: ", error);
      setUploadError(`Failed to save file: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    
    <div className="min-h-screen bg-background">
      <CustomCursor/>
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
            <Button onClick={() => setIsAddDialogOpen(true)}>
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
        
          <div className="mt-16">
            <h3 className="text-xl font-semibold mb-6 text-center">All Files</h3>
            
            <div className="relative mb-6 w-full max-w-3xl mx-auto">
              <div className="flex items-center bg-background border border-border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                <Search className="text-muted-foreground/70 w-5 h-5 mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Search all files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm md:text-base placeholder:text-muted-foreground/70"
                />
              </div>
            </div>

            {isLoadingFiles ? (
              <p className="text-muted-foreground text-center mt-12">Loading files...</p>
            ) : filteredFiles.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                <Folder className="w-12 h-12 mb-4 text-muted-foreground/70" />
                <h3 className="text-lg font-medium text-foreground">No files found</h3>
                <p className="text-sm mt-1 text-muted-foreground/80">
                  Your search for "{searchQuery}" didn’t return any results.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredFiles.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onClick={() => setSelectedFile(item)}
                  >
                    <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-base truncate">{item.file_name}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        
                       
                        <LazyLoad height={128} offset={100} once>                        
                          <FilePreview path={item.file_path} alt={item.file_name}/>
                        </LazyLoad>
                        
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New File</DialogTitle>
            <DialogDescription>
              Upload a new file to your secure vault.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={dbUser?.user_email || 'No user email'}
                disabled
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                value={dbUser?.user_no || 'Not provided'}
                disabled
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                File
              </Label>
              <Input
                id="file"
                type="file"
                onChange={handleFileSelect}
                className="col-span-3"
              />
            </div>
            {/* <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={newFileDesc}
                onChange={(e) => setNewFileDesc(e.target.value)}
                placeholder="Add a description for your file..."
                className="col-span-3"
              />
            </div> */}
            {uploadError && (
              <p className="col-span-4 text-center text-sm text-red-500">{uploadError}</p>
            )}
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              onClick={handleSaveFile} 
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Save File"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
        <Dialog open={selectedFile !== null} onOpenChange={() => setSelectedFile(null)}>
          <DialogContent className="max-w-md mx-auto bg-background/95 backdrop-blur-lg border border-border shadow-2xl rounded-2xl p-6 flex flex-col items-center text-center space-y-4">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold capitalize">
                {selectedFile?.file_name || "No file selected"}
              </DialogTitle>
            </DialogHeader>
           
            {selectedFile?.file_path && (
              <div className="flex justify-center w-full">
                <FilePreview
                  path={selectedFile.file_path}
                  alt={selectedFile.file_name}
                  className="max-h-64 rounded-lg object-contain shadow-md"
                />
              </div>
            )}

            {selectedFile?.file_desc && (
              <div className="text-left space-y-2 w-full">
                <h4 className="font-semibold">Description</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {selectedFile.file_desc}
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}