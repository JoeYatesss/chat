"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "system", content: "Welcome to NeuraTalk AI. How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState("claude");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    
    // Simulate AI typing
    setIsTyping(true);
    setTimeout(() => {
      setMessages([...newMessages, { 
        role: "system", 
        content: `This is a simulated response from ${selectedModel === "claude" ? "Claude" : "OpenAI"}. In a real implementation, this would make an API call to the selected AI service.` 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-950 font-sans min-h-screen flex flex-col text-white">
      {/* Header */}
      <header className="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-gray-900/50 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
            <div className="h-6 w-6 rounded-full bg-gray-900 flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"></div>
            </div>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">NeuraTalk AI</h1>
        </div>
        
        <div className="hidden sm:flex items-center space-x-4 text-sm">
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a>
        </div>
        
        <button className="hidden sm:block px-4 py-1.5 rounded-full bg-gray-800 hover:bg-gray-700 text-sm font-medium transition-colors">
          Sign In
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col max-w-4xl w-full mx-auto my-4 px-4">
        {/* Model selector */}
        <div className="mb-4 flex justify-center">
          <div className="bg-gray-800/50 backdrop-blur-sm p-1 rounded-full flex text-sm font-medium">
            <button 
              onClick={() => setSelectedModel("claude")} 
              className={`px-4 py-2 rounded-full transition-all ${selectedModel === "claude" ? 
                "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg" : 
                "text-gray-400 hover:text-gray-200"}`}
            >
              Claude
            </button>
            <button 
              onClick={() => setSelectedModel("openai")} 
              className={`px-4 py-2 rounded-full transition-all ${selectedModel === "openai" ? 
                "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg" : 
                "text-gray-400 hover:text-gray-200"}`}
            >
              OpenAI
            </button>
          </div>
        </div>
        
        {/* Chat container */}
        <div className="flex-1 bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${message.role === "user" ? 
                  "bg-gradient-to-r from-violet-600 to-purple-600 text-white" : 
                  "bg-gray-800 text-white"}`}>
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800 px-4 py-3 rounded-2xl text-white flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            )}
          </div>
          
          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700 bg-gray-800/50">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 bg-gray-700 border border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
              />
              <button 
                type="submit" 
                disabled={!input.trim()} 
                className={`p-2 rounded-full ${!input.trim() ? 'bg-gray-700 text-gray-500' : 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'} flex items-center justify-center`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-4 px-6 text-center text-gray-500 text-xs border-t border-gray-800">
        <p>NeuraTalk AI © 2024 | A powerful interface for next-generation AI conversations</p>
        <div className="mt-2 flex justify-center space-x-4">
          <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}
