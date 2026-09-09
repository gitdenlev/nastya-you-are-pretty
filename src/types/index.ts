export interface PhotoItem {
  id: string;
  url: string;
  fallbackUrl?: string;
  alt: string;
  caption?: string;
  tag?: string;
  width?: number;
  height?: number;
}

export type SearchStep =
  | 'idle'
  | 'typing'
  | 'typed'
  | 'searching'
  | 'results'
  | 'revealed';
