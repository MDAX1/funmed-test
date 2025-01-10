// src/hooks/useAssets.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_BASE_URL = 'http://localhost:3001';

async function fetchAssets() {
  const response = await fetch(`${API_BASE_URL}/assets`);
  if (!response.ok) {
    throw new Error('Failed to fetch assets');
  }
  return response.json();
}

export function useAssets() {
  return useQuery({
    queryKey: ['assets'],
    queryFn: fetchAssets,
    retry: false,
    refetchOnWindowFocus: false,
  });
}

async function toggleFavorite(id: string, favorite: boolean) {
  const response = await fetch(`${API_BASE_URL}/assets/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ favorite }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update favorite status');
  }
  
  return response.json();
}

export function useFavoriteAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, favorite }: { id: string; favorite: boolean }) =>
      toggleFavorite(id, favorite),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
    },
  });
}
