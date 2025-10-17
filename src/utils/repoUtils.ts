import { GitHubRepository, RepoFilters } from '../types';

export const filterRepositories = (
    repositories: GitHubRepository[],
    filters: RepoFilters
  ): GitHubRepository[] => {
    let filtered = [...repositories];
  
    // Filter by language
    if (filters.language && filters.language !== 'all') {
      filtered = filtered.filter(repo => repo.language === filters.language);
    }
  
    // Sort repositories
    filtered.sort((a, b) => {
      let comparison = 0;
  
      switch (filters.sortBy) {
        case 'stars':
          comparison = a.stargazers_count - b.stargazers_count;
          break;
        case 'forks':
          comparison = a.forks_count - b.forks_count;
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'updated':
          comparison = new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
          break;
        default:
          comparison = 0;
      }
  
      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });
  
    return filtered;
  };
export const getUniqueLanguages = (repositories: GitHubRepository[]): string[] => {
  const languages = repositories
    .map(repo => repo.language)
    .filter((language): language is string => language !== null)
    .filter((language, index, array) => array.indexOf(language) === index)
    .sort();

  return languages;
};

export const getTopRepositories = (
  repositories: GitHubRepository[],
  count: number = 5
): GitHubRepository[] => {
  return [...repositories]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, count);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};
