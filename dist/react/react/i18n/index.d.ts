import { default as i18n } from 'i18next';
export default i18n;
export declare const usePSTranslation: () => {
    t: import('i18next').TFunction<"translation", undefined>;
    resolveText: (text?: string, textKey?: string, params?: Record<string, any>) => string;
    currentLanguage: string;
    changeLanguage: (lng?: string, callback?: import('node_modules/i18next').Callback) => Promise<import('i18next').TFunction>;
};
