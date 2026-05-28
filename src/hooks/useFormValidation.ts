import { useState, useCallback } from 'react'
import { validateForm, type FormErrors } from '../utils/validation'
import type { Validator } from '../utils/validation'

type Schema<T extends object> = Partial<Record<keyof T, Validator[]>>

interface UseFormValidationReturn<T extends object> {
  errors: FormErrors<T>
  validate: (data: T) => boolean
  validateField: (field: keyof T, value: string, rules: Validator[]) => void
  clearError: (field: keyof T) => void
  clearAll: () => void
}

export function useFormValidation<T extends object>(
  schema: Schema<T>,
): UseFormValidationReturn<T> {
  const [errors, setErrors] = useState<FormErrors<T>>({})

  const validate = useCallback(
    (data: T): boolean => {
      const { errors: newErrors, isValid } = validateForm(data, schema)
      setErrors(newErrors)
      return isValid
    },
    [schema],
  )

  const validateField = useCallback(
    (field: keyof T, value: string, rules: Validator[]) => {
      const { errors: newErrors } = validateForm({ [field]: value } as T, {
        [field]: rules,
      } as Schema<T>)
      setErrors((prev) => ({
        ...prev,
        [field]: newErrors[field],
      }))
    },
    [],
  )

  const clearError = useCallback((field: keyof T) => {
    setErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }, [])

  const clearAll = useCallback(() => setErrors({}), [])

  return { errors, validate, validateField, clearError, clearAll }
}
