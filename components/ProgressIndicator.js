'use client'

import { useLanguage } from '../contexts/LanguageContext'

export default function ProgressIndicator({ currentStep, totalSteps }) {
  const { t } = useLanguage()
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-white/80 font-medium">
          {t('progress.stepText', '{{current}} of {{total}}')
            .replace('{{current}}', currentStep)
            .replace('{{total}}', totalSteps)}
        </span>
        <span className="text-sm text-white/60">
          {t('progress.percentageText', '{{percentage}}% complete')
            .replace('{{percentage}}', Math.round(progress))}
        </span>
      </div>

      <div className="w-full bg-white/20 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-gold to-yellow-400 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="flex justify-between mt-4">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i < currentStep
                ? 'bg-gold shadow-lg'
                : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
