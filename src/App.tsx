import { useState, useMemo } from 'react';
import { useGitHubUser} from './hooks/useGitHubData';
import SearchInput from './components/SearchInput';
import UserProfile from './components/UserProfile';


const REPOS_PER_PAGE = 15;

function App() {
  const [username, setUsername] = useState<string | null>(null);

  
  // Fetch data
  const { data: user, loading: userLoading, error: userError } = useGitHubUser(username);



 

  const handleSearch = (searchUsername: string) => {
    setUsername(searchUsername);
  };



  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                GitHub Repo Viewer
              </h1>
              <div className="hidden sm:block text-sm text-gray-500 dark:text-gray-400">
                Explore GitHub profiles, repositories, and organizations
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Search Section */}
          <div className="text-center">
            <SearchInput
              onSearch={handleSearch}
              loading={userLoading}
            />
          </div>

          {/* User Profile */}
          <UserProfile
            user={user}
            loading={userLoading}
            error={userError}
          />

     
        

          {/* Footer */}
          <footer className="text-center py-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Built with React, TypeScript, and Tailwind CSS
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              Data provided by GitHub API
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
