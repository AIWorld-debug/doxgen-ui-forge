
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { 
  FolderOpen, 
  FileText, 
  Settings, 
  LogOut,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ChatModal from '@/components/dashboard/ChatModal';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const [isChatOpen, setIsChatOpen] = useState(false);

  const isActive = (path: string) => location.pathname.startsWith(path);
  
  const getNavClass = (path: string) => {
    return cn(
      'flex items-center gap-2 w-full px-3 py-2 rounded-md transition-colors',
      isActive(path) 
        ? 'bg-primary text-primary-foreground font-medium' 
        : 'hover:bg-muted'
    );
  };

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar
        className={cn(
          'border-r',
          collapsed ? 'w-16' : 'w-64'
        )}
        collapsible="icon"
      >
        <SidebarContent className="h-full flex flex-col">
          <div className={cn(
            'flex items-center p-4',
            collapsed ? 'justify-center' : 'justify-between'
          )}>
            {!collapsed && (
              <Link to="/dashboard" className="flex items-center gap-2">
                <div className="h-6 w-6 bg-primary rounded flex items-center justify-center">
                  <FileText className="h-3 w-3 text-white" />
                </div>
                <span className="font-semibold text-lg">DoxGen</span>
              </Link>
            )}
            <SidebarTrigger />
          </div>
          
          <div className="mt-2 px-3">
            {!collapsed && (
              <div className="flex items-center gap-2 mb-6">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {user?.name?.substring(0, 2).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium truncate max-w-[160px]">
                    {user?.name || 'User'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {user?.plan === 'premium' ? 'Premium' : 'Free'} plan
                  </span>
                </div>
              </div>
            )}
          </div>

          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/dashboard" className={getNavClass('/dashboard')}>
                      <FolderOpen className="h-4 w-4" />
                      {!collapsed && <span>My Projects</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/generate" className={getNavClass('/generate')}>
                      <FileText className="h-4 w-4" />
                      {!collapsed && <span>Generate Documentation</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/settings" className={getNavClass('/settings')}>
                      <Settings className="h-4 w-4" />
                      {!collapsed && <span>Settings</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <button 
                      onClick={() => setIsChatOpen(true)}
                      className={cn(
                        'flex items-center gap-2 w-full px-3 py-2 rounded-md transition-colors',
                        'hover:bg-muted'
                      )}
                    >
                      <MessageSquare className="h-4 w-4" />
                      {!collapsed && <span>Ask AI</span>}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <div className="mt-auto">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button 
                    onClick={logout} 
                    className="flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-muted transition-colors text-muted-foreground"
                  >
                    <LogOut className="h-4 w-4" />
                    {!collapsed && <span>Logout</span>}
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </SidebarContent>
      </Sidebar>

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      <ChatModal open={isChatOpen} onOpenChange={setIsChatOpen} />
    </div>
  );
};

export default DashboardLayout;
