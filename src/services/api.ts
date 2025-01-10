import { Asset } from '../types';

const API_BASE_URL = 'http://localhost:3001';

export const api = {
  async getAllAssets(): Promise<Asset[]> {
    const response = await fetch(`${API_BASE_URL}/assets`);
    if (!response.ok) {
      throw new Error('Failed to fetch assets');
    }
    return response.json();
  },

  async getAssetById(id: string): Promise<Asset> {
    const response = await fetch(`${API_BASE_URL}/assets/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch asset');
    }
    return response.json();
  },

  async toggleFavorite(id: string, favorite: boolean): Promise<Asset> {
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
  },
};