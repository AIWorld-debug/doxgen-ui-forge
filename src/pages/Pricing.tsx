
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Pricing: React.FC = () => {
  const { user, isPremium } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleUpgrade = () => {
    toast({
      title: "Feature in development",
      description: "Payment processing is not available in this demo.",
    });
    
    // In a real app, this would redirect to a payment page
    // For demo purposes, we'll just show a toast
  };

  return (
    <MainLayout>
      <section className="py-20 px-4">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-lg text-muted-foreground">
              Choose the plan that's right for you
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-background rounded-lg p-8 border shadow-sm">
              <div className="mb-6">
                <h3 className="text-2xl font-bold">Free</h3>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground mb-6">
                  Perfect for trying out DoxGen or for single projects.
                </p>
                {!user ? (
                  <Button className="w-full mb-6" variant="outline" asChild>
                    <Link to="/signup">Get Started</Link>
                  </Button>
                ) : (
                  <Button 
                    className="w-full mb-6" 
                    variant="outline" 
                    disabled={!isPremium}
                  >
                    Current Plan
                  </Button>
                )}
              </div>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>1 documentation project</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>GitHub repo URL or GitHub integration</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="h-5 w-5 flex items-center justify-center relative mt-0.5">
                    <span className="absolute h-0.5 w-3 bg-muted-foreground rotate-45"></span>
                    <span className="absolute h-0.5 w-3 bg-muted-foreground -rotate-45"></span>
                  </span>
                  <span>No file upload support</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="h-5 w-5 flex items-center justify-center relative mt-0.5">
                    <span className="absolute h-0.5 w-3 bg-muted-foreground rotate-45"></span>
                    <span className="absolute h-0.5 w-3 bg-muted-foreground -rotate-45"></span>
                  </span>
                  <span>No AI chat assistant</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="h-5 w-5 flex items-center justify-center relative mt-0.5">
                    <span className="absolute h-0.5 w-3 bg-muted-foreground rotate-45"></span>
                    <span className="absolute h-0.5 w-3 bg-muted-foreground -rotate-45"></span>
                  </span>
                  <span>No downloadable documentation</span>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <span className="h-5 w-5 flex items-center justify-center relative mt-0.5">
                    <span className="absolute h-0.5 w-3 bg-muted-foreground rotate-45"></span>
                    <span className="absolute h-0.5 w-3 bg-muted-foreground -rotate-45"></span>
                  </span>
                  <span>No public links</span>
                </li>
              </ul>
            </div>
            
            {/* Premium Plan */}
            <div className="bg-background rounded-lg p-8 border-2 border-primary shadow-sm relative">
              <div className="absolute -top-3 right-6 bg-primary text-primary-foreground text-sm font-medium py-1 px-3 rounded-full">
                Recommended
              </div>
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold">Premium</h3>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-bold">$19</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground mb-6">
                  For developers who need more power and flexibility.
                </p>
                {!user ? (
                  <Button className="w-full mb-6" asChild>
                    <Link to="/signup">Get Premium</Link>
                  </Button>
                ) : isPremium ? (
                  <Button className="w-full mb-6" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button className="w-full mb-6" onClick={handleUpgrade}>
                    Upgrade Now
                  </Button>
                )}
              </div>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>Unlimited documentation projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>GitHub repo URL or GitHub integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>File upload support (.zip)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>AI chat assistant</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>Download documentation as web app</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>Public shareable links</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                  <span>Multi-repository projects</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-lg mb-2">Can I cancel my subscription at any time?</h3>
                <p className="text-muted-foreground">
                  Yes, you can cancel your subscription at any time. You'll continue to have access to premium features until the end of your billing cycle.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">How do the project limits work?</h3>
                <p className="text-muted-foreground">
                  Free users can create one documentation project. Premium users can create unlimited projects.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-2">Can I upgrade from Free to Premium later?</h3>
                <p className="text-muted-foreground">
                  Yes, you can upgrade to Premium at any time from your account settings or from this pricing page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Pricing;
