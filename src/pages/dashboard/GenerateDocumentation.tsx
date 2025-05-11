
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { GitBranch, Upload, Github, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import PremiumFeature from '@/components/PremiumFeature';

const GenerateDocumentation: React.FC = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [generating, setGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('url');
  
  const { isPremium } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleGenerate = () => {
    if (!repoUrl) {
      toast({
        title: 'Missing information',
        description: 'Please enter a repository URL.',
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
  
  const mockRepos = [
    { name: 'user/project-name', description: 'A sample project repository' },
    { name: 'user/another-project', description: 'Another sample project' },
    { name: 'organization/repo-name', description: 'Organization repository' },
  ];
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Generate Documentation</h1>
        <p className="text-muted-foreground mt-1">
          Create documentation from your repository
        </p>
      </div>
      
      <div className="max-w-3xl">
        <Tabs 
          defaultValue="url" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="mb-6 w-full">
            <TabsTrigger value="url" className="flex-1">
              <GitBranch className="mr-2 h-4 w-4" />
              Repository URL
            </TabsTrigger>
            <TabsTrigger value="github" className="flex-1">
              <Github className="mr-2 h-4 w-4" />
              GitHub Integration
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex-1">
              <Upload className="mr-2 h-4 w-4" />
              Upload Files
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="url">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="repo-url">GitHub Repository URL</Label>
                    <Input
                      id="repo-url"
                      placeholder="https://github.com/username/repository"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description (optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Add a description for your documentation project"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleGenerate} 
                    disabled={generating || !repoUrl}
                    className="w-full"
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
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="github">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-muted/50">
                    <h3 className="text-lg font-medium mb-2">GitHub Repositories</h3>
                    <p className="text-muted-foreground mb-4">
                      Select a repository from your GitHub account
                    </p>
                    
                    <div className="space-y-2">
                      {mockRepos.map((repo, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between border rounded-lg p-3 bg-background hover:border-primary/50 cursor-pointer transition-colors"
                          onClick={() => setRepoUrl(`https://github.com/${repo.name}`)}
                        >
                          <div>
                            <div className="font-medium">{repo.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {repo.description}
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Select
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description-github">Description (optional)</Label>
                    <Textarea
                      id="description-github"
                      placeholder="Add a description for your documentation project"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                    />
                  </div>
                  
                  <Button 
                    onClick={handleGenerate} 
                    disabled={generating || !repoUrl}
                    className="w-full"
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
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="upload">
            <Card>
              <CardContent className="pt-6">
                {isPremium ? (
                  <div className="space-y-4">
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Upload your project files</h3>
                      <p className="text-muted-foreground mb-4">
                        Drag and drop your .zip file here or click to browse
                      </p>
                      <Button>Browse Files</Button>
                    </div>
                    
                    <div>
                      <Label htmlFor="description-upload">Description (optional)</Label>
                      <Textarea
                        id="description-upload"
                        placeholder="Add a description for your documentation project"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                      />
                    </div>
                    
                    <Button 
                      onClick={handleGenerate} 
                      disabled={generating}
                      className="w-full"
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
                ) : (
                  <PremiumFeature>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed rounded-lg p-8 text-center">
                        <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Upload your project files</h3>
                        <p className="text-muted-foreground mb-4">
                          Drag and drop your .zip file here or click to browse
                        </p>
                        <Button>Browse Files</Button>
                      </div>
                      
                      <div>
                        <Label htmlFor="description-upload">Description (optional)</Label>
                        <Textarea
                          id="description-upload"
                          placeholder="Add a description for your documentation project"
                          rows={4}
                        />
                      </div>
                      
                      <Button className="w-full">
                        Generate Documentation
                      </Button>
                    </div>
                  </PremiumFeature>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GenerateDocumentation;
