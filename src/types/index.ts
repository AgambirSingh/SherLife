export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

export interface MarketplaceListing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'Books' | 'Electronics' | 'Clothing' | 'Housing' | 'Services' | 'Free';
  condition: 'New' | 'Like New' | 'Good' | 'Fair' | 'Poor';
  images: string[];
  sellerId: string;
  createdAt: Date;
  status: 'Available' | 'Sold' | 'Reserved';
}

export interface Confession {
  id: string;
  content: string;
  tags: string[];
  upvotes: number;
  downvotes: number;
  createdAt: Date;
  isFlagged: boolean;
  userVote: 'up' | 'down' | null;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  link?: string;
  category: 'Academic' | 'Social' | 'Career' | 'Other';
}