// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function for combining Tailwind classes conditionally
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Route configuration type
export interface RouteConfig {
  path: string;
  label: string;
  icon?: React.ComponentType;
  category?: 'main' | 'label';
}

// Route definitions for sidebar navigation
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

// Type-safe route path getter
export function getRoutePath(path: keyof typeof routes) {
  return routes[path];
}