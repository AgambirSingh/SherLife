export interface Message {
  id: string;
  listingId: string;
  content: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  timestamp: Date;
  participants: string[];
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  studentId: string;
  course: string;
  interests: string[];
  photoURL: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MarketplaceListing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  images: string[];
  sellerId: string;
  sellerName: string;
  sellerContact: {
    email: string;
    phone?: string;
    preferredMethod: 'email' | 'phone';
  };
  createdAt: Date;
  status: 'Available' | 'Sold' | 'Reserved';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  link?: string;
  category: string;
  organizerId: string;
  createdAt: Date;
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
  reports?: number;
} 