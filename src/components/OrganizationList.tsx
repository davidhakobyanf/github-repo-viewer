import { OrganizationListProps } from '../types';

const OrganizationList: React.FC<OrganizationListProps> = ({ 
  organizations, 
  loading, 
  error 
}) => {
  if (loading) {
    return (
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Organizations</h2>
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="loading-skeleton w-12 h-12 rounded-full"></div>
              <div className="flex-1">
                <div className="loading-skeleton h-4 w-32 mb-2"></div>
                <div className="loading-skeleton h-3 w-48"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Organizations</h2>
        <div className="text-center py-4">
          <div className="text-red-500 text-sm mb-2">Error loading organizations</div>
          <div className="text-gray-600 dark:text-gray-400 text-sm">{error}</div>
        </div>
      </div>
    );
  }

  if (!organizations || organizations.length === 0) {
    return (
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Organizations</h2>
        <div className="text-center py-8">
          <div className="text-gray-500 dark:text-gray-400">
            No organizations found
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">
        Organizations ({organizations.length})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        {organizations.map((org) => {
          const webUrl = org.url.replace('https://api.github.com/orgs/', 'https://github.com/');

          return(
          <a
            key={org.id}
            href={webUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 block"
            title="View organization on GitHub"
          >
            <img
              src={org.avatar_url}
              alt={`${org.login}'s avatar`}
              className="w-12 h-12 rounded-full flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-gray-900 dark:text-white truncate">
                  {org.name || org.login}
                </h3>
                {org.name && (
                  <span className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    @{org.login}
                  </span>
                )}
              </div>
              {org.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                  {org.description}
                </p>
              )}
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                {org.public_repos > 0 && (
                  <span>{org.public_repos} repos</span>
                )}
                {org.followers > 0 && (
                  <span>{org.followers} followers</span>
                )}
              </div>
            </div>
          </a>
        )})}
      </div>
    </div>
  );
};

export default OrganizationList;
