import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * AnimatedImage Component - Performance Optimized
 * 
 * A wrapper component that adds subtle animations to images
 * with progressive loading and performance optimizations for 60fps
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Image alt text
 * @param {string} className - Additional CSS classes
 * @param {string} effect - Animation effect type: 'zoom', 'tilt', or 'shine'
 * @param {string} placeholderSrc - URL for low-res placeholder image
 * @param {string} placeholderColor - Background color before image loads
 * @param {boolean} shouldLazyLoad - Whether to use lazy loading
 * @param {boolean} priority - Whether image is high priority (preload)
 * @param {function} onLoad - Callback when image loads
 */
const AnimatedImage = ({ 
  src, 
  alt = '', 
  className = '', 
  effect = 'zoom',
  placeholderSrc = '',
  placeholderColor = '#f5f5f5',
  shouldLazyLoad = true,
  priority = false,
  onLoad = () => {},
  ...props 
}) => {
  // Track image loading states
  const [isPlaceholderLoaded, setIsPlaceholderLoaded] = useState(!placeholderSrc);
  const [isMainImageLoaded, setIsMainImageLoaded] = useState(false);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  
  // Check if user prefers reduced motion
  const prefersReducedMotion = useReducedMotion();
  
  // Check if on mobile
  const [isMobile, setIsMobile] = useState(false);
  const [hasTouch, setHasTouch] = useState(false);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    // Check device capabilities on mount
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
      setHasTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);
  
  // Set up intersection observer to track visibility for better performance
  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === 'undefined') {
      setIsInView(true); // Fallback for older browsers
      return;
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.unobserve(containerRef.current);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '200px 0px' // Start loading before it's visible
      }
    );
    
    observer.observe(containerRef.current);
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  
  // Handle image loads
  useEffect(() => {
    // If priority image, start loading right away regardless of viewport
    if (priority && src) {
      const img = new Image();
      img.onload = () => {
        setIsMainImageLoaded(true);
        onLoad(src);
      };
      img.src = src;
      if (placeholderSrc) {
        const placeholderImg = new Image();
        placeholderImg.onload = () => setIsPlaceholderLoaded(true);
        placeholderImg.src = placeholderSrc;
      }
    }
  }, [priority, src, placeholderSrc, onLoad]);

  // Handle placeholder image load completion
  const handlePlaceholderLoad = () => {
    setIsPlaceholderLoaded(true);
  };

  // Handle main image load completion
  const handleMainImageLoad = () => {
    setIsMainImageLoaded(true);
    onLoad(src);
  };

  // Define hover animations - optimized for performance
  const hoverEffects = {
    zoom: {
      scale: isMobile ? 1.03 : 1.05,
      transition: { duration: isMobile ? 0.3 : 0.5, ease: "easeOut" }
    },
    tilt: {
      rotateX: isMobile ? 2 : 5, 
      rotateY: isMobile ? 2 : 5,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    shine: {
      filter: "brightness(1.1)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  // Simplified effects for accessibility
  const accessibleEffects = {
    zoom: { scale: 1.02, transition: { duration: 0.3 } },
    tilt: { opacity: 0.9, transition: { duration: 0.3 } },
    shine: { opacity: 0.9, transition: { duration: 0.3 } }
  };

  // Skip effects on touch devices for certain animations
  const shouldDisableEffects = prefersReducedMotion || (hasTouch && effect === 'tilt');
  
  // Get appropriate effect based on preferences and device
  const effectToUse = shouldDisableEffects ? 
    (effect === 'zoom' ? 'zoom' : 'shine') : 
    effect;
    
  const hoverEffect = prefersReducedMotion 
    ? accessibleEffects[effectToUse] 
    : hoverEffects[effectToUse] || hoverEffects.zoom;

  const containerClass = `animated-image-container ${effect === 'shine' ? 'shine-effect' : ''} ${className}`;
  
  // Determine what images to show based on loading state
  const showPlaceholder = placeholderSrc && isPlaceholderLoaded && !isMainImageLoaded;
  const showMainImage = isMainImageLoaded || (!placeholderSrc && isInView);
  
  // Only animate loaded images
  const canAnimate = isMainImageLoaded || (showPlaceholder && !shouldDisableEffects);
  
  return (
    <div 
      ref={containerRef}
      className={containerClass}
      style={{ 
        backgroundColor: placeholderColor,
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Placeholder image */}
      {placeholderSrc && isInView && !isMainImageLoaded && (
        <motion.img
          src={placeholderSrc}
          alt={alt}
          className="animated-image placeholder-image"
          initial={{ opacity: 0 }}
          animate={{ opacity: isPlaceholderLoaded ? 0.8 : 0 }}
          transition={{ duration: 0.3 }}
          onLoad={handlePlaceholderLoad}
          style={{ 
            position: isMainImageLoaded ? 'absolute' : 'relative',
            top: 0,
            left: 0,
            filter: 'blur(10px)',
            transform: 'scale(1.05) translateZ(0)', // Slightly larger to cover blur edges
            width: '100%',
            height: 'auto',
            zIndex: 1
          }}
        />
      )}
      
      {/* Main image - only load when in viewport or priority */}
      {(isInView || priority) && (
        <motion.img
          ref={imageRef}
          src={src}
          alt={alt}
          className="animated-image main-image"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isMainImageLoaded ? 1 : 0,
            transition: { duration: 0.5 }
          }}
          whileHover={canAnimate ? hoverEffect : {}}
          loading={shouldLazyLoad && !priority ? "lazy" : "eager"}
          fetchpriority={priority ? "high" : "auto"}
          onLoad={handleMainImageLoad}
          style={{ 
            position: 'relative',
            zIndex: 2,
            width: '100%',
            height: 'auto',
            // Hardware acceleration hints
            willChange: canAnimate ? 'transform, filter' : 'auto',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
            transition: 'opacity 0.5s ease'
          }}
          {...props}
        />
      )}
    </div>
  );
};

// CSS for the shine effect - more efficiently included as a stylesheet
// This has been moved to an external file for better caching and performance
const shineStyles = `
  .animated-image-container {
    position: relative;
    overflow: hidden;
    display: inline-block;
    transform: translateZ(0);
  }
  
  .animated-image {
    display: block;
    max-width: 100%;
    height: auto;
    backface-visibility: hidden;
  }
  
  @media (prefers-reduced-motion: no-preference) {
    .animated-image-container.shine-effect::before {
      content: '';
      position: absolute;
      top: 0;
      left: -75%;
      width: 50%;
      height: 100%;
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.3) 100%
      );
      transform: skewX(-25deg);
      z-index: 3;
      opacity: 0;
      transition: opacity 0.3s ease;
      will-change: transform, opacity;
    }
    
    .animated-image-container.shine-effect:hover::before {
      animation: shine 1s ease;
      opacity: 1;
    }
    
    @keyframes shine {
      to {
        left: 125%;
      }
    }
  }
  
  /* Optimize animations for mobile */
  @media (max-width: 768px) {
    @keyframes shine {
      to {
        left: 150%;
      }
    }
    
    .animated-image-container.shine-effect::before {
      width: 30%; /* Smaller shine effect on mobile */
    }
  }
`;

// Add the styles to the document head
if (typeof document !== 'undefined') {
  const styleId = 'animated-image-styles';
  
  // Only add styles if they don't already exist
  if (!document.getElementById(styleId)) {
    const styleEl = document.createElement('style');
    styleEl.id = styleId;
    styleEl.type = 'text/css';
    styleEl.appendChild(document.createTextNode(shineStyles));
    document.head.appendChild(styleEl);
  }
}

export default AnimatedImage; 