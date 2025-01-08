export interface Asset {
  id: string;
  name: string;
  type: 'image' | 'document' | 'video';
  url: string;
  size: string;
  modified: string;
  favorite: boolean;
}

export type ViewMode = 'grid' | 'list';