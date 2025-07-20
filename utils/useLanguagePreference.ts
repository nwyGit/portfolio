import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Language } from '@/components/v2/shared/type/types';

const LANGUAGE_STORAGE_KEY = 'language-preference';

export interface LanguagePreference {
  language: Language;
  setLanguage: (lang: Language) => void;
  isLoading: boolean;
}

/**
 * Hook for managing user language preference with localStorage persistence
 * Auto-detects language from URL path and provides persistence across sessions
 */
export function useLanguagePreference(): LanguagePreference {
  const router = useRouter();
  const [language, setLanguageState] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(true);

  // Initialize language preference
  useEffect(() => {
    // Detect language from current URL path
    const currentLanguage: Language = router.asPath.startsWith('/zh') ? 'zh-Hant' : 'en';
    
    // Check if we're on the client side
    if (typeof window !== 'undefined') {
      try {
        // Try to get stored preference
        const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
        
        if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'zh-Hant')) {
          setLanguageState(storedLanguage);
        } else {
          // No stored preference, use current URL language and store it
          setLanguageState(currentLanguage);
          localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
        }
      } catch (error) {
        // localStorage not available, use current URL language
        console.warn('localStorage not available, using URL language:', error);
        setLanguageState(currentLanguage);
      }
    } else {
      // Server-side rendering, use URL language
      setLanguageState(currentLanguage);
    }
    
    setIsLoading(false);
  }, [router.asPath]);

  // Function to change language preference
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    
    // Persist to localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
      } catch (error) {
        console.warn('Failed to save language preference:', error);
      }
    }
  };

  return {
    language,
    setLanguage,
    isLoading
  };
}

/**
 * Utility function to get stored language preference without React hooks
 * Useful for SSR or outside React components
 */
export function getStoredLanguagePreference(): Language {
  if (typeof window === 'undefined') {
    return 'en'; // Default for SSR
  }
  
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
    return (stored === 'en' || stored === 'zh-Hant') ? stored : 'en';
  } catch {
    return 'en';
  }
}

/**
 * Utility function to generate language-aware blog URL
 */
export function getLanguageAwareBlogUrl(preferredLanguage: Language): string {
  const langCode = preferredLanguage === 'zh-Hant' ? 'zh' : 'en';
  return `/${langCode}/blogs`;
}