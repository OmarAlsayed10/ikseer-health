export type ValidationResult = { valid: true } | { valid: false; message: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^[+\d][\d\s\-().]{6,19}$/
const NAME_LETTER_RE = /[A-Za-z؀-ۿ]/

export const validators = {
  required:
    (msg = 'This field is required.') =>
    (v: string): ValidationResult =>
      v.trim().length > 0 ? { valid: true } : { valid: false, message: msg },

  email:
    (msg = 'Please enter a valid email address.') =>
    (v: string): ValidationResult =>
      EMAIL_RE.test(v.trim()) ? { valid: true } : { valid: false, message: msg },

  phone:
    (msg = 'Please enter a valid phone number.') =>
    (v: string): ValidationResult =>
      PHONE_RE.test(v.trim()) ? { valid: true } : { valid: false, message: msg },

  phoneNational:
    (allowedLengths: readonly number[], msg = 'Please enter a valid phone number for the selected country.') =>
    (v: string): ValidationResult => {
      const digits = v.replace(/\D/g, '').replace(/^0+/, '')
      return allowedLengths.includes(digits.length)
        ? { valid: true }
        : { valid: false, message: msg }
    },

  letters:
    (msg = 'Please enter a valid name.') =>
    (v: string): ValidationResult =>
      NAME_LETTER_RE.test(v.trim()) ? { valid: true } : { valid: false, message: msg },

  minLength:
    (n: number, msg?: string) =>
    (v: string): ValidationResult =>
      v.trim().length >= n
        ? { valid: true }
        : { valid: false, message: msg ?? `Minimum ${n} characters required.` },

  maxLength:
    (n: number, msg?: string) =>
    (v: string): ValidationResult =>
      v.trim().length <= n
        ? { valid: true }
        : { valid: false, message: msg ?? `Maximum ${n} characters allowed.` },
}

export type Validator = (v: string) => ValidationResult

export function runValidators(value: string, rules: Validator[]): ValidationResult {
  for (const rule of rules) {
    const result = rule(value)
    if (!result.valid) return result
  }
  return { valid: true }
}

export type FormErrors<T extends object> = Partial<Record<keyof T, string>>

export function validateForm<T extends object>(
  data: T,
  schema: Partial<Record<keyof T, Validator[]>>,
): { errors: FormErrors<T>; isValid: boolean } {
  const errors: FormErrors<T> = {}
  const record = data as Record<string, string>

  for (const field in schema) {
    const rules = schema[field as keyof T]
    if (!rules) continue
    const result = runValidators(record[field] ?? '', rules)
    if (!result.valid) errors[field as keyof T] = result.message
  }

  return { errors, isValid: Object.keys(errors).length === 0 }
}
