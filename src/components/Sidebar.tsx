import { useLocation, Link } from 'react-router-dom';
import {
  FolderOpen,
  Image,
  FileText,
  Video,
  Star,
  Trash,
  Settings,
} from "lucide-react";
import { cn } from '../lib/utils';

export default function Sidebar() {
  const location = useLocation();
  
  const navigationItems = [
    { icon: FolderOpen, label: 'All Files', path: '/' },
    { icon: Image, label: 'Images', path: '/images' },
    { icon: FileText, label: 'Documents', path: '/documents' },
    { icon: Video, label: 'Videos', path: '/videos' },
  ];

  const labelItems = [
    { icon: Star, label: 'Favorites', path: '/favorites' },
    { icon: Trash, label: 'Trash', path: '/trash' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname === path;
  };

  const getButtonClass = (path: string) => {
    return cn(
      'flex items-center px-3 py-2 rounded-lg w-full transition-colors',
      isActive(path)
        ? 'bg-gray-200 text-gray-900'
        : 'text-gray-700 hover:bg-gray-200'
    );
  };

  return (
    <aside className="flex flex-col border-gray-200 bg-gray-50 border-r w-64 h-screen">
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-1">
          {navigationItems.map(({ icon: Icon, label, path }) => (
            <Link
              key={path}
              to={path}
              className={getButtonClass(path)}
            >
              <Icon className="mr-3 w-5 h-5" />
              {label}
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="px-3 font-medium text-gray-500 text-sm">Labels</h3>
          <div className="space-y-1 mt-2">
            {labelItems.map(({ icon: Icon, label, path }) => (
              <Link
                key={path}
                to={path}
                className={getButtonClass(path)}
              >
                <Icon className="mr-3 w-5 h-5" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="border-gray-200 p-4 border-t">
        <button className="flex items-center hover:bg-gray-200 px-3 py-2 rounded-lg w-full text-gray-700">
          <Settings className="mr-3 w-5 h-5" />
          Settings
        </button>
      </div>
    </aside>
  );
}