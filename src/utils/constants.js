// API URLs
export const API_BASE_URL = 'https://panel.shipmozo.com'

// Image URLs
export const LOGO_URL = `${API_BASE_URL}/images/logos/logo.svg`
export const SLIDER_IMAGES = [
  `${API_BASE_URL}/images/slider/1.svg`,
  `${API_BASE_URL}/images/slider/2.svg`,
  `${API_BASE_URL}/images/slider/3.svg`,
  `${API_BASE_URL}/images/slider/4.svg`,
  `${API_BASE_URL}/images/slider/5.svg`,
]

// Colors
export const COLORS = {
  primary: '#0A7EA4',
  error: '#f97316',
  border: '#d1d5db',
  background: '#EAEFF4',
  text: '#6b7280',
  white: '#ffffff',
  gray: {
    100: '#f3f4f6',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
  }
}

// Form validation patterns
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  name: /^[a-zA-Z\s]{2,50}$/
}

// User types for registration
export const USER_TYPES = [
  { value: "individual", label: "Individual" },
  { value: "business", label: "Business" }
]

// Slider configuration
export const SLIDER_CONFIG = {
  delay: 3000,
  disableOnInteraction: false,
  loop: true,
  pagination: { clickable: true }
}

// Form field types
export const FIELD_TYPES = {
  EMAIL: 'email',
  PASSWORD: 'password',
  EMAIL_OR_PHONE: 'emailOrPhone',
  PHONE: 'phone',
  NAME: 'name',
  CONFIRM_PASSWORD: 'confirmPassword',
  SELECT: 'select'
}

// Error messages
export const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_NAME: 'Please enter a valid name (2-50 characters)',
  PASSWORD_MISMATCH: 'Passwords do not match',
  WEAK_PASSWORD: 'Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character'
}
