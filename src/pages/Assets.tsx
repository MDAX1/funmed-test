import { useState } from 'react';
import { useAssets } from '../hooks/useAssets';
import AssetGrid from '../components/AssetGrid';
import { Loader2 } from "lucide-react";

interface AssetsProps {
  type?: 'image' | 'document' | 'video';
  favorite?: boolean;
  trash?: boolean;
}

export function Assets({ type, favorite, trash }: AssetsProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { data: assets = [], isLoading, error } = useAssets();

  console.log('Assets data:', { assets, isLoading, error }); // Debug

  const getFilteredAssets = () => {
    let filtered = [...assets];
    
    if (type) {
      filtered = filtered.filter(asset => asset.type === type);
    }
    
    if (favorite) {
      filtered = filtered.filter(asset => asset.favorite);
    }

    if (trash) {
      return [];
    }

    return filtered;
  };

  const filteredAssets = getFilteredAssets();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin mb-2" />
        <p className="text-gray-500">Loading assets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-500 mb-2">Error loading assets</p>
        <p className="text-sm text-gray-500">{error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <AssetGrid 
        assets={filteredAssets}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
    </div>
  );
}