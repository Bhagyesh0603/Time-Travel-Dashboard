"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, X, Maximize2, Minimize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSystemStatus } from "@/lib/store/use-system-status";
import { useTimeTravel } from "@/lib/store/use-time-travel";
import anime from 'animejs';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatbotAssistant() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  
  const { systemHealth, quantumStability, powerLevel } = useSystemStatus();
  const { targetDate } = useTimeTravel();

  useEffect(() => {
    // Initial greeting
    setMessages([{
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your Chronos AI Assistant. I can help you with time travel operations and system monitoring.',
      timestamp: new Date()
    }]);
  }, []);

  useEffect(() => {
    // Animate avatar when speaking
    if (isTyping && avatarRef.current) {
      anime({
        targets: avatarRef.current,
        scale: [1, 1.05, 1],
        duration: 600,
        easing: 'easeInOutQuad',
        loop: true
      });
    }
  }, [isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(input);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('status') || input.includes('health')) {
      return `Current system status:\nSystem Health: ${systemHealth.toFixed(1)}%\nQuantum Stability: ${quantumStability.toFixed(1)}%\nPower Level: ${powerLevel.toFixed(1)}%`;
    }
    
    if (input.includes('time') || input.includes('date')) {
      return `Currently targeting: ${targetDate.toLocaleString()}`;
    }
    
    if (input.includes('help')) {
      return 'I can help you with:\n- System status monitoring\n- Time travel coordinates\n- Safety protocols\n- Emergency procedures';
    }
    
    return 'I understand. How else can I assist you with the time travel operations?';
  };

  return (
    <>
  <AnimatePresence>
    {isVisible && (
      <motion.div
        key="chatbot"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <Card className="h-full backdrop-blur-md bg-card/50 border-border/40"
              style={{
                height: isExpanded ? '500px' : '400px',
                width: isExpanded ? '400px' : '300px'
              }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b border-border/40">
            <div className="flex items-center space-x-2">
              <div
                ref={avatarRef}
                className="w-8 h-8 rounded-full bg-gradient-to-r from-chart-1 to-chart-2 flex items-center justify-center"
              >
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="font-medium">Chronos Assistant</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsVisible(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Message Display */}
          <ScrollArea className="flex-1 h-[calc(100%-6rem)]">
            <CardContent className="p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground ml-4'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      <span className="text-xs opacity-50 mt-1 block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex space-x-1">
                        <span className="w-2 h-2 bg-current rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </ScrollArea>

          {/* Input Field */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-border/40">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    )}
  </AnimatePresence>

  {/* Floating Reopen Button */}
  {!isVisible && (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-4 right-4 z-50 bg-primary text-white p-3 rounded-full shadow-lg"
      onClick={() => setIsVisible(true)}
    >
      <Bot className="w-5 h-5" />
    </motion.button>
  )}
</>
  );
}