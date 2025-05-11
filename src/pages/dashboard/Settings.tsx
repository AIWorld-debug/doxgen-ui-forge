
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Settings: React.FC = () => {
  const { user, isPremium, connectGithub, disconnectGithub } = useAuth();
  const { toast } = useToast();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(true);
  
  const handleProfileSave = () => {
    toast({
      title: 'Profile updated',
      description: 'Your profile has been updated successfully.'
    });
  };
  
  const handlePasswordSave = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please make sure your passwords match.',
        variant: 'destructive',
      });
      return;
    }
    
    // Reset fields after successful save
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    
    toast({
      title: 'Password updated',
      description: 'Your password has been updated successfully.'
    });
  };
  
  const handleNotificationsSave = () => {
    toast({
      title: 'Notification settings updated',
      description: 'Your notification preferences have been saved.'
    });
  };

  const handleGithubConnect = () => {
    connectGithub();
  };

  const handleGithubDisconnect = () => {
    disconnectGithub();
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account and preferences
        </p>
      </div>
      
      <div className="max-w-3xl">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <div className="flex items-center gap-2">
                    <Badge variant={isPremium ? "default" : "outline"}>
                      {isPremium ? 'Premium' : 'Free'}
                    </Badge>
                    {!isPremium && (
                      <Button variant="link" className="h-auto p-0" asChild>
                        <Link to="/pricing">Upgrade to Premium</Link>
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <Label>GitHub Integration</Label>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {user?.githubConnected 
                        ? 'Your GitHub account is connected' 
                        : 'Connect your GitHub account to import repositories'}
                    </div>
                    {user?.githubConnected ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleGithubDisconnect}
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Disconnect GitHub
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleGithubConnect}
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Connect GitHub
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleProfileSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handlePasswordSave}
                  disabled={!currentPassword || !newPassword || !confirmPassword}
                >
                  Update Password
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Manage your notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications" className="block mb-1">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about your documentation updates
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekly-digest" className="block mb-1">Weekly Digest</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a weekly summary of activity
                    </p>
                  </div>
                  <Switch
                    id="weekly-digest"
                    checked={weeklyDigest}
                    onCheckedChange={setWeeklyDigest}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketing-emails" className="block mb-1">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive news, offers, and updates from DoxGen
                    </p>
                  </div>
                  <Switch
                    id="marketing-emails"
                    checked={marketingEmails}
                    onCheckedChange={setMarketingEmails}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleNotificationsSave}>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="subscription">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
                <CardDescription>
                  Manage your subscription and billing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Current Plan</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <div className="font-medium">{isPremium ? 'Premium Plan' : 'Free Plan'}</div>
                        {isPremium ? (
                          <div className="text-sm text-muted-foreground">
                            $19/month, renews on June 15, 2025
                          </div>
                        ) : (
                          <div className="text-sm text-muted-foreground">
                            Limited features
                          </div>
                        )}
                      </div>
                      <Badge variant={isPremium ? "default" : "outline"}>
                        {isPremium ? 'Active' : 'Free Tier'}
                      </Badge>
                    </div>
                    
                    {isPremium ? (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Update Payment Method</Button>
                        <Button variant="outline" size="sm">Cancel Subscription</Button>
                      </div>
                    ) : (
                      <Button asChild>
                        <Link to="/pricing">Upgrade to Premium</Link>
                      </Button>
                    )}
                  </div>
                </div>
                
                {isPremium && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Billing History</h3>
                    <div className="rounded-lg border">
                      <div className="p-4 border-b">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">May 15, 2025</div>
                            <div className="text-sm text-muted-foreground">Premium Plan - Monthly</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">$19.00</div>
                            <div className="text-sm text-muted-foreground">Paid</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border-b">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">April 15, 2025</div>
                            <div className="text-sm text-muted-foreground">Premium Plan - Monthly</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">$19.00</div>
                            <div className="text-sm text-muted-foreground">Paid</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <Button variant="ghost" size="sm">
                          View All Invoices
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  <h3 className="text-lg font-medium mb-4">Plan Comparison</h3>
                  
                  <div className="grid gap-4 text-sm">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="font-medium">Feature</div>
                      <div className="font-medium">Free</div>
                      <div className="font-medium">Premium</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 border-t pt-2">
                      <div>Documentation projects</div>
                      <div>1 project</div>
                      <div>Unlimited</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 border-t pt-2">
                      <div>GitHub integration</div>
                      <div>✓</div>
                      <div>✓</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 border-t pt-2">
                      <div>File upload support</div>
                      <div>✗</div>
                      <div>✓</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 border-t pt-2">
                      <div>AI assistant</div>
                      <div>✗</div>
                      <div>✓</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 border-t pt-2">
                      <div>Public links</div>
                      <div>✗</div>
                      <div>✓</div>
                    </div>
                  </div>
                  
                  {!isPremium && (
                    <div className="mt-6">
                      <Button asChild>
                        <Link to="/pricing">View All Plan Details</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
