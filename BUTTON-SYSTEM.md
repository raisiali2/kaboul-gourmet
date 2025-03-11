# Kaboul Gourmet - Button System

This document outlines the button system for the Kaboul Gourmet website, based on Galvin's design.

## Button Features

The button system implements Galvin's exact styling with:

- **3px Borders** for all button variants
- **Smooth Hover Effects** with transitions
- **Consistent Typography** using the brand font
- **Multiple Variants** for different use cases
- **Responsive Sizing** that adjusts for screen size

## Button Component

A reusable React Button component is available at `src/components/Button.js`. This component offers:

```jsx
import Button from './components/Button';

// Basic usage
<Button variant="primary">Primary Button</Button>

// With different variants
<Button variant="secondary">Secondary Button</Button>
<Button variant="dark">Dark Button</Button>
<Button variant="white">White Button</Button>
<Button variant="text">Text Button</Button>

// With different sizes
<Button variant="primary" size="small">Small Button</Button>
<Button variant="primary" size="medium">Medium Button</Button> {/* default */}
<Button variant="primary" size="large">Large Button</Button>

// Full width button
<Button variant="primary" fullWidth>Full Width Button</Button>

// As a link
<Button variant="primary" href="/destination">Link Button</Button>

// With click handler
<Button variant="primary" onClick={handleClick}>Click Me</Button>
```

## Button Variants

### Primary Button

```css
.btn-primary {
  background-color: var(--color-gold);
  color: var(--color-white);
  border-color: var(--color-gold);
}

.btn-primary:hover {
  background-color: transparent;
  color: var(--color-gold);
  border-color: var(--color-gold);
}
```

### Secondary Button

```css
.btn-secondary {
  background-color: transparent;
  color: var(--color-gold);
  border-color: var(--color-gold);
}

.btn-secondary:hover {
  background-color: var(--color-gold);
  color: var(--color-white);
  border-color: var(--color-gold);
}
```

### Dark Button

```css
.btn-dark {
  background-color: var(--color-dark);
  color: var(--color-white);
  border-color: var(--color-dark);
}

.btn-dark:hover {
  background-color: transparent;
  color: var(--color-dark);
  border-color: var(--color-dark);
}
```

### White Button

```css
.btn-white {
  background-color: var(--color-white);
  color: var(--color-gold);
  border-color: var(--color-white);
}

.btn-white:hover {
  background-color: transparent;
  color: var(--color-white);
  border-color: var(--color-white);
}
```

### Text Button

```css
.btn-text {
  background-color: transparent;
  color: var(--color-gold);
  border: none;
  padding: 0;
  min-width: auto;
  position: relative;
  overflow: hidden;
}

.btn-text::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: var(--color-gold);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.btn-text:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
```

## Button Sizes

### Small Button

```css
.btn-small {
  font-size: 0.75rem;
  padding: calc(var(--button-padding-v) * 0.8 - 3px) calc(var(--button-padding-h) * 0.8 - 3px);
  min-width: 120px;
}
```

### Medium Button (Default)

```css
.btn {
  font-size: 0.875rem;
  padding: calc(var(--button-padding-v) - 3px) calc(var(--button-padding-h) - 3px);
  min-width: 160px;
}
```

### Large Button

```css
.btn-large {
  padding: calc(var(--button-padding-v) * 1.2 - 3px) calc(var(--button-padding-h) * 1.2 - 3px);
  font-size: 0.9375rem;
  min-width: 180px;
}
```

## Responsive Design

The button system is responsive:

- On smaller screens, padding and font size automatically adjust
- Min-width values decrease to ensure buttons fit on mobile devices
- Line heights adjust proportionally

```css
@media (max-width: 768px) {
  .btn {
    font-size: 0.8125rem;
    min-width: 140px;
    padding: calc(var(--button-padding-v) * 0.9 - 3px) calc(var(--button-padding-h) * 0.9 - 3px);
  }
}

@media (max-width: 576px) {
  .btn {
    font-size: 0.75rem;
    min-width: 120px;
    padding: calc(var(--button-padding-v) * 0.8 - 3px) calc(var(--button-padding-h) * 0.8 - 3px);
    letter-spacing: 1.5px;
  }
}
```

## Accessibility

The button styling ensures:

- High contrast between text and background colors
- Focus states for keyboard navigation
- Appropriate hover transitions
- Readable text with proper letter spacing

## Implementation

For existing button elements that don't use the Button component, global CSS has been updated to match the component styling. Legacy selectors for backward compatibility:

- `.btn-primary`
- `.btn-secondary` 
- `.btn-text`
- `.slide-button`
- `.book-btn`
- Form buttons (`button[type="submit"]`)

## Best Practices

1. **Use the Button component** for all new buttons
2. **Choose appropriate variants** based on context and hierarchy
3. **Keep button text concise** - 1-3 words is ideal
4. **Maintain consistent spacing** around buttons
5. **Use primary buttons** for main calls to action
6. **Use secondary buttons** for alternative options

---

This button system is designed to match Galvin's exact styling while providing flexibility and consistency across the entire Kaboul Gourmet website. 