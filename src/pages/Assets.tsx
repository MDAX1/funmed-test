import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAssets } from '../hooks/useAssets';
import AssetGrid from '../components/AssetGrid';

interface AssetsProps {
  type?: 'image' | 'document' | 'video';
  favorite?: boolean;
  trash?: boolean;
}

export function Assets({ type, favorite, trash }: AssetsProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { data: assets, isLoading, error } = useAssets();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Loading assets...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-500">Error loading assets</div>
      </div>
    );
  }

  let filteredAssets = assets ?? [];
  
  if (type) {
    filteredAssets = filteredAssets.filter(asset => asset.type === type);
  }
  
  if (favorite) {
    filteredAssets = filteredAssets.filter(asset => asset.favorite);
  }

  if (trash) {

    filteredAssets = [];
  }

  const getTitle = () => {
    if (trash) return 'Trash';
    if (favorite) return 'Favorites';
    if (type) return `${type.charAt(0).toUpperCase() + type.slice(1)}s`;
    return 'All Files';
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-hidden">
        <AssetGrid 
          assets={filteredAssets}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      </div>
    </div>
  );
}
