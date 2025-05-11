
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { FolderOpen, GitBranch, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description?: string;
    updatedAt: string;
    repos: {
      name: string;
      description?: string;
    }[];
  };
  className?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, className }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Card className={cn("overflow-hidden transition-all duration-200 hover:border-primary/30", className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 rounded-md p-2">
              <FolderOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <Link to={`/preview/${project.id}`} className="font-medium hover:text-primary transition-colors">
                {project.name}
              </Link>
              {project.description && (
                <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Updated {project.updatedAt}
            </Badge>
          </div>
        </div>
        
        <div className="mt-4">
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {project.repos.length} {project.repos.length === 1 ? 'repository' : 'repositories'}
              </div>
              
              <CollapsibleTrigger className="flex items-center gap-1 text-sm text-primary hover:underline">
                <span>{isOpen ? 'Hide repos' : 'Show repos'}</span>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent className="mt-2 space-y-2">
              {project.repos.map((repo, index) => (
                <div key={index} className="flex items-center gap-2 bg-muted/50 p-2 rounded text-sm">
                  <GitBranch className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="font-medium">{repo.name}</div>
                    {repo.description && (
                      <div className="text-xs text-muted-foreground">{repo.description}</div>
                    )}
                  </div>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        <div className="mt-4 pt-4 border-t flex items-center justify-between">
          <div className="flex gap-2">
            <Link 
              to={`/preview/${project.id}`} 
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              <span>View Documentation</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
          
          <button className="text-sm text-primary hover:underline">
            Generate Architecture Model
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
