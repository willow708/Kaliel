
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
        AI Code Crafter
      </h1>
      <p className="mt-2 text-lg text-brand-text-secondary">
        Your personal AI partner for generating code in any language.
      </p>
    </header>
  );
};
