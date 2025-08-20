import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { SquareArrowOutUpRight } from 'lucide-react'
import InputBox from '../components/InputBox'
import Button from '../components/Button'
import AuthLayout from '../components/AuthLayout'

const Login = () => {
  const navigate = useNavigate()
  const [emailOrPhone, setEmailOrPhone] = useState('')
  const [password, setPassword] = useState('')
  const [emailOrPhoneError, setEmailOrPhoneError] = useState(false) // Start without error
  const [passwordError, setPasswordError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)

  const handleLogin = async () => {
    // Validate fields
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const emailOrPhoneValid = emailOrPhone.trim() !== '' && (emailRegex.test(emailOrPhone) || phoneRegex.test(emailOrPhone))
    const passwordValid = password.trim() !== ''

    setEmailOrPhoneError(!emailOrPhoneValid)
    setPasswordError(!passwordValid)

    if (emailOrPhoneValid && passwordValid) {
      setIsLoading(true)

      // Simulate API call
      try {
        await new Promise(resolve => setTimeout(resolve, 1500))
        alert('Login successful!')
        navigate('/')
      } catch (error) {
        alert('Login failed. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleForgotPassword = () => {
    alert('Forgot password functionality would go here')
  }

  const handleCreateAccount = () => {
    navigate('/register')
  }

  const handleTrackOrder = () => {
    alert('Navigate to track order page')
  }

  return (
    <AuthLayout 
      title="Login to Shipmozo"
      subtitle="Log in to your account to continue."
    >

          {/* Login Form */}
          <div className="space-y-6">
            <InputBox
              type="emailOrPhone"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              error={emailOrPhoneError}
              onErrorChange={setEmailOrPhoneError}
              required={true}
            />

            <InputBox
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              onErrorChange={setPasswordError}
              required={true}
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-[#0A7EA4] border-gray-300 rounded"
                />
                <span className="ml-2 text-xs text-gray-700">Remember me</span>
              </label>

              <button
                onClick={handleForgotPassword}
                className="text-xs text-primary font-semibold cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <Button
              onClick={handleLogin}
              color="primary"
              variant="filled"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <CircularProgress size={16} sx={{ color: 'white' }} />
                  <span>Log in</span>
                </div>
              ) : (
                'Log In'
              )}
            </Button>

            {/* Create Account Link */}
            <div className="text-xs font-medium mt-3">
              <span className="text-gray-600 ">New to Shipmozo? </span>
              <button
                onClick={handleCreateAccount}
                className="text-primary cursor-pointer"
              >
                Create an account
              </button>
            </div>
          </div>

          {/* Footer Links */}
          <div className="pt-6 text-xs font-medium space-y-4 underline text-gray-700">
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

            {/* Track Order Button */}
            <div className="text-center">
              <Button
                onClick={handleTrackOrder}
                variant="outlined"
                color="primary"
                endIcon={<SquareArrowOutUpRight size={16} />}
                fullWidth
                className="cursor-pointer"
              >
                Track Order
              </Button>
            </div>
          </div>
        </AuthLayout>
      )
}

export default Login
