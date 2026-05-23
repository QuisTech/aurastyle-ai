"use client";

import Link from 'next/link';
import { Sparkles, Shirt, Gem } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './button';

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="bg-primary text-light shadow-lg py-4 px-6 md:px-12 flex justify-between items-center"
    >
      <Link href="/" className="flex items-center space-x-2">
        <Sparkles className="w-8 h-8 text-accent" />
        <span className="text-2xl font-bold tracking-tight">AuraStyle AI</span>
      </Link>
      <div className="flex items-center space-x-6">
        <Link href="/studio">
          <Button variant="ghost" className="flex items-center space-x-2 text-lg">
            <Shirt className="w-5 h-5" />
            <span>Studio</span>
          </Button>
        </Link>
        <Link href="#features">
          <Button variant="ghost" className="flex items-center space-x-2 text-lg">
            <Gem className="w-5 h-5" />
            <span>Features</span>
          </Button>
        </Link>
      </div>
    </motion.nav>
  );
}
