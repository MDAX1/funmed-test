import React, { useState, useEffect } from 'react';
import { Asset, ViewMode } from '../types';
import { useSearch } from '../contexts/SearchContext';
import AssetGrid from './AssetGrid';

export default function TestSearch() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [error, setError] = useState<string>('');
  const { searchQuery } = useSearch(); // Log search query to verify state

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch('http://localhost:3001/assets');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched assets:', data);
        setAssets(data);
      } catch (error) {
        console.error('Error:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch assets');
      }
    };
    fetchAssets();
  }, []);

  console.log('Current search query:', searchQuery); // Debug search state

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <AssetGrid 
        assets={assets} 
        viewMode={viewMode} 
        setViewMode={setViewMode}
      />
    </div>
  );
}