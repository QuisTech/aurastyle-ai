import { Sparkles, Github, Twitter } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-dark text-light border-t border-primary/20 py-8 px-6 md:px-12 text-center">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="flex items-center space-x-2 mb-4">
            <Sparkles className="w-6 h-6 text-accent" />
            <span className="text-xl font-semibold">AuraStyle AI</span>
          </Link>
          <p className="text-sm text-light/70">Your AI-Powered Personal Stylist & Beauty Consultant.</p>
          <p className="text-xs text-light/50 mt-2">&copy; {new Date().getFullYear()} AuraStyle AI. All rights reserved.</p>
        </div>

        <div className="flex flex-col items-center">
          <h4 className="font-semibold text-lg mb-4">Sponsors & Technology Partners</h4>
          <ul className="space-y-2 text-sm text-light/80">
            <li>Perfect Corp</li>
            <li>Crusoe Cloud</li>
            <li>TrueFoundry AI Gateway</li>
            <li>Nvidia Nemotron</li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <h4 className="font-semibold text-lg mb-4">Connect</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-light hover:text-accent transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="text-light hover:text-accent transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
          <ul className="mt-4 space-y-2 text-sm text-light/80">
            <li><Link href="#" className="hover:text-accent">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-accent">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
