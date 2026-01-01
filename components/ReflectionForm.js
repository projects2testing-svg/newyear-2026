'use client'

import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import ProgressIndicator from './ProgressIndicator'
import ReflectionCard from './ReflectionCard'
import SuccessScreen from './SuccessScreen'

export default function ReflectionForm() {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    grateful: '',
    challenge: '',
    moment: '',
    leaveBehind: '',
    intention: '',
    word: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleNext = () => {
    if (currentStep < 7) { // 6 questions + 1 name step
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/reflections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          language: t.language // include selected language
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Something went wrong. Please try again.')
    }
    setIsSubmitting(false)
  }

  const handleReset = () => {
    setFormData({
      name: '',
      grateful: '',
      challenge: '',
      moment: '',
      leaveBehind: '',
      intention: '',
      word: ''
    })
    setCurrentStep(1)
    setIsSubmitted(false)
  }

  if (isSubmitted) {
    return <SuccessScreen onReset={handleReset} />
  }

  const isFormValid = ['grateful', 'challenge', 'moment', 'leaveBehind', 'intention', 'word']
    .every(key => formData[key].trim().length > 0)

  const questionKeys = ['grateful', 'challenge', 'moment', 'leaveBehind', 'intention', 'word']

  return (
    <section id="reflection-form" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            {t('form.title')}
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            {t('form.subtitle')}
          </p>
        </div>

        <ProgressIndicator currentStep={currentStep} totalSteps={7} />

        {currentStep === 1 && (
          <div className="card max-w-2xl mx-auto animate-slide-up">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {t('form.nameLabel')}
            </h3>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder={t('form.namePlaceholder')}
              className="w-full p-4 border border-gray-200 rounded-xl textarea-focus
                         text-gray-700 placeholder-gray-400 bg-gray-50/50
                         focus:bg-white transition-all duration-300"
            />
            <div className="mt-4 text-sm text-gray-500">
              {t('form.nameHelp')}
            </div>
          </div>
        )}

        {questionKeys.map((key, index) => (
          currentStep === index + 2 && (
            <ReflectionCard
              key={key}
              question={t(`form.questions.${key}.question`)}
              placeholder={t(`form.questions.${key}.placeholder`)}
              value={formData[key]}
              onChange={(value) => handleInputChange(key, value)}
              isActive={true}
              index={index}
            />
          )
        ))}

        <div className="flex justify-between items-center max-w-2xl mx-auto mt-8">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="px-6 py-3 bg-white/20 text-white rounded-full hover:bg-white/30
                       disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            ← {t('common.previous')}
          </button>

          {currentStep <= 6 ? (
            <button
              onClick={handleNext}
              disabled={currentStep === 1 ? false : !formData[questionKeys[currentStep - 2]]?.trim()}
              className="btn-primary"
            >
              {t('common.next')} →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t('common.saving') : t('form.saveButton')}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
