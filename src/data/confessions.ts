import type { Confession } from '../types';

export const CONFESSION_LISTINGS: Confession[] = [
  {
    id: '1',
    content: "I've been pretending to understand calculus all semester. The professor thinks I'm doing great, but I'm just good at memorizing without understanding.",
    tags: ['Academic', 'Funny'],
    upvotes: 45,
    downvotes: 5,
    createdAt: new Date(),
    isFlagged: false,
    userVote: null
  },
  {
    id: '2',
    content: "I accidentally walked into the wrong classroom on the first day and sat through an entire lecture before realizing it wasn't my course.",
    tags: ['Social', 'Funny'],
    upvotes: 120,
    downvotes: 2,
    createdAt: new Date(),
    isFlagged: false,
    userVote: null
  }
];

export const CONFESSION_TAGS = [
  'Academic',
  'Social',
  'Personal',
  'Funny',
  'Campus Life',
  'Advice'
] as const; 