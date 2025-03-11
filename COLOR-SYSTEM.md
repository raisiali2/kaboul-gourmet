# Kaboul Gourmet - Color System

This document outlines the color system for the Kaboul Gourmet website, based on Galvin's color palette.

## Color Variables

The color system is implemented through CSS variables, defined in `src/styles/variables.css`. These variables provide a consistent color palette across the entire application.

```css
:root {
  /* Primary Colors */
  --color-dark: #1a1e25;       /* Dark blue/black for text and dark backgrounds */
  --color-gold: #af905c;       /* Primary gold accent color */
  --color-light-gold: #d9cdb8; /* Lighter gold for subtle accents */
  
  /* Neutral Colors */
  --color-gray: #666666;       /* Gray for secondary text */
  --color-light-gray: #f9f9f9; /* Light gray for backgrounds and hover states */
  --color-off-white: #f5f5f5;  /* Off-white for subtle backgrounds */
  --color-white: #ffffff;      /* Pure white */
  
  /* Functional Colors */
  --color-black: #000000;      /* Pure black for certain text elements */
  --color-overlay: rgba(0, 0, 0, 0.5); /* Dark overlay for modals and menus */
  --color-shadow: rgba(0, 0, 0, 0.1);  /* Shadow color */
  
  /* Call-to-action Variations */
  --color-gold-hover: #9a7f52; /* Darker gold for hover states */
  --color-gold-light: #bfa87a; /* Lighter gold variation */
  
  /* Status Colors */
  --color-success: #4a8c71;    /* Green for success messages */
  --color-error: #b54a55;      /* Red for error messages */
  --color-warning: #d4af37;    /* Amber for warnings */
  
  /* Border Colors */
  --color-border-light: #eeeeee; /* Light border color */
}
```

## Implementation

The color system is implemented through:

1. **Central Definition**: All color variables are defined in `variables.css`
2. **Import System**: Each CSS file imports these variables
3. **Consistent Usage**: Colors are referenced using variables instead of hex values

## Usage Guidelines

### Primary Colors

- **Dark Color (`--color-dark`)**: Use for text, dark backgrounds, and primary UI elements
- **Gold (`--color-gold`)**: Use for accents, buttons, links, and highlighting
- **Light Gold (`--color-light-gold`)**: Use for subtle accents and secondary elements

### Text Colors

- Primary Text: `--color-dark`
- Secondary/Muted Text: `--color-gray`
- Inverted Text (on dark backgrounds): `--color-white`
- Accent Text: `--color-gold`

### Background Colors

- Primary Background: `--color-white`
- Secondary/Alternate Background: `--color-off-white` or `--color-light-gray`
- Dark Background: `--color-dark`
- Accent Background: `--color-gold`

### Border Colors

- Primary Border: `--color-border-light`
- Accent Border: `--color-gold`
- Dark Border: `--color-dark`

### Shadows and Overlays

- Box Shadows: `--color-shadow`
- Overlays (for modals, dropdowns): `--color-overlay`

## Element-Specific Colors

### Buttons

```css
/* Primary Button */
.btn-primary {
  background-color: var(--color-gold);
  color: var(--color-white);
}

.btn-primary:hover {
  background-color: var(--color-gold-hover);
}

/* Secondary Button */
.btn-secondary {
  background-color: transparent;
  color: var(--color-gold);
  border: 1px solid var(--color-gold);
}

.btn-secondary:hover {
  background-color: var(--color-gold);
  color: var(--color-white);
}
```

### Links

```css
a {
  color: var(--color-gold);
}

a:hover {
  color: var(--color-dark);
}
```

### Section Dividers

```css
.divider {
  width: 60px;
  height: 2px;
  background-color: var(--color-gold);
  margin: 0 auto 20px;
}
```

## Accessibility

The color combinations have been chosen for optimal contrast:

- Dark text (#1a1e25) on white/light backgrounds - High contrast (7:1 ratio)
- White text on dark backgrounds (#1a1e25) - High contrast (15:1 ratio)
- Gold accents (#af905c) are used thoughtfully to highlight without overwhelming

## Extending the System

When adding new colors to the system:

1. Add the new color variable to `variables.css`
2. Include a comment describing its purpose
3. Use descriptive names (e.g., `--color-success` instead of `--color-green`)
4. Keep the naming convention consistent

## File Organization

The color system is organized across the following files:

- **variables.css**: Defines all color variables
- **typography.css**: Imports variables.css and applies colors to typography
- **Component CSS files**: Import variables.css and use color variables

---

This color system is designed to match Galvin's website styling while providing a flexible and consistent approach to color across the entire Kaboul Gourmet website. 