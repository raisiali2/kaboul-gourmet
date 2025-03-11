# Kaboul Gourmet React Website

This is a React-based website for Kaboul Gourmet, an authentic Afghan restaurant in London. The website showcases the restaurant's locations, menus, and services.

## Project Structure

The project is organized as follows:

- `src/`: Source code
  - `components/`: React components
    - `layout/`: Layout components (TopNav, SideMenu, Footer)
    - `sections/`: Page section components
  - `styles/`: CSS files
  - `App.js`: Main application component
  - `index.js`: Entry point

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Features

- Responsive design for all screen sizes
- Interactive side menu for locations
- Modern, elegant UI reflecting the restaurant's brand
- Sections for menus, events, private dining, and more

## Dependencies

- React 18
- React DOM
- React Scripts
- Web Vitals

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm start`

# Kaboul Gourmet - Custom Typography System

## Font Implementation

This project uses Galvin's custom fonts:

1. **RidleyGroteskRegular** - Sans-serif font for body text, navigation, and UI elements
2. **AdobeCaslonRegular** - Serif font for headings and display text

## Font Files

The font files are located in the `src/fonts` directory:

```
src/fonts/
├── AdobeCaslonRegular.ttf
├── AdobeCaslonRegular.woff
├── AdobeCaslonRegular.woff2
├── RidleyGroteskRegular.ttf
├── RidleyGroteskRegular.woff
└── RidleyGroteskRegular.woff2
```

> Note: The current font files are placeholders. For production, you'll need to acquire the actual font files and replace the placeholders.

## Typography Guidelines

### Font Usage

- **Headings (h1-h6)** use AdobeCaslonRegular
- **Body text** uses RidleyGroteskRegular
- **Navigation** uses RidleyGroteskRegular with uppercase and increased letter spacing
- **Buttons** use RidleyGroteskRegular with uppercase and medium weight

### Type Scale

The site uses a responsive type scale:

| Element | Base Size | Responsive Scaling |
|---------|-----------|-------------------|
| Display | 4.5rem (72px) | Scales down to 2.5rem on mobile |
| H1 | 3.5rem (56px) | Scales down to 2.2rem on mobile |
| H2 | 2.75rem (44px) | Scales down to 1.8rem on mobile |
| H3 | 2.25rem (36px) | Scales down to 1.5rem on mobile |
| H4 | 1.75rem (28px) | Scales down to 1.3rem on mobile |
| H5 | 1.5rem (24px) | Scales down to 1.125rem on mobile |
| H6 | 1.25rem (20px) | Scales down to 1rem on mobile |
| Body | 1rem (16px) | Remains 1rem on all devices |
| Small | 0.875rem (14px) | Remains consistent |
| XS | 0.75rem (12px) | Remains consistent |

### Color Palette

The typography uses Galvin's exact color palette:

- Dark text: `#1a1e25`
- Gold accent: `#af905c`
- Light gold: `#d9cdb8`
- Gray: `#666666`
- Light gray: `#f9f9f9`
- Off-white: `#f5f5f5`
- White: `#ffffff`

## Implementation

Typography is implemented through:

1. **Font face declarations** - Defined in `src/styles/typography.css`
2. **CSS Variables** - For consistent use of fonts, sizes, weights, and colors
3. **Responsive media queries** - For appropriate scaling on different devices

## Usage

To use the typography system in your components:

```css
/* For headings */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-serif);
}

/* For body text */
p, span, div {
  font-family: var(--font-sans);
}

/* For special display text */
.display {
  font-family: var(--font-serif);
  font-size: var(--fs-display);
  line-height: 1.1;
  letter-spacing: var(--ls-wide);
}

/* For gold accent text */
.text-gold {
  color: var(--color-gold);
}
```

## Specialized Components

The typography system includes specialized components:

1. **Section Headings** - Centered headings with gold divider
2. **Lead Paragraphs** - Slightly larger introductory text
3. **Elegance Headings** - Special heading style with gold text
4. **Navigation Links** - Uppercase text with extended letter spacing

---

This typography system is designed to match Galvin's website styling while providing a flexible and consistent approach to text across the entire Kaboul Gourmet website.

## Color System

The website uses a comprehensive color system based on Galvin's exact color palette. This ensures visual consistency across all components and sections.

### Key Features

- **Centralized Variables**: All colors are defined in `src/styles/variables.css`
- **Semantic Color Names**: Colors have meaningful names related to their purpose
- **Consistent Application**: The same colors are used for similar elements across the site
- **Responsive Adaptation**: Colors maintain proper contrast at all screen sizes

### Primary Colors

- **Dark Blue/Black (`#1a1e25`)**: Used for text and dark backgrounds
- **Gold (`#af905c`)**: Primary accent color for interactive elements and highlights
- **Light Gold (`#d9cdb8`)**: Secondary accent for subtle highlights
- **White and Grays**: For backgrounds and supporting elements

### Usage Patterns

- Text uses the dark color on light backgrounds and white on dark backgrounds
- Interactive elements (buttons, links) use gold with appropriate hover states
- Section titles are often paired with gold divider lines
- Dark backgrounds use the exact dark color from the Galvin palette

For more detailed information, see [COLOR-SYSTEM.md](./COLOR-SYSTEM.md). 

## Spacing System

The website uses a standardized spacing system based on Galvin's exact layout proportions. This ensures consistent spacing throughout the entire website.

### Key Features

- **8-Point Grid System**: All spacing is based on multiples of 8px for visual harmony
- **Consistent Section Padding**: All sections have 70px padding (50px on tablets, 40px on mobile)
- **Standardized Margins**: Consistent margins between all elements and components
- **Responsive Scaling**: Spacing decreases proportionally on smaller screens
- **Variable-Based**: All spacing implemented through CSS variables for easy maintenance

### Usage Patterns

- Section padding is consistently 70px for top and bottom
- Container padding is 20px on the sides (less on smaller screens)
- Components maintain consistent internal spacing (padding) and external spacing (margins)
- Typography elements have standardized spacing between them
- UI elements like buttons and form controls use consistent padding

For more detailed information, see [SPACING-SYSTEM.md](./SPACING-SYSTEM.md). 

## Button System

The website uses a consistent button system based on Galvin's exact design, featuring 3px borders and distinctive hover effects.

### Key Features

- **3px Borders**: All buttons use 3px borders for a sophisticated look
- **Hover Effects**: Clean hover transitions between filled and outline states
- **Component-Based**: Reusable Button component with multiple variants
- **Standardized Styling**: Consistent appearance across the entire site
- **Responsive Design**: Buttons adapt to different screen sizes

### Button Variants

- **Primary Button**: Gold background with white text, reverses on hover
- **Secondary Button**: Gold outline with gold text, fills on hover
- **Dark Button**: Dark background with white text, reverses on hover
- **White Button**: White background with gold text, for dark backgrounds
- **Text Button**: Simple text with underline animation on hover

### Usage Examples

```jsx
<Button variant="primary">Book Now</Button>
<Button variant="secondary" size="large">View Menu</Button>
<Button variant="text" href="/more-info">Learn More</Button>
```

For more detailed information, see [BUTTON-SYSTEM.md](./BUTTON-SYSTEM.md). 