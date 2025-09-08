import { default as React } from 'react';
export { PSButton } from './components/Button';
export type { PSButtonProps } from './components/Button';
export * from './types';
export { usePSButton } from './hooks/usePSButton';
export { usePSTranslation } from './i18n';
export interface PSControlsProviderProps {
    children: React.ReactNode;
    language?: string;
    theme?: 'light' | 'dark';
}
export declare const PSControlsProvider: React.FC<PSControlsProviderProps>;
