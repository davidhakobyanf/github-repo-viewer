import { useMemo, useState } from 'react';
import { useGitHubOrganizations, useGitHubRepositories, useGitHubUser } from './hooks/useGitHubData';
import { useTheme } from './hooks/useTheme.tsx';
import SearchInput from './components/SearchInput';
import UserProfile from './components/UserProfile';
import OrganizationList from './components/OrganizationList.tsx';
import RepoList from './components/RepoList.tsx';
import { PaginationInfo, RepoFilters } from './types/index.ts';


const REPOS_PER_PAGE = 15;

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [repoFilters, setRepoFilters] = useState<RepoFilters>({
    language: null,
    sortBy: 'stars',
    sortOrder: 'desc'
  });
  const { theme, toggleTheme } = useTheme();

  // Fetch data
  const { data: user, loading: userLoading, error: userError } = useGitHubUser(username);
  const { data: organizations, loading: orgsLoading, error: orgsError } = useGitHubOrganizations(username);
  const { 
    data: repositories, 
    loading: reposLoading, 
    error: reposError 
  } = useGitHubRepositories(
    username, 
    currentPage, 
    REPOS_PER_PAGE, 
    repoFilters.sortBy === 'updated' ? 'updated' : 'created',
    repoFilters.sortOrder
  );


    // Calculate pagination info
    const pagination: PaginationInfo = useMemo(() => {
      if (!user || !repositories) {
        return {
          currentPage: 1,
          totalPages: 1,
          totalItems: 0,
          itemsPerPage: REPOS_PER_PAGE
        };
      }
  
      const totalPages = Math.ceil(user.public_repos / REPOS_PER_PAGE);
      return {
        currentPage,
        totalPages,
        totalItems: user.public_repos,
        itemsPerPage: REPOS_PER_PAGE
      };
    }, [user, repositories, currentPage]);
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  
  const handleFiltersChange = (newFilters: RepoFilters) => {
    setRepoFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };
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
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
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

   {/* Organizations and Repositories */}
   {user && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Organizations */}
              <div className="lg:col-span-1">
                <OrganizationList
                  organizations={organizations || []}
                  loading={orgsLoading}
                  error={orgsError}
                />
              </div>

               {/* Repositories */}
               <div className="lg:col-span-2">
                <RepoList
                  repositories={repositories || []}
                  loading={reposLoading}
                  error={reposError}
                  filters={repoFilters}
                  onFiltersChange={handleFiltersChange}
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          )}

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
