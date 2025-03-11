import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * AnimatedSection Component - Optimized for performance
 * 
 * A wrapper component that adds smooth animations to sections when they come into view
 * with performance optimizations for 60fps
 * 
 * @param {string} className - Additional CSS classes
 * @param {string} id - Section ID
 * @param {node} children - Section content
 * @param {object} animation - Custom animation settings (optional)
 */
const AnimatedSection = ({ 
  className = '', 
  id, 
  children,
  animation = {}, 
  ...props 
}) => {
  // Check if user prefers reduced motion
  const prefersReducedMotion = useReducedMotion();
  
  // Check if on mobile/tablet
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check device width on mount and resize
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  // Default animation settings - simplified for mobile
  const defaultAnimation = {
    hidden: { 
      opacity: 0, 
      y: isMobile ? 10 : 20 // Smaller shift on mobile 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: isMobile ? 0.4 : 0.6, // Faster on mobile
        ease: "easeOut" 
      }
    }
  };

  // If user prefers reduced motion, simplify the animation
  const accessibleAnimation = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  // Choose the right animation based on preferences
  const baseAnimation = prefersReducedMotion ? accessibleAnimation : defaultAnimation;

  // Merge default with any custom animations
  const finalAnimation = {
    hidden: { ...baseAnimation.hidden, ...animation.hidden },
    visible: { 
      ...baseAnimation.visible, 
      ...animation.visible,
      transition: { 
        ...baseAnimation.visible.transition, 
        ...(animation.visible?.transition || {}) 
      }
    }
  };

  return (
    <motion.section
      id={id}
      className={`animated-section ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: isMobile ? 0.1 : 0.15 }}
      variants={finalAnimation}
      style={{ 
        willChange: 'opacity, transform',
        // Add containment for better performance
        contain: 'content'
      }}
      {...props}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection; 