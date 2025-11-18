
import React, { useState, useEffect } from 'react';

interface CodeDisplayProps {
  code: string;
  language: string;
  isLoading: boolean;
}

const CopyIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);


export const CodeDisplay: React.FC<CodeDisplayProps> = ({ code, language, isLoading }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (code) {
      setCopied(false);
    }
  }, [code]);
  
  const handleCopy = () => {
    if(!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-brand-bg-light rounded-lg shadow-lg border border-brand-border relative">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-900/50 rounded-t-lg">
        <span className="text-sm font-semibold text-brand-text-secondary">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-2 px-3 py-1 bg-brand-border text-brand-text-secondary text-sm rounded-md hover:bg-gray-600 transition-colors"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono whitespace-pre-wrap break-words">
          {code}
          {isLoading && !code && <span className="animate-pulse text-gray-500">Generating code...</span>}
        </code>
      </pre>
    </div>
  );
};
