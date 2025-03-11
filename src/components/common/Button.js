import React from 'react';
import './Button.css';

/**
 * Button Component
 * 
 * A reusable button component with Galvin's styling
 * 
 * @param {string} variant - 'primary', 'secondary', or 'text'
 * @param {string} size - 'small', 'medium', or 'large'
 * @param {boolean} fullWidth - Whether the button should take full width
 * @param {function} onClick - Click handler function
 * @param {string} href - If provided, button will render as an anchor tag
 * @param {string} className - Additional CSS classes
 * @param {node} children - Button content
 */
const Button = ({ 
  variant = 'primary', 
  size = 'medium',
  fullWidth = false,
  onClick,
  href,
  className = '',
  children,
  ...rest
}) => {
  const buttonClass = `btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full-width' : ''} ${className}`;
  
  // If href is provided, render an anchor tag
  if (href) {
    return (
      <a 
        href={href} 
        className={buttonClass}
        {...rest}
      >
        {children}
      </a>
    );
  }
  
  // Otherwise render a button
  return (
    <button 
      className={buttonClass} 
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button; 