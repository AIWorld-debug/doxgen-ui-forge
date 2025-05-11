
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const NotFound = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-muted/30">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-bold mt-4 mb-2">Page not found</h2>
        <p className="text-muted-foreground mb-8">
          We couldn't find the page you were looking for. It might have been moved or deleted.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link to={isAuthenticated ? "/dashboard" : "/"}>
              {isAuthenticated ? "Go to Dashboard" : "Go to Homepage"}
            </Link>
          </Button>
          {!isAuthenticated && (
            <Button variant="outline" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
