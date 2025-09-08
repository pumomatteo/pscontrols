import React from 'react';

// Export all React components
export { PSButton } from './components/Button-simple';
export type { PSButtonProps } from './components/Button-simple';


// Export types only for testing
export * from './types';

// Simplified Provider component without i18n for testing
export interface PSControlsProviderProps {
  children: React.ReactNode;
  language?: string;
  theme?: 'light' | 'dark';
}

export const PSControlsProvider: React.FC<PSControlsProviderProps> = ({
  children,
  language = 'it',
  theme = 'light'
}) => {
  React.useEffect(() => {
    document.documentElement.setAttribute('data-ps-theme', theme);
    document.documentElement.setAttribute('data-ps-language', language);
  }, [theme, language]);

  return (
    <div className={`ps-controls-root ps-theme-${theme}`}>
      {children}
    </div>
  );
};