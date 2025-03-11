import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * OptimizedImage Component
 * 
 * A highly optimized image component with:
 * - Progressive loading with low-quality placeholders
 * - Responsive images with srcset
 * - WebP format with fallbacks
 * - Lazy loading
 * - Blur-up effect
 * - Animation on load
 * 
 * @param {string} src - Main image source URL
 * @param {string} placeholderSrc - Low quality placeholder image URL
 * @param {string} alt - Image alt text
 * @param {string} className - Additional CSS classes
 * @param {array} srcSet - Array of srcset entries
 * @param {string} sizes - Sizes attribute for responsive images
 * @param {boolean} lazy - Whether to use lazy loading
 * @param {string} objectFit - CSS object-fit property
 * @param {string} animationEffect - Type of animation effect when loaded
 */
const OptimizedImage = ({
  src,
  placeholderSrc,
  alt = '',
  className = '',
  srcSet = [],
  sizes = '100vw',
  lazy = true,
  objectFit = 'cover',
  animationEffect = 'fade', // 'fade', 'zoom', 'slide', 'none'
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  // Check device on mount
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  // Handle successful image load
  const handleImageLoaded = () => {
    setLoaded(true);
  };

  // Handle image load error
  const handleImageError = () => {
    setError(true);
  };

  // Determine if WebP is supported
  const [supportsWebP, setSupportsWebP] = useState(null);
  
  useEffect(() => {
    const checkWebPSupport = async () => {
      try {
        const { createImageBitmap } = window;
        
        // Skip test if browser doesn't support createImageBitmap
        if (!createImageBitmap) {
          setSupportsWebP(false);
          return;
        }
        
        // Create a test WebP image
        const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
        const blob = await fetch(webpData).then(r => r.blob());
        await createImageBitmap(blob);
        setSupportsWebP(true);
      } catch (e) {
        setSupportsWebP(false);
      }
    };
    
    checkWebPSupport();
  }, []);

  // Replace file extension with WebP if supported
  const getOptimizedSrc = (imgSrc) => {
    if (supportsWebP === null || !imgSrc) return imgSrc;
    if (supportsWebP && !imgSrc.endsWith('.webp') && !imgSrc.includes('data:image')) {
      return imgSrc.replace(/\.(jpg|jpeg|png)($|\?)/, '.webp$2');
    }
    return imgSrc;
  };

  // Generate optimized srcSet
  const getOptimizedSrcSet = () => {
    if (!srcSet.length) return undefined;
    
    return srcSet
      .map(item => {
        const [url, size] = item.split(' ');
        const optimizedUrl = getOptimizedSrc(url);
        return `${optimizedUrl} ${size}`;
      })
      .join(', ');
  };

  // Animation variants based on effect type
  const getAnimationVariants = () => {
    if (prefersReducedMotion) {
      return {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1, 
          transition: { duration: 0.3 } 
        }
      };
    }

    // Choose animation based on effect
    switch (animationEffect) {
      case 'zoom':
        return {
          hidden: { opacity: 0, scale: 0.9 },
          visible: { 
            opacity: 1, 
            scale: 1, 
            transition: { 
              duration: isMobile ? 0.5 : 0.7, 
              ease: 'easeOut' 
            } 
          }
        };
      case 'slide':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
              duration: isMobile ? 0.4 : 0.6, 
              ease: 'easeOut' 
            } 
          }
        };
      case 'none':
        return {
          hidden: { opacity: 1 },
          visible: { opacity: 1 }
        };
      case 'fade':
      default:
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1, 
            transition: { 
              duration: isMobile ? 0.4 : 0.5, 
              ease: 'easeOut' 
            } 
          }
        };
    }
  };

  // Get animation variants
  const variants = getAnimationVariants();
  
  // Get optimized sources
  const optimizedSrc = getOptimizedSrc(src);
  const optimizedPlaceholder = getOptimizedSrc(placeholderSrc);
  const optimizedSrcSet = getOptimizedSrcSet();

  return (
    <div 
      className={`optimized-image-container ${className}`}
      style={{ 
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        width: '100%',
        height: '100%'
      }}
    >
      {/* Low quality placeholder */}
      {placeholderSrc && !loaded && (
        <img
          src={optimizedPlaceholder}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit,
            filter: 'blur(10px)',
            transform: 'scale(1.05)', // Prevent blur edges
            opacity: loaded ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}

      {/* Main image with motion */}
      <motion.img
        src={optimizedSrc}
        srcSet={optimizedSrcSet}
        sizes={sizes}
        alt={alt}
        loading={lazy ? "lazy" : "eager"}
        decoding="async"
        onLoad={handleImageLoaded}
        onError={handleImageError}
        initial="hidden"
        animate={loaded ? "visible" : "hidden"}
        variants={variants}
        style={{
          width: '100%',
          height: '100%',
          objectFit,
          opacity: loaded ? 1 : 0,
          position: 'relative',
          zIndex: 1,
        }}
        {...props}
      />

      {/* Loading indicator */}
      {!loaded && !error && (
        <div
          className="image-loading-indicator"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(240, 240, 240, 0.5)',
            zIndex: 2,
          }}
        >
          <div className="image-loading" />
        </div>
      )}

      {/* Error state */}
      {error && (
        <div
          className="image-error"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8f8f8',
            color: '#999',
            zIndex: 2,
          }}
        >
          {alt || 'Image could not be loaded'}
        </div>
      )}
    </div>
  );
};

export default OptimizedImage; 