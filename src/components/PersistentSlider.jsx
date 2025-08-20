import React, { useCallback, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { useSlider } from '../context/SliderContext'
import { SLIDER_IMAGES, LOGO_URL, SLIDER_CONFIG } from '../utils/constants'

// Slider data - moved outside component to prevent re-creation
const SLIDER_DATA = SLIDER_IMAGES.map((src, index) => ({
  id: index + 1,
  src,
  alt: `Slider ${index + 1}`
}))

const PersistentSlider = () => {
  const { currentSlide, updateSlide, setSwiperInstance, getSwiperInstance } = useSlider()

  // Memoized event handlers to prevent unnecessary re-renders
  const handleSlideChange = useCallback((swiper) => {
    updateSlide(swiper.activeIndex)
  }, [updateSlide])

  const handleSwiperInit = useCallback((swiper) => {
    setSwiperInstance(swiper)
    // If we have a stored slide position, go to it
    if (currentSlide > 0) {
      swiper.slideTo(currentSlide, 0, false)
    }
  }, [setSwiperInstance, currentSlide])

  // Memoized Swiper configuration
  const swiperConfig = useMemo(() => ({
    modules: [Pagination, Autoplay],
    pagination: SLIDER_CONFIG.pagination,
    autoplay: { 
      delay: SLIDER_CONFIG.delay, 
      disableOnInteraction: SLIDER_CONFIG.disableOnInteraction 
    },
    loop: SLIDER_CONFIG.loop,
    className: "w-full h-full",
    onSwiper: handleSwiperInit,
    onSlideChange: handleSlideChange,
  }), [handleSwiperInit, handleSlideChange])

  // Memoized slider slides
  const sliderSlides = useMemo(() => 
    SLIDER_DATA.map((slide) => (
      <SwiperSlide key={slide.id}>
        <div className="flex items-center justify-center h-full">
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-auto h-[80vh] object-contain"
            loading="lazy"
          />
        </div>
      </SwiperSlide>
    )), []
  )

  return (
    <div className="hidden lg:flex lg:w-[55%] bg-[#CEE5ED] relative">
      {/* Logo */}
      <div className="absolute top-4 left-4 z-10 flex items-center">
        <img
          src={LOGO_URL}
          alt="Shipmozo Logo"
          className="h-8 w-auto"
          loading="lazy"
        />
      </div>

      {/* Slider */}
      <Swiper {...swiperConfig}>
        {sliderSlides}
      </Swiper>
    </div>
  )
}

export default PersistentSlider
