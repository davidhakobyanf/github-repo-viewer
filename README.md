# GitHub Repo Viewer

A modern React + TypeScript application that fetches and displays GitHub user information, repositories, and organizations with a beautiful, responsive interface.

## 🚀 Features

### User Profile
- **User Search**: Enter any GitHub username to view their profile
- **Profile Information**: Avatar, name, username, bio, join date
- **Statistics**: Public repositories, followers, and following counts
- **GitHub Link**: Direct link to the user's GitHub profile

### Organizations
- **Organization List**: Display all organizations the user belongs to
- **Organization Details**: Avatar, name, description, and stats
- **Quick Access**: Direct links to organization GitHub pages

### Repositories
- **Repository Display**: Complete repository information including:
  - Name and description
  - Stars and forks count
  - Programming language
  - Last updated date
  - Repository topics
- **Top Repositories**: Featured section showing top 5 repositories by stars
- **Repository Links**: Direct links to GitHub repositories

### Filtering & Sorting
- **Language Filter**: Filter repositories by programming language
- **Multiple Sort Options**: Sort by stars, forks, name, or last updated
- **Sort Order**: Ascending or descending order
- **Clear Filters**: Reset all filters with one click

### Pagination
- **Responsive Pagination**: Adapts to screen size (3-7 pages visible)
- **Smart Navigation**: Previous/next buttons with ellipsis for large page counts
- **Configurable Page Size**: 15 repositories per page

### User Experience
- **Dark/Light Mode**: Toggle between themes with system preference detection
- **Loading States**: Beautiful skeleton loaders during data fetching
- **Error Handling**: User-friendly error messages for invalid users or network issues
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Elegant transitions and hover effects

### Performance
- **Smart Caching**: 5-minute cache to avoid unnecessary API calls
- **Optimized Rendering**: Efficient React patterns and memoization
- **Lazy Loading**: Components load as needed

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Build Tool**: Vite
- **API**: GitHub REST API
- **State Management**: React Hooks (useState, useEffect, useCallback)
- **HTTP Client**: Native Fetch API with caching layer

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── SearchInput.tsx  # User search input
│   ├── UserProfile.tsx  # User profile display
│   ├── OrganizationList.tsx # Organizations list
│   ├── RepoList.tsx     # Repository list with filters
│   ├── RepoItem.tsx     # Individual repository item
│   └── Pagination.tsx   # Responsive pagination
├── hooks/               # Custom React hooks
│   ├── useGitHubData.ts # Data fetching hooks
│   ├── useTheme.tsx     # Theme management
│   └── useResponsivePagination.ts # Pagination logic
├── services/            # API services
│   └── githubApi.ts     # GitHub API client with caching
├── types/               # TypeScript type definitions
│   └── index.ts         # All interface definitions
├── utils/               # Utility functions
│   └── repoUtils.ts     # Repository utilities and formatting
└── App.tsx              # Main application component
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd github-repo-viewer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5174` (or the port shown in your terminal)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Usage

1. **Search for a User**: Enter any GitHub username in the search field
2. **View Profile**: See the user's profile information and statistics
3. **Browse Organizations**: Check out organizations the user belongs to
4. **Explore Repositories**: 
   - View top repositories in the featured section
   - Use filters to find specific repositories
   - Sort by different criteria
   - Navigate through pages of repositories
5. **Switch Themes**: Use the theme toggle in the header

## 🔧 Configuration

### Environment Variables
No environment variables are required. The app uses GitHub's public API without authentication.

### Customization
- **Page Size**: Modify `REPOS_PER_PAGE` in `App.tsx`
- **Cache Duration**: Adjust `CACHE_DURATION` in `githubApi.ts`
- **Theme**: Customize colors in `tailwind.config.js`

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile**: 320px and up
- **Tablet**: 768px and up  
- **Desktop**: 1024px and up

## 🌙 Theme Support

- **Light Mode**: Clean, modern light theme
- **Dark Mode**: Easy-on-the-eyes dark theme
- **System Preference**: Automatically detects user's system preference
- **Persistent**: Remembers user's theme choice

## 🚀 Performance Features

- **API Caching**: Reduces API calls with 5-minute cache
- **Responsive Pagination**: Shows appropriate number of page buttons
- **Lazy Loading**: Components render efficiently
- **Optimized Images**: Proper image loading and sizing

## 🛡️ Error Handling

The application handles various error scenarios:
- **Invalid Username**: Clear error message for non-existent users
- **Network Errors**: User-friendly network error messages
- **Empty Results**: Graceful handling of users with no repos/orgs
- **API Rate Limits**: Informative rate limit messages

## 📊 API Usage

This application uses the GitHub REST API:
- **Rate Limits**: 60 requests per hour for unauthenticated requests
- **Caching**: Built-in caching reduces API usage
- **Endpoints Used**:
  - `GET /users/{username}` - User information
  - `GET /users/{username}/repos` - User repositories
  - `GET /users/{username}/orgs` - User organizations



---

