import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import './styles/button.css';

// Export all React components
export { PSButton } from './components/Button';
export type { PSButtonProps } from './components/Button';

// Export types and hooks
export * from './types';
export { usePSButton } from './hooks/usePSButton';
export { usePSTranslation } from './i18n';

// Provider component for PSControls React apps
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
    i18n.changeLanguage(language);
  }, [language]);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-ps-theme', theme);
  }, [theme]);

  return (
    <I18nextProvider i18n={i18n}>
      <div className={`ps-controls-root ps-theme-${theme}`}>
        {children}
      </div>
    </I18nextProvider>
  );
};