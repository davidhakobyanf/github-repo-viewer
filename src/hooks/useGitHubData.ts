import { useState, useEffect, useCallback } from 'react';
import { githubApi } from '../services/githubApi';
import { GitHubUser,  ApiResponse, GitHubOrganization, GitHubRepository } from '../types';

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
  export const useGitHubRepositories = (
    username: string | null,
    page: number = 1,
    perPage: number = 20,
    sort: 'created' | 'updated' | 'pushed' | 'full_name' = 'updated',
    direction: 'asc' | 'desc' = 'desc'
  ) => {
    const [repositories, setRepositories] = useState<ApiResponse<GitHubRepository[]>>({
      data: null,
      error: null,
      loading: false
    });
  
    const fetchRepositories = useCallback(async (
      usernameToFetch: string,
      pageNum: number,
      perPageNum: number,
      sortBy: typeof sort,
      sortDirection: typeof direction
    ) => {
      setRepositories(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        const reposData = await githubApi.getUserRepositories(
          usernameToFetch, 
          pageNum, 
          perPageNum, 
          sortBy, 
          sortDirection
        );
        setRepositories({ data: reposData, error: null, loading: false });
      } catch (error) {
        setRepositories({ 
          data: null, 
          error: error instanceof Error ? error.message : 'Failed to fetch repositories', 
          loading: false 
        });
      }
    }, []);
  
    useEffect(() => {
      if (username && username.trim()) {
        fetchRepositories(username, page, perPage, sort, direction);
      } else {
        setRepositories({ data: null, error: null, loading: false });
      }
    }, [username, page, perPage, sort, direction, fetchRepositories]);
  
    return { 
      ...repositories, 
      refetch: () => username && fetchRepositories(username, page, perPage, sort, direction) 
    };
  };