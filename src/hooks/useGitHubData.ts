import { useState, useEffect, useCallback } from 'react';
import { githubApi } from '../services/githubApi';
import { GitHubUser,  ApiResponse, GitHubOrganization } from '../types';

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

export const useGitHubOrganizations = (username: string | null) => {
    const [organizations, setOrganizations] = useState<ApiResponse<GitHubOrganization[]>>({
      data: null,
      error: null,
      loading: false
    });
  
    const fetchOrganizations = useCallback(async (usernameToFetch: string) => {
      setOrganizations(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        const orgsData = await githubApi.getUserOrganizations(usernameToFetch);
        setOrganizations({ data: orgsData, error: null, loading: false });
      } catch (error) {
        setOrganizations({ 
          data: null, 
          error: error instanceof Error ? error.message : 'Failed to fetch organizations', 
          loading: false 
        });
      }
    }, []);
  
    useEffect(() => {
      if (username && username.trim()) {
        fetchOrganizations(username);
      } else {
        setOrganizations({ data: null, error: null, loading: false });
      }
    }, [username, fetchOrganizations]);
  
    return { 
      ...organizations, 
      refetch: () => username && fetchOrganizations(username) 
    };
  };
  