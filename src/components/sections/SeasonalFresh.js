import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../common/AnimatedSection';
import AnimatedElement from '../common/AnimatedElement';
import AnimatedImage from '../common/AnimatedImage';
import './SeasonalFresh.css';

const SeasonalFresh = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  
  // Enhanced testimonials with images
  const testimonials = [
    {
      quote: "The Sunday lunch complete with children's menu – is excellent value.",
      author: "Great British Chefs",
      image: "/images/Illustration-sans-titre 2.jpg",
      altText: "Great British Chefs reviewer"
    },
    {
      quote: "Buzzing with excitement and glamour, with a mixed crowd of artists and media characters.",
      author: "Great British Chefs",
      image: "/images/Photo Kabuli.jpeg",
      altText: "Media reviewer at Kaboul Gourmet"
    },
    {
      quote: "The best Afghan cuisine in the heart of London.",
      author: "Hot Dinners",
      image: "/images/Kabulie.jpeg",
      altText: "Hot Dinners food critic"
    }
  ];
  
  // Auto-rotate testimonials
  useEffect(() => {
    let interval;
    
    if (autoplayEnabled) {
      interval = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoplayEnabled, testimonials.length]);
  
  const handleIndicatorClick = (index) => {
    setActiveTestimonial(index);
    setAutoplayEnabled(false); // Pause autoplay when user interacts
    
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => {
      setAutoplayEnabled(true);
    }, 10000);
  };

  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <AnimatedSection id="seasonal" className="seasonal-section">
      <div className="seasonal-grid">
        <motion.div 
          className="seasonal-image"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <AnimatedImage 
            src="/images/Kabuli plats.jpg" 
            alt="Authentic Afghan dishes at Kaboul Gourmet" 
            className="main-dish-image"
            style={{ width: '100%', borderRadius: '8px' }}
            placeholderSrc="/images/Illustration-sans-titre.JPG"
          />
          
          {/* Additional food images in small thumbnails */}
          <div className="food-thumbnails">
            <AnimatedImage 
              src="/images/_MG_6196.jpg" 
              alt="Specialty dish" 
              className="food-thumbnail"
              initialScale={0.9}
              delay={0.3}
            />
            <AnimatedImage 
              src="/images/Limonade .jpg" 
              alt="Refreshing beverage" 
              className="food-thumbnail"
              initialScale={0.9}
              delay={0.5}
            />
          </div>
        </motion.div>
        
        <motion.div 
          className="seasonal-content"
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="content-wrapper">
            <motion.h2 variants={itemVariants} className="section-title">SEASONAL FRESH</motion.h2>
            <motion.div variants={itemVariants} className="divider"></motion.div>
            
            <motion.h3 variants={itemVariants} className="section-subtitle">Only the very best ingredients</motion.h3>
            
            <motion.p variants={itemVariants} className="seasonal-description">
              Our menus at Kaboul Gourmet celebrate only the best in produce of the season. With frequently changing menus our Head Chef continues to adapt our offering to ensure we only serve our guests the very best.
            </motion.p>
            
            <AnimatedElement 
              as="a" 
              href="#menus" 
              className="seasonal-button" 
              hoverEffect="scale"
              variants={itemVariants}
            >
              MENUS
            </AnimatedElement>
            
            {/* Enhanced image testimonial slider */}
            <motion.div 
              className="testimonial-slider"
              variants={itemVariants}
            >
              <div className="testimonial-content">
                {testimonials.map((testimonial, index) => (
                  <motion.div 
                    key={index} 
                    className={`testimonial ${index === activeTestimonial ? 'active' : ''}`}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ 
                      opacity: index === activeTestimonial ? 1 : 0,
                      x: index === activeTestimonial ? 0 : 30,
                      display: index === activeTestimonial ? 'flex' : 'none'
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="testimonial-image-container">
                      <AnimatedImage 
                        src={testimonial.image}
                        alt={testimonial.altText}
                        className="testimonial-image"
                        effect="zoom"
                      />
                    </div>
                    <div className="testimonial-text">
                      <div className="quote-icon">&ldquo;</div>
                      <p>{testimonial.quote}</p>
                      <cite>— {testimonial.author}</cite>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="testimonial-indicators">
                {testimonials.map((_, index) => (
                  <AnimatedElement 
                    as="button" 
                    key={index} 
                    className={`indicator ${index === activeTestimonial ? 'active' : ''}`}
                    onClick={() => handleIndicatorClick(index)}
                    aria-label={`Testimonial ${index + 1}`}
                    hoverEffect="scale"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default SeasonalFresh; 