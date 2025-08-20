import { useState, useCallback } from 'react'

// Validation patterns
const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  name: /^[a-zA-Z\s]{2,50}$/
}

// Validation functions
const validators = {
  email: (value) => {
    if (!value.trim()) return "Email is required"
    if (!VALIDATION_PATTERNS.email.test(value)) return "Please enter a valid email"
    return null
  },
  
  emailOrPhone: (value) => {
    if (!value.trim()) return "Email or Phone is required"
    if (!VALIDATION_PATTERNS.email.test(value) && !VALIDATION_PATTERNS.phone.test(value)) {
      return "Please enter a valid email or phone number"
    }
    return null
  },
  
  phone: (value) => {
    if (!value.trim()) return "Phone number is required"
    if (!VALIDATION_PATTERNS.phone.test(value)) return "Please enter a valid phone number"
    return null
  },
  
  name: (value) => {
    if (!value.trim()) return "Name is required"
    if (!VALIDATION_PATTERNS.name.test(value.trim())) {
      return "Please enter a valid name (2-50 characters)"
    }
    return null
  },
  
  password: (value) => {
    if (!value.trim()) return "Password is required"
    if (!VALIDATION_PATTERNS.password.test(value)) {
      return "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
    }
    return null
  },
  
  confirmPassword: (value, password) => {
    if (!value.trim()) return "Confirm Password is required"
    if (value !== password) return "Passwords do not match"
    return null
  },
  
  required: (value, fieldName) => {
    if (!value || !value.trim()) return `${fieldName} is required`
    return null
  }
}

export const useFormValidation = (initialFields = {}) => {
  const [errors, setErrors] = useState(initialFields)
  const [values, setValues] = useState({})

  const validateField = useCallback((name, value, additionalData = {}) => {
    const validator = validators[name]
    if (!validator) return null
    
    const error = validator(value, additionalData.password || additionalData.fieldName)
    return error
  }, [])

  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }, [errors])

  const validateForm = useCallback((fields) => {
    const newErrors = {}
    let isValid = true

    Object.keys(fields).forEach(fieldName => {
      const value = values[fieldName] || ''
      const error = validateField(fieldName, value, { password: values.password, fieldName })
      
      if (error) {
        newErrors[fieldName] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }, [values, validateField])

  const clearErrors = useCallback(() => {
    setErrors({})
  }, [])

  const hasErrors = useCallback(() => {
    return Object.values(errors).some(error => error !== null)
  }, [errors])

  return {
    values,
    errors,
    setFieldValue,
    validateForm,
    validateField,
    clearErrors,
    hasErrors
  }
}
