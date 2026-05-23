"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquareText, Zap } from 'lucide-react';

interface AgentLog {
  id: number;
  agent: string;
  action: string;
  output: string;
  timestamp: string;
}

interface AIRecordHUDProps {
  logs: AgentLog[];
}

export const AIRecordHUD: React.FC<AIRecordHUDProps> = ({ logs }) => {
  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.8 }}
      className="fixed bottom-4 right-4 bg-dark/80 backdrop-blur-sm border border-primary/40 rounded-lg p-4 shadow-2xl max-w-sm z-50"
    >
      <h4 className="text-lg font-bold text-light mb-3 flex items-center space-x-2">
        <Zap className="w-5 h-5 text-accent" />
        <span>AI Activity Log</span>
      </h4>
      <div className="max-h-48 overflow-y-auto custom-scrollbar text-sm">
        {logs.length === 0 ? (
          <p className="text-light/60 text-center py-4">
            No agent activity yet. Start interacting with AuraStyle AI!
          </p>
        ) : (
          <ul className="space-y-2">
            {logs.slice(-5).reverse().map((log) => (
              <motion.li
                key={log.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-dark/50 p-2 rounded-md border border-primary/20"
              >
                <div className="flex items-center text-accent font-semibold mb-1">
                  <MessageSquareText className="w-4 h-4 mr-1" />
                  <span>{log.agent}</span>
                  <span className="ml-auto text-light/50 text-xs">{log.timestamp}</span>
                </div>
                <p className="text-light/80 text-xs">{log.action}: {log.output}</p>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
      {logs.length > 5 && (
        <p className="text-light/50 text-xs mt-2 text-center">Showing latest 5 entries...</p>
      )}
    </motion.div>
  );
};
