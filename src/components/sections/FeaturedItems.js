import React from 'react';
import './FeaturedItems.css';

const FeaturedItems = () => {
  return (
    <section className="featured-items-section">
      <div className="container">
        <h2>SEASONAL SPECIALTIES</h2>
        <hr className="divider" />
        <h3>Experience our chef's seasonal creations</h3>
        
        <div className="featured-grid">
          <div className="featured-card">
            <div className="card-image" style={{backgroundColor: '#e9d9c2'}}>
              <div className="image-overlay">
                <a href="#menus" className="overlay-link">VIEW MENU</a>
              </div>
            </div>
            <div className="card-content">
              <h4>KABULI PULAO</h4>
              <p>Traditional Afghan rice dish with tender lamb, raisins, and carrots, topped with pistachios</p>
              <div className="price">£19</div>
            </div>
          </div>
          
          <div className="featured-card">
            <div className="card-image" style={{backgroundColor: '#d5c5b2'}}>
              <div className="image-overlay">
                <a href="#menus" className="overlay-link">VIEW MENU</a>
              </div>
            </div>
            <div className="card-content">
              <h4>MANTOO</h4>
              <p>Delicate dumplings filled with spiced minced lamb, topped with a tomato and yogurt sauce</p>
              <div className="price">£16</div>
            </div>
          </div>
          
          <div className="featured-card">
            <div className="card-image" style={{backgroundColor: '#c2b2a5'}}>
              <div className="image-overlay">
                <a href="#menus" className="overlay-link">VIEW MENU</a>
              </div>
            </div>
            <div className="card-content">
              <h4>CHAPLI KEBAB</h4>
              <p>Spiced ground beef patties with pomegranate seeds, served with fresh naan and chutneys</p>
              <div className="price">£22</div>
            </div>
          </div>
        </div>
        
        <div className="featured-cta">
          <a href="#book" className="featured-button primary">BOOK A TABLE</a>
          <a href="#menus" className="featured-button secondary">VIEW ALL MENUS</a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems; 