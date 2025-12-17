# Design Guidelines: National-Level Hackathon Platform

## Design Approach
**System-Based Enterprise Design** - Drawing from Linear's dashboard density, Devfolio's marketplace patterns, and HackerEarth's operational workflows. This is NOT a marketing site - it's a production-grade platform for managing national hackathons.

## Typography System
- **Primary Font**: Inter or similar (professional, readable at all sizes)
- **Headings**: Font weights 600-700, sizes ranging from text-3xl (dashboards) to text-5xl (landing hero only)
- **Body**: Font weight 400-500, text-sm to text-base for dense information displays
- **Data/Numbers**: Tabular numbers, monospace for codes/IDs

## Layout & Spacing
**Tailwind Units**: Consistently use 2, 4, 6, 8, 12, 16, 20 (p-2, m-4, gap-6, space-y-8, etc.)
- **Page Containers**: max-w-7xl for dashboards, max-w-6xl for content
- **Section Padding**: py-6 to py-12 (avoid excessive whitespace - this is a data-dense platform)
- **Grid Systems**: Use dense grids - hackathon cards in 3-4 columns, not 2

## Component Architecture

### Role-Based Navigation
- Persistent sidebar (left) for dashboard pages showing role-specific menu items
- Top navigation with user profile, notifications, role switcher
- Breadcrumbs for deep navigation paths

### Hackathon Marketplace (Explore Page)
- Advanced filter sidebar (left): Status, Category, Prize Range, Date, Location, Skills
- Grid layout with hackathon cards showing: Banner image, Title, Organizer logo, Prize, Timeline, Registration status
- Search bar with autocomplete
- Sort options: Trending, Prize Amount, Deadline, New

### Dashboard Layouts (All Roles)
- Stats cards grid (4 columns) showing key metrics
- Quick actions panel
- Recent activity feed
- Data tables with pagination for lists
- Charts/graphs for analytics sections

### Submission Systems
- Multi-step forms with progress indicators
- File upload zones with drag-drop and preview
- GitHub integration input with validation
- Video embed preview
- Submission history timeline

### Review/Scoring Interface (Judges)
- Split view: Submission details (left) + Scoring panel (right)
- Criteria sliders with numerical input
- Comment textarea for each criterion
- Overall feedback section
- Navigation between submissions

### Admin Panel
- Dense table layouts for management
- Inline editing capabilities
- Bulk action toolbars
- Modal-based creation flows
- Real-time status indicators

## Visual Hierarchy
- **Primary Actions**: Prominent buttons (bg-blue-600, text-white)
- **Secondary Actions**: Outline buttons
- **Status Badges**: Small, color-coded (green=live, yellow=upcoming, gray=ended)
- **Information Density**: Tight line-height for data displays, generous for marketing content

## Images
**Strategic Placement**:
- Landing hero: Full-width banner with hackathon visuals (1920x600px)
- Hackathon cards: 16:9 cover images (400x225px)
- University/Company logos: 100x100px squares in appropriate contexts
- Partner logos: Grayscale on light backgrounds
- Event detail pages: Full-width hero + gallery thumbnails

**No Images In**: Dashboards (icon-based), admin panels, scoring interfaces, submission reviews

## Interaction Patterns
- Hover states: Subtle elevation on cards (shadow-md to shadow-lg)
- Active states: Slight scale or border highlight
- Loading states: Skeleton screens for data tables
- Empty states: Illustrated with call-to-action
- Minimal animations - focus on instant feedback

## Platform-Specific Requirements
- **No marketing fluff** - every section serves operational purpose
- **Data tables everywhere** - participants list, submissions, scores, analytics
- **Form-heavy** - hackathon creation, team setup, submissions need multi-step flows
- **Real-time elements** - countdown timers, live leaderboards, notification badges
- **Role indicators** - clear visual distinction between participant/judge/admin views
- **Lifecycle stages** - visual progress bars showing hackathon phases

This is a working platform, not a portfolio. Prioritize information density, operational clarity, and professional credibility over decorative elements.