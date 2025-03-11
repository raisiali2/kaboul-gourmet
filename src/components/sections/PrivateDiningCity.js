import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../common/AnimatedSection';
import AnimatedElement from '../common/AnimatedElement';
import AnimatedImage from '../common/AnimatedImage';
import './PrivateDiningCity.css';

const PrivateDiningCity = () => {
  const [activeRoom, setActiveRoom] = useState(0);
  const rooms = [
    { 
      name: 'THE GALLERY', 
      location: 'The City, London',
      image: '/images/_MG_6145.jpg',
      thumbnailImage: '/images/Photo Kabuli.jpeg'
    },
    { 
      name: 'EXCLUSIVE HIRE', 
      location: 'The City, London',
      image: '/images/_MG_6207.jpg',
      thumbnailImage: '/images/Illustration-sans-titre 2.jpg'
    }
  ];
  
  const titleStyle = {
    color: '#ffffff',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
  };
  
  const buttonStyle = {
    padding: '12px 40px',
    backgroundColor: '#fff',
    color: '#1a1a1a',
    border: 'none',
    whiteSpace: 'nowrap',
    fontWeight: 500,
    letterSpacing: '1px',
    fontSize: '0.9rem'
  };

  const nextRoom = () => {
    setActiveRoom((prev) => (prev + 1) % rooms.length);
  };

  const prevRoom = () => {
    setActiveRoom((prev) => (prev === 0 ? rooms.length - 1 : prev - 1));
  };

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: "easeOut" 
      }
    }
  };

  const sliderVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.7, 
        delay: 0.3,
        ease: "easeOut" 
      }
    }
  };

  return (
    <AnimatedSection 
      id="private-dining-city" 
      className="private-dining-city-section"
      variants={sectionVariants}
    >
      <div className="private-dining-city-container">
        <motion.div 
          className="section-header"
          variants={headerVariants}
        >
          <motion.h2 
            className="section-title" 
            style={titleStyle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            PRIVATE DINING IN THE CITY OF LONDON
          </motion.h2>
          <motion.h3 
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Unforgettable Experiences at Galvin La Chapelle
          </motion.h3>
          <motion.p 
            className="section-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Unforgettable experiences for any event from intimate private dining to exclusive use 
            events upto 150 guests.
          </motion.p>
          <motion.div 
            className="button-container"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <AnimatedElement as="a" href="#rooms" className="discover-button" style={buttonStyle} hoverEffect="scale">
              DISCOVER ROOMS
            </AnimatedElement>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="rooms-slider-container"
          variants={sliderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <AnimatedElement as="button" className="slider-arrow prev" onClick={prevRoom} aria-label="Previous room" hoverEffect="scale">
            <span className="arrow-icon">&#8249;</span>
          </AnimatedElement>
          
          <div className="rooms-display">
            {rooms.map((room, index) => (
              <motion.div 
                key={index}
                className={`room-container ${index === 0 ? 'gallery' : 'exclusive'}`}
                initial={{ opacity: 0, x: index === activeRoom ? 0 : 50 }}
                animate={{ 
                  opacity: index === activeRoom ? 1 : 0,
                  x: index === activeRoom ? 0 : 50,
                  display: index === activeRoom ? 'block' : 'none'
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="room-image-container">
                  <AnimatedImage 
                    src={room.image}
                    placeholderSrc={room.thumbnailImage}
                    alt={`${room.name} at Kaboul Gourmet`}
                    className="room-image"
                    effect="tilt"
                  />
                </div>
                
                <motion.div 
                  className="room-details"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  key={`details-${activeRoom}`}
                >
                  <h4 className="room-name">{room.name}</h4>
                  <p className="room-location">{room.location}</p>
                  <div className="room-button-group">
                    <AnimatedElement as="a" href="#enquire" className="room-action-button" hoverEffect="scale">
                      GET IN TOUCH
                    </AnimatedElement>
                    <AnimatedElement as="a" href="#explore" className="room-action-button small" hoverEffect="scale">
                      EXPLORE
                    </AnimatedElement>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          <AnimatedElement as="button" className="slider-arrow next" onClick={nextRoom} aria-label="Next room" hoverEffect="scale">
            <span className="arrow-icon">&#8250;</span>
          </AnimatedElement>
        </motion.div>
        
        <motion.div 
          className="decorative-curve"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        ></motion.div>
      </div>
    </AnimatedSection>
  );
};

export default PrivateDiningCity; 