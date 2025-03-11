import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../common/AnimatedSection';
import AnimatedElement from '../common/AnimatedElement';
import AnimatedImage from '../common/AnimatedImage';
import './Celebrations.css';

const Celebrations = () => {
  // Gallery images for celebrations
  const galleryImages = [
    {
      src: "/images/_MG_9087 copie.jpg",
      alt: "Celebration feast at Kaboul Gourmet",
      placeholderSrc: "/images/Photo Kabuli.jpeg"
    },
    {
      src: "/images/_MG_9084 copie.jpg",
      alt: "Private dining setup for special occasions",
      placeholderSrc: "/images/Kabulie.jpeg"
    },
    {
      src: "/images/_MG_9076 copie.jpg",
      alt: "Wedding reception at Kaboul Gourmet",
      placeholderSrc: "/images/Photo deliveroo.jpg"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  // Gallery animation variants
  const galleryVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const galleryItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  return (
    <AnimatedSection id="celebrations" className="celebrations-section">
      <div className="celebrations-container">
        <motion.div 
          className="celebrations-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="content-inner">
            <motion.div 
              className="celebrations-logo"
              variants={itemVariants}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              G
            </motion.div>
            <motion.h2 variants={itemVariants} className="celebrations-title">CELEBRATIONS</motion.h2>
            <motion.div variants={itemVariants} className="divider"></motion.div>
            
            <motion.h3 variants={itemVariants} className="celebrations-subtitle">Celebrate with us.</motion.h3>
            
            <motion.p variants={itemVariants} className="celebrations-text">
              Join us to celebrate the milestones in your life. Whether that be a wedding reception, birthday, graduation or perhaps securing that new job, we are the perfect location to celebrate.
            </motion.p>
            
            <motion.p variants={itemVariants} className="celebrations-text">
              Kaboul Gourmet can be the perfect backdrop for an intimate wedding reception, from securing one of our private dining rooms or exclusively hiring our restaurants for your big day. Small or larger private tables can be reserved to make your special occasion.
            </motion.p>
            
            <motion.p variants={itemVariants} className="celebrations-text">
              We welcome special requests, from a bouquet of flowers to a small celebration cake please talk to our team and they will try their best to meet your needs and wants of your special day. Our team are on hand for all those pre-ordered bottles of champagne, a signed menu or even a Kaboul cook-book amongst a handful of options to mark the special occasion.
            </motion.p>
            
            <motion.div variants={itemVariants} className="celebrations-buttons">
              <AnimatedElement as="a" href="#booking" className="celebrations-button" hoverEffect="scale">
                MAKE A BOOKING
              </AnimatedElement>
              <AnimatedElement as="a" href="#contact" className="celebrations-button" hoverEffect="scale">
                TALK TO OUR TEAM
              </AnimatedElement>
            </motion.div>
            
            <motion.div variants={itemVariants} className="secondary-button-container">
              <AnimatedElement as="a" href="#private-dining" className="celebrations-button secondary" hoverEffect="float">
                PRIVATE DINING ENQUIRY
              </AnimatedElement>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="celebrations-image"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <AnimatedImage 
            src="/images/_MG_6209.jpg"
            placeholderSrc="/images/Kabulie.jpeg"
            alt="Celebration at Kaboul Gourmet"
            className="celebration-venue-image"
            effect="zoom"
          />
        </motion.div>

        {/* Celebration Images Gallery */}
        <motion.div 
          className="celebrations-gallery"
          variants={galleryVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {galleryImages.map((image, index) => (
            <motion.div 
              key={index} 
              className="gallery-item"
              variants={galleryItemVariants}
            >
              <AnimatedImage 
                src={image.src}
                alt={image.alt}
                placeholderSrc={image.placeholderSrc}
                effect="zoom"
                className="gallery-image"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default Celebrations; 