import React, { createContext, useContext, useState, useRef, useCallback, useMemo } from 'react'

const SliderContext = createContext()

export const useSlider = () => {
  const context = useContext(SliderContext)
  if (!context) {
    throw new Error('useSlider must be used within a SliderProvider')
  }
  return context
}

export const SliderProvider = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const swiperRef = useRef(null)

  // Memoized functions to prevent unnecessary re-renders
  const updateSlide = useCallback((slideIndex) => {
    setCurrentSlide(slideIndex)
  }, [])

  const setSwiperInstance = useCallback((swiper) => {
    swiperRef.current = swiper
  }, [])

  const getSwiperInstance = useCallback(() => {
    return swiperRef.current
  }, [])

  // Memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    currentSlide,
    updateSlide,
    setSwiperInstance,
    getSwiperInstance
  }), [currentSlide, updateSlide, setSwiperInstance, getSwiperInstance])

  return (
    <SliderContext.Provider value={contextValue}>
      {children}
    </SliderContext.Provider>
  )
}
