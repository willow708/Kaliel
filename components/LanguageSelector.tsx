
import React from 'react';
import { LANGUAGES } from '../constants';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  disabled: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onLanguageChange, disabled }) => {
  return (
    <div>
        <label htmlFor="language-select" className="block text-sm font-medium text-brand-text-secondary mb-2">Language</label>
        <select
            id="language-select"
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            disabled={disabled}
            className="w-full p-3 bg-brand-bg-dark border border-brand-border rounded-md focus:ring-2 focus:ring-brand-primary focus:outline-none transition-shadow duration-200 disabled:opacity-50"
        >
        {LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
            {lang.label}
            </option>
        ))}
        </select>
    </div>
  );
};
