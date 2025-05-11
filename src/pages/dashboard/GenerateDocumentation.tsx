
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Plus, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import PremiumFeature from '@/components/PremiumFeature';

const GenerateDocumentation: React.FC = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [generating, setGenerating] = useState(false);
  const [repos, setRepos] = useState<string[]>(['']);
  
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
    if (repos[0] === '') {
      toast({
        title: 'Missing information',
        description: 'Please enter at least one repository URL.',
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">GitHub Repositories</h2>
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
            disabled={generating || repos[0] === ''}
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
