import React, { useState, useEffect } from 'react';
import './TopNav.css';

const TopNav = ({ onOpenMenu }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

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

  const menuItems = [
    {
      name: "MENUS",
      url: "/menus",
      submenu: [
        { name: "Lunch Menu", url: "/menus/lunch" },
        { name: "Dinner Menu", url: "/menus/dinner" },
        { name: "Tasting Menu", url: "/menus/tasting" },
        { name: "Dessert Menu", url: "/menus/dessert" },
        { name: "Wine List", url: "/menus/wine" }
      ]
    },
    {
      name: "WHAT'S ON",
      url: "/whats-on",
      submenu: [
        { name: "Events", url: "/whats-on/events" },
        { name: "Special Offers", url: "/whats-on/offers" },
        { name: "Calendar", url: "/whats-on/calendar" }
      ]
    },
    {
      name: "PRIVATE DINING",
      url: "/private-dining",
      submenu: [
        { name: "The Arch", url: "/private-dining/arch" },
        { name: "The Gallery", url: "/private-dining/gallery" },
        { name: "Exclusive Hire", url: "/private-dining/exclusive-hire" }
      ]
    },
    {
      name: "ABOUT",
      url: "/about",
      submenu: [
        { name: "Our Story", url: "/about/our-story" },
        { name: "Our Team", url: "/about/our-team" },
        { name: "Our Philosophy", url: "/about/philosophy" }
      ]
    },
    {
      name: "REVIEWS",
      url: "/reviews",
      submenu: null
    },
    {
      name: "CONTACT",
      url: "/contact",
      submenu: null
    },
    {
      name: "NEWSLETTER",
      url: "/newsletter",
      submenu: null
    }
  ];

  return (
    <header className="site-header">
      {/* Primary Navigation - Dark Bar */}
      <div className={`primary-nav ${isSticky ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-left">
            <div className="locations-dropdown">
              <button className="locations-btn" onClick={onOpenMenu}>
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
                    <a key={index} href={restaurant.url} className="location-item">
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
              <a href="/" className="logo-link">
                <span className="logo-text">KABOUL GOURMET</span>
              </a>
            </div>
          </div>
          
          <div className="nav-right">
            <a href="tel:02071234567" className="phone-number">020 7123 4567</a>
            <a href="/gifts" className="nav-link">GIFTS</a>
            <div className="book-dropdown">
              <a href="/book" className="book-now-btn">
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
                <a href="/book/table">Book a Table</a>
                <a href="/book/private-dining">Private Dining</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Secondary Navigation - White Bar */}
      <div className={`secondary-nav ${isSticky ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="restaurant-name">
            <a href="/">Kaboul Gourmet</a>
          </div>
          
          <nav className="menu-nav">
            <ul>
              {menuItems.map((item, index) => (
                <li key={index} className={item.submenu ? 'has-dropdown' : ''}>
                  <a 
                    href={item.url} 
                    className={activeDropdown === index ? 'active' : ''}
                    onClick={(e) => {
                      if (item.submenu) {
                        e.preventDefault();
                        handleDropdownToggle(index);
                      }
                    }}
                  >
                    {item.name}
                    {item.submenu && <span className="dropdown-arrow"></span>}
                  </a>
                  
                  {item.submenu && (
                    <div className={`dropdown-menu ${activeDropdown === index ? 'show' : ''}`}>
                      {item.submenu.map((subItem, subIndex) => (
                        <a key={subIndex} href={subItem.url}>{subItem.name}</a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default TopNav; 