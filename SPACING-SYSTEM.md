# Kaboul Gourmet - Spacing System

This document outlines the spacing system for the Kaboul Gourmet website, based on Galvin's layout and design principles.

## Spacing Variables

The spacing system is implemented through CSS variables, defined in `src/styles/variables.css`. These variables provide a consistent spacing approach across the entire application.

```css
/* Base spacing units */
--space-unit: 8px;            /* Base spacing unit (half of standard 16px) */

/* Standard spacing values */
--space-xxs: calc(var(--space-unit) * 0.5);   /* 4px - Extra tiny spacing */
--space-xs: var(--space-unit);                /* 8px - Tiny spacing */
--space-sm: calc(var(--space-unit) * 2);      /* 16px - Small spacing */
--space-md: calc(var(--space-unit) * 3);      /* 24px - Medium spacing */
--space-lg: calc(var(--space-unit) * 4);      /* 32px - Large spacing */
--space-xl: calc(var(--space-unit) * 6);      /* 48px - Extra large spacing */
--space-xxl: calc(var(--space-unit) * 8);     /* 64px - XXL spacing */

/* Section spacing - Galvin uses 70px for section padding */
--section-padding: calc(var(--space-unit) * 8.75);   /* 70px - Standard section padding */
--section-padding-sm: calc(var(--space-unit) * 6.25); /* 50px - Smaller section padding */
--section-padding-xs: calc(var(--space-unit) * 5);    /* 40px - Extra small section padding */
```

## Implementation

The spacing system follows these principles:

1. **Base Unit**: Uses 8px as the base unit for a harmonious 8-point grid system
2. **Consistent Scaling**: Spacing increases in logical multiples of the base unit
3. **Semantic Variables**: Spaces are named according to their size, not their function
4. **Responsive Adaptation**: Spacing values adjust gracefully on smaller screens

## Usage Guidelines

### Section Spacing

- **Standard Sections**: Use `var(--section-padding)` (70px) for top and bottom padding
- **Smaller Devices**: Use `var(--section-padding-sm)` (50px) for tablets
- **Mobile Devices**: Use `var(--section-padding-xs)` (40px) for phones

Example:
```css
section {
  padding: var(--section-padding) 0;
}

@media (max-width: 768px) {
  section {
    padding: var(--section-padding-sm) 0;
  }
}

@media (max-width: 576px) {
  section {
    padding: var(--section-padding-xs) 0;
  }
}
```

### Component Spacing

- **Between Components**: Use `var(--component-margin)` (48px) for spacing between major components
- **Within Components**: Use `var(--component-padding)` (32px) for internal component padding

Example:
```css
.card {
  margin-bottom: var(--component-margin);
  padding: var(--component-padding);
}
```

### Element Spacing

- **Between Elements**: Use `var(--element-margin)` (24px) for spacing between UI elements
- **Within Elements**: Use `var(--element-padding)` (24px) for padding within elements

Example:
```css
.feature-item {
  margin-bottom: var(--element-margin);
}

.feature-item-icon {
  margin-right: var(--space-sm);
}
```

### Text Spacing

- **Paragraphs**: Use `var(--text-margin-bottom)` (24px) for spacing between paragraphs
- **Headings**: Use `var(--heading-margin-bottom)` (32px) for spacing after headings

Example:
```css
h2 {
  margin-bottom: var(--heading-margin-bottom);
}

p {
  margin-bottom: var(--text-margin-bottom);
}
```

### Container Padding

The system includes specific padding values for containers:

- **Large Screens**: `var(--container-padding-lg)` (40px)
- **Medium Screens**: `var(--container-padding-md)` (30px) 
- **Small Screens**: `var(--container-padding-sm)` (20px)
- **Extra Small Screens**: `var(--container-padding-xs)` (15px)

Example:
```css
.container {
  padding: 0 var(--container-padding-sm);
}

@media (max-width: 576px) {
  .container {
    padding: 0 var(--container-padding-xs);
  }
}
```

## Spacing Relationships

The spacing system is designed to create harmonious relationships:

1. **Typography Relationship**: Spacing values have a natural relationship with typography sizes
2. **Visual Hierarchy**: Larger elements get more space around them
3. **Content Density**: Related elements have less space between them than unrelated elements
4. **Breathing Room**: White space increases proportionally with screen size

## Best Practices

1. **Be Consistent**: Use the same spacing values for similar components
2. **Use Variables**: Always use CSS variables instead of hardcoded values
3. **Responsive Adjustments**: Decrease spacing on smaller screens proportionally
4. **Maintain Proportions**: Keep spacing proportional to the containing element
5. **Visual Balance**: Ensure that spacing creates a balanced look across the interface

---

This spacing system is designed to match Galvin's exact layout proportions while providing a flexible and consistent approach to spacing across the entire Kaboul Gourmet website. 