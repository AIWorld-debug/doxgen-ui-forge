
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Plus, Minus, Upload, Github, FileZip } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import PremiumFeature from '@/components/PremiumFeature';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GenerateDocumentation: React.FC = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [repos, setRepos] = useState<string[]>(['']);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [generating, setGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('url');
  
  const { isPremium } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      projectType: "create",
      projectName: "",
    },
  });
  
  const handleGenerate = () => {
    // Validation based on active tab
    if (activeTab === 'url' && repos[0] === '') {
      toast({
        title: 'Missing information',
        description: 'Please enter at least one repository URL.',
        variant: 'destructive',
      });
      return;
    }
    
    if (activeTab === 'upload' && !selectedFile) {
      toast({
        title: 'Missing file',
        description: 'Please select a zip file to upload.',
        variant: 'destructive',
      });
      return;
    }
    
    setGenerating(true);
    
    // Mock generation process
    setTimeout(() => {
      setGenerating(false);
      toast({
        title: 'Documentation generated',
        description: 'Your documentation has been successfully generated.',
      });
      navigate('/preview/new');
    }, 2000);
  };

  const addRepo = () => {
    if (isPremium || repos.length < 1) {
      setRepos([...repos, '']);
    } else {
      toast({
        title: 'Free plan limit',
        description: 'Free plan allows only 1 repository. Upgrade to Pro for more.',
      });
    }
  };

  const removeRepo = (index: number) => {
    const newRepos = [...repos];
    newRepos.splice(index, 1);
    setRepos(newRepos);
  };

  const updateRepo = (index: number, value: string) => {
    const newRepos = [...repos];
    newRepos[index] = value;
    setRepos(newRepos);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== 'application/zip' && !file.name.endsWith('.zip')) {
        toast({
          title: 'Invalid file',
          description: 'Please upload a valid ZIP file.',
          variant: 'destructive',
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Generate Documentation</h1>
        <p className="text-muted-foreground mt-1">
          Create documentation from your repository
        </p>
      </div>
      
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Project Information</h2>
            
            <Form {...form}>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-3">Project Type</h3>
                  <RadioGroup defaultValue="create" className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="create" id="create" />
                      <Label htmlFor="create">Create new project</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="existing" id="existing" disabled />
                      <Label htmlFor="existing" className="flex items-center">
                        Add to existing project
                        <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-md">Coming soon</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input 
                    id="projectName"
                    placeholder="My Project"
                    className="mt-1"
                  />
                </div>
              </div>
            </Form>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Repository Source</h2>
            
            <Tabs defaultValue="url" value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="url" className="flex items-center gap-2">
                  <FileZip className="h-4 w-4" />
                  <span>Enter GitHub Repo URL</span>
                </TabsTrigger>
                <TabsTrigger value="github" className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  <span>Select from GitHub</span>
                </TabsTrigger>
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  <span>Upload a .zip file</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="url">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-base font-medium">GitHub Repositories</h3>
                    {isPremium ? (
                      <div className="text-sm text-muted-foreground">Pro plan: Unlimited repositories</div>
                    ) : (
                      <div className="text-sm text-muted-foreground">Free plan: 1 repository max</div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    {repos.map((repo, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <Input
                          placeholder="https://github.com/username/repository"
                          value={repo}
                          onChange={(e) => updateRepo(index, e.target.value)}
                          className="flex-grow"
                        />
                        {repos.length > 1 && (
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => removeRepo(index)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="mt-3 w-full"
                    onClick={addRepo}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Repository
                  </Button>
                  
                  {!isPremium && repos.length === 1 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Upgrade to Pro to add more repositories to a project
                    </p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="github">
                <div className="space-y-4">
                  <div className="text-center p-8 border-2 border-dashed rounded-lg">
                    <Github className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium">Connect your GitHub Account</h3>
                    <p className="text-muted-foreground mb-4">Select repositories directly from your GitHub account</p>
                    <Button>
                      <Github className="mr-2 h-4 w-4" />
                      Connect GitHub Account
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="upload">
                <div className="space-y-4">
                  <div className="text-center p-8 border-2 border-dashed rounded-lg">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium">Upload ZIP file</h3>
                    <p className="text-muted-foreground mb-4">Upload a ZIP file containing your source code</p>
                    <div className="flex flex-col items-center">
                      <Input 
                        type="file" 
                        id="zipFile" 
                        className="hidden" 
                        accept=".zip"
                        onChange={handleFileChange}
                      />
                      <Label 
                        htmlFor="zipFile" 
                        className="cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                      >
                        Select ZIP file
                      </Label>
                      {selectedFile && (
                        <p className="mt-2 text-sm">Selected: {selectedFile.name}</p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Advanced Options</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="architecture" disabled={!isPremium} />
                <div>
                  <Label 
                    htmlFor="architecture" 
                    className="flex items-center cursor-pointer"
                  >
                    Generate architecture model
                    <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-md">Pro</span>
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Create visual diagrams showing system architecture
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="deployment" disabled={!isPremium} />
                <div>
                  <Label 
                    htmlFor="deployment" 
                    className="flex items-center cursor-pointer"
                  >
                    Include setup & deployment analysis
                    <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded-md">Pro</span>
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Add detailed installation and deployment instructions
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleGenerate} 
            disabled={generating || 
              (activeTab === 'url' && repos[0] === '') || 
              (activeTab === 'upload' && !selectedFile)
            }
            className="px-6"
            size="lg"
          >
            {generating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Documentation'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GenerateDocumentation;
