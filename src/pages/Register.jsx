import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { SquareArrowOutUpRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import InputBox from '../components/InputBox'
import Button from '../components/Button'

const Register = () => {
  const navigate = useNavigate()
  const [userType, setUserType] = useState('individual')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [userTypeError, setUserTypeError] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [phoneError, setPhoneError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPasswordError, setConfirmPasswordError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const handleRegister = async () => {
    // Validate fields
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    const userTypeValid = userType.trim() !== ''
    const nameValid = name.trim() !== ''
    const emailValid = email.trim() !== '' && emailRegex.test(email)
    const phoneValid = phone.trim() !== '' && phoneRegex.test(phone)
    const passwordValid = password.trim() !== '' && passwordRegex.test(password)
    const confirmPasswordValid = confirmPassword.trim() !== '' && password === confirmPassword
    const termsValid = agreeToTerms

    setUserTypeError(!userTypeValid)
    setNameError(!nameValid)
    setEmailError(!emailValid)
    setPhoneError(!phoneValid)
    setPasswordError(!passwordValid)
    setConfirmPasswordError(!confirmPasswordValid)

    if (userTypeValid && nameValid && emailValid && phoneValid && passwordValid && confirmPasswordValid && termsValid) {
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

  const handleTrackOrder = () => {
    alert('Navigate to track order page')
  }

  return (
    <div className="h-screen bg-[#CEE5ED] flex overflow-hidden">
      {/* Left Section - Slider */}
      <div className="hidden lg:flex lg:w-[55%] bg-[#CEE5ED] relative">
        {/* Logo */}
        <div className="absolute top-4 left-4 z-10 flex items-center">
          <img
            src="https://panel.shipmozo.com/images/logos/logo.svg"
            alt="Shipmozo Logo"
            className="h-8 w-auto"
          />
        </div>

        {/* Slider */}
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="w-full h-full"
        >
          <SwiperSlide>
            <div className="flex items-center justify-center h-full">
              <img
                src="https://panel.shipmozo.com/images/slider/1.svg"
                alt="Slider 1"
                className="w-auto h-[80vh] object-contain"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex items-center justify-center h-full">
              <img
                src="https://panel.shipmozo.com/images/slider/2.svg"
                alt="Slider 2"
                className="w-auto h-[80vh] object-contain"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex items-center justify-center h-full">
              <img
                src="https://panel.shipmozo.com/images/slider/3.svg"
                alt="Slider 3"
                className="w-auto h-[80vh] object-contain"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex items-center justify-center h-full">
              <img
                src="https://panel.shipmozo.com/images/slider/4.svg"
                alt="Slider 4"
                className="w-auto h-[80vh] object-contain"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex items-center justify-center h-full">
              <img
                src="https://panel.shipmozo.com/images/slider/5.svg"
                alt="Slider 5"
                className="w-auto h-[80vh] object-contain"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Right Section - Register Form */}
      <div className="w-full lg:w-[45%] bg-white flex items-start justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center mb-8">
            <img
              src="https://panel.shipmozo.com/images/logos/logo.svg"
              alt="Shipmozo Logo"
              className="h-8 w-auto"
            />
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h1 className="text-[21px] font-bold text-gray-800 mb-1">Register to Shipmozo</h1>
            <p className="text-gray-600 text-xs">Register to start using Shipmozo.</p>
          </div>

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
            />

            {/* Password */}
            <InputBox
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              onErrorChange={setPasswordError}
              required={true}
            />

                         {/* Confirm Password */}
             <div>
               <label className="block text-xs font-medium text-gray-700 mb-2">
                 Confirm Password <span className="text-red-500">*</span>
               </label>
               <input
                 type="password"
                 value={confirmPassword}
                 onChange={(e) => setConfirmPassword(e.target.value)}
                 placeholder="Re-enter your password"
                 className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                   confirmPasswordError ? 'border-red-500' : 'border-gray-300'
                 }`}
               />
               {confirmPasswordError && (
                 <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
               )}
             </div>

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
            <div className="text-xs font-medium mt-3 text-center">
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
        </div>
      </div>
    </div>
  )
}

export default Register
