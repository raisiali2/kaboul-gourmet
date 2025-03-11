import React, { useEffect, useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import AnimatedSection from '../common/AnimatedSection';
import AnimatedElement from '../common/AnimatedElement';
import AnimatedImage from '../common/AnimatedImage';
import './OurStory.css';

/**
 * Optimized image preloading function
 */
const preloadImage = (src, options = {}) => {
  const { priority = 'low', onLoad = () => {} } = options;
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      onLoad(src);
      resolve(img);
    };
    img.onerror = reject;
    img.src = src;
    img.fetchPriority = priority;
    
    if (priority === 'high') {
      img.importance = 'high';
    }
  });
};

const OurStory = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  
  // Food Gallery Slider State
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);
  
  // Food gallery images
  const foodGalleryImages = [
    {
      src: "/images/_MG_6196.jpg",
      alt: "Traditional Afghan dish",
      thumbnail: "/images/Illustration-sans-titre.png"
    },
    {
      src: "/images/_MG_6169.jpg",
      alt: "Specialty kebab platter",
      thumbnail: "/images/Kabulie.jpeg"
    },
    {
      src: "/images/_MG_6192.jpg",
      alt: "Authentic Afghan dessert",
      thumbnail: "/images/Photo Kabuli.jpeg"
    },
    {
      src: "/images/_MG_6207.jpg",
      alt: "Fresh ingredients preparation",
      thumbnail: "/images/Photo deliveroo.jpg"
    },
    {
      src: "/images/Kabuli plats.jpg",
      alt: "Signature dishes collection",
      thumbnail: "/images/Illustration-sans-titre 1.jpg"
    }
  ];
  
  // Image URLs with placeholder and full versions
  const images = {
    chef: {
      small: "/images/Kabulie.jpeg", // Small optimized version
      full: "/images/_MG_7046.jpg", // Full quality version
    },
    chefBottom: {
      small: "/images/Photo deliveroo.jpg", // Small optimized version
      full: "/images/_MG_7041.jpg", // Full quality version
    }
  };

  // Check for mobile devices
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
  
  // Food Gallery Auto-play
  useEffect(() => {
    if (isAutoPlaying && !prefersReducedMotion) {
      autoPlayRef.current = setInterval(() => {
        setActiveSlide(prev => (prev + 1) % foodGalleryImages.length);
      }, 4000);
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, prefersReducedMotion, foodGalleryImages.length]);
  
  // Pause autoplay when component is not in view
  useEffect(() => {
    setIsAutoPlaying(isInView);
  }, [isInView]);
  
  // Set up intersection observer to determine when section is in view
  useEffect(() => {
    if (!sectionRef.current || typeof IntersectionObserver === 'undefined') {
      return;
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          
          // Start preloading images as soon as section comes into view
          if (Object.keys(imagesLoaded).length === 0) {
            // Load small versions first
            Promise.all([
              preloadImage(images.chef.small, { 
                priority: 'high', 
                onLoad: (src) => handleImageLoad('chef-small')
              }),
              preloadImage(images.chefBottom.small, { 
                priority: 'medium',
                onLoad: (src) => handleImageLoad('chef-bottom-small')
              })
            ]).then(() => {
              // Then load full versions if not on mobile
              if (!isMobile) {
                Promise.all([
                  preloadImage(images.chef.full, { 
                    priority: 'medium',
                    onLoad: (src) => handleImageLoad('chef-full')
                  }),
                  preloadImage(images.chefBottom.full, { 
                    priority: 'low',
                    onLoad: (src) => handleImageLoad('chef-bottom-full')
                  })
                ]).catch(err => console.error('Error loading full-res images:', err));
              }
            }).catch(err => console.error('Error loading placeholder images:', err));
          }
          
          // Unobserve once in view
          observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(sectionRef.current);
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isMobile, imagesLoaded]);

  // Handle image loads
  const handleImageLoad = (imageId) => {
    setImagesLoaded(prev => ({
      ...prev,
      [imageId]: true
    }));
  };
  
  // Get the appropriate image src based on loaded state
  const getImageSrc = (imageType) => {
    const isFullLoaded = imagesLoaded[`${imageType}-full`];
    const isSmallLoaded = imagesLoaded[`${imageType}-small`];
    
    // For mobile always use small version
    if (isMobile) {
      return isSmallLoaded ? images[imageType].small : null;
    }
    
    // For desktop, use full if loaded, otherwise small
    return isFullLoaded ? images[imageType].full : (isSmallLoaded ? images[imageType].small : null);
  };

  // Animation variants - optimized for performance
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: isMobile ? 15 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: isMobile ? 0.4 : 0.6, 
        ease: "easeOut" 
      }
    }
  };

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.15,
        delayChildren: 0.1
      }
    }
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: isMobile ? 10 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: isMobile ? 0.4 : 0.5, ease: "easeOut" }
    }
  };

  const imageScaleVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { 
        duration: 0.7, 
        ease: "easeOut" 
      }
    }
  };

  const dividerVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: "100%",
      opacity: 1,
      transition: { 
        duration: isMobile ? 0.6 : 0.8, 
        ease: "easeOut" 
      }
    }
  };

  // Simplified animation if user prefers reduced motion
  const accessibleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  // Choose appropriate variants based on user preferences
  const finalFadeInUpVariants = prefersReducedMotion ? accessibleVariants : fadeInUpVariants;
  const finalTextItemVariants = prefersReducedMotion ? accessibleVariants : textItemVariants;
  const finalImageVariants = prefersReducedMotion ? accessibleVariants : imageScaleVariants;

  // Get srcSet based on loaded state
  const getChefSrcSet = () => {
    const baseSet = "https://ik.imagekit.io/sbj8bzmjnl4/galvin/wp-content/uploads/2025/02/restaurant-michelin-star-french-city-london-galvin-la-chapelle-our-story-chef-2-430x645.jpg.webp 430w";
    
    // Only include larger images if they're loaded
    if (imagesLoaded['chef-full']) {
      return `${baseSet}, https://ik.imagekit.io/sbj8bzmjnl4/galvin/wp-content/uploads/2025/02/restaurant-michelin-star-french-city-london-galvin-la-chapelle-our-story-chef-2-640x960.jpg.webp 640w, https://ik.imagekit.io/sbj8bzmjnl4/galvin/wp-content/uploads/2025/02/restaurant-michelin-star-french-city-london-galvin-la-chapelle-our-story-chef-2-760x1140.jpg.webp 760w, https://ik.imagekit.io/sbj8bzmjnl4/galvin/wp-content/uploads/2025/02/restaurant-michelin-star-french-city-london-galvin-la-chapelle-our-story-chef-2-888x1333.jpg.webp 888w`;
    }
    
    return baseSet;
  };

  // Food gallery navigation
  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % foodGalleryImages.length);
    setIsAutoPlaying(false);
    
    // Resume autoplay after 8 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };
  
  const prevSlide = () => {
    setActiveSlide((prev) => 
      prev === 0 ? foodGalleryImages.length - 1 : prev - 1
    );
    setIsAutoPlaying(false);
    
    // Resume autoplay after 8 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  // Jump to specific slide
  const goToSlide = (index) => {
    setActiveSlide(index);
    setIsAutoPlaying(false);
    
    // Resume autoplay after 8 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  return (
    <AnimatedSection 
      id="michelin" 
      className="pgwdblock-block-default-text-slider be-block-imgtext uk-section uk-padding-remove-vertical be-block-image-column-top"
      ref={sectionRef}
    >
      <motion.div 
        className="be-block-wrapper uk-padding-large-vertical block-bg-black" 
        style={{
          backgroundImage: "url(https://galvinrestaurants.com/wp-content/uploads/2023/09/french-best-michelin-restaurants-the-city-bishopsgate-london-galvin-gold-rotated-1.svg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: isMobile ? "300px" : "500px", 
          backgroundPosition: "right top"
        }}
        initial={prefersReducedMotion ? {} : { backgroundSize: "0px" }}
        animate={prefersReducedMotion ? {} : { backgroundSize: isMobile ? "300px" : "500px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="be-block-container uk-position-relative uk-container uk-container-xlarge">
          <div className="be-block-content-container">
            <div className="uk-grid-match uk-grid-large uk-flex uk-grid" data-uk-grid="">
              {/* Chef image column */}
              <motion.div 
                className="uk-width-10-20@m be-block-image-column uk-flex uk-flex-middle uk-flex-first@m"
                variants={finalImageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                style={{
                  backgroundColor: "#f5f5f5", // Placeholder color while loading
                }}
              >
                <div className="uk-height-1-1 uk-text-center be-transition-duration-15 uk-transform-origin-top-center">
                  <div className="uk-overflow-hidden uk-cover-container uk-height-1-1 be-section-block-image-height uk-transition-toggle" tabIndex="0">
                    {(imagesLoaded['chef-small'] || imagesLoaded['chef-full']) && (
                      <motion.img 
                        width="888" 
                        height="1333" 
                        className="uk-transition-opaque be-transition-ease be-transition-duration-2" 
                        src={getImageSrc('chef')}
                        srcSet={getChefSrcSet()}
                        sizes="(max-width: 360px) 95vw, (max-width: 640px) 95vw, (max-width: 960px) 95vw, (max-width: 1200px) 40vw, (max-width: 1600px) 40vw, 888px"
                        alt="Restaurant French Michelin Starred Galvin Private Dining Events"
                        loading="lazy"
                        whileHover={prefersReducedMotion ? {} : { scale: isMobile ? 1.02 : 1.05 }}
                        transition={{ duration: 0.4 }}
                        style={{ 
                          willChange: 'transform',
                          opacity: imagesLoaded['chef-small'] ? 1 : 0,
                          transition: 'opacity 0.3s ease',
                          transform: 'translateZ(0)'
                        }}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
              
              {/* Content column */}
              <motion.div 
                className="uk-width-10-20@m uk-flex-column uk-flex-last@m"
                variants={finalFadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {/* Text content */}
                <div className="block-bg-white">
                  <motion.div 
                    className="be-block-textbox"
                    variants={textContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <motion.div 
                      className="be-block-heading uk-h1" 
                      variants={finalTextItemVariants}
                    >
                      Our Story
                    </motion.div>
                    
                    <motion.hr 
                      className="be-title-divider uk-margin-remove-top" 
                      variants={dividerVariants}
                    />
                    
                    <motion.h2 
                      className="uk-h3 be-block-subheading uk-visible@m" 
                      variants={finalTextItemVariants}
                    >
                      Galvin La Chapelle, a unique venue in the heart of the city of London, where old meets new.
                    </motion.h2>
                    
                    {!isMobile && (
                      <motion.h2 
                        className="uk-h4 be-block-subheading uk-hidden@m" 
                        style={{ visibility: "hidden" }}
                        variants={finalTextItemVariants}
                      >
                        Galvin La Chapelle, a unique venue in the heart of the city of London, where old meets new.
                      </motion.h2>
                    )}
                    
                    <motion.div 
                      className="be-block-text uk-clearfix"
                      variants={textContainerVariants}
                    >
                      <motion.p variants={finalTextItemVariants}>
                        Our Michelin Star venue offers modern French fine dining with a European influence. Our unique venue boasts beautiful high stone ceilings, with large arched windows, creating the perfect backdrop for all occasions.
                      </motion.p>
                      {!isMobile && (
                        <motion.p variants={finalTextItemVariants}>
                          Our grade 2 listed former school, takes pride of place amongst the modern buildings of Spitalfields and London City. Our glamourous venue has an effortless buzz that transports you to a world of fantastic food, fine wine and unmatched service.
                        </motion.p>
                      )}
                      <motion.p variants={finalTextItemVariants}>
                        Our kitchen ensures a seasonal and sustainable menu continues to be on offered to our guests using fresh and local produce. Our Executive Chef, Arturo Granato works closely with Head Chef, Gabriele Caucci to boast a menu with an emphasis on bold flavours, a balance of textures and a continued focus on all Galvin Restaurant's core values.
                      </motion.p>
                    </motion.div>
                    
                    <motion.div 
                      className="be-block-buttonbox uk-flex-inline uk-flex-center uk-flex-wrap be-flex-gap uk-margin-top uk-animation-toggle"
                      variants={finalTextItemVariants}
                    >
                      <AnimatedElement
                        as="a"
                        title="Read more about the history of Galvin Restaurants in London and Essex by Award winning Michelin starred brothers Chris & Jeff British French Cuisine at its best."
                        className="uk-button be-block-button uk-button-large"
                        href="https://galvinrestaurants.com/restaurants-london-michelin-starred-french-british-best-top-awards/"
                        target="_self"
                        data-count="1"
                        data-rows="2"
                        hoverEffect="scale"
                      >
                        Discover More
                      </AnimatedElement>
                      <AnimatedElement
                        as="a"
                        title="Subscribe to French restaurants London, Galvin."
                        className="uk-button be-block-button uk-button-large"
                        href="https://galvinrestaurants.com/michelin-french-restaurant-city-london-galvin-la-chapelle/#restaurant"
                        target="_self"
                        data-count="2"
                        data-rows="2"
                        hoverEffect="scale"
                      >
                        Subscribe
                      </AnimatedElement>
                    </motion.div>
                  </motion.div>
                </div>
                
                {/* Bottom chef image - only load on desktop or if visible in viewport */}
                {(isInView || !isMobile) && (
                  <motion.div 
                    className="uk-width-full uk-text-center"
                    variants={finalImageVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    style={{
                      backgroundColor: "#f5f5f5", // Placeholder color while loading
                    }}
                  >
                    <div className="be-block-img-under uk-position-relative uk-text-center be-transition-duration-15 uk-transform-origin-top-center">
                      <div className="uk-overflow-hidden uk-background-cover uk-transition-toggle" tabIndex="0">
                        {(imagesLoaded['chef-bottom-small'] || imagesLoaded['chef-bottom-full']) && (
                          <motion.img 
                            width="960" 
                            height="640" 
                            className="uk-transition-opaque be-transition-ease be-transition-duration-2" 
                            src={getImageSrc('chefBottom')}
                            srcSet={imagesLoaded['chef-bottom-full'] ? 
                              "https://ik.imagekit.io/sbj8bzmjnl4/galvin/wp-content/uploads/2025/02/restaurant-michelin-star-french-city-london-galvin-la-chapelle-chef-gabriele2-430x287.jpg.webp 430w, https://ik.imagekit.io/sbj8bzmjnl4/galvin/wp-content/uploads/2025/02/restaurant-michelin-star-french-city-london-galvin-la-chapelle-chef-gabriele2-640x427.jpg.webp 640w, https://ik.imagekit.io/sbj8bzmjnl4/galvin/wp-content/uploads/2025/02/restaurant-michelin-star-french-city-london-galvin-la-chapelle-chef-gabriele2-760x507.jpg.webp 760w, https://ik.imagekit.io/sbj8bzmjnl4/galvin/wp-content/uploads/2025/02/restaurant-michelin-star-french-city-london-galvin-la-chapelle-chef-gabriele2-960x640.jpg.webp 960w" :
                              "https://ik.imagekit.io/sbj8bzmjnl4/galvin/wp-content/uploads/2025/02/restaurant-michelin-star-french-city-london-galvin-la-chapelle-chef-gabriele2-430x287.jpg.webp 430w"
                            }
                            sizes="(max-width: 360px) 95vw, (max-width: 640px) 95vw, (max-width: 960px) 95vw, (max-width: 1200px) 40vw, (max-width: 1600px) 40vw, 960px"
                            alt="Restaurant Michelin starred French city of London Chefs"
                            loading="lazy"
                            whileHover={prefersReducedMotion ? {} : { scale: isMobile ? 1.02 : 1.03 }}
                            transition={{ duration: 0.4 }}
                            style={{ 
                              willChange: 'transform',
                              opacity: imagesLoaded['chef-bottom-small'] ? 1 : 0,
                              transition: 'opacity 0.3s ease',
                              transform: 'translateZ(0)'
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Add Food Gallery Slider here */}
      <div className="food-gallery-section">
        <motion.h3 
          className="gallery-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Our Culinary Creations
        </motion.h3>
        
        <div className="food-gallery-slider">
          <button 
            className="gallery-nav gallery-prev" 
            onClick={prevSlide}
            aria-label="Previous image"
          >
            <span>‹</span>
          </button>
          
          <div className="gallery-container">
            {foodGalleryImages.map((image, index) => (
              <motion.div 
                key={index}
                className={`gallery-slide ${index === activeSlide ? 'active' : ''}`}
                initial={{ opacity: 0, x: 100 }}
                animate={{ 
                  opacity: index === activeSlide ? 1 : 0,
                  x: index === activeSlide ? 0 : 100,
                  display: index === activeSlide ? 'block' : 'none'
                }}
                transition={{ duration: 0.5 }}
              >
                <AnimatedImage 
                  src={image.src}
                  placeholderSrc={image.thumbnail}
                  alt={image.alt}
                  className="gallery-image"
                  effect="zoom"
                />
                <p className="image-caption">{image.alt}</p>
              </motion.div>
            ))}
          </div>
          
          <button 
            className="gallery-nav gallery-next" 
            onClick={nextSlide}
            aria-label="Next image"
          >
            <span>›</span>
          </button>
        </div>
        
        <div className="gallery-indicators">
          {foodGalleryImages.map((_, index) => (
            <button 
              key={index}
              className={`gallery-dot ${index === activeSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default OurStory; 