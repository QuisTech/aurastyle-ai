"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, Shirt, Palette, ScanText, Lightbulb, TrendingUp, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const featureCards = [
  {
    icon: <Shirt className="w-10 h-10 text-accent" />,
    title: 'Virtual Try-On',
    description: 'Experience clothes and accessories on your unique body shape in real-time with Perfect Corp AR.',
  },
  {
    icon: <Palette className="w-10 h-10 text-accent" />,
    title: 'AI Style Generation',
    description: 'Co-create entire outfits and visualize new fashion concepts with Generative AI.',
  },
  {
    icon: <ScanText className="w-10 h-10 text-accent" />,
    title: 'Personalized Skin Analysis',
    description: 'Get detailed skin reports and tailored beauty product recommendations based on your selfie.',
  },
  {
    icon: <Lightbulb className="w-10 h-10 text-accent" />,
    title: 'Smart Product Matching',
    description: 'Discover products that perfectly align with your style, body type, and skin needs from leading brands.',
  },
  {
    icon: <TrendingUp className="w-10 h-10 text-accent" />,
    title: 'Trend Forecasting',
    description: 'Stay ahead of the curve with AI-driven insights into emerging fashion and beauty trends.',
  },
  {
    icon: <Heart className="w-10 h-10 text-accent" />,
    title: 'Hyper-Personalized Experience',
    description: 'A truly unique shopping journey that understands your individual preferences and evolving tastes.',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center -mt-8 pt-8">
        {/* Background Image & Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
        >
          <div className="absolute inset-0 bg-dark/70 backdrop-blur-[2px]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 text-center px-4 md:px-8 max-w-5xl"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-block p-3 rounded-2xl bg-panel backdrop-blur-md border border-white/10 mb-6 shadow-2xl animate-float">
              <Sparkles className="w-16 h-16 text-accent" />
            </div>
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-light via-secondary to-accent leading-tight">
              AuraStyle AI
            </h1>
            <p className="text-xl md:text-3xl text-light/90 font-light max-w-3xl mx-auto drop-shadow-md">
              Your AI-Powered Personal Stylist & Beauty Consultant for the Next Generation of Shopping.
            </p>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg md:text-xl text-light/70 max-w-3xl mx-auto mt-6 mb-10"
          >
            Tired of endless scrolling and disappointing purchases? We transform your online shopping
            experience with AR try-on, AI skin analysis, and generative fashion tailored to you.
          </motion.p>
          <Link href="/studio">
            <Button variant="accent" size="lg" className="text-xl px-10 py-6 shadow-[0_0_40px_-10px_rgba(236,72,153,0.5)] hover:shadow-[0_0_60px_-10px_rgba(236,72,153,0.7)] transition-all rounded-full">
              Start Your Style Journey <Sparkles className="ml-3 w-6 h-6" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-24 px-4 md:px-8 bg-dark relative z-10">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <h2 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-light to-secondary mb-16">
          Features that Redefine Style
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {featureCards.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-panel backdrop-blur-xl border border-white/5 rounded-2xl p-8 text-center shadow-lg hover:bg-white/5 transition-all duration-300 ease-in-out group"
            >
              <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <div className="p-4 rounded-xl bg-primary/20 text-accent">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-light mb-4">{feature.title}</h3>
              <p className="text-light/60 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
