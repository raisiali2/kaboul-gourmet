import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-track">
          <div className="testimonial-item active">
            <div className="quote-container">
              <div className="quote-mark">&ldquo;</div>
              <div className="quote-wrapper">
                <p className="quote-line">So clearly I admire Kaboul Gourmet</p>
                <p className="quote-line">very, very much.</p>
                <p className="quote-author">Jay Rayner, The Guardian</p>
              </div>
            </div>
          </div>
          
          <div className="testimonial-item">
            <div className="quote-container">
              <div className="quote-mark">&ldquo;</div>
              <div className="quote-wrapper">
                <p className="quote-line">The best of 2023's</p>
                <p className="quote-line">eating out (and in).</p>
                <p className="quote-author">The Hot Dinners Awards</p>
              </div>
            </div>
          </div>
          
          <div className="testimonial-item">
            <div className="quote-container">
              <div className="quote-mark">&ldquo;</div>
              <div className="quote-wrapper">
                <p className="quote-line">Unlike many Chelsea restaurants,</p>
                <p className="quote-line">Kaboul Gourmet is a great bet on the weekend.</p>
                <p className="quote-author">Great British Chefs</p>
              </div>
            </div>
          </div>
          
          <div className="testimonial-item">
            <div className="quote-container">
              <div className="quote-mark">&ldquo;</div>
              <div className="quote-wrapper">
                <p className="quote-line">The most important thing is,</p>
                <p className="quote-line">quality of ingredients and consistency.</p>
                <p className="quote-author">Business Insider</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="testimonials-indicators">
          <span className="indicator active"></span>
          <span className="indicator"></span>
          <span className="indicator"></span>
          <span className="indicator"></span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 