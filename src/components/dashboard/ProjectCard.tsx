
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Link2, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import ChatModal from './ChatModal';

interface Repository {
  name: string;
  description: string;
}

interface Project {
  id: string;
  name: string;
  updatedAt: string;
  repos: Repository[];
}

interface ProjectCardProps {
  project: Project;
  isPremium: boolean;
  onPremiumFeature: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isPremium, onPremiumFeature }) => {
  const { toast } = useToast();
  const [chatOpen, setChatOpen] = React.useState(false);

  const handleCopyLink = () => {
    if (!isPremium) {
      onPremiumFeature();
      return;
    }
    
    // In a real app, this would copy an actual link
    navigator.clipboard.writeText(`https://doxgen.app/docs/${project.id}`);
    
    toast({
      title: "Link Copied",
      description: "Public link copied to clipboard",
    });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="pt-6 pb-2 flex-grow">
        <div className="flex flex-col h-full">
          <div>
            <h3 className="font-semibold text-xl mb-2">
              <Link to={`/preview/${project.id}`} className="hover:underline">
                {project.name}
              </Link>
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Updated {project.updatedAt}
            </p>
          </div>

          <div className="mt-2 mb-4">
            <div className="text-sm font-medium mb-2">Repositories:</div>
            <ul className="space-y-2">
              {project.repos.map((repo, index) => (
                <li key={index} className="text-sm">
                  <div className="font-medium">{repo.name}</div>
                  <div className="text-muted-foreground">{repo.description}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 pb-4 flex flex-wrap gap-2">
        <Button size="sm" variant="outline" asChild>
          <Link to={`/preview/${project.id}`}>
            <ExternalLink className="h-4 w-4 mr-1" />
            View Documentation
          </Link>
        </Button>
        
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleCopyLink}
          className={!isPremium ? "opacity-70" : ""}
          disabled={!isPremium}
        >
          <Link2 className="h-4 w-4 mr-1" />
          Copy Public Link
        </Button>
        
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => isPremium ? setChatOpen(true) : onPremiumFeature()}
          className={!isPremium ? "opacity-70" : ""}
          disabled={!isPremium}
        >
          <MessageSquare className="h-4 w-4 mr-1" />
          Ask AI
        </Button>
      </CardFooter>

      {isPremium && (
        <ChatModal 
          open={chatOpen} 
          onClose={() => setChatOpen(false)}
          projectName={project.name} 
        />
      )}
    </Card>
  );
};

export default ProjectCard;
