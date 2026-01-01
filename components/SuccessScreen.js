'use client'

import { useLanguage } from '../contexts/LanguageContext'

export default function SuccessScreen({ onReset }) {
  const { t } = useLanguage()

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-2xl mx-auto animate-fade-in">
        {/* Success animation */}
        <div className="mb-8">
          <div className="inline-block p-6 rounded-full bg-gradient-to-r from-gold/30 to-purple-soft/30 mb-6 animate-sparkle">
            <span className="text-7xl">🎉</span>
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
          {t('success.title')}
        </h2>

        <p className="text-xl text-white/90 mb-8 leading-relaxed">
          {t('success.message')}
        </p>

        <div className="card mb-8">
          <blockquote className="text-lg italic text-gray-700 mb-4">
            {t('success.quote')}
          </blockquote>
          <cite className="text-sm text-gray-500">{t('success.quoteAuthor')}</cite>
        </div>

        <div className="space-y-4">
          <p className="text-white/80">
            {t('success.shareMessage')}
          </p>

          <button
            onClick={onReset}
            className="btn-primary mt-8"
          >
            {t('success.createAnother')}
          </button>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-gold rounded-full animate-sparkle"></div>
          <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-purple-soft rounded-full animate-sparkle" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-2/3 left-1/2 w-1 h-1 bg-blue-soft rounded-full animate-sparkle" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </section>
  )
}
