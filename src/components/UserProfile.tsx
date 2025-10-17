import { UserProfileProps } from '../types';
import { formatDate, formatNumber } from '../utils/repoUtils.ts';

const UserProfile: React.FC<UserProfileProps> = ({ user, loading, error }) => {
  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="flex items-center space-x-4">
            <div className="loading-skeleton w-20 h-20 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="loading-skeleton h-6 w-48"></div>
              <div className="loading-skeleton h-4 w-32"></div>
              <div className="loading-skeleton h-4 w-64"></div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="loading-skeleton h-8 w-full"></div>
            <div className="loading-skeleton h-8 w-full"></div>
            <div className="loading-skeleton h-8 w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="text-center py-8">
          <div className="text-red-500 text-lg font-medium mb-2">Error loading user</div>
          <div className="text-gray-600 dark:text-gray-400">{error}</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="card">
        <div className="text-center py-8">
          <div className="text-gray-500 dark:text-gray-400 text-lg">
            Enter a GitHub username to view their profile
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
        <div className="flex-shrink-0">
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="w-20 h-20 rounded-full border-2 border-gray-200 dark:border-gray-600"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
              {user.name || user.login}
            </h1>
            {user.name && (
              <span className="text-lg text-gray-600 dark:text-gray-400 truncate">
                @{user.login}
              </span>
            )}
          </div>
          
          {user.bio && (
            <p className="mt-2 text-gray-700 dark:text-gray-300 line-clamp-2">
              {user.bio}
            </p>
          )}
          
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span>Joined {formatDate(user.created_at)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>View on GitHub</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatNumber(user.public_repos)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Public Repos</div>
        </div>
        
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatNumber(user.followers)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
        </div>
        
        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatNumber(user.following)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Following</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
