
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface MainLayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, hideNav = false }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col">
      {!hideNav && (
        <header className="border-b sticky top-0 bg-background z-10">
          <div className="container flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary rounded flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <span className="font-semibold text-lg">DoxGen</span>
            </Link>
            
            <nav className="flex items-center gap-6">
              <Link 
                to="/pricing" 
                className={`text-sm font-medium ${
                  location.pathname === '/pricing' 
                    ? 'text-primary' 
                    : 'text-foreground/70 hover:text-foreground transition-colors'
                }`}
              >
                Pricing
              </Link>
              <Link 
                to="/#features" 
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link 
                to="/#" 
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                Documentation
              </Link>
            </nav>
            
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <Button asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button variant="outline" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </header>
      )}
      
      <main className="flex-1">
        {children}
      </main>
      
      {!hideNav && (
        <footer className="border-t py-6">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-medium mb-3">DoxGen</h3>
                <p className="text-sm text-muted-foreground">
                  Generate stunning documentation from your code in seconds.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Product</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Guides
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} DoxGen. All rights reserved.
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default MainLayout;
