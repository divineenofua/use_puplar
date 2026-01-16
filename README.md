# use_puplar
A sleek user management dashboard with React, TypeScript, Vite, and Zustand. It inludes features and functionalities such as Search, filter, css animations and a dark theme with glassmorphism effects.
# React + TypeScript + Vite

## Live Demo
[View Live Demo here](https://use-puplar.vercel.app/)



### Core Functionality
 - Fetch and display users from JSONPlaceholder API
 - Real-time search functionality (filter by name)
 - City-based filtering
 - Individual user detail pages
 - Display user posts on detail page
 - Responsive design (mobile, tablet, desktop)
 - Loading states and error handling

### UI/UX Highlights

- Modern dark theme with gradient accents
- Glassmorphism effects and backdrop blur
- Smooth transitions and hover effects
- Fully responsive grid layouts
- Clear visual feedback for all interactions
- Statistics dashboard with data visualization

### Tech Stack

- Framework: React 18+  
- Language: TypeScript  
- State Management: Zustand
- Routing: React Router v6
- Styling: Tailwind CSS
- API: JSONPlaceholder REST API

### Installation
#### Prerequisites
-Node.js 16+ and npm

###Setup Steps

``` # Clone the repository
git clone <your-repo-url>
cd use_puplar

# Install dependencies
npm install

# Install required packages
npm install zustand react-router-dom 

# Install dev dependencies
npm install -D @types/react-router-dom

# Start development server
npm run dev
 ```
### State Management (Zustand)
#### Why Zustand?
#### Advantages:

- No provider wrapper needed
- Minimal setup compared to Redux.
- Excellent TypeScript support
- Great for async operations
- Lightweight (just a few KBs), with no extra dependencies.


#### Why not Context API:

- Context requires provider nesting
- All consumers re-render on any state change
- More verbose setup
- Harder to optimize

## Design System
#### Color Palette

- Background: Gray-900 to Gray-800 gradient
- Cards: Gray-800/50 with backdrop blur
- Primary: Blue-500
- Secondary: Cyan-500
- Accent: Purple-500, Green-500
  
####  Glassmorphism Effect

 ```
backdrop-blur-xl
bg-gray-800/50
border border-gray-700/50
 ```

#### Performance Optimizations
- Memoized Calculations: City lists and statistics
- Selective Fetching: Only fetch data when needed
- Optimized Re-renders: Zustand selective updates

  Architecture Decisions
1. Zustand over Context API

- Better performance with selective re-renders
- Simpler API with less boilerplate
- Perfect for this use case (API calls + filtering)

2. Component Structure

- Layout: Persistent sidebar with Outlet
- Pages: Route-level components
- Components: Reusable UI pieces

3. Styling Approach

- Tailwind CSS for rapid development
- Dark theme with glassmorphism

4. TypeScript Strict Mode

- Full type safety
- Better IDE support
- Catch errors at compile time
  
## Screenshots
<img width="581" height="292" alt="Use_puplar Dashboard1" src="https://github.com/user-attachments/assets/d8f2cba4-69ac-41e8-aa99-9d890d789319" />
<img width="575" height="278" alt="Use_puplar Dashboard2" src="https://github.com/user-attachments/assets/d65b8056-bead-4218-9169-bbb501382e63" />

#### Author
[ENOFUA ETUE DIVINE](https://github.com/divineenofua)

- First item
