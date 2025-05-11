
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, ExternalLink, Link2, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectCard from '@/components/dashboard/ProjectCard';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Mock project data - expanded with more projects
const mockProjects = [
  {
    id: '1',
    name: 'E-commerce API',
    updatedAt: 'May 1, 2025',
    repos: [
      {
        name: 'e-commerce-api',
        description: 'Backend API for an e-commerce platform',
      },
    ],
  },
  {
    id: '2',
    name: 'Recipe Management App',
    updatedAt: 'Apr 28, 2025',
    repos: [
      {
        name: 'recipe-manager-frontend',
        description: 'Frontend for recipe management application',
      },
      {
        name: 'recipe-manager-api',
        description: 'Backend for recipe management application',
      },
    ],
  },
  {
    id: '3',
    name: 'Task Manager',
    updatedAt: 'Apr 15, 2025',
    repos: [
      {
        name: 'task-manager',
        description: 'Full-stack task management application',
      },
    ],
  },
  {
    id: '4',
    name: 'Portfolio Website',
    updatedAt: 'Apr 10, 2025',
    repos: [
      {
        name: 'portfolio-frontend',
        description: 'Personal portfolio website',
      },
    ],
  },
  {
    id: '5',
    name: 'Weather Dashboard',
    updatedAt: 'Mar 27, 2025',
    repos: [
      {
        name: 'weather-dashboard',
        description: 'React weather application with forecast data',
      },
      {
        name: 'weather-api',
        description: 'API to fetch and process weather data',
      },
    ],
  },
  {
    id: '6',
    name: 'Blog CMS',
    updatedAt: 'Mar 15, 2025',
    repos: [
      {
        name: 'blog-frontend',
        description: 'Frontend for blog content management',
      },
      {
        name: 'blog-backend',
        description: 'Backend API for blog content',
      },
      {
        name: 'content-delivery',
        description: 'Content delivery service',
      },
    ],
  },
];

const Dashboard: React.FC = () => {
  const { user, isPremium } = useAuth();
  const { toast } = useToast();
  
  const projects = isPremium ? mockProjects : mockProjects.slice(0, 1);

  const handlePremiumFeature = () => {
    toast({
      title: "Premium Feature",
      description: "Please upgrade to Premium to access this feature.",
      variant: "default"
    });
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage your documentation projects
          </p>
        </div>
        
        <Button asChild>
          <Link to="/generate">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>
      
      {projects.length === 0 ? (
        <div className="bg-muted rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium mb-2">No projects yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first documentation project to get started.
          </p>
          <Button asChild>
            <Link to="/generate">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              isPremium={isPremium} 
              onPremiumFeature={handlePremiumFeature}
            />
          ))}
          
          {!isPremium && (
            <div className="bg-muted/50 border border-dashed rounded-lg p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-medium mb-2">Upgrade to Premium</h3>
                <p className="text-muted-foreground mb-4">
                  Create unlimited documentation projects with our premium plan.
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link to="/pricing">Upgrade Now</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
