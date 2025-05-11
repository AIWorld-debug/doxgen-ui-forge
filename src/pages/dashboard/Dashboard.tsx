
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectCard from '@/components/dashboard/ProjectCard';
import { useAuth } from '@/contexts/AuthContext';

// Mock project data
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
];

const Dashboard: React.FC = () => {
  const { user, isPremium } = useAuth();
  
  const projects = isPremium ? mockProjects : mockProjects.slice(0, 1);
  
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
        <div className="grid gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          
          {!isPremium && (
            <div className="bg-muted/50 border border-dashed rounded-lg p-6 text-center">
              <h3 className="text-lg font-medium mb-2">Upgrade to Premium</h3>
              <p className="text-muted-foreground mb-4">
                Create unlimited documentation projects with our premium plan.
              </p>
              <Button variant="outline">Upgrade Now</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
