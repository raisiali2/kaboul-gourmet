import React from 'react';
import './Seasonal.css';

const Seasonal = () => {
  return (
    <section className="seasonal-section">
      <div className="container">
        <h2>SEASONAL SPECIALTIES</h2>
        <hr />
        <h3>Experience our chef's seasonal creations</h3>
        
        <div className="seasonal-grid">
          <div className="seasonal-item">
            <div className="seasonal-image">
              <div className="image-placeholder"></div>
              <div className="seasonal-overlay">
                <a href="#menu" className="btn-text">VIEW MENU</a>
              </div>
            </div>
            <div className="seasonal-content">
              <h4>SUMMER LAMB KABULI</h4>
              <p>Tender lamb marinated in Afghan spices, served with saffron rice and seasonal vegetables</p>
              <div className="price">£29</div>
            </div>
          </div>

          <div className="seasonal-item">
            <div className="seasonal-image">
              <div className="image-placeholder"></div>
              <div className="seasonal-overlay">
                <a href="#menu" className="btn-text">VIEW MENU</a>
              </div>
            </div>
            <div className="seasonal-content">
              <h4>MANTU DUMPLINGS</h4>
              <p>Handmade Afghan dumplings filled with spiced lamb, topped with yogurt and mint sauce</p>
              <div className="price">£24</div>
            </div>
          </div>

          <div className="seasonal-item">
            <div className="seasonal-image">
              <div className="image-placeholder"></div>
              <div className="seasonal-overlay">
                <a href="#menu" className="btn-text">VIEW MENU</a>
              </div>
            </div>
            <div className="seasonal-content">
              <h4>KABOUL SAFFRON FISH</h4>
              <p>Market fresh fish of the day, prepared with saffron-infused sauce and aromatic rice</p>
              <div className="price">£28</div>
            </div>
          </div>
        </div>
        
        <div className="seasonal-cta">
          <a href="#book" className="btn-primary">BOOK A TABLE</a>
          <a href="#menus" className="btn-secondary">VIEW ALL MENUS</a>
        </div>
      </div>
    </section>
  );
};

export default Seasonal; 