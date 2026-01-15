 import { create } from 'zustand';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface UserState {
  users: User[];
  filteredUsers: User[];
  selectedUser: User | null;
  userPosts: Post[];
  searchQuery: string;
  selectedCity: string;
  isLoading: boolean;
  isLoadingPosts: boolean;
  error: string | null;
  

  fetchUsers: () => Promise<void>;
  fetchUserPosts: (userId: number) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSelectedCity: (city: string) => void;
  setSelectedUser: (user: User | null) => void;
  applyFilters: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  filteredUsers: [],
  selectedUser: null,
  userPosts: [],
  searchQuery: '',
  selectedCity: '',
  isLoading: false,
  isLoadingPosts: false,
  error: null,


  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${BASE_URL}/users`);
      
        if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data: User[] = await response.json();
      console.log(data, "data logged")
      set({ 
        users: data, 
        filteredUsers: data, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred', 
        isLoading: false 
      });
    }
  },


   fetchUserPosts: async (userId: number) => {
    set({ isLoadingPosts: true, error: null });
    try {
      const response = await fetch(
        `${BASE_URL}/posts?userId=${userId}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      
      const data: Post[] = await response.json();
      set({ userPosts: data, isLoadingPosts: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred', 
        isLoadingPosts: false 
      });
    }
  },

  
  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
    get().applyFilters();
  },

 
  setSelectedCity: (city: string) => {
    set({ selectedCity: city });
    get().applyFilters();
  },

 
  setSelectedUser: (user: User | null) => {
    set({ selectedUser: user });
  },
 
  applyFilters: () => {
    const { users, searchQuery, selectedCity } = get();
    
    let filtered = users;
    if (searchQuery.trim()) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

     if (selectedCity) {
      filtered = filtered.filter(user => 
        user.address.city === selectedCity
      );
    }

    set({ filteredUsers: filtered });
  },
}));