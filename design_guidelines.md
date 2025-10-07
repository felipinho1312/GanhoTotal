# Design Guidelines: Gestor de Ganhos (Financial Manager)

## Design Approach
**System-Based Approach** using Bootstrap 5 framework with Material Design influences for a data-focused financial dashboard application in Brazilian Portuguese.

**Core Principles:**
- Data clarity and accessibility first
- Clean, professional financial interface
- Responsive design for mobile and desktop use
- Consistent visual language across all components

---

## Color Palette

### Light Mode
- **Primary Brand:** 204 100% 50% (vibrant blue #007bff)
- **Secondary Accent:** 195 100% 50% (cyan #00bfff)
- **Background:** 220 14% 96% (#f8f9fa light gray)
- **Card Background:** 0 0% 100% (white)
- **Text:** 0 0% 20% (dark gray #333)

### Dark Mode
- **Background:** 0 0% 7% (#121212)
- **Card Background:** 0 0% 12% (#1e1e1e)
- **Text:** 0 0% 87% (light gray #ddd)
- **Primary/Secondary:** Same as light mode for consistency

### Gradients
- **Header/Navigation:** Linear gradient from Primary to Secondary (left to right)
- **Login Screen:** Full viewport gradient background

---

## Typography

**Font Family:** Roboto from Google Fonts (400, 500 weights)

**Hierarchy:**
- **H2 Headings:** 500 weight for page titles (Login, Dashboard sections)
- **H3 Headings:** Bold for metric displays (R$ values in cards)
- **H5 Card Titles:** 500 weight with icon prefixes
- **Body Text:** 400 weight for forms, tables, labels
- **Form Labels:** Standard weight, slightly smaller size

---

## Layout System

**Spacing Primitives:** Bootstrap spacing utilities
- Container: Standard Bootstrap container with fluid option for navbar
- Card Padding: 2rem (p-4 equivalent)
- Section Margins: mb-4 (1.5rem) between major sections
- Row Gutters: Default Bootstrap gutter system
- Form Spacing: mb-3 (1rem) between form groups

**Grid System:**
- Dashboard Cards: 3-column layout on desktop (col-md-4)
- Charts: 2-column layout (col-md-6)
- Forms: Responsive columns (col-md-3, col-md-4 mix)
- Mobile: Full-width single column (col-12 default)

---

## Component Library

### Navigation
- **Navbar:** Fixed top, gradient background, white text
- **Brand:** Left-aligned "Gestor de Ganhos"
- **Actions:** Right-aligned theme toggle (moon/sun icon) + logout button

### Cards
- **Style:** Borderless with subtle shadow (0 4px 10px rgba(0,0,0,0.1))
- **Hover:** Lift effect (translateY -5px)
- **Variants:** 
  - Metric cards with icons (wallet, arrows up/down)
  - Form cards for data entry
  - Chart container cards

### Forms
- **Input Fields:** Bootstrap form-control styling
- **Date Inputs:** Type="date" with consistent styling
- **Number Inputs:** Step 0.01 for decimal precision
- **Select Dropdowns:** Bootstrap form-select
- **Buttons:** Primary blue, danger red (logout), light (theme toggle)
- **Layout:** Horizontal row layout with aligned submit buttons

### Data Display
- **Table:** Bootstrap striped table with headers
- **Columns:** Data, Valor, Descrição, Tipo
- **Chart Containers:** Fixed height 300px with Chart.js responsive canvas

### Feedback & Interactions
- **Money Animation:** Falling money emoji (💰) on balance card with rotation
- **Transitions:** 0.3s for background/color theme changes
- **Entrance:** Fade-in animation (1s ease-in-out) for login card

---

## Visual Enhancements

### Iconography
**Font Awesome 6.5.1** for all icons:
- fa-wallet (balance)
- fa-arrow-up (gains)
- fa-arrow-down (losses)
- fa-chart-line (time chart)
- fa-chart-bar (comparison chart)
- fa-moon/fa-sun (theme toggle)

### Charts
**Chart.js 4.4.1** implementation:
- **Line Chart:** Balance over time with smooth curves
- **Bar Chart:** Gains vs Losses comparison
- **Colors:** Use primary/secondary brand colors
- **Responsive:** Maintain aspect ratio in containers

### Dark Mode
- Toggle button in navbar with icon swap
- Smooth 0.3s transition for all color changes
- Persist preference in localStorage
- Affect all cards, backgrounds, text colors

---

## Page-Specific Guidelines

### Login Page
- **Layout:** Centered vertically and horizontally (100vh)
- **Card:** Max-width 400px, rounded corners (1rem), elevated shadow
- **Background:** Full gradient covering viewport
- **Animation:** Fade-in entrance effect

### Dashboard
- **Top Metrics:** 3 cards showcasing total balance, gains, losses
- **Entry Form:** Single card with horizontal row layout
- **Filters:** Card with date range and type dropdown
- **Data Table:** Scrollable table in card container
- **Charts:** Side-by-side visualization cards

### Accessibility
- Consistent dark mode across all inputs and form fields
- High contrast text on colored backgrounds
- Keyboard-accessible form controls
- Portuguese language labels and content throughout