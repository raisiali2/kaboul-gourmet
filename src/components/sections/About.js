import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <p className="elegant-text">
              Large arched windows, high stone ceilings and elegant interiors provide the perfect backdrop to Michelin starred Kaboul Gourmet's traditional yet modern Afghan menu, moments away from Liverpool Street station.
            </p>
            
            <div className="about-buttons">
              <a href="#book" className="about-button">BOOK A TABLE</a>
              <a href="#menus" className="about-button">MENUS</a>
              <a href="#whats-on" className="about-button">WHAT'S ON</a>
            </div>
          </div>
          
          <div className="about-image">
            {/* This will be replaced with an actual image */}
          </div>
        </div>
        
        <div className="about-testimonials">
          <div className="testimonial-slide active">
            <blockquote>
              <span className="quote-mark">&ldquo;</span>
              <p className="quote-text">The best of 2023's</p>
              <p className="quote-citation">eating out (and in).</p>
              <footer className="quote-source">— The Hot Dinners Awards</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 