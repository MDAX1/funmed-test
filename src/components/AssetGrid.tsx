// src/components/AssetGrid.tsx
import { useNavigate } from 'react-router-dom';
import { LayoutGrid, List, MoreVertical, Star } from "lucide-react";
import { Asset, ViewMode } from "../types";
import { FileText, Image, Video } from "lucide-react";
import { useSearch } from "../contexts/SearchContext";
import { useFavoriteAsset } from "../hooks/useAssets";

interface AssetGridProps {
  assets: Asset[];
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export default function AssetGrid({
  assets,
  viewMode,
  setViewMode,
}: AssetGridProps) {
  const navigate = useNavigate();
  const { filterAssets } = useSearch();
  const favoriteAsset = useFavoriteAsset();
  const filteredAssets = filterAssets(assets);

  console.log('AssetGrid filtered assets:', filteredAssets); // Debugging log

  const getIcon = (type: Asset["type"]) => {
    switch (type) {
      case "image":
        return <Image className="w-5 h-5" />;
      case "document":
        return <FileText className="w-5 h-5" />;
      case "video":
        return <Video className="w-5 h-5" />;
    }
  };

  const handleAssetClick = (asset: Asset) => {
    navigate(`/asset/${asset.id}`);
  };

  const handleFavoriteClick = async (e: React.MouseEvent, asset: Asset) => {
    e.stopPropagation();
    try {
      await favoriteAsset.mutateAsync({
        id: asset.id,
        favorite: !asset.favorite,
      });
    } catch (error) {
      console.error('Failed to update favorite status:', error);
    }
  };

  if (filteredAssets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-gray-500">No assets found</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-gray-900 text-lg">
            {filteredAssets.length} {filteredAssets.length === 1 ? 'File' : 'Files'}
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-gray-200" : "hover:bg-gray-100"}`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg ${viewMode === "list" ? "bg-gray-200" : "hover:bg-gray-100"}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                onClick={() => handleAssetClick(asset)}
                className="border-gray-200 bg-white hover:shadow-lg border rounded-lg transition-shadow overflow-hidden cursor-pointer"
              >
                {asset.type === "image" ? (
                  <div className="bg-gray-100 aspect-video">
                    <img
                      src={asset.url}
                      alt={asset.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="flex justify-center items-center bg-gray-100 aspect-video">
                    {getIcon(asset.type)}
                  </div>
                )}
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-900">{asset.name}</h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => handleFavoriteClick(e, asset)}
                        className="text-gray-400 hover:text-yellow-500"
                      >
                        <Star
                          className={`h-5 w-5 ${asset.favorite ? "fill-yellow-500 text-yellow-500" : ""}`}
                        />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-gray-500 text-sm">
                    <span>{asset.size}</span>
                    <span className="mx-2">•</span>
                    <span>{asset.modified}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border-gray-200 bg-white border rounded-lg">
            {filteredAssets.map((asset, index) => (
              <div
                key={asset.id}
                onClick={() => handleAssetClick(asset)}
                className={`flex items-center px-6 py-4 hover:bg-gray-50 cursor-pointer ${
                  index !== 0 ? "border-t border-gray-200" : ""
                }`}
              >
                <div className="flex-shrink-0">{getIcon(asset.type)}</div>
                <div className="flex-1 ml-4">
                  <h3 className="font-medium text-gray-900 text-sm">
                    {asset.name}
                  </h3>
                  <div className="flex items-center mt-1 text-gray-500 text-sm">
                    <span>{asset.size}</span>
                    <span className="mx-2">•</span>
                    <span>{asset.modified}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={(e) => handleFavoriteClick(e, asset)}
                    className="text-gray-400 hover:text-yellow-500"
                  >
                    <Star
                      className={`h-5 w-5 ${asset.favorite ? "fill-yellow-500 text-yellow-500" : ""}`}
                    />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}