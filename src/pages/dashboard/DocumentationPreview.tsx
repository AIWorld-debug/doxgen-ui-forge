
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download, Link2, ExternalLink, Share2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import PremiumFeature from '@/components/PremiumFeature';

const mockDocContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Project Documentation</title>
  <style>
    body { font-family: system-ui, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
    pre { background: #f5f5f5; padding: 10px; border-radius: 5px; overflow-x: auto; }
    code { font-family: monospace; background: #f5f5f5; padding: 2px 4px; border-radius: 3px; }
    h1, h2, h3 { margin-top: 2em; }
    .toc { background: #f9f9f9; padding: 15px; border-radius: 5px; }
    .toc ul { padding-left: 20px; }
  </style>
</head>
<body>
  <h1>Project Documentation</h1>
  
  <div class="toc">
    <h2>Table of Contents</h2>
    <ul>
      <li><a href="#introduction">Introduction</a></li>
      <li><a href="#getting-started">Getting Started</a></li>
      <li><a href="#api-reference">API Reference</a></li>
      <li><a href="#configuration">Configuration</a></li>
    </ul>
  </div>
  
  <h2 id="introduction">Introduction</h2>
  <p>
    This is the documentation for your project. It's automatically generated from your code and organized into sections.
  </p>
  
  <h2 id="getting-started">Getting Started</h2>
  <p>
    To get started with this project, follow these steps:
  </p>
  <pre><code>
# Install dependencies
npm install

# Start development server
npm run dev
  </code></pre>
  
  <h2 id="api-reference">API Reference</h2>
  <p>
    Here's the API reference for your project:
  </p>
  <pre><code>
GET /api/items
POST /api/items
GET /api/items/:id
PUT /api/items/:id
DELETE /api/items/:id
  </code></pre>
  
  <h2 id="configuration">Configuration</h2>
  <p>
    Configuration options for your project:
  </p>
  <pre><code>
{
  "port": 3000,
  "database": {
    "host": "localhost",
    "port": 5432,
    "name": "my_database"
  },
  "logging": {
    "level": "info",
    "format": "json"
  }
}
  </code></pre>
</body>
</html>
`;

const DocumentationPreview: React.FC = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { isPremium } = useAuth();
  const [copied, setCopied] = useState(false);
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://doxgen.app/docs/${id}`);
    setCopied(true);
    toast({
      title: 'Link copied',
      description: 'The documentation link has been copied to clipboard.',
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  const handleDownload = () => {
    if (!isPremium) return;
    
    toast({
      title: 'Download started',
      description: 'Your documentation is being prepared for download.',
    });
  };
  
  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Documentation Preview</h1>
          <p className="text-muted-foreground mt-1">
            Preview and share your generated documentation
          </p>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <PremiumFeature tooltipText="Downloading documentation requires a premium account">
            <Button variant="outline" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </PremiumFeature>
          
          <PremiumFeature tooltipText="Public links require a premium account">
            <Button variant="outline" onClick={handleCopyLink}>
              {copied ? (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </>
              )}
            </Button>
          </PremiumFeature>
          
          <Button variant="outline" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Open in new tab
            </a>
          </Button>
        </div>
      </div>
      
      <div className="bg-white border rounded-lg shadow-sm overflow-hidden h-[calc(100vh-200px)]">
        <div className="border-b p-2 bg-muted/50 flex items-center">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive/70"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/70"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
          </div>
          <div className="mx-auto text-xs text-muted-foreground">
            Documentation Preview
          </div>
        </div>
        <iframe
          srcDoc={mockDocContent}
          title="Documentation Preview"
          className="w-full h-full border-0"
          sandbox="allow-same-origin allow-scripts"
        />
      </div>
    </div>
  );
};

export default DocumentationPreview;
