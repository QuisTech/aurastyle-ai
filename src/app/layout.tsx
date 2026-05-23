import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import PageTransitionProvider from '@/components/PageTransitionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AuraStyle AI - Your AI-Powered Personal Stylist',
  description: 'Hyper-personalized styling and beauty advice using AI/AR.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <PageTransitionProvider>{children}</PageTransitionProvider>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
