import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface RouteConfig {
  path: string;
  label: string;
  icon?: React.ComponentType;
  category?: 'main' | 'label';
}

export const routes = {
  main: [
    { path: '/', label: 'All Files' },
    { path: '/images', label: 'Images' },
    { path: '/documents', label: 'Documents' },
    { path: '/videos', label: 'Videos' },
  ],
  labels: [
    { path: '/favorites', label: 'Favorites' },
    { path: '/trash', label: 'Trash' },
  ],
} as const;

export function getRoutePath(path: keyof typeof routes) {
  return routes[path];
}
