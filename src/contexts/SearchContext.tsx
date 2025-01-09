import React, { createContext, useContext, useState } from 'react';
import { Asset } from '../types';

type SortField = 'name' | 'date' | 'size';
type SortOrder = 'asc' | 'desc';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortField: SortField;
  setSortField: (field: SortField) => void;
  sortOrder: SortOrder;
  setSortOrder: (order: SortOrder) => void;
  filterAssets: (assets: Asset[]) => Asset[];
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const filterAssets = (assets: Asset[]) => {
    console.log('Original assets:', assets);
    let filtered = assets;

    if (searchQuery.trim()) {
      filtered = assets.filter(asset => {
        const assetName = asset.name.toLowerCase();
        const query = searchQuery.trim().toLowerCase();
        console.log(`Comparing: ${assetName} with ${query}`);
        return assetName.includes(query);
      });
    }

    console.log('Filtered assets:', filtered);
    return [...filtered].sort((a, b) => {
      let compareA: string | number;
      let compareB: string | number;

      switch (sortField) {
        case 'name':
          compareA = a.name.toLowerCase();
          compareB = b.name.toLowerCase();
          break;
        case 'date':
          compareA = new Date(a.modified).getTime();
          compareB = new Date(b.modified).getTime();
          break;
        case 'size':
          compareA = parseFloat(a.size);
          compareB = parseFloat(b.size);
          break;
        default:
          return 0;
      }

      return sortOrder === 'asc' 
        ? compareA > compareB ? 1 : -1
        : compareA < compareB ? 1 : -1;
    });
  };

  return (
    <SearchContext.Provider 
      value={{
        searchQuery,
        setSearchQuery,
        sortField,
        setSortField,
        sortOrder,
        setSortOrder,
        filterAssets
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}