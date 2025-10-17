import { GitHubUser, 
     GitHubApiError, 
     GitHubOrganization} from '../types';

class GitHubApiService {
  private baseUrl = 'https://api.github.com';
  private cache = new Map<string, { data: any; timestamp: number; expiresAt: number }>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  private async request<T>(endpoint: string): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    // Check cache first
    const cached = this.cache.get(url);
    if (cached && Date.now() < cached.expiresAt) {
      return cached.data;
    }

    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'GitHub-Repo-Viewer'
        }
      });

      if (!response.ok) {
        const errorData: GitHubApiError = await response.json().catch(() => ({
          message: `HTTP ${response.status}: ${response.statusText}`,
          status: response.status
        }));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Cache the response
      this.cache.set(url, {
        data,
        timestamp: Date.now(),
        expiresAt: Date.now() + this.CACHE_DURATION
      });

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  async getUser(username: string): Promise<GitHubUser> {
    if (!username.trim()) {
      throw new Error('Username cannot be empty');
    }
    
    return this.request<GitHubUser>(`/users/${encodeURIComponent(username)}`);
  }


  async getUserOrganizations(username: string): Promise<GitHubOrganization[]> {
    if (!username.trim()) {
      throw new Error('Username cannot be empty');
    }

    return this.request<GitHubOrganization[]>(`/users/${encodeURIComponent(username)}/orgs`);
  }

  // Utility method to clear cache
  clearCache(): void {
    this.cache.clear();
  }

  // Utility method to get cache info
  getCacheInfo(): { size: number; entries: string[] } {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys())
    };
  }
}

export const githubApi = new GitHubApiService();
