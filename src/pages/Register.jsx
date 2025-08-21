import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { CheckCircle } from 'lucide-react'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import AuthLayout from '../components/AuthLayout'

const Register = () => {
  const navigate = useNavigate()
  const [userType, setUserType] = useState('individual')
  const [companyName, setCompanyName] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [userTypeError, setUserTypeError] = useState(false)
  const [companyNameError, setCompanyNameError] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isPhoneVerified, setIsPhoneVerified] = useState(false)

  const handleRegister = async () => {
    // Validate fields
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    const userTypeValid = userType.trim() !== ''
    const companyNameValid = userType === 'business' ? companyName.trim() !== '' : true
    const nameValid = name.trim() !== ''
    const emailValid = email.trim() !== '' && emailRegex.test(email)
    const phoneValid = phone.trim() !== '' && phoneRegex.test(phone)
    const passwordValid = password.trim() !== '' && passwordRegex.test(password)
    const confirmPasswordValid = confirmPassword.trim() !== '' && password === confirmPassword
    const termsValid = agreeToTerms

    setUserTypeError(!userTypeValid)
    setCompanyNameError(!companyNameValid)
    setNameError(!nameValid)
    setEmailError(!emailValid)
    setPhoneError(!phoneValid)
    setPasswordError(!passwordValid)
    setConfirmPasswordError(!confirmPasswordValid)

    if (userTypeValid && companyNameValid && nameValid && emailValid && phoneValid && passwordValid && confirmPasswordValid && termsValid) {
      setIsLoading(true)

      // Simulate API call
      try {
        await new Promise(resolve => setTimeout(resolve, 1500))
        alert('Registration successful!')
        navigate('/login')
      } catch (error) {
        alert('Registration failed. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleLogin = () => {
    navigate('/login')
  }

  const handlePhoneVerification = (phoneNumber) => {
    // Just mark as verified without sending OTP
    setIsPhoneVerified(true)
  }

  const handleTrackOrder = () => {
    alert('Navigate to track order page')
  }

  return (
    <AuthLayout 
      title="Register to Shipmozo"
      subtitle="Register to start using Shipmozo."
    >

          {/* Register Form */}
          <div className="space-y-6">
            {/* User Type */}
            <InputBox
              type="select"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              error={userTypeError}
              onErrorChange={setUserTypeError}
              required={true}
              label="User type"
              options={[
                { value: "individual", label: "Individual" },
                { value: "business", label: "Business" }
              ]}
            />

            {/* Company Name - Only show when business is selected */}
            {userType === 'business' && (
              <InputBox
                type="name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                error={companyNameError}
                onErrorChange={setCompanyNameError}
                required={true}
                label="Company name"
                placeholder="Enter your company name"
              />
            )}

            {/* Name */}
            <InputBox
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={nameError}
              onErrorChange={setNameError}
              required={true}
            />

            {/* Email */}
            <InputBox
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              onErrorChange={setEmailError}
              required={true}
            />

            {/* Phone */}
            <InputBox
              type="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={phoneError}
              onErrorChange={setPhoneError}
              required={true}
              onVerify={handlePhoneVerification}
            />

            {/* Password */}
            <div>
              <InputBox
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={false}
                onErrorChange={setPasswordError}
                required={true}
              />
              <p className="text-[10px] text-gray-500 mt-1">
                Password: Min 8 characters, 1 Uppercase, 1 Lowercase, 1 Number and 1 Special Character
              </p>
              {passwordError && (
                <p className="text-[10px] text-orange-500 mt-1">
                  Enter a valid password
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <InputBox
              type="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={confirmPasswordError}
              onErrorChange={setConfirmPasswordError}
              required={true}
              showPasswordToggle={false}
            />

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="w-4 h-4 accent-[#0A7EA4] border-gray-300 rounded mt-0.5"
              />
              <span className="text-xs text-gray-700 leading-relaxed">
                I agree to the{' '}
                <button className="text-xs font-medium underline text-gray-700 cursor-pointer">
                  Terms and Conditions
                </button>{' '}
                &{' '}
                <button className="text-xs font-medium underline text-gray-700 cursor-pointer">
                  Privacy Policy
                </button>
              </span>
            </div>

            {/* Register Button */}
            <Button
              onClick={handleRegister}
              color="primary"
              variant="filled"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <CircularProgress size={16} sx={{ color: 'white' }} />
                  <span>Registering...</span>
                </div>
              ) : (
                'Register'
              )}
            </Button>

            {/* Login Link */}
            <div className="text-xs font-medium mt-3">
              <span className="text-gray-600">Already have an account? </span>
              <button
                onClick={handleLogin}
                className="text-primary cursor-pointer underline"
              >
                Log In
              </button>
            </div>
          </div>

                     {/* Footer Links */}
           <div className="pt-6 text-xs font-medium underline text-gray-700">
             <div className="flex space-x-4">
               <button className="cursor-pointer hover:text-gray-900">
                 Privacy policy
               </button>
               <button className="cursor-pointer hover:text-gray-900">
                 Refund & Cancellation
               </button>
               <button className="cursor-pointer hover:text-gray-900">
                 Terms and Conditions
               </button>
             </div>
           </div>
        </AuthLayout>
      )
}

export default Register
