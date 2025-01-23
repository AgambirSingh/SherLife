import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { User } from '../types/user';

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          const userData = userDoc.data() as User | undefined;
          
          setUser(userData || {
            userId: firebaseUser.uid,
            email: firebaseUser.email || '',
            photoURL: firebaseUser.photoURL || '/default-avatar.jpg',
            isProfileComplete: false,
            firstName: '',
            lastName: '',
            studentId: '',
            programOfStudy: '',
            interests: [],
            description: '',
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateProfile = async (data: Partial<User>) => {
    if (!user?.userId) throw new Error('No user logged in');

    try {
      const updatedData = {
        ...data,
        updatedAt: new Date(),
        photoURL: data.photoURL || user.photoURL || '/default-avatar.jpg',
      };

      // Clean undefined values
      const cleanedData = Object.fromEntries(
        Object.entries(updatedData)
          .filter(([_, value]) => value !== undefined)
          .map(([key, value]) => [key, value === null ? '' : value])
      );

      await setDoc(doc(db, 'users', user.userId), cleanedData, { merge: true });
      setUser(prev => prev ? { ...prev, ...cleanedData } : null);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
      throw err;
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, error, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 