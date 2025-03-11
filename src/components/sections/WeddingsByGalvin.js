import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../common/AnimatedSection';
import AnimatedElement from '../common/AnimatedElement';
import AnimatedImage from '../common/AnimatedImage';
import './WeddingsByGalvin.css';

const WeddingsByGalvin = () => {
  // Wedding image data
  const weddingImages = [
    {
      src: '/images/_MG_9110 copie.jpg',
      alt: 'Elegant wedding setup at Kaboul Gourmet',
      placeholderSrc: '/images/Illustration-sans-titre 1.jpg'
    },
    {
      src: '/images/_MG_9101 copie.jpg',
      alt: 'Wedding celebration dinner',
      placeholderSrc: '/images/Kabulie.jpeg'
    },
    {
      src: '/images/_MG_9000 copie.jpg',
      alt: 'Intimate wedding setting',
      placeholderSrc: '/images/Illustration-sans-titre.png'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 }
    }
  };

  const venueElementVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4
      }
    }
  };

  const venueItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <AnimatedSection id="weddings" className="weddings-section">
      <div className="weddings-container">
        <motion.div 
          className="weddings-content-col"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="content-inner">
            <motion.div 
              className="weddings-logo"
              variants={itemVariants}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              G
            </motion.div>
            <motion.h2 className="weddings-title" variants={itemVariants}>WEDDINGS BY GALVIN</motion.h2>
            <motion.h3 className="weddings-subtitle" variants={itemVariants}>Your wedding day deserves to be as unique and special as your love story.</motion.h3>
            
            <motion.div 
              className="featured-wedding-image"
              variants={imageVariants}
            >
              <AnimatedImage 
                src="/images/_MG_9160 copie.jpg"
                placeholderSrc="/images/Photo Kabuli.jpeg"
                alt="Beautiful wedding celebration at Kaboul Gourmet"
                className="main-wedding-image"
                effect="zoom"
              />
            </motion.div>
            
            <motion.p variants={itemVariants}>
              Weddings by Galvin offers the perfect combination of elegance, attention to detail, and a personalised service to bring your dream day to life.
            </motion.p>
            
            <motion.p variants={itemVariants}>
              Our stunning venue features a variety of spaces to suit your needs. From intimate wedding breakfasts to grand celebrations, our versatile areas create the perfect setting for every moment. For a truly unforgettable experience, exclusive hires allow complete personalisation for your special day.
            </motion.p>
            
            <motion.p variants={itemVariants}>
              During the warmer months, enjoy the charm of Le Jardin, where you and your guests can sip drinks and indulge in welcome canapés while surrounded by the beauty of our garden before starting your culinary experience within La Chapelle's main dining room.
            </motion.p>
            
            <motion.p variants={itemVariants}>
              For smaller wedding breakfasts, the Gallery or the Arch are ideal for private dining, offering an intimate yet luxurious setting. You'll still have access to all our premium services, including bespoke floral arrangements and elegant touches to enhance your celebration.
            </motion.p>
            
            <motion.p variants={itemVariants}>
              Our dedicated event planners will guide you every step of the way, ensuring your day is thoughtfully curated and flawlessly executed.
            </motion.p>
            
            <motion.p variants={itemVariants}>
              Let us make your wedding day a celebration you and your guests will cherish forever.
            </motion.p>
            
            <motion.p variants={itemVariants}>
              Join us to celebrate your wedding day in a beautiful, historic setting. Our team of 
              experienced professionals will ensure every detail is perfect, from the moment you 
              arrive to the last dance.
            </motion.p>
            
            <motion.p variants={itemVariants}>
              We offer bespoke wedding packages, tailored to your individual requirements, 
              ensuring your special day is exactly as you've always imagined.
            </motion.p>
            
            {/* Add wedding gallery */}
            <motion.div 
              className="wedding-gallery"
              variants={venueElementVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {weddingImages.map((image, index) => (
                <motion.div 
                  key={index} 
                  className="wedding-gallery-item"
                  variants={venueItemVariants}
                >
                  <AnimatedImage 
                    src={image.src}
                    alt={image.alt}
                    placeholderSrc={image.placeholderSrc}
                    className="wedding-gallery-image"
                    effect="zoom"
                  />
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div className="weddings-buttons" variants={itemVariants}>
              <AnimatedElement as="a" href="#brochure" className="wedding-button" hoverEffect="scale">
                EVENT BROCHURE
              </AnimatedElement>
              <AnimatedElement as="a" href="#team" className="wedding-button" hoverEffect="scale">
                TALK TO OUR TEAM
              </AnimatedElement>
            </motion.div>
            <motion.div className="wedding-enquiry-button" variants={itemVariants}>
              <AnimatedElement as="a" href="#enquiry" className="wedding-button" hoverEffect="float">
                WEDDING RECEPTION ENQUIRY
              </AnimatedElement>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="weddings-image-col"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="weddings-image">
            <AnimatedImage 
              src="/images/_MG_9087 copie.jpg"
              placeholderSrc="/images/Photo Kabuli.jpeg"
              alt="Elegant wedding venue at Kaboul Gourmet"
              className="wedding-venue-image"
              effect="zoom"
            />
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default WeddingsByGalvin; 