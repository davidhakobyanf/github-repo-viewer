import { RepoItemProps } from '../types';
import { formatNumber, formatRelativeDate } from '../utils/repoUtils';

const RepoItem: React.FC<RepoItemProps> = ({ repository }) => {
  const {
    name,
    html_url,
    description,
    stargazers_count,
    forks_count,
    language,
    updated_at,
    topics
  } = repository;

  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              <a
                href={html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                {name}
              </a>
            </h3>
            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                {description}
              </p>
            )}
          </div>
          <a
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 ml-3 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            title="View repository on GitHub"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Topics */}
        {topics && topics.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {topics.slice(0, 5).map((topic) => (
              <span
                key={topic}
                className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
              >
                {topic}
              </span>
            ))}
            {topics.length > 5 && (
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                +{topics.length - 5} more
              </span>
            )}
          </div>
        )}

        {/* Stats and Language */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 gap-x-2">
          <div className="flex items-center space-x-4">
            {/* Language */}
            {language && (
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>{language}</span>
              </div>
            )}

            {/* Stars */}
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{formatNumber(stargazers_count)}</span>
            </div>

            {/* Forks */}
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2A5 5 0 0011 9H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>{formatNumber(forks_count)}</span>
            </div>
          </div>

          {/* Last updated */}
          <div className="text-xs">
            Updated {formatRelativeDate(updated_at)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoItem;
