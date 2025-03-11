import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * AnimatedElement Component - Performance Optimized
 * 
 * A wrapper component that adds hover animations to any element
 * with performance optimizations for 60fps
 * 
 * @param {string} as - The element type to render (default: 'div')
 * @param {string} className - Additional CSS classes
 * @param {string} hoverEffect - Type of hover effect: 'scale', 'float', 'glow', or 'none'
 * @param {boolean} enableOnMobile - Whether to enable animations on mobile (defaults to true)
 * @param {node} children - Element content
 */
const AnimatedElement = ({ 
  as = 'div', 
  className = '', 
  hoverEffect = 'scale',
  enableOnMobile = true,
  children,
  ...props 
}) => {
  // Check if user prefers reduced motion
  const prefersReducedMotion = useReducedMotion();
  
  // Check if on mobile/tablet
  const [isMobile, setIsMobile] = useState(false);
  const [hasTouch, setHasTouch] = useState(false);
  
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
  
  // Skip animations entirely in certain conditions for performance
  const shouldDisableEffects = 
    prefersReducedMotion || 
    (isMobile && !enableOnMobile) || 
    hoverEffect === 'none';

  // Define hover animations - optimized for performance
  const hoverAnimations = {
    scale: {
      scale: isMobile ? 1.03 : 1.05, // Reduced scale effect on mobile
      transition: { 
        duration: isMobile ? 0.15 : 0.2, 
        ease: "easeOut" 
      }
    },
    float: {
      y: isMobile ? -3 : -5, // Smaller float on mobile
      transition: { 
        duration: isMobile ? 0.2 : 0.3, 
        ease: "easeOut" 
      }
    },
    glow: {
      boxShadow: isMobile 
        ? "0px 0px 8px rgba(241, 180, 56, 0.3)" 
        : "0px 0px 15px rgba(241, 180, 56, 0.4)",
      transition: { 
        duration: 0.3, 
        ease: "easeOut" 
      }
    },
    none: {}
  };

  // Simplified effects for accessibility
  const accessibleAnimations = {
    scale: { scale: 1.02, transition: { duration: 0.2 } },
    float: { opacity: 0.8, transition: { duration: 0.2 } },
    glow: { opacity: 0.8, transition: { duration: 0.2 } },
    none: {}
  };

  // Use appropriate animations based on device and preferences
  const effectToUse = shouldDisableEffects ? 'none' : hoverEffect;
  
  // For touch devices, don't use hover effects that might get stuck
  const finalEffect = hasTouch && (effectToUse === 'float' || effectToUse === 'glow') 
    ? 'scale' 
    : effectToUse;
    
  const hoverAnimation = prefersReducedMotion 
    ? accessibleAnimations[finalEffect] 
    : hoverAnimations[finalEffect] || hoverAnimations.none;
  
  // Create the motion component with the specified element type
  const MotionComponent = motion[as];
  
  return (
    <MotionComponent
      className={`animated-element ${className}`}
      whileHover={shouldDisableEffects ? undefined : hoverAnimation}
      style={shouldDisableEffects ? {} : { 
        willChange: hoverEffect !== 'none' ? 'transform, box-shadow' : 'auto',
        transform: 'translateZ(0)', // Force GPU acceleration
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        perspective: 1000,
        WebkitPerspective: 1000,
      }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

export default AnimatedElement; 