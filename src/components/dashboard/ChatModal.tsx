
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Send, Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import PremiumFeature from '@/components/PremiumFeature';

interface ChatMessage {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ open, onOpenChange }) => {
  const { isPremium } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      content: "Hello! I'm the DoxGen AI assistant. How can I help with your documentation today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !isPremium) return;
    
    const userMessage: ChatMessage = {
      id: messages.length + 1,
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Mock AI response after a short delay
    setTimeout(() => {
      const aiResponses = [
        "I've analyzed your documentation structure and found some areas for improvement in the README file.",
        "The API documentation you're generating could use more examples. Would you like me to suggest some?",
        "Your function documentation is well-structured. I've identified the key components and can help enhance the descriptions.",
        "Based on your codebase, I recommend organizing the documentation into three main sections: Setup, API Reference, and Examples.",
      ];
      
      const aiMessage: ChatMessage = {
        id: messages.length + 2,
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>DoxGen AI Assistant</DialogTitle>
          <DialogDescription>
            Ask questions about your documentation or get help with your code.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        {isPremium ? (
          <div className="p-4 border-t flex gap-2">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button size="icon" onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="p-4 border-t">
            <div className="bg-muted rounded-lg p-4 flex items-center gap-3">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Premium Feature</p>
                <p className="text-sm text-muted-foreground">
                  Upgrade to premium to chat with our AI assistant.
                </p>
              </div>
              <Button size="sm" className="ml-auto">Upgrade</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;
