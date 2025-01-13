// src/pages/Assets.tsx
import { useState } from 'react';
import { useAssets } from '../hooks/useAssets';
import AssetGrid from '../components/AssetGrid';

interface AssetsProps {
  type?: 'image' | 'document' | 'video';
  favorite?: boolean;
  trash?: boolean;
}

export function Assets({ type, favorite, trash }: AssetsProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { data: assets = [], isLoading, error } = useAssets();

  // debugging logs
  console.log('Assets page data:', { assets, isLoading, error });

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

  // debugging log for filtered assets
  console.log('Filtered assets:', filteredAssets);

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