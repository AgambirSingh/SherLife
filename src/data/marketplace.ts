import type { MarketplaceListing } from '../types';

export const MARKETPLACE_LISTINGS: MarketplaceListing[] = [
  {
    id: '1',
    title: 'Calculus Textbook - 3rd Edition',
    description: 'Like new condition, barely used. All pages intact.',
    price: 50,
    category: 'Books',
    condition: 'Like New',
    images: ['https://photosevent.s3.us-east-1.amazonaws.com/calculs+image.jpg'],
    sellerId: 'user1',
    sellerName: 'Sharad Cooke',
    createdAt: new Date(),
    status: 'Available',
    sellerContact: {
      email: 'sharad@sheridancollege.ca',
      phone: '647-555-0123',
      preferredMethod: 'phone'
    },
  },
  {
    id: '2',
    title: 'iPad Pro 11" (2021)',
    description: 'Perfect for taking notes. Includes Apple Pencil.',
    price: 600,
    category: 'Electronics',
    condition: 'Good',
    images: ['https://photosevent.s3.us-east-1.amazonaws.com/ipad+11+pro.webp'],
    sellerId: 'user2',
    sellerName: 'Enoch Thakkar',
    createdAt: new Date(),
    status: 'Available',
    sellerContact: {
      email: 'enoch.thakkar@sheridancollege.ca',
      preferredMethod: 'email'
    },
  },
  {
    id: '3',
    title: 'Sheridan College Hoodie',
    description: 'Size M, worn once. Perfect condition.',
    price: 25,
    category: 'Clothing',
    condition: 'Like New',
    images: ['https://photosevent.s3.us-east-1.amazonaws.com/sheridancollegehoodie.webp'],
    sellerId: 'user3',
    sellerName: 'Team Paine',
    createdAt: new Date(),
    status: 'Available',
    sellerContact: {
      email: 'team.paine@sheridancollege.ca',
      preferredMethod: 'email'
    },
  },
  {
    id: '4',
    title: 'Room for Rent - Near Davis Campus',
    description: 'Private room in a 2-bedroom apartment. All utilities included.',
    price: 800,
    category: 'Housing',
    condition: 'Good',
    images: ['https://photosevent.s3.us-east-1.amazonaws.com/room+for+rent.webp'],
    sellerId: 'user4',
    sellerName: 'Saad Brown',
    createdAt: new Date(),
    status: 'Available',
    sellerContact: {
      email: 'saad.brown@sheridancollege.ca',
      preferredMethod: 'phone'
    },
  },
  {
    id: '5',
    title: 'Photography Services',
    description: 'Professional photography services available for events and projects',
    price: 30,
    category: 'Services',
    condition: 'New',
    images: ['https://photosevent.s3.us-east-1.amazonaws.com/photograpgy+service.webp'],
    sellerId: 'user5',
    sellerName: 'Jack Cummings',
    createdAt: new Date(),
    status: 'Available',
    sellerContact: {
      email: 'jack.cummings@sheridancollege.ca',
      preferredMethod: 'email'
    },
  },
  {
    id: '6',
    title: 'Study Notes - Programming Fundamentals',
    description: 'Complete set of notes for first-year programming courses.',
    price: 0,
    category: 'Free',
    condition: 'Good',
    images: ['https://photosevent.s3.us-east-1.amazonaws.com/programming+notes.webp'],
    sellerId: 'user6',
    sellerName: 'Chris Davis',
    createdAt: new Date(),
    status: 'Available',
    sellerContact: {
      email: 'chris.davis@sheridancollege.ca',
      preferredMethod: 'email'
    },
  }
];

export const MARKETPLACE_CATEGORIES = [
  'All',
  'Books',
  'Electronics',
  'Clothing',
  'Housing',
  'Services',
  'Free'
] as const; 