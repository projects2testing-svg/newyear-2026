'use client'

import { useLanguage } from '../contexts/LanguageContext'

export default function ReflectionCard({
  question,
  placeholder,
  value,
  onChange,
  isActive,
  index
}) {
  const { t } = useLanguage()

  return (
    <div
      className={`card max-w-2xl mx-auto mb-6 transition-all duration-500 ${
        isActive ? 'animate-slide-up' : 'opacity-60'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 leading-relaxed">
          {question}
        </h3>
        <div className="w-12 h-1 bg-gradient-to-r from-gold to-purple-soft rounded-full"></div>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-4 border border-gray-200 rounded-xl resize-none textarea-focus
                   text-gray-700 placeholder-gray-400 bg-gray-50/50 min-h-[120px]
                   focus:bg-white transition-all duration-300"
        rows={4}
      />

      <div className="mt-4 text-sm text-gray-500">
        {t('card.reflectionTip')}
      </div>
    </div>
  )
}
