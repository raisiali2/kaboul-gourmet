import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import AnimatedElement from '../common/AnimatedElement';
import './HeroSlider.css';

/**
 * Advanced image preloading with priority
 * This optimizes performance by intelligently preloading images
 */
const preloadImage = (src, priority = 'high') => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
    img.fetchPriority = priority;
    
    // Add connection hints for high priority images
    if (priority === 'high' && typeof document !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    }
  });
};

const HeroSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState({});
  const [imageLoadFallback, setImageLoadFallback] = useState(false);
  const sliderRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // Define slide backgrounds with both placeholder and full images
  const [slides] = useState([
    {
      background: '#1a1a1a',
      backgroundImage: '/images/Kabuli main.jpg', // High-quality image from public/images
      placeholderImage: '/images/_MG_8888 copie-min.jpg', // Optimized version
      title: 'AUTHENTIC AFGHAN CUISINE',
      subtitle: 'Experience the flavors of Kaboul in the heart of London',
      button: 'BOOK A TABLE',
      buttonLink: '#book'
    },
    {
      background: '#2a2a2a',
      backgroundImage: '/images/_MG_8760 copie.jpg',
      placeholderImage: '/images/Illustration-sans-titre.png',
      title: 'SAFFRON SPICE DINNER',
      date: '16th November 2023',
      subtitle: 'A special evening celebrating Afghanistan\'s culinary treasures',
      button: 'DISCOVER MORE',
      buttonLink: '#events'
    },
    {
      background: '#3a3a3a',
      backgroundImage: '/images/_MG_8826 copie.jpg',
      placeholderImage: '/images/Illustration-sans-titre 2.jpg',
      title: 'PRIVATE DINING',
      subtitle: 'Create unforgettable moments in our exclusive spaces',
      button: 'EXPLORE VENUES',
      buttonLink: '#private'
    },
    {
      background: '#4a4a4a',
      backgroundImage: '/images/_MG_8774 copie.jpg',
      placeholderImage: '/images/Photo Kabuli.jpeg',
      title: 'TRADITIONAL AFGHAN FEAST',
      date: '30th March 2024',
      subtitle: 'Join us for a celebration of Afghan culture and cuisine',
      button: 'DISCOVER MORE',
      buttonLink: '#feast'
    },
    {
      background: '#5a5a5a',
      backgroundImage: '/images/_MG_8875 copie.jpg',
      placeholderImage: '/images/Illustration-sans-titre 1.jpg',
      title: 'LUNCH SET MENU',
      subtitle: 'Indulge in a premium Afghan lunch experience with our 3-course set menu',
      button: 'VIEW MENU',
      buttonLink: '#lunch'
    }
  ]);

  useEffect(() => {
    // Check for mobile devices and update state
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  /**
   * Improved progressive image loading strategy:
   * 1. Load placeholder images immediately for all slides
   * 2. Load high-quality image for current slide with high priority 
   * 3. Preload next slide's high-quality image
   * 4. Load remaining images with low priority
   */
  useEffect(() => {
    const preloadHeroImages = async () => {
      setIsLoading(true);
      
      try {
        // First, load all placeholder images (small and fast)
        const placeholderImages = slides.map(slide => slide.placeholderImage);
        const placeholderLoads = placeholderImages.map(src => 
          preloadImage(src, 'low')
        );
        
        await Promise.all(placeholderLoads);
        
        // Update loaded images with placeholders
        const initialLoadedObj = {};
        placeholderImages.forEach(src => {
          initialLoadedObj[src] = true;
        });
        
        setLoadedImages(initialLoadedObj);
        setIsLoading(false);
        
        // Then preload the current slide's high quality image with high priority
        const currentImage = slides[activeSlide].backgroundImage;
        await preloadImage(currentImage, 'high');
        
        // Update loaded images with current high-quality image
        setLoadedImages(prev => ({
          ...prev,
          [currentImage]: true
        }));
        
        // Preload next slide with medium priority
        const nextSlideIndex = (activeSlide + 1) % slides.length;
        const nextImage = slides[nextSlideIndex].backgroundImage;
        await preloadImage(nextImage, 'medium');
        
        // Update loaded images with next high-quality image
        setLoadedImages(prev => ({
          ...prev,
          [nextImage]: true
        }));
        
        // Then load the rest of high quality images with low priority
        const remainingImages = slides
          .filter((_, index) => index !== activeSlide && index !== nextSlideIndex)
          .map(slide => slide.backgroundImage);
          
        const remainingLoads = remainingImages.map(src => 
          preloadImage(src, 'low')
        );
        
        // Don't await these - they'll load in the background
        Promise.all(remainingLoads)
          .then(images => {
            const allLoadedObj = { ...initialLoadedObj };
            images.forEach((_, i) => {
              allLoadedObj[remainingImages[i]] = true;
            });
            
            setLoadedImages(prev => ({
              ...prev,
              ...allLoadedObj
            }));
          })
          .catch(error => {
            console.error('Error loading remaining images:', error);
            // If background loads fail, enable fallbacks
            setImageLoadFallback(true);
          });
          
      } catch (error) {
        console.error('Error preloading critical images:', error);
        setIsLoading(false);
        setImageLoadFallback(true);
      }
    };
    
    preloadHeroImages();
    
    // Setup IntersectionObserver to pause animations when not in viewport
    if (typeof IntersectionObserver !== 'undefined' && sliderRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          setIsPaused(!entries[0].isIntersecting);
        },
        { threshold: 0.1 }
      );
      
      observer.observe(sliderRef.current);
      
      return () => {
        if (sliderRef.current) {
          observer.unobserve(sliderRef.current);
        }
      };
    }
  }, [slides, activeSlide]);

  // Preload the next slide's image when active slide changes
  useEffect(() => {
    const preloadNextSlide = async () => {
      const nextSlideIndex = (activeSlide + 1) % slides.length;
      const nextImage = slides[nextSlideIndex].backgroundImage;
      
      if (!loadedImages[nextImage]) {
        try {
          await preloadImage(nextImage, 'medium');
          setLoadedImages(prev => ({
            ...prev,
            [nextImage]: true
          }));
        } catch (error) {
          console.error('Error preloading next slide:', error);
        }
      }
    };
    
    preloadNextSlide();
  }, [activeSlide, slides, loadedImages]);

  useEffect(() => {
    // Auto-rotation interval - optimize for performance
    // Skip rotation if the tab is hidden, slider is not in view, 
    // or user prefers reduced motion
    if (document.hidden || isPaused || prefersReducedMotion) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    
    intervalRef.current = setInterval(() => {
      setActiveSlide(current => (current + 1) % slides.length);
    }, isMobile ? 6000 : 5000); // Slightly longer interval on mobile
    
    // Clean up and handle visibility/focus changes
    const handleVisibilityChange = () => {
      if (document.hidden || isPaused) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } else if (!document.hidden && !isPaused && !prefersReducedMotion) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        
        intervalRef.current = setInterval(() => {
          setActiveSlide(current => (current + 1) % slides.length);
        }, isMobile ? 6000 : 5000);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [slides.length, prefersReducedMotion, isMobile, isPaused]);

  const handleIndicatorClick = (index) => {
    setActiveSlide(index);
  };

  // Touch handling for mobile swipe
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left - next slide
      setActiveSlide((current) => (current + 1) % slides.length);
    }
    
    if (touchStart - touchEnd < -50) {
      // Swipe right - previous slide
      setActiveSlide((current) => 
        current === 0 ? slides.length - 1 : current - 1
      );
    }
  };

  // Optimized animation variants for better performance
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: isMobile ? 0.5 : 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom ease curve for elegant motion
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: {
        duration: isMobile ? 0.4 : 0.8,
        ease: [0.16, 1, 0.3, 1],
      }
    })
  };

  // Simplified animations on reduced motion preference
  const accessibleSlideVariants = {
    enter: { opacity: 0 },
    center: {
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  // Content animation - optimized for performance
  const contentVariants = {
    hidden: { opacity: 0, y: isMobile ? 15 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.5 : 0.7,
        delay: isMobile ? 0.1 : 0.2,
        staggerChildren: isMobile ? 0.1 : 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: isMobile ? 10 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: isMobile ? 0.3 : 0.5 }
    }
  };

  // Use simplified animations for reduced motion
  const finalSlideVariants = prefersReducedMotion ? accessibleSlideVariants : slideVariants;

  // Get background style for a slide
  const getSlideBackground = (slide) => {
    // Use placeholder or main image based on loading state
    const useSmallImage = !loadedImages[slide.backgroundImage] || imageLoadFallback;
    const src = useSmallImage ? slide.placeholderImage : slide.backgroundImage;
    
    // Return the image URL instead of a style object
    return src || slide.backgroundImage || '#000000';
  };

  // Handle navigation for slide buttons
  const handleNavigation = (e, path) => {
    // Don't navigate if it's just a hash link
    if (path.startsWith('#')) {
      e.preventDefault();
      
      const targetElement = document.querySelector(path);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 120,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div 
      ref={sliderRef}
      className="hero-slider"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, index) => {
        // Get background image based on loading state
        const backgroundImage = getSlideBackground(slide);
        
        return (
          <div 
            key={index} 
            className={`slide ${index === activeSlide ? 'active' : ''}`}
            aria-hidden={index !== activeSlide}
          >
            {/* Slide background image with zoom effect */}
            <div 
              className="slide-bg" 
              style={{ 
                backgroundImage: `url(${backgroundImage})` 
              }}
            ></div>
            
            {/* Pattern overlay */}
            <div className="slide-overlay"></div>
            
            {/* Slide content */}
            <div className="slide-content">
              {slide.date && (
                <div className="slide-date">{slide.date}</div>
              )}
              
              <h2 className="slide-title">{slide.title}</h2>
              <p className="slide-subtitle">{slide.subtitle}</p>
              
              <a 
                href={slide.buttonLink} 
                className="slide-button"
                onClick={(e) => handleNavigation(e, slide.buttonLink)}
              >
                {slide.button}
              </a>
            </div>
          </div>
        );
      })}
      
      {/* Slide indicators */}
      <div className="slider-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === activeSlide ? 'active' : ''}`}
            onClick={() => handleIndicatorClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider; 