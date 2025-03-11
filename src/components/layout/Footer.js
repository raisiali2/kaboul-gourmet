import React from 'react';
import './Footer.css';

const Footer = () => {
  // Social media icons
  const socialIcons = {
    facebook: '/images/Illustration-sans-titre.png',
    instagram: '/images/_MG_8888 copie-min.jpg',
    twitter: '/images/Photo deliveroo.jpg'
  };

  // Footer logo
  const footerLogo = '/images/Kabulie.jpeg';

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-container">
          <div className="footer-column">
            <h3>Contact</h3>
            <address>
              Kaboul Gourmet<br />
              123 King's Road<br />
              Chelsea, London SW3 4AA
            </address>
            <p>
              <a href="tel:+442071234567">020 7123 4567</a><br />
              <a href="mailto:info@kaboulgourmet.com">info@kaboulgourmet.com</a>
            </p>
            <div className="social-links">
              <a href="https://www.facebook.com" className="social-link" target="_blank" rel="noopener noreferrer">
                <img src={socialIcons.facebook} alt="Facebook" className="social-icon" />
              </a>
              <a href="https://www.instagram.com" className="social-link" target="_blank" rel="noopener noreferrer">
                <img src={socialIcons.instagram} alt="Instagram" className="social-icon" />
              </a>
              <a href="https://www.twitter.com" className="social-link" target="_blank" rel="noopener noreferrer">
                <img src={socialIcons.twitter} alt="Twitter" className="social-icon" />
              </a>
            </div>
          </div>
          
          <div className="footer-column">
            <h3>Opening Hours</h3>
            <div className="footer-hours">
              <p><span className="day">Monday - Friday</span><br />Lunch: 11:45am - 2:15pm<br />Dinner: 5:30pm - 9:30pm</p>
              <p><span className="day">Saturday</span><br />Lunch: 11:45am - 2:15pm<br />Dinner: 6:00pm - 9:30pm</p>
              <p><span className="day">Sunday</span><br />Lunch: 11:45am - 3:00pm<br />Dinner: 6:00pm - 9:00pm</p>
            </div>
          </div>
          
          <div className="footer-column">
            <h3>Quick Links</h3>
            <p><a href="#menus">Menus</a></p>
            <p><a href="#whats-on">What's On</a></p>
            <p><a href="#private-dining">Private Dining</a></p>
            <p><a href="#about">About Us</a></p>
            <p><a href="#reviews">Reviews</a></p>
            <p><a href="#gift-vouchers">Gift Vouchers</a></p>
            <p><a href="#contact">Contact</a></p>
          </div>
          
          <div className="footer-column">
            <h3>Newsletter</h3>
            <p>Subscribe to our newsletter to receive the latest updates and offers.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email address" className="newsletter-input" required />
              <button type="submit" className="newsletter-button">Subscribe</button>
            </form>
            <p>By subscribing you agree to receive marketing emails from Kaboul Gourmet.</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-logo">
            <img src={footerLogo} alt="Kaboul Gourmet" className="footer-logo-image" />
          </div>
          
          <div className="footer-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-conditions">Terms & Conditions</a>
            <a href="/cookie-policy">Cookie Policy</a>
          </div>
          
          <div className="copyright">
            © {new Date().getFullYear()} Kaboul Gourmet. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;