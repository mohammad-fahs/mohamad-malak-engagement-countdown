# Engagement Invitation Countdown - Design Guidelines

## Design Approach
**Reference-Based**: Drawing inspiration from elegant event invitation platforms (Paperless Post, Greenvelope) combined with Middle Eastern wedding aesthetic traditions. The design centers around showcasing the provided invitation card as the hero element with complementary countdown timer integration.

## Core Design Elements

### Typography
- **Primary Headings**: 'Cormorant Garamond' or 'Playfair Display' (serif, elegant) - 32-40px, semibold
- **Countdown Numbers**: 'Lora' or 'Cinzel' - 48-64px, bold for impact
- **Labels & Body**: 'Lato' or 'Montserrat' (sans-serif, clean) - 14-16px, regular
- **Arabic Text Support**: Ensure font stacking includes 'Cairo' or 'Tajawal' for proper rendering

### Color Palette (from invitation card)
- **Primary Burgundy**: #7D1F3C (main accents, countdown borders)
- **Deep Maroon**: #8B2E48 (decorative elements)
- **Cream/Beige**: #F5F1E8 (backgrounds, light sections)
- **Accent Gold**: #D4AF37 (subtle highlights, decorative flourishes)
- **Text**: #2C1810 (dark brown for readability on light backgrounds)

### Layout System
**Spacing**: Use Tailwind units of 4, 8, 12, 16, and 24 for consistent vertical rhythm
- Single-column centered layout (max-w-4xl)
- Invitation card: Full-width within container, maintaining aspect ratio
- Countdown positioned directly below card with 12-16 spacing units

### Component Structure

**Hero Section** (80vh minimum):
- Centered invitation card image at max-w-2xl, with subtle shadow (shadow-2xl)
- Ornamental corner flourishes in burgundy/gold echoing floral motifs
- Soft gradient background from cream to light beige

**Countdown Timer Component**:
- Four-column grid display (Days | Hours | Minutes | Seconds)
- Each unit in rounded bordered cards (border-2 border-burgundy, bg-cream)
- Large numbers (text-5xl) above small labels (text-sm uppercase tracking-wide)
- Subtle pulse animation on seconds unit only
- Decorative divider elements (• or ◆) between units

**Decorative Elements**:
- Floral corner ornaments (CSS borders or SVG flourishes) in burgundy
- Subtle arabesque pattern overlay (10% opacity) in background
- Horizontal decorative dividers above/below countdown using burgundy accent

**Footer Section**:
- Save-the-date reminder text in elegant serif
- Optional map/venue link (if applicable)
- WhatsApp share button styled with burgundy theme

### Images
**Primary Image**: The provided engagement invitation card (IMG_0500_1765228116324.png)
- Position: Hero section, centered
- Treatment: Clean drop shadow, subtle border in cream/gold
- No overlay effects - let the card design speak for itself

### Animations
- Countdown numbers: Smooth flip/fade transition every second
- On load: Gentle fade-in for invitation card (0.8s)
- Celebration mode: Burgundy and gold confetti burst when countdown reaches zero
- Minimal decorative pulse on floral corner elements

### Responsive Behavior
- Desktop (lg): Invitation card at 700px max-width, countdown units 150px wide
- Tablet (md): Invitation scales to 85% container, countdown units stack 2x2 grid
- Mobile (base): Full-width card with 4 padding, countdown in single row (smaller text)

### Accessibility
- High contrast between burgundy and cream backgrounds
- Clear numerical hierarchy in countdown
- Touch-friendly spacing for mobile share buttons
- Arabic text properly aligned (RTL support if needed)

### Special Features
- Dynamic countdown updating every second via JavaScript
- Event completion state: Replace countdown with celebratory message + confetti
- Optional: Subtle background music toggle (traditional instrumental, muted by default)
- Save to calendar functionality with burgundy CTA button