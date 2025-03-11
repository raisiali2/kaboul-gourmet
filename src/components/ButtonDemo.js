import React from 'react';
import Button from './Button';
import './ButtonDemo.css';

const ButtonDemo = () => {
  return (
    <section className="button-demo">
      <div className="container">
        <h2>Button Variants</h2>
        <hr />
        
        <div className="button-row">
          <div className="button-example">
            <h3>Primary Button</h3>
            <Button variant="primary">Primary Button</Button>
          </div>
          
          <div className="button-example">
            <h3>Secondary Button</h3>
            <Button variant="secondary">Secondary Button</Button>
          </div>
          
          <div className="button-example">
            <h3>Dark Button</h3>
            <Button variant="dark">Dark Button</Button>
          </div>
        </div>
        
        <div className="button-row">
          <div className="button-example">
            <h3>White Button</h3>
            <div className="dark-background">
              <Button variant="white">White Button</Button>
            </div>
          </div>
          
          <div className="button-example">
            <h3>Text Button</h3>
            <Button variant="text">Text Button</Button>
          </div>
        </div>
        
        <h2 className="mt-lg">Button Sizes</h2>
        <hr />
        
        <div className="button-row">
          <div className="button-example">
            <h3>Small</h3>
            <Button variant="primary" size="small">Small Button</Button>
          </div>
          
          <div className="button-example">
            <h3>Medium (Default)</h3>
            <Button variant="primary">Medium Button</Button>
          </div>
          
          <div className="button-example">
            <h3>Large</h3>
            <Button variant="primary" size="large">Large Button</Button>
          </div>
        </div>
        
        <h2 className="mt-lg">Full Width Button</h2>
        <hr />
        
        <div className="button-example full-width-example">
          <Button variant="primary" fullWidth>Full Width Button</Button>
        </div>
        
        <h2 className="mt-lg">Link Buttons</h2>
        <hr />
        
        <div className="button-row">
          <div className="button-example">
            <h3>Primary Link</h3>
            <Button variant="primary" href="#primary-link">Primary Link</Button>
          </div>
          
          <div className="button-example">
            <h3>Secondary Link</h3>
            <Button variant="secondary" href="#secondary-link">Secondary Link</Button>
          </div>
          
          <div className="button-example">
            <h3>Text Link</h3>
            <Button variant="text" href="#text-link">Text Link</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ButtonDemo; 