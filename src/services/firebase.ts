import { db, storage } from '../config/firebase';
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  setDoc,
  increment
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import type { 
  UserProfile, 
  MarketplaceListing, 
  Event, 
  Confession,
  Message 
} from '../types';

// User Profile Services
export const userServices = {
  async createProfile(userId: string, profile: Partial<UserProfile>) {
    await setDoc(doc(db, 'users', userId), {
      ...profile,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  },

  async uploadProfilePhoto(userId: string, file: File) {
    const storageRef = ref(storage, `profile-photos/${userId}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  },

  async getProfile(userId: string) {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() as UserProfile : null;
  }
};

// Marketplace Services
export const marketplaceServices = {
  async createListing(listing: Partial<MarketplaceListing>) {
    return addDoc(collection(db, 'listings'), {
      ...listing,
      createdAt: new Date(),
      status: 'Available'
    });
  },

  async uploadListingImage(listingId: string, file: File, index: number) {
    const storageRef = ref(storage, `listing-images/${listingId}/${index}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  },

  async getListings(category?: string) {
    const q = category && category !== 'All'
      ? query(
          collection(db, 'listings'),
          where('category', '==', category),
          where('status', '==', 'Available'),
          orderBy('createdAt', 'desc')
        )
      : query(
          collection(db, 'listings'),
          where('status', '==', 'Available'),
          orderBy('createdAt', 'desc')
        );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as MarketplaceListing[];
  }
};

// Chat Services
export const chatServices = {
  async sendMessage(message: Partial<Message>) {
    return addDoc(collection(db, 'chats'), {
      ...message,
      timestamp: new Date()
    });
  },

  async getMessages(listingId: string, userId: string) {
    const q = query(
      collection(db, 'chats'),
      where('listingId', '==', listingId),
      where('participants', 'array-contains', userId),
      orderBy('timestamp', 'asc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Message[];
  }
};

// Events Services
export const eventServices = {
  async createEvent(event: Partial<Event>) {
    return addDoc(collection(db, 'events'), {
      ...event,
      createdAt: new Date()
    });
  },

  async getEvents(category?: string) {
    const q = category && category !== 'All'
      ? query(
          collection(db, 'events'),
          where('category', '==', category),
          where('date', '>=', new Date()),
          orderBy('date', 'asc')
        )
      : query(
          collection(db, 'events'),
          where('date', '>=', new Date()),
          orderBy('date', 'asc')
        );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Event[];
  }
};

// Confessions Services
export const confessionServices = {
  async createConfession(confession: Partial<Confession>) {
    return addDoc(collection(db, 'confessions'), {
      ...confession,
      upvotes: 0,
      downvotes: 0,
      isFlagged: false,
      createdAt: new Date()
    });
  },

  async updateVote(confessionId: string, userId: string, isUpvote: boolean) {
    const confessionRef = doc(db, 'confessions', confessionId);
    const userVoteRef = doc(db, 'votes', `${confessionId}_${userId}`);

    // Update vote count and store user's vote
    await updateDoc(confessionRef, {
      [isUpvote ? 'upvotes' : 'downvotes']: increment(1)
    });
    
    await setDoc(userVoteRef, {
      userId,
      confessionId,
      vote: isUpvote ? 'up' : 'down',
      timestamp: new Date()
    });
  },

  async flagConfession(confessionId: string) {
    const confessionRef = doc(db, 'confessions', confessionId);
    await updateDoc(confessionRef, {
      isFlagged: true,
      reports: increment(1)
    });
  }
}; 