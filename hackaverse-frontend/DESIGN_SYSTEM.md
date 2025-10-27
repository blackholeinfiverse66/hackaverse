# 🎨 HackaVerse Color Palette & Design System

## Primary Colors

### Cyan/Blue Gradient
```
from-cyan-500 to-blue-500
rgb(6, 182, 212) → rgb(59, 130, 246)
Usage: Primary buttons, active states, user messages
```

### Purple/Pink Gradient
```
from-purple-500 to-pink-500
rgb(168, 85, 247) → rgb(236, 72, 153)
Usage: Secondary buttons, AI messages, admin actions
```

### Gold/Yellow (Winners)
```
from-yellow-400 to-yellow-600
rgb(250, 204, 21) → rgb(202, 138, 4)
Usage: First place, success states, highlights
```

## Category Colors

### AI/ML - Cyan to Blue
```css
bg-gradient-to-r from-cyan-500 to-blue-500
Icon: 🤖
```

### Gaming - Purple to Pink
```css
bg-gradient-to-r from-purple-500 to-pink-500
Icon: 🎮
```

### Web3 - Yellow to Orange
```css
bg-gradient-to-r from-yellow-500 to-orange-500
Icon: ⛓️
```

### Open Innovation - Green to Teal
```css
bg-gradient-to-r from-green-500 to-teal-500
Icon: 💡
```

## Status Colors

### Success/Confirmed
```
Green: rgb(34, 197, 94)
Background: bg-green-500/20
Border: border-green-500/50
Text: text-green-300
```

### Warning/Pending
```
Yellow: rgb(234, 179, 8)
Background: bg-yellow-500/20
Border: border-yellow-500/50
Text: text-yellow-300
```

### Error/Alert
```
Red: rgb(239, 68, 68)
Background: bg-red-500/20
Border: border-red-500/50
Text: text-red-300
```

### Info/In-Progress
```
Blue: rgb(59, 130, 246)
Background: bg-blue-500/20
Border: border-blue-500/50
Text: text-blue-300
```

## Rank/Medal Colors

### 🥇 First Place
```
Gold Gradient: from-yellow-400 to-yellow-600
Shadow: 0 0 20px rgba(255, 215, 0, 0.5)
Border: border-gold-400
Background: Gold badge with star ⭐
```

### 🥈 Second Place
```
Silver Gradient: from-gray-300 to-gray-500
Shadow: 0 0 15px rgba(192, 192, 192, 0.5)
Border: border-gray-400
Background: Silver badge
```

### 🥉 Third Place
```
Bronze Gradient: from-orange-400 to-orange-600
Shadow: 0 0 15px rgba(255, 165, 0, 0.5)
Border: border-orange-400
Background: Bronze badge
```

### 4th Place and Below
```
Gradient: from-cyan-500 to-purple-500
Border: border-white/20
Hover: border-cyan-400/50
```

## Background System

### Base Gradients
```css
/* Main Background */
bg-gradient-to-br from-black via-gray-900 to-blue-900

/* Overlay Pulse */
bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-gold-500/10 animate-pulse

/* Mouse Follow Gradient */
radial-gradient(600px circle at [x]px [y]px, rgba(0,255,255,0.15), transparent 40%)
```

### Card Backgrounds
```css
/* Default */
bg-white/10 backdrop-blur-sm

/* Hover */
bg-white/20

/* Active/Selected */
bg-white/15 border-cyan-400
```

## Glass Morphism

### Standard Glass Card
```css
bg-white/10
backdrop-blur-sm
border border-white/20
rounded-lg
```

### Enhanced Glass (Hover)
```css
bg-white/20
border-cyan-400/50 or border-purple-400/50
shadow-[0_0_20px_rgba(0,255,255,0.2)]
```

## Glow Effects

### Cyan Glow (Primary)
```css
hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]
```

### Purple Glow (Secondary)
```css
hover:shadow-[0_0_20px_rgba(128,0,128,0.5)]
```

### Gold Glow (Success/Winner)
```css
shadow-[0_0_30px_rgba(255,215,0,0.3)]
```

### Multi-color Glow (Special)
```css
/* Gradient border with glow */
border-2 border-transparent
bg-gradient-to-r from-cyan-400 to-purple-400
```

## Text Colors

### Primary Text
```
text-white (rgb(255, 255, 255))
```

### Secondary Text
```
text-gray-300 (rgb(209, 213, 219))
```

### Tertiary Text
```
text-gray-400 (rgb(156, 163, 175))
```

### Gradient Text (Headings)
```css
bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400
bg-clip-text text-transparent
```

### Gradient Text (Winners)
```css
bg-gradient-to-r from-gold-400 via-cyan-400 to-purple-400
bg-clip-text text-transparent
```

