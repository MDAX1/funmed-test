import React, { createContext, useContext, useState, useCallback } from 'react';
import { Asset } from '../types';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortField: 'name' | 'date' | 'size';
  setSortField: (field: 'name' | 'date' | 'size') => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  filterAssets: (assets: Asset[]) => Asset[];
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'name' | 'date' | 'size'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Function to filter and sort assets based on search query and sort settings
  const filterAssets = useCallback((assets: Asset[]) => {
    // First filter based on search query
    let filtered = assets.filter(asset => 
      asset.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Then sort the filtered results
    filtered.sort((a, b) => {
      let compareValueA: string | number;
      let compareValueB: string | number;

      switch (sortField) {
        case 'name':
          compareValueA = a.name.toLowerCase();
          compareValueB = b.name.toLowerCase();
          break;
        case 'date':
          compareValueA = new Date(a.modified).getTime();
          compareValueB = new Date(b.modified).getTime();
          break;
        case 'size':
          // Convert size strings to numbers for comparison
          compareValueA = parseFloat(a.size.split(' ')[0]);
          compareValueB = parseFloat(b.size.split(' ')[0]);
          break;
        default:
          return 0;
      }

      if (compareValueA < compareValueB) return sortOrder === 'asc' ? -1 : 1;
      if (compareValueA > compareValueB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [searchQuery, sortField, sortOrder]);

  const value = {
    searchQuery,
    setSearchQuery,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    filterAssets
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}