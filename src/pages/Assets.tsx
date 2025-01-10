// src/pages/Assets.tsx
import { useState } from 'react';
import { useAssets } from '../hooks/useAssets';
import AssetGrid from '../components/AssetGrid';
import { Asset } from '../types';

interface AssetsProps {
  type?: 'image' | 'document' | 'video';
  favorite?: boolean;
  trash?: boolean;
}

export function Assets({ type, favorite, trash }: AssetsProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { data: assets, isLoading, error } = useAssets();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading assets</div>;
  }

  // Filter assets based on props
  let filteredAssets = assets ?? [];
  
  if (type) {
    filteredAssets = filteredAssets.filter(asset => asset.type === type);
  }
  
  if (favorite) {
    filteredAssets = filteredAssets.filter(asset => asset.favorite);
  }

  if (trash) {
    // Implement trash logic here when available
  }

  return (
    <div>
      <AssetGrid 
        assets={filteredAssets}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
    </div>
  );
}