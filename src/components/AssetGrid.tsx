import { useNavigate } from 'react-router-dom';
import { LayoutGrid, List, MoreVertical, Star } from "lucide-react";
import { Asset, ViewMode } from "../types";
import { FileText, Image, Video, Moon, Sun } from "lucide-react";
import { useSearch } from "../contexts/SearchContext";
import { useFavoriteAsset } from "../hooks/useAssets";
import { useTheme } from "../contexts/ThemeContext";
import { Tooltip } from "./Tooltip";
import { AssetGridSkeleton } from "./Skeleton";

interface AssetGridProps {
  assets: Asset[];
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  isLoading?: boolean;
}

export default function AssetGrid({
  assets,
  viewMode,
  setViewMode,
  isLoading
}: AssetGridProps) {
  const navigate = useNavigate();
  const { filterAssets } = useSearch();
  const favoriteAsset = useFavoriteAsset();
  const { theme, toggleTheme } = useTheme();
  const filteredAssets = filterAssets(assets);

  if (isLoading) {
    return <AssetGridSkeleton />;
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
            {filteredAssets.length} {filteredAssets.length === 1 ? 'File' : 'Files'}
          </h2>
          <div className="flex items-center space-x-2">
            <Tooltip content={viewMode === 'grid' ? 'Switch to list view' : 'Switch to grid view'}>
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 
                          dark:hover:bg-gray-700 transition-colors"
                aria-label={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
              >
                {viewMode === 'grid' ? <List className="w-5 h-5" /> : <LayoutGrid className="w-5 h-5" />}
              </button>
            </Tooltip>
            <Tooltip content={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 
                          dark:hover:bg-gray-700 transition-colors"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? 
                  <Moon className="w-5 h-5" /> : 
                  <Sun className="w-5 h-5" />
                }
              </button>
            </Tooltip>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                onClick={() => navigate(`/asset/${asset.id}`)}
                className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 
                         hover:shadow-lg dark:hover:shadow-gray-900 rounded-lg transition-shadow 
                         overflow-hidden cursor-pointer focus-within:ring-2 focus-within:ring-blue-500"
                tabIndex={0}
                role="button"
                aria-label={`View details of ${asset.name}`}
              >
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg">
          </div>
        )}
      </div>
    </div>
  );
}