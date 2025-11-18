
import React, { useState, useCallback } from 'react';
import { generateCodeStream } from './services/geminiService';
import { Header } from './components/Header';
import { LanguageSelector } from './components/LanguageSelector';
import { CodeDisplay } from './components/CodeDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { LANGUAGES } from './constants';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [language, setLanguage] = useState<string>('auto');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateCode = useCallback(async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setGeneratedCode('');

    try {
      const stream = await generateCodeStream(prompt, language);
      let fullText = '';
      for await (const chunk of stream) {
        const chunkText = chunk.text;
        fullText += chunkText;
        setGeneratedCode(fullText);
      }
    } catch (e) {
      console.error(e);
      setError('An error occurred while generating the code. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, language, isLoading]);

  return (
    <div className="min-h-screen bg-brand-bg-dark text-brand-text font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Header />

        <main className="mt-8 space-y-6">
          <div className="bg-brand-bg-light p-6 rounded-lg shadow-lg border border-brand-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="md:col-span-2">
                 <label htmlFor="prompt-input" className="block text-sm font-medium text-brand-text-secondary mb-2">Your Request</label>
                 <textarea
                  id="prompt-input"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., create a Python function to check if a string is a palindrome"
                  className="w-full h-32 p-3 bg-brand-bg-dark border border-brand-border rounded-md focus:ring-2 focus:ring-brand-primary focus:outline-none resize-y transition-shadow duration-200"
                  disabled={isLoading}
                />
              </div>
              <div className="md:col-span-1">
                 <LanguageSelector
                    selectedLanguage={language}
                    onLanguageChange={setLanguage}
                    disabled={isLoading}
                />
              </div>
            </div>

            <button
              onClick={handleGenerateCode}
              disabled={isLoading || !prompt.trim()}
              className="w-full flex items-center justify-center px-6 py-3 bg-brand-primary text-white font-semibold rounded-md hover:bg-brand-primary-hover disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  Generating...
                </>
              ) : (
                'Generate Code'
              )}
            </button>
          </div>
          
          {error && (
            <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-center">
              <p>{error}</p>
            </div>
          )}

          {(generatedCode || isLoading) && (
            <CodeDisplay 
                code={generatedCode} 
                language={LANGUAGES.find(l => l.value === language)?.label || language} 
                isLoading={isLoading}
            />
          )}

        </main>
      </div>
    </div>
  );
};

export default App;
