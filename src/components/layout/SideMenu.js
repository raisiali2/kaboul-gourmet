import React from 'react';
import './SideMenu.css';

const SideMenu = ({ isActive, onClose }) => {
  return (
    <div className={`side-menu ${isActive ? 'active' : ''}`}>
      <div className="side-menu-header">
        <span className="side-menu-logo-text">KABOUL GOURMET</span>
        <button className="close-btn" onClick={onClose}></button>
      </div>
      
      <div className="side-menu-content">
        <div className="side-menu-nav">
          <h3 className="nav-title">Locations</h3>
          <ul>
            <li><a href="/">Kaboul Gourmet Chelsea</a></li>
            <li><a href="#coming-soon">Kaboul Gourmet Mayfair (Coming Soon)</a></li>
          </ul>
        </div>
        
        <div className="side-menu-nav">
          <h3 className="nav-title">Navigation</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#menus">Menus</a></li>
            <li><a href="#whats-on">What's On</a></li>
            <li><a href="#private-dining">Private Dining</a></li>
            <li><a href="#gift-vouchers">Gift Vouchers</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#book">Book a Table</a></li>
          </ul>
        </div>
      </div>
      
      <div className="side-menu-footer">
        <div className="social-icons">
          <a href="https://www.facebook.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.twitter.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
        <p>© {new Date().getFullYear()} Kaboul Gourmet. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default SideMenu; 