import React, { useEffect, useState } from 'react';
import './styles/App.css';
import './styles/animations.css';
import './styles/animations-optimized.css';

// Layout Components
import SideMenu from './components/layout/SideMenu';
import Header from './components/Header';
import Footer from './components/layout/Footer';

// Section Components
import HeroSlider from './components/sections/HeroSlider';
import Intro from './components/sections/Intro';
import SeasonalFresh from './components/sections/SeasonalFresh';
import Celebrations from './components/sections/Celebrations';
import PrivateDiningCity from './components/sections/PrivateDiningCity';
import WeddingsByGalvin from './components/sections/WeddingsByGalvin';
import OurStory from './components/sections/OurStory';
// import FeaturedItems from './components/sections/FeaturedItems';
// import PrivateDining from './components/sections/PrivateDining';
// import Contact from './components/sections/Contact';
// import Testimonials from './components/sections/Testimonials';
// import Features from './components/sections/Features';
// import Description from './components/sections/Description';
// import Address from './components/sections/Address';
// import FAQ from './components/sections/FAQ';

function App() {
  // State for side menu
  const [sideMenuActive, setSideMenuActive] = React.useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Prevent animations during page load
  useEffect(() => {
    // Add preload class to body to prevent animations during initial load
    document.body.classList.add('preload');
    
    // Remove preload class after component mounts to enable animations
    const timer = setTimeout(() => {
      document.body.classList.remove('preload');
      setIsPageLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Toggle side menu
  const toggleSideMenu = () => {
    setSideMenuActive(!sideMenuActive);
  };

  // Enable smooth scrolling
  useEffect(() => {
    const handleLinkClick = (e) => {
      const target = e.currentTarget;
      if (target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        
        const targetId = target.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 120,
            behavior: 'smooth'
          });
        }
      }
    };
    
    // Optimized event listeners using delegation
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        handleLinkClick(e);
      }
    });

    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  return (
    <div className={`App ${isPageLoaded ? 'app-loaded' : ''}`}>
      <Header />
      <HeroSlider />
      
      <main className="main-content" style={{ marginTop: '130px' }}>
        <Intro />
        <SeasonalFresh />
        <Celebrations />
        <PrivateDiningCity />
        <WeddingsByGalvin />
        <OurStory />
      </main>
      
      <SideMenu isActive={sideMenuActive} onClose={() => setSideMenuActive(false)} />
      <div 
        className={`menu-overlay ${sideMenuActive ? 'active' : ''}`} 
        onClick={() => setSideMenuActive(false)}
      />
      
      <Footer />
      
      <div className="restaurant-description">
        Kaboul Gourmet, a fine Afghan restaurant in Chelsea, London, featuring a traditional yet modern Afghan menu with authentic flavors.
      </div>
    </div>
  );
}

export default App; 