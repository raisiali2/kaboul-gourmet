import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../common/AnimatedSection';
import AnimatedElement from '../common/AnimatedElement';
import AnimatedImage from '../common/AnimatedImage';
import './Intro.css';

const Intro = () => {
  // Staggered animation for children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <AnimatedSection id="about" className="intro-section">
      <div className="container">
        <div className="intro-grid">
          <motion.div 
            className="intro-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p 
              className="elegant-description"
              variants={itemVariants}
            >
              Large arched windows, high stone ceilings and elegant interiors provide the perfect backdrop to Kaboul Gourmet's traditional yet modern Afghan menu, moments away from Liverpool Street station.
            </motion.p>
            
            <motion.div 
              className="intro-buttons"
              variants={itemVariants}
            >
              <AnimatedElement as="a" href="#book" className="intro-button" hoverEffect="scale">
                BOOK A TABLE
              </AnimatedElement>
              <AnimatedElement as="a" href="#menus" className="intro-button" hoverEffect="scale">
                MENUS
              </AnimatedElement>
              <AnimatedElement as="a" href="#whats-on" className="intro-button" hoverEffect="scale">
                WHAT'S ON
              </AnimatedElement>
            </motion.div>
            
            <motion.div 
              className="intro-quote"
              variants={itemVariants}
            >
              <div className="quote-mark">&ldquo;</div>
              <div className="quote-content">
                <p>The most important thing is, quality of ingredients and consistency.</p>
                <cite>— Business Insider</cite>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="intro-image"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="intro-image-container">
              <AnimatedImage 
                src="/images/_MG_6209.jpg"
                placeholderSrc="/images/Illustration-sans-titre.png"
                alt="Kaboul Gourmet beautiful interior"
                className="main-intro-image"
                effect="zoom"
              />
              
              <div className="intro-thumbnails">
                <AnimatedImage 
                  src="/images/_MG_6173.jpg"
                  placeholderSrc="/images/Kabulie.jpeg"
                  alt="Elegant dining area at Kaboul Gourmet"
                  className="intro-thumbnail"
                  effect="tilt"
                  initialScale={0.9}
                  delay={0.4}
                />
                <AnimatedImage 
                  src="/images/_MG_6170.jpg"
                  placeholderSrc="/images/Photo deliveroo.jpg"
                  alt="Warm atmosphere inside Kaboul Gourmet"
                  className="intro-thumbnail"
                  effect="tilt"
                  initialScale={0.9}
                  delay={0.6}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Intro; 