'use client'

import { useLanguage } from '../contexts/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-4xl mx-auto animate-fade-in">
        <div className="mb-8">
          <div className="inline-block p-4 rounded-full bg-gradient-to-r from-gold/20 to-purple-soft/20 mb-6">
            <span className="text-6xl">✨</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
          {t('hero.title').split(',')[0]} <span className="text-gold">2025</span>,<br />
          {t('hero.title').split(',')[1]} <span className="text-gold">2026</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
          {t('hero.subtitle')}
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => document.getElementById('reflection-form').scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary text-lg"
          >
            {t('hero.cta')}
          </button>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gold rounded-full animate-sparkle"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-soft rounded-full animate-sparkle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-blue-soft rounded-full animate-sparkle" style={{ animationDelay: '2s' }}></div>
      </div>
    </section>
  )
}
