import { useState, useMemo } from 'react';
import { RepoListProps } from '../types';
import { filterRepositories, getUniqueLanguages, getTopRepositories } from '../utils/repoUtils';
import RepoItem from './RepoItem';

const RepoList: React.FC<RepoListProps> = ({
  repositories,
  loading,
  error,
  filters,
  onFiltersChange,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  // Get unique languages for filter dropdown
  const availableLanguages = useMemo(() => {
    if (!repositories) return [];
    return getUniqueLanguages(repositories);
  }, [repositories]);

  // Get top repositories for the featured section
  const topRepositories = useMemo(() => {
    if (!repositories) return [];
    return getTopRepositories(repositories, 5);
  }, [repositories]);

  // Filter and sort repositories
  const filteredRepositories = useMemo(() => {
    if (!repositories) return [];
    return filterRepositories(repositories, filters);
  }, [repositories, filters]);

  const handleLanguageFilterChange = (language: string) => {
    onFiltersChange({
      ...filters,
      language: language === 'all' ? null : language
    });
  };

  const handleSortChange = (sortBy: typeof filters.sortBy) => {
    onFiltersChange({
      ...filters,
      sortBy
    });
  };

  const handleSortOrderChange = (sortOrder: typeof filters.sortOrder) => {
    onFiltersChange({
      ...filters,
      sortOrder
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Repositories</h2>
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="loading-skeleton h-32 w-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Repositories</h2>
        <div className="text-center py-8">
          <div className="text-red-500 text-lg font-medium mb-2">Error loading repositories</div>
          <div className="text-gray-600 dark:text-gray-400">{error}</div>
        </div>
      </div>
    );
  }

  if (!repositories || repositories.length === 0) {
    return (
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Repositories</h2>
        <div className="text-center py-8">
          <div className="text-gray-500 dark:text-gray-400">
            No repositories found
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Repositories Section */}
      {topRepositories.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">⭐ Top Repositories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topRepositories.map((repo) => (
              <div key={repo.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {repo.name}
                  </a>
                </h3>
                {repo.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {repo.description}
                  </p>
                )}
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-3">
                    {repo.language && (
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span>{repo.language}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{repo.stargazers_count}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Repositories Section */}
      <div className="card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-xl font-semibold mb-4 sm:mb-0">
            All Repositories ({filteredRepositories.length})
          </h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary text-sm"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Language Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Language
                </label>
                <select
                  value={filters.language || 'all'}
                  onChange={(e) => handleLanguageFilterChange(e.target.value)}
                  className="input-field text-sm"
                >
                  <option value="all">All Languages</option>
                  {availableLanguages.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleSortChange(e.target.value as typeof filters.sortBy)}
                  className="input-field text-sm"
                >
                  <option value="stars">Stars</option>
                  <option value="forks">Forks</option>
                  <option value="name">Name</option>
                  <option value="updated">Last Updated</option>
                </select>
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Order
                </label>
                <select
                  value={filters.sortOrder}
                  onChange={(e) => handleSortOrderChange(e.target.value as typeof filters.sortOrder)}
                  className="input-field text-sm"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={() => onFiltersChange({
                    language: null,
                    sortBy: 'stars',
                    sortOrder: 'desc'
                  })}
                  className="btn-secondary text-sm w-full"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Repository List */}
        {filteredRepositories.length > 0 ? (
          <div className="space-y-4">
            {filteredRepositories.map((repo) => (
              <RepoItem key={repo.id} repository={repo} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-500 dark:text-gray-400">
              No repositories match the current filters
            </div>
          </div>
        )}


      </div>
    </div>
  );
};

export default RepoList;
