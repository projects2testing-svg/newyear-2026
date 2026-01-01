'use client'

import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function LanguageSelector() {
  const { language, changeLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage)
    setIsOpen(false)
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-white/20
                     hover:bg-white/95 transition-all duration-300 flex items-center gap-2
                     text-gray-700 font-medium"
        >
          <span className="text-lg">
            {language === 'en' && '🇺🇸'}
            {language === 'hi' && '🇮🇳'}
            {language === 'as' && '🇮🇳'}
            {language === 'ta' && '🇮🇳'}
            {language === 'kn' && '🇮🇳'}
            {language === 'fr' && '🇫🇷'}
            {language === 'de' && '🇩🇪'}
          </span>
          <span className="text-sm">{t(`languages.${language}`)}</span>
          <span className={`text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl
                          border border-white/20 py-2 min-w-[160px] overflow-hidden">
            {Object.entries(t('languages')).map(([code, name]) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200
                           flex items-center gap-3 text-sm ${
                             language === code ? 'bg-gold/10 text-gold font-medium' : 'text-gray-700'
                           }`}
              >
                <span className="text-base">
                  {code === 'en' && '🇺🇸'}
                  {code === 'hi' && '🇮🇳'}
                  {code === 'as' && '🇮🇳'}
                  {code === 'ta' && '🇮🇳'}
                  {code === 'kn' && '🇮🇳'}
                  {code === 'fr' && '🇫🇷'}
                  {code === 'de' && '🇩🇪'}
                </span>
                <span>{name}</span>
                {language === code && (
                  <span className="ml-auto text-gold">✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
