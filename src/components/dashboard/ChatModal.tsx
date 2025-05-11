
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendIcon } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatModalProps {
  open: boolean;
  onClose: () => void;
  projectName: string;
}

const ChatModal: React.FC<ChatModalProps> = ({ open, onClose, projectName }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: `Hi! I'm your DoxGen assistant. How can I help you with your ${projectName} project documentation?` }
  ]);
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages([
        ...newMessages, 
        { 
          role: 'assistant', 
          content: `I'm analyzing your ${projectName} project. This is a simulated response. In the real app, this would provide actual information about your documentation.` 
        }
      ]);
    }, 1000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Chat with AI About {projectName}</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 min-h-[300px] max-h-[400px] py-4">
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex">
          <Input
            className="flex-1"
            placeholder="Ask a question about your documentation..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button 
            className="ml-2" 
            size="icon" 
            onClick={handleSend}
            disabled={!input.trim()}
          >
            <SendIcon className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;
