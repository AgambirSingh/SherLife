import type { Event } from '../types';

export const EVENT_LISTINGS: Event[] = [
  
    {
      id: '1',
      title: 'Sheridan Got Talent',
      description: 'Calling all Sheridan Stars!Show the world how bright you shine when you share your talents!',
      date: new Date('2025-02-11T17:00:00'),
      location: 'HMC The Station Atrium',
      link: 'https://www.thessu.ca/ssu-events/sheridans-got-talent-show#register',
      category: 'Social',
      organizerId: 'admin',
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'InnocaS.E 2.0 Case Competition',
      description: 'Participate in this 7-day case study competition for critical thinkers. Network, collaborate, and create real-life solutions!',
      date: new Date('2025-02-21T10:00:00'),
      location: 'Davis Campus: The Den',
      link: 'https://www.thessu.ca/ssu-events/innocase-20#register',
      category: 'Career',
      organizerId: 'admin',
      createdAt: new Date()
    },
    {
      id: '3',
      title: 'ISSession Black Hat Bureau CTF',
      description: 'Join the thrilling ISSessions Cybersecurity CTF at Sheridan—a decade-strong tradition of nationwide competition, skill-building, and networking!',
      date: new Date('2025-02-09T09:00:00'),
      location: 'KPMG Headquarters,333 Bay Street#4600, Toronto, Ontario',
      link: 'https://discord.gg/issessionsctf',
      category: 'Academic',
      organizerId: 'admin',
      createdAt: new Date()
    },
    {
      id: '4',
      title: 'Blended SFA/CPR C First Aid Class',
      description: 'Gain lifesaving care skills at the SSU’s FREE SFA/CPR C First Aid Class, partnered with Workplace Medical Corp.',
      date: new Date('2025-02-20T11:00:00'),
      location: 'TRC in the SSU Boardroom',
      link: 'https://www.thessu.ca/ssu-events/blended-sfa/cpr-c-first-aid-class-feb2025#register',
      category: 'Other',
      organizerId: 'admin',
      createdAt: new Date()
    },
];

export const EVENT_CATEGORIES = ['All', 'Academic', 'Social', 'Career', 'Other'] as const; 