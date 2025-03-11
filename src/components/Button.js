import React from 'react';
import { motion } from 'framer-motion';
import './Button.css';

/**
 * Button Component
 * 
 * A reusable button component with Galvin's styling and smooth animations
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
  
  // Button hover animation
  const hoverAnimation = {
    scale: 1.05,
    transition: { duration: 0.2, ease: "easeOut" }
  };
  
  // Active (pressed) animation
  const tapAnimation = {
    scale: 0.98,
    y: 1,
    transition: { duration: 0.1, ease: "easeOut" }
  };
  
  // If href is provided, render an anchor tag
  if (href) {
    return (
      <motion.a 
        href={href} 
        className={buttonClass}
        whileHover={hoverAnimation}
        whileTap={tapAnimation}
        {...rest}
      >
        {children}
      </motion.a>
    );
  }
  
  // Otherwise render a button
  return (
    <motion.button 
      className={buttonClass} 
      onClick={onClick}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      {...rest}
    >
      {children}
    </motion.button>
  );
};

export default Button; 