## Border System

### Default Borders
```
border border-white/20
```

### Hover Borders
```
border-cyan-400/50 (primary)
border-purple-400/50 (secondary)
border-white/30 (general)
```

### Focus Borders
```
border-2 border-cyan-400 (inputs - name)
border-2 border-purple-400 (inputs - email)
```

### Status Borders
```
border-green-500/50 (success)
border-yellow-500/50 (warning)
border-red-500/50 (error)
```

### Accent Borders (Left)
```
border-l-4 border-transparent
hover:border-cyan-400
```

## Opacity System

### Backgrounds
- `/10` - Default cards (10%)
- `/20` - Hover states, inputs (20%)
- `/30` - Active elements (30%)
- `/5` - Subtle backgrounds (5%)

### Overlays
- `/10` - Ambient effects
- `/20` - Celebration overlays
- `/30` - Focus overlays

### Particles
- `/20` - Floating particles
- `/30` - Interactive elements

## Font System

### Font Family
```css
font-family: 'Inter', system-ui, sans-serif
```

### Heading Sizes
- `text-7xl` - Hero title (72px) - Mobile: text-4xl (36px)
- `text-5xl` - Page title (48px) - Mobile: text-3xl (30px)
- `text-4xl` - Section title (36px)
- `text-3xl` - Subsection (30px)
- `text-2xl` - Card title (24px)
- `text-xl` - Item title (20px)

### Body Sizes
- `text-lg` - Large body (18px)
- `text-base` - Default body (16px)
- `text-sm` - Small text (14px)
- `text-xs` - Extra small (12px)

### Font Weights
- `font-bold` - Headings (700)
- `font-semibold` - Buttons, emphasis (600)
- `font-normal` - Body text (400)

## Spacing System

### Padding
- `p-3` - Input padding (12px)
- `p-4` - Card padding small (16px)
- `p-6` - Card padding medium (24px)
- `p-8` - Card padding large (32px)

### Margins
- `mb-2` - Small gap (8px)
- `mb-4` - Medium gap (16px)
- `mb-6` - Large gap (24px)
- `mb-8` - Extra large gap (32px)
- `mb-12` - Section gap (48px)

### Gaps (Flex/Grid)
- `gap-2` - Tight (8px)
- `gap-3` - Small (12px)
- `gap-4` - Medium (16px)
- `gap-6` - Large (24px)
- `gap-8` - Extra large (32px)

## Border Radius

### Rounded Corners
- `rounded` - Small (4px)
- `rounded-lg` - Medium (8px) - Most cards
- `rounded-full` - Circle - Badges, avatars
- `rounded-xl` - Large (12px)

## Z-Index Layers

```
z-[-1] - Background effects
z-10 - Main content
z-50 - Notifications, toasts
z-[100] - Modals (if added)
```

## Animation Durations

### Quick (100-300ms)
```
transition-all duration-200 - Micro-interactions
transition-all duration-300 - Most hover effects
```

### Medium (300-500ms)
```
transition-all duration-300 - Buttons, cards
transition-all duration-500 - Complex transitions
```

### Slow (500ms-1s)
```
animation: fadeIn 0.8s
animation: scaleIn 0.5s
animation: slideIn 0.5s
```

### Continuous (3s-10s+)
```
animation: float 6s infinite
animation: gradient 3s infinite
animation: confetti 3-7s infinite
```

## Iconography

### Emoji Icons Used
- 🚀 - Launch, Register, Submit
- 🤖 - AI/ML, AI Mentor
- 🏆 - Winners, Competition
- 🎯 - Categories, Target
- 💡 - Innovation
- 🎮 - Gaming
- ⛓️ - Web3, Blockchain
- 👥 - Team, Members
- 📊 - Dashboard, Stats
- 🔔 - Notifications, Reminders
- ✅ - Success, Confirmed
- ❌ - Remove, Delete
- 🗑️ - Delete action
- 📧 - Email
- 📅 - Date
- 🌟 - Featured, Winner
- 🔍 - Search, Empty state
- 👨‍⚖️ - Judges

## Design Principles

1. **Luminous Accents** - Glowing effects on interactive elements
2. **Glass Morphism** - Semi-transparent cards with blur
3. **Gradient Everywhere** - Smooth color transitions
4. **Smooth Animations** - 300ms default timing
5. **Depth Through Shadows** - Layered glow effects
6. **Responsive by Default** - Mobile-first approach
7. **Dark Theme Base** - Black to blue gradient background
8. **High Contrast** - White text on dark backgrounds
9. **Playful Interactions** - Scale, rotate, glow on hover
10. **Consistent Spacing** - 4px base unit

---

*This design system ensures consistency across all HackaVerse components while maintaining visual excitement and interactivity.*
