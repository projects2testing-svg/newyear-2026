'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import translations from '../translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')
  const [isLoading, setIsLoading] = useState(true)

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('reflection-language')
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage)
    }
    setIsLoading(false)
  }, [])

  // Save language to localStorage when it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('reflection-language', language)
    }
  }, [language, isLoading])

  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage)
    }
  }

  const t = (key, fallback = '') => {
    const keys = key.split('.')
    let value = translations[language]

    for (const k of keys) {
      value = value?.[k]
    }

    if (value === undefined) {
      // Fallback to English
      let englishValue = translations.en
      for (const k of keys) {
        englishValue = englishValue?.[k]
      }

      if (englishValue === undefined) {
        console.warn(`Missing translation for key: ${key}`)
        return fallback || key
      }

      return englishValue
    }

    return value
  }

  const value = {
    language,
    changeLanguage,
    t,
    availableLanguages: Object.keys(translations),
    isLoading
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
