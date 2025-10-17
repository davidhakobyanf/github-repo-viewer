import { useState, useEffect, useCallback } from 'react';
import { githubApi } from '../services/githubApi';
import { GitHubUser,  ApiResponse } from '../types';

export const useGitHubUser = (username: string | null) => {
  const [user, setUser] = useState<ApiResponse<GitHubUser>>({
    data: null,
    error: null,
    loading: false
  });

  const fetchUser = useCallback(async (usernameToFetch: string) => {
    setUser(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const userData = await githubApi.getUser(usernameToFetch);
      setUser({ data: userData, error: null, loading: false });
    } catch (error) {
      setUser({ 
        data: null, 
        error: error instanceof Error ? error.message : 'Failed to fetch user', 
        loading: false 
      });
    }
  }, []);

  useEffect(() => {
    if (username && username.trim()) {
      fetchUser(username);
    } else {
      setUser({ data: null, error: null, loading: false });
    }
  }, [username, fetchUser]);

  return { ...user, refetch: () => username && fetchUser(username) };
};

