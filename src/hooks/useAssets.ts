import { useQuery } from '@tanstack/react-query';
import { Asset } from '../types';

export function useAssets() {
  return useQuery<Asset[]>({
    queryKey: ['assets'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3001/assets');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });
}