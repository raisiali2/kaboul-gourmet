import React from 'react';
import './HeroBanner.css';
import heroBackground from '../../images/hero-background.jpg';
import patternSvg from '../../images/pattern.svg';

const HeroBanner = () => {
  // Add the images to the component's style
  const heroImageStyle = {
    backgroundImage: `url(${heroBackground})`
  };
  
  const patternStyle = {
    backgroundImage: `url(${patternSvg})`
  };

  return (
    <section className="hero-banner">
      <div className="uk-flex uk-flex-middle hero-container">
        <div className="uk-width-10-20@m uk-flex-column hero-left">
          <div className="hero-description">
            <p>Ornate handcrafted décor, warm authentic ambiance and rich traditional flavors provide the perfect backdrop to Kaboul Gourmet's traditional yet modern Afghan cuisine, moments away from Chelsea Bridge.</p>
          </div>
          <div className="hero-buttons">
            <a href="#book" className="hero-btn">BOOK A TABLE</a>
            <a href="#menu" className="hero-btn">MENUS</a>
            <a href="#whats-on" className="hero-btn">WHAT'S ON</a>
          </div>
          
          <div className="hero-quote-slider uk-position-relative uk-visible-toggle" tabIndex="-1">
            <ul className="uk-slider-items uk-child-width-1-1">
              <li className="uk-active">
                <blockquote>
                  <p className="quote-mark">&ldquo;</p>
                  <p className="quote-text">So clearly I admire Kaboul Gourmet</p>
                  <p className="quote-text">very, very much.</p>
                  <cite>— Jay Rayner, The Guardian</cite>
                </blockquote>
              </li>
              <li>
                <blockquote>
                  <p className="quote-mark">&ldquo;</p>
                  <p className="quote-text">The best of 2023's</p>
                  <p className="quote-text">eating out (and in).</p>
                  <cite>— The Hot Dinners Awards</cite>
                </blockquote>
              </li>
              <li>
                <blockquote>
                  <p className="quote-mark">&ldquo;</p>
                  <p className="quote-text">Unlike many Chelsea restaurants,</p>
                  <p className="quote-text">Kaboul Gourmet is a great bet on the weekend.</p>
                  <cite>— Great British Chefs</cite>
                </blockquote>
              </li>
              <li>
                <blockquote>
                  <p className="quote-mark">&ldquo;</p>
                  <p className="quote-text">The most important thing is,</p>
                  <p className="quote-text">quality of ingredients and consistency.</p>
                  <cite>— Business Insider</cite>
                </blockquote>
              </li>
            </ul>
            
            <div className="hero-carousel-indicators">
              <span className="indicator active"></span>
              <span className="indicator"></span>
              <span className="indicator"></span>
              <span className="indicator"></span>
            </div>
          </div>
        </div>
        
        <div className="uk-width-10-20@m be-block-image hero-right">
          <div className="hero-image" style={heroImageStyle}></div>
        </div>
      </div>
      
      <div className="brand-pattern" style={patternStyle}></div>
    </section>
  );
};

export default HeroBanner; 