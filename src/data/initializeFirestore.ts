import { db } from '../config/firebase';
import { collection } from 'firebase/firestore';

// Collection references
export const usersCollection = collection(db, 'users');
export const listingsCollection = collection(db, 'listings');
export const eventsCollection = collection(db, 'events');
export const chatsCollection = collection(db, 'chats');
export const confessionsCollection = collection(db, 'confessions');
export const votesCollection = collection(db, 'votes'); 