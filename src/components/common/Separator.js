import React from 'react';
import './Separator.css';

/**
 * Separator component - Creates elegant dividers matching Galvin's design
 * 
 * @param {Object} props
 * @param {string} props.variant - 'gold', 'light', 'dark', 'small', 'centered', etc.
 * @param {string} props.className - Additional CSS classes
 * @param {number} props.marginTop - Custom top margin
 * @param {number} props.marginBottom - Custom bottom margin
 * @param {boolean} props.animated - Whether separator should animate in
 */
const Separator = ({ 
  variant = 'gold', 
  className = '', 
  marginTop,
  marginBottom,
  animated = true
}) => {
  // Build class names
  const classes = [
    'separator',
    `separator-${variant}`,
    animated ? 'separator-animated' : '',
    className
  ].filter(Boolean).join(' ');
  
  // Apply custom styles if provided
  const style = {};
  if (marginTop !== undefined) style.marginTop = `${marginTop}px`;
  if (marginBottom !== undefined) style.marginBottom = `${marginBottom}px`;
  
  return (
    <div className={classes} style={style}>
      <span className="separator-inner"></span>
    </div>
  );
};

export default Separator; 