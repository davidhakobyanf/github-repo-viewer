export interface SearchInputProps {
    onSearch: (username: string) => void;
    loading: boolean;
    placeholder?: string;
  }
 // GitHub API Response Types
export interface GitHubUser {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    name: string | null;
    bio: string | null;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
  }
export interface UserProfileProps {
    user: GitHubUser | null;
    loading: boolean;
    error: string | null;
  }
export interface GitHubApiError {
    message: string;
    status: number;
    documentation_url?: string;
  }
  export interface GitHubRepository {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    size: number;
    default_branch: string;
    topics: string[];
    visibility: string;
  }
  export interface ApiResponse<T> {
    data: T | null;
    error: string | null;
    loading: boolean;
  }