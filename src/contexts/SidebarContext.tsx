
import React, { createContext, useState, useContext, useEffect } from 'react';

interface SidebarContextType {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    const newValue = !collapsed;
    setCollapsed(newValue);
    localStorage.setItem('sidebar-collapsed', String(newValue));
  };

  useEffect(() => {
    const savedCollapsed = localStorage.getItem('sidebar-collapsed');
    if (savedCollapsed) {
      setCollapsed(savedCollapsed === 'true');
    }
  }, []);

  return (
    <SidebarContext.Provider value={{ collapsed, toggleCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
