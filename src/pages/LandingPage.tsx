
import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, MessageSquare, Share2, Download, Github, GitBranch } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Generate stunning documentation from your code in seconds
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              DoxGen helps developers create beautiful, comprehensive documentation from GitHub repositories with just a few clicks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
            </div>
            
            <div className="mt-12 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none h-[50%] bottom-0"></div>
              <div className="bg-muted rounded-lg p-5 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4">
                  <Input
                    placeholder="Enter GitHub repository URL"
                    className="bg-background"
                    readOnly
                  />
                  <Button>Generate Documentation</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30 px-4">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Documentation Features</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to create, manage, and share your documentation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Github className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">GitHub Integration</h3>
              <p className="text-muted-foreground">
                Connect your GitHub repositories directly or enter any public repo URL to generate documentation.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">File Upload</h3>
              <p className="text-muted-foreground">
                Upload your project files as a ZIP and let DoxGen handle the rest. Perfect for private projects.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">AI Chat Assistant</h3>
              <p className="text-muted-foreground">
                Ask questions about your documentation or get help with your code using our AI assistant.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Share2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Public Links</h3>
              <p className="text-muted-foreground">
                Share your documentation with anyone using a public link. Perfect for open-source projects.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Download as Web App</h3>
              <p className="text-muted-foreground">
                Download your documentation as a standalone web application that you can host anywhere.
              </p>
            </div>
            
            <div className="bg-background rounded-lg p-6 shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <GitBranch className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">Multi-Repo Projects</h3>
              <p className="text-muted-foreground">
                Group multiple repositories into a single project to create comprehensive documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted px-4">
        <div className="container max-w-4xl">
          <div className="bg-gradient-to-r from-primary/90 to-secondary/90 rounded-lg p-8 md:p-12 text-white">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to create amazing documentation?
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Get started with DoxGen today and transform your code into beautiful, comprehensive documentation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/signup">Get Started for Free</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 border-white/30 hover:bg-white/20" asChild>
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default LandingPage;
