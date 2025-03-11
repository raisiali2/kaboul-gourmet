import React from 'react';
import './PrivateDining.css';
import heroBackground from '../../images/hero-background.jpg'; // Using as placeholder

const PrivateDining = () => {
  const imageStyle = {
    backgroundImage: `url(${heroBackground})`
  };

  return (
    <section className="private-dining-section" id="private-dining">
      <div className="uk-container">
        <div className="uk-text-center section-header">
          <h2>PRIVATE DINING IN CHELSEA</h2>
          <hr className="divider" />
        </div>
        
        <div className="uk-text-center section-subtitle">
          <h3>Unforgettable Experiences at Kaboul Gourmet</h3>
          <p className="dining-intro">Unforgettable experiences for any event from intimate private dining to exclusive use events upto 50 guests.</p>
          <a href="#discover" className="discover-button">DISCOVER ROOMS</a>
        </div>
        
        <div className="uk-grid uk-grid-large dining-options">
          <div className="uk-width-1-3@m dining-option">
            <div className="option-image" style={imageStyle}>
              <h4>THE GARDEN ROOM</h4>
              <div className="option-overlay">
                <a href="#contact" className="option-btn">GET IN TOUCH</a>
              </div>
            </div>
            <div className="option-details">
              <span className="option-location">Chelsea, London</span>
              <div className="option-actions">
                <a href="#contact" className="option-link">GET IN TOUCH</a>
                <a href="#details" className="option-link">EXPLORE</a>
              </div>
            </div>
          </div>
          
          <div className="uk-width-1-3@m dining-option">
            <div className="option-image" style={imageStyle}>
              <h4>THE PRIVATE SALON</h4>
              <div className="option-overlay">
                <a href="#contact" className="option-btn">GET IN TOUCH</a>
              </div>
            </div>
            <div className="option-details">
              <span className="option-location">Chelsea, London</span>
              <div className="option-actions">
                <a href="#contact" className="option-link">GET IN TOUCH</a>
                <a href="#details" className="option-link">EXPLORE</a>
              </div>
            </div>
          </div>
          
          <div className="uk-width-1-3@m dining-option">
            <div className="option-image" style={imageStyle}>
              <h4>EXCLUSIVE HIRE</h4>
              <div className="option-overlay">
                <a href="#contact" className="option-btn">GET IN TOUCH</a>
              </div>
            </div>
            <div className="option-details">
              <span className="option-location">Chelsea, London</span>
              <div className="option-actions">
                <a href="#contact" className="option-link">GET IN TOUCH</a>
                <a href="#details" className="option-link">EXPLORE</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivateDining; 