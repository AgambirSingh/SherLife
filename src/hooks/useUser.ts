import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

interface User {
  userId: string;
  email: string | null;
  photoURL: string | null;
  // ... other user properties
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context as UserContextType;
}; 