import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Star, MoreVertical, Download, Trash, Share } from 'lucide-react';
import { Asset } from '../types';

export function AssetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch asset data
  const { data: asset, isLoading, error } = useQuery<Asset>({
    queryKey: ['asset', id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3001/assets/${id}`);
      if (!response.ok) {
        throw new Error('Asset not found');
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Loading asset details...</div>
      </div>
    );
  }

  if (error || !asset) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-red-500 mb-4">Asset not found</div>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-700 flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Asset Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-800 flex items-center"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-yellow-500">
            <Star className={`h-5 w-5 ${asset.favorite ? "fill-yellow-500 text-yellow-500" : ""}`} />
          </button>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Asset Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {asset.type === 'image' ? (
          <div className="aspect-video bg-gray-100">
            <img
              src={asset.url}
              alt={asset.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="aspect-video bg-gray-100 flex items-center justify-center">
            <div className="text-gray-400 text-lg">Preview not available</div>
          </div>
        )}
        
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">{asset.name}</h1>
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <span>{asset.size}</span>
            <span className="mx-2">•</span>
            <span>Modified {asset.modified}</span>
          </div>
          
          <div className="flex space-x-4">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Download
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              <Share className="w-4 h-4 mr-2" />
              Share
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-100 text-red-600 rounded-lg hover:bg-gray-200">
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
