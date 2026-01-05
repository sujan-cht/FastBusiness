
import { useAppStore } from '../state/appStore';
import { translations } from './locales';

type TranslationKey = keyof (typeof translations)['en'];

export const useTranslations = () => {
  const language = useAppStore((state) => state.language);
  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };
  return { t, language };
};
