
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { FolderOpen, GitBranch, ExternalLink, Copy, MessageSquare, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ChatModal from '@/components/dashboard/ChatModal';
import { useAuth } from '@/contexts/AuthContext';

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
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { toast } = useToast();
  const { isPremium } = useAuth();

  const handleCopyLink = () => {
    // Mock functionality to copy a public link
    navigator.clipboard.writeText(`https://doxgen.app/public/${project.id}`);
    toast({
      title: "Link copied",
      description: "Public link copied to clipboard",
    });
  };

  return (
    <Card className={cn("overflow-hidden transition-all duration-200 hover:border-primary/30 max-w-md w-full", className)}>
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
        
        {/* Repositories section - always visible now */}
        <div className="mt-4 space-y-2">
          <div className="text-sm text-muted-foreground mb-2">
            {project.repos.length} {project.repos.length === 1 ? 'repository' : 'repositories'}
          </div>
          
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
        </div>
        
        <div className="mt-4 pt-4 border-t flex flex-wrap gap-2 items-center">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-grow" 
            asChild
          >
            <Link to={`/preview/${project.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              View Documentation
            </Link>
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-grow" 
            onClick={handleCopyLink}
            disabled={!isPremium}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Public Link
            {!isPremium && <span className="ml-1 text-xs">(Premium)</span>}
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-grow" 
            onClick={() => setIsChatOpen(true)}
            disabled={!isPremium}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Ask AI
            {!isPremium && <span className="ml-1 text-xs">(Premium)</span>}
          </Button>
        </div>
      </CardContent>
      
      {/* Project-specific chat modal */}
      <ChatModal 
        open={isChatOpen} 
        onOpenChange={setIsChatOpen} 
        projectName={project.name}
      />
    </Card>
  );
};

export default ProjectCard;
