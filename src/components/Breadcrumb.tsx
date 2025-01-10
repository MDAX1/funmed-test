import { Link, useLocation, useParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Asset } from '../types';

export function Breadcrumb() {
  const location = useLocation();
  const params = useParams();

  const { data: asset } = useQuery<Asset>({
    queryKey: ['asset', params.id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3001/assets/${params.id}`);
      if (!response.ok) throw new Error('Asset not found');
      return response.json();
    },
    enabled: !!params.id,
  });

  const getBreadcrumbItems = () => {
    const items = [
      { label: 'Assets', path: '/' }
    ];

    if (location.pathname.startsWith('/images')) {
      items.push({ label: 'Images', path: '/images' });
    } else if (location.pathname.startsWith('/documents')) {
      items.push({ label: 'Documents', path: '/documents' });
    } else if (location.pathname.startsWith('/videos')) {
      items.push({ label: 'Videos', path: '/videos' });
    } else if (location.pathname.startsWith('/favorites')) {
      items.push({ label: 'Favorites', path: '/favorites' });
    } else if (location.pathname.startsWith('/trash')) {
      items.push({ label: 'Trash', path: '/trash' });
    }

    if (params.id && asset) {
      items.push({ label: asset.name, path: `/asset/${params.id}` });
    }

    return items;
  };

  const items = getBreadcrumbItems();

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
      {items.map((item, index) => (
        <div key={item.path} className="flex items-center">
          {index > 0 && (
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          )}
          {index === items.length - 1 ? (
            <span className="text-gray-900">{item.label}</span>
          ) : (
            <Link
              to={item.path}
              className="hover:text-gray-700 transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
