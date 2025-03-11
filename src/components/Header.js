import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  // State for sticky header
  const [isSticky, setIsSticky] = useState(false);
  
  // State for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // State for dropdown
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Restaurant locations
  const restaurants = [
    {
      name: "Kaboul Gourmet",
      location: "Chelsea, London",
      url: "/kaboul-gourmet"
    },
    {
      name: "Kaboul Bistrot",
      location: "Mayfair, London",
      url: "/kaboul-bistrot"
    },
    {
      name: "Kaboul Express",
      location: "Covent Garden, London",
      url: "/kaboul-express"
    }
  ];
  
  // Main navigation menu items
  const menuItems = [
    {
      label: 'MENUS',
      link: '/menus',
      submenu: [
        { name: "Lunch Menu", url: "/menus/lunch" },
        { name: "Dinner Menu", url: "/menus/dinner" },
        { name: "Tasting Menu", url: "/menus/tasting" },
        { name: "Dessert Menu", url: "/menus/dessert" },
        { name: "Wine List", url: "/menus/wine" }
      ]
    },
    {
      label: 'PRIVATE DINING',
      link: '/private-dining',
      submenu: [
        { name: "The Arch", url: "/private-dining/arch" },
        { name: "The Gallery", url: "/private-dining/gallery" },
        { name: "Exclusive Hire", url: "/private-dining/exclusive-hire" }
      ]
    },
    {
      label: 'GIFT VOUCHERS',
      link: '/gift-vouchers',
      submenu: null
    },
    {
      label: 'WEDDINGS',
      link: '/weddings',
      submenu: null
    },
    {
      label: 'OUR STORY',
      link: '/our-story',
      submenu: [
        { name: "About Us", url: "/our-story/about" },
        { name: "Our Team", url: "/our-story/team" },
        { name: "Our Philosophy", url: "/our-story/philosophy" }
      ]
    },
    {
      label: 'CONTACT',
      link: '/contact',
      submenu: null
    }
  ];
  
  // Add scroll event listener for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.pageYOffset > 80);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 991 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);
  
  // Handle body scroll locking when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Handle dropdown toggle
  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // Handle navigation without React Router
  const handleNavigation = (e, path) => {
    e.preventDefault();
    console.log(`Navigation to ${path} would happen here`);
    // In a real app with React Router, you would use history.push(path)
    
    // Close mobile menu when navigating
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };
  
  return (
    <header className={`site-header ${isSticky ? 'sticky' : ''}`}>
      {/* Primary Navigation - Dark Bar */}
      <div className="primary-nav">
        <div className="nav-container container">
          <div className="nav-left">
            <div className="locations-dropdown">
              <button className="locations-btn">
                <div className="hamburger-icon">
                  <span className="line"></span>
                  <span className="line"></span>
                  <span className="line"></span>
                </div>
                <span className="locations-text">LOCATIONS</span>
              </button>
              <div className="locations-dropdown-content">
                <div className="locations-header">
                  <span>OUR RESTAURANTS</span>
                </div>
                <div className="locations-list">
                  {restaurants.map((restaurant, index) => (
                    <a 
                      key={index} 
                      href={restaurant.url} 
                      className="location-item"
                      onClick={(e) => handleNavigation(e, restaurant.url)}
                    >
                      <div className="location-name">{restaurant.name}</div>
                      <div className="location-address">{restaurant.location}</div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="nav-center">
            <div className="main-logo">
              <a 
                href="/" 
                className="logo-link"
                onClick={(e) => handleNavigation(e, "/")}
              >
                <span className="logo-text">KABOUL GOURMET</span>
              </a>
            </div>
          </div>
          
          <div className="nav-right">
            <a href="tel:02071234567" className="phone-number">020 7123 4567</a>
            <a 
              href="/gifts" 
              className="nav-link"
              onClick={(e) => handleNavigation(e, "/gifts")}
            >
              GIFTS
            </a>
            <div className="book-dropdown">
              <a 
                href="/book" 
                className="book-now-btn"
                onClick={(e) => handleNavigation(e, "/book")}
              >
                <span>BOOK NOW</span>
                <span className="calendar-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M16 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
              </a>
              <div className="book-dropdown-content">
                <a 
                  href="/book/table"
                  onClick={(e) => handleNavigation(e, "/book/table")}
                >
                  Book a Table
                </a>
                <a 
                  href="/book/private-dining"
                  onClick={(e) => handleNavigation(e, "/book/private-dining")}
                >
                  Private Dining
                </a>
              </div>
            </div>
          </div>
          
          {/* Mobile Menu Toggle */}
          <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <div className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Secondary Navigation - White Bar */}
      <div className="secondary-nav">
        <div className="nav-container container">
          <div className="restaurant-name">
            <a 
              href="/"
              onClick={(e) => handleNavigation(e, "/")}
            >
              Kaboul Gourmet
            </a>
          </div>
          
          <nav className="menu-nav">
            <ul className="nav-menu">
              {menuItems.map((item, index) => (
                <li 
                  key={index} 
                  className={`nav-item ${item.submenu ? 'has-dropdown' : ''}`}
                >
                  <a 
                    href={item.link} 
                    className={activeDropdown === index ? 'active' : ''}
                    onClick={(e) => {
                      if (item.submenu) {
                        e.preventDefault();
                        handleDropdownToggle(index);
                      } else {
                        handleNavigation(e, item.link);
                      }
                    }}
                  >
                    {item.label}
                    {item.submenu && <span className="dropdown-arrow"></span>}
                  </a>
                  
                  {item.submenu && (
                    <div className={`dropdown-menu ${activeDropdown === index ? 'show' : ''}`}>
                      {item.submenu.map((subItem, subIndex) => (
                        <a 
                          key={subIndex} 
                          href={subItem.url}
                          onClick={(e) => handleNavigation(e, subItem.url)}
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="container">
          <ul className="mobile-nav-menu">
            {/* Restaurant Location Section */}
            <li className="mobile-nav-section-header">OUR RESTAURANTS</li>
            {restaurants.map((restaurant, index) => (
              <li key={`loc-${index}`} className="mobile-nav-item">
                <a 
                  href={restaurant.url}
                  onClick={(e) => handleNavigation(e, restaurant.url)}
                >
                  <div className="location-name">{restaurant.name}</div>
                  <div className="location-address">{restaurant.location}</div>
                </a>
              </li>
            ))}
            
            {/* Navigation Links */}
            <li className="mobile-nav-section-header">MENU</li>
            {menuItems.map((item, index) => (
              <li key={`nav-${index}`} className="mobile-nav-item">
                <a 
                  href={item.link}
                  onClick={(e) => handleNavigation(e, item.link)}
                >
                  {item.label}
                </a>
                
                {item.submenu && (
                  <ul className="mobile-submenu">
                    {item.submenu.map((subItem, subIndex) => (
                      <li key={subIndex} className="mobile-submenu-item">
                        <a 
                          href={subItem.url}
                          onClick={(e) => handleNavigation(e, subItem.url)}
                        >
                          {subItem.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            
            {/* Contact and Booking */}
            <li className="mobile-nav-section-header">CONTACT</li>
            <li className="mobile-nav-item">
              <a href="tel:02071234567">020 7123 4567</a>
            </li>
            <li className="mobile-nav-item mobile-nav-cta">
              <a 
                href="/book" 
                className="btn btn-primary"
                onClick={(e) => handleNavigation(e, "/book")}
              >
                BOOK NOW
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header; 