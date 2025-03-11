import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="uk-container">
        <div className="uk-text-center section-header">
          <h2>CONTACT</h2>
          <hr className="divider" />
        </div>
        
        <div className="uk-grid uk-grid-large contact-grid">
          <div className="uk-width-1-2@m contact-details">
            <p className="contact-intro">
              Call 020 7123 4567 to speak with us about an existing booking, or for any general enquiry. Alternatively email <a href="mailto:info@kaboulgourmet.com">info@kaboulgourmet.com</a>.
            </p>
            <p className="contact-intro">
              For all private dining enquiries please email <a href="mailto:privatedining@kaboulgourmet.com">privatedining@kaboulgourmet.com</a> or call 020 7123 4567 opt 2
            </p>
            
            <h3 className="info-header">FREQUENTLY ASKED QUESTIONS</h3>
            
            <div className="info-item">
              <h4>ADDRESS</h4>
              <p>Kaboul Gourmet<br />
              243 King's Road<br />
              Chelsea<br />
              London SW3 5EL</p>
              <a href="#directions" className="info-link">GET DIRECTIONS</a>
              <a href="#view" className="info-link">ENTRANCE STREET VIEW</a>
            </div>
            
            <div className="info-item">
              <h4>OPENING HOURS</h4>
              <p><strong>Lunch Hours</strong><br />
              Monday to Saturday<br />
              11.45am – 2.15pm</p>
              <p><strong>Sunday</strong><br />
              11.45am – 3pm</p>
              <p><strong>Dinner Hours</strong><br />
              Monday<br />
              5:30pm – 9pm</p>
              <p><strong>Tuesday to Friday</strong><br />
              5:30pm – 9:30pm</p>
              <p><strong>Saturday</strong><br />
              6pm – 9:30pm</p>
              <p><strong>Sunday</strong><br />
              6pm – 9pm</p>
            </div>
            
            <div className="info-item">
              <h4>FREQUENTLY ASKED QUESTIONS</h4>
              <p><strong>Do you have a dress code?</strong><br />
              Our dress code is smart casual.</p>
              <p><strong>What is the closest station?</strong><br />
              Kaboul Gourmet is a five minute walk from Sloane Square station as well as several bus routes.</p>
              <p><strong>Can I BYO wine or Champagne?</strong><br />
              Guests are welcome to bring up to two bottles of their own wine or champagne per reservation for a minimum of £50 per bottle corkage fee.</p>
              <a href="#faq" className="info-link">FAQ'S CONTINUED: HERE</a>
            </div>
          </div>
          
          <div className="uk-width-1-2@m newsletter-container">
            <div className="newsletter-form">
              <h3>NEWSLETTER SIGNUP</h3>
              
              <form>
                <div className="form-group">
                  <input type="text" placeholder="First Name" required />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Last Name" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Email" required />
                </div>
                <div className="form-group">
                  <label className="checkbox-container">
                    <input type="checkbox" required />
                    <span className="checkmark"></span>
                    <span className="checkbox-text">I agree to receive news and promotional information from Kaboul Gourmet</span>
                  </label>
                </div>
                <div className="form-group">
                  <button type="submit" className="submit-button">SUBSCRIBE</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 