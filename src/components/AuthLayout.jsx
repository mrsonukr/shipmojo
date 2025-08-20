import React, { memo } from 'react'
import PersistentSlider from './PersistentSlider'
import { LOGO_URL } from '../utils/constants'

const AuthLayout = memo(({ children, title, subtitle }) => {
  return (
    <div className="h-screen bg-[#CEE5ED] flex overflow-hidden">
      {/* Left Section - Persistent Slider */}
      <PersistentSlider />

      {/* Right Section - Dynamic Content */}
      <div className="w-full lg:w-[45%] bg-white flex items-start justify-center p-8 overflow-y-auto custom-scrollbar">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center mb-8">
            <img
              src={LOGO_URL}
              alt="Shipmozo Logo"
              className="h-8 w-auto"
              loading="lazy"
            />
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h1 className="text-[21px] font-bold text-gray-800 mb-1">{title}</h1>
            <p className="text-gray-600 text-xs">{subtitle}</p>
          </div>

          {/* Dynamic Content */}
          {children}
        </div>
      </div>
    </div>
  )
})

AuthLayout.displayName = 'AuthLayout'

export default AuthLayout
