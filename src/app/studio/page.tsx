"use client";

import { useState, useRef } from 'react';
import { Camera, Send, Sparkles, Wand, ShoppingBag, Heart, Sun, UploadCloud, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AIRecordHUD } from '@/components/studio/AIRecordHUD';
import { PerfectCorpClient } from '@/lib/apiClients';

interface AgentLog {
  id: number;
  agent: string;
  action: string;
  output: string;
  timestamp: string;
}

const perfectCorpClient = new PerfectCorpClient(process.env.NEXT_PUBLIC_PERFECT_CORP_API_KEY || 'mock-key');

export default function AuraStyleStudioPage() {
  const [activeTab, setActiveTab] = useState<'persona' | 'beauty'>('persona');
  
  // Persona State
  const [personaInput, setPersonaInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'ai'; message: string }[]>([
    { sender: 'ai', message: 'Hello! I am your AI stylist. Describe the look you are going for today.' }
  ]);
  const [currentStylePrompt, setCurrentStylePrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  
  // Beauty State
  const [skinAnalysisReport, setSkinAnalysisReport] = useState<any>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Shared State
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
  const [agentLogs, setAgentLogs] = useState<AgentLog[]>([]);

  const addLog = (agent: string, action: string, output: string) => {
    setAgentLogs((prev) => [
      ...prev,
      { id: prev.length + 1, agent, action, output, timestamp: new Date().toLocaleTimeString() },
    ]);
  };

  const handlePersonaSubmit = async () => {
    if (!personaInput.trim()) return;
    setChatHistory((prev) => [...prev, { sender: 'user', message: personaInput }]);
    addLog('PersonaBuilder', 'Processing', `User input: "${personaInput}"`);
    const inputCopy = personaInput;
    setPersonaInput('');

    setTimeout(() => {
      let aiResponse = "I love that idea. I'll focus on sophisticated, modern aesthetics for your look.";
      if (inputCopy.toLowerCase().includes('bohemian') || inputCopy.toLowerCase().includes('boho')) {
        aiResponse = "Bohemian it is! I'm thinking flowing fabrics, earth tones, and layered accessories.";
      } else if (inputCopy.toLowerCase().includes('cyberpunk') || inputCopy.toLowerCase().includes('neon')) {
        aiResponse = "Cyberpunk style engaged. Think neon accents, tech-wear, and sleek dark layers.";
      }
      
      setChatHistory((prev) => [...prev, { sender: 'ai', message: aiResponse }]);
      addLog('PersonaBuilder', 'Response Generated', aiResponse);
      setCurrentStylePrompt(inputCopy); // Auto-fill prompt
    }, 1200);
  };

  const handleGenerateStyle = async () => {
    if (!currentStylePrompt.trim()) return;
    addLog('FashionGen', 'Generating', `Prompt: "${currentStylePrompt}"`);

    // Simulate API delay
    setTimeout(() => {
      // Mock result using our generated asset
      setGeneratedImage('/placeholder-dress.jpg');
      addLog('FashionGen', 'Image Generated', `Success: Visualizing style.`);
      
      setTimeout(() => {
        const products = [
          { id: 'p001', name: 'Boho Elegance Maxi', price: '$120.00', imageUrl: '/placeholder-dress.jpg' },
          { id: 'p002', name: 'Premium Leather Sandals', price: '$85.00', imageUrl: '/placeholder-shoes.jpg' },
        ];
        setRecommendedProducts(products);
        addLog('ProductMatch', 'Matches Found', `Found ${products.length} items from visual analysis.`);
      }, 800);
    }, 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelfiePreview(imageUrl);
      addLog('BeautyScan', 'Image Loaded', `Ready for analysis.`);
    }
  };

  const handleSkinAnalysis = async () => {
    if (!selfiePreview) return;
    addLog('BeautyScan', 'Analyzing', 'Running AI skin diagnostics...');
    
    setTimeout(() => {
      setSkinAnalysisReport({ score: 88, concerns: ['Slight dehydration', 'Mild uneven tone'] });
      addLog('BeautyScan', 'Analysis Complete', `Score: 88. Identified 2 areas for focus.`);
      
      setTimeout(() => {
        const beautyProds = [
          { id: 'b001', name: 'Lumina Hydrating Serum', price: '$45.00', imageUrl: '/placeholder-serum.jpg' },
          { id: 'b002', name: 'Clear Complexion Treatment', price: '$32.00', imageUrl: '/placeholder-treatment.jpg' },
        ];
        setRecommendedProducts(beautyProds);
        addLog('ProductMatch', 'Beauty Matches', `Found ${beautyProds.length} tailored skincare products.`);
      }, 800);
    }, 2500);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px-64px)] gap-6 p-2">
      
      {/* Left Column: Control Panel */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-[400px] flex flex-col space-y-6"
      >
        <div className="bg-panel backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-2xl flex-1 flex flex-col">
          
          {/* Tabs */}
          <div className="flex space-x-2 bg-dark/50 p-1 rounded-xl mb-6">
            <button
              onClick={() => setActiveTab('persona')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'persona' ? 'bg-primary/80 text-white shadow-md' : 'text-light/60 hover:text-light'
              }`}
            >
              <User className="w-4 h-4 inline-block mr-2" /> Persona
            </button>
            <button
              onClick={() => setActiveTab('beauty')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'beauty' ? 'bg-primary/80 text-white shadow-md' : 'text-light/60 hover:text-light'
              }`}
            >
              <Sun className="w-4 h-4 inline-block mr-2" /> Beauty Lab
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'persona' ? (
              <motion.div key="persona" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar">
                  {chatHistory.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`p-3.5 rounded-2xl max-w-[85%] text-sm ${msg.sender === 'user' ? 'bg-primary text-light rounded-tr-sm' : 'bg-white/5 text-light/90 border border-white/10 rounded-tl-sm'}`}>
                        {msg.message}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="relative mt-auto">
                  <input
                    type="text"
                    value={personaInput}
                    onChange={(e) => setPersonaInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handlePersonaSubmit()}
                    placeholder="E.g., I need a chic outfit for a summer wedding..."
                    className="w-full p-4 pr-12 rounded-xl bg-dark/50 border border-white/10 text-light placeholder:text-light/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                  <button onClick={handlePersonaSubmit} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-primary hover:text-accent transition-colors">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="beauty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col space-y-6">
                <div 
                  className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:bg-white/5 transition-colors cursor-pointer group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                  {selfiePreview ? (
                    <img src={selfiePreview} alt="Selfie Preview" className="w-32 h-32 object-cover rounded-full mx-auto shadow-xl ring-4 ring-primary/30" />
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="p-4 rounded-full bg-primary/20 text-accent mb-4 group-hover:scale-110 transition-transform">
                        <UploadCloud className="w-8 h-8" />
                      </div>
                      <p className="text-light/80 font-medium">Click to upload your selfie</p>
                      <p className="text-light/40 text-sm mt-2">JPEG, PNG up to 5MB</p>
                    </div>
                  )}
                </div>
                
                <Button 
                  onClick={handleSkinAnalysis} 
                  disabled={!selfiePreview}
                  className="w-full py-6 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg text-white font-medium"
                >
                  <Camera className="w-5 h-5 mr-2" /> Run AI Skin Analysis
                </Button>

                {skinAnalysisReport && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="font-semibold text-light mb-3 flex items-center"><Sparkles className="w-4 h-4 mr-2 text-accent" /> Analysis Results</h4>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-light/60 text-sm">Overall Health</span>
                      <span className="text-accent font-bold">{skinAnalysisReport.score}/100</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-light/60 text-sm">Detected Focus Areas:</span>
                      {skinAnalysisReport.concerns.map((c: string, i: number) => (
                        <p key={i} className="text-sm text-light/90 ml-2">• {c}</p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Right Column: AuraVision & Boutique */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex-1 flex flex-col space-y-6"
      >
        {/* AuraVision Canvas */}
        <div className="bg-panel backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-2xl flex flex-col h-[50vh] md:h-auto md:flex-1 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 z-10 flex gap-2">
            <Button onClick={handleGenerateStyle} variant="accent" size="sm" className="shadow-lg backdrop-blur-md bg-accent/90 hover:bg-accent text-white">
              <Wand className="w-4 h-4 mr-2" /> Generate Concept
            </Button>
          </div>

          {generatedImage ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex items-center justify-center p-4">
              <img src={generatedImage} alt="Generated Visual" className="max-w-full max-h-[40vh] object-contain rounded-xl shadow-2xl ring-1 ring-white/10" />
            </motion.div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
              <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-pulse-slow">
                <Sparkles className="w-12 h-12 text-primary/50" />
              </div>
              <h3 className="text-2xl font-bold text-light mb-2">AuraVision Canvas</h3>
              <p className="text-light/50 max-w-sm">Chat with your Persona Builder or upload a selfie to generate hyper-personalized visuals here.</p>
            </div>
          )}
        </div>

        {/* Curated Boutique - Horizontal List */}
        <div className="bg-panel backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-2xl">
          <h3 className="text-lg font-semibold text-light mb-4 flex items-center"><ShoppingBag className="w-5 h-5 mr-2 text-secondary" /> Curated For You</h3>
          <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
            {recommendedProducts.length === 0 ? (
              <div className="w-full py-8 text-center text-light/40 flex flex-col items-center justify-center">
                <Heart className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-sm">Recommendations will appear based on your analysis.</p>
              </div>
            ) : (
              recommendedProducts.map((product) => (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} key={product.id} className="min-w-[200px] bg-dark/50 border border-white/5 rounded-xl overflow-hidden hover:border-primary/50 transition-colors group">
                  <div className="h-32 overflow-hidden">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-light truncate">{product.name}</p>
                    <p className="text-accent font-semibold text-sm mt-1">{product.price}</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* HUD Log underneath */}
        <div className="h-40">
           <AIRecordHUD logs={agentLogs} />
        </div>
      </motion.div>

    </div>
  );
}
