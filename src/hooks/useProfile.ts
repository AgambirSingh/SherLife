import { useState } from 'react';
import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useUser } from './useUser';
import type { User } from '../types/user';

export function useProfile() {
  const { user, updateProfile: updateUserProfile } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadProfileImage = async (file: File): Promise<string> => {
    if (!user?.userId) {
      throw new Error('No user logged in');
    }
    
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size must be less than 5MB');
    }

    if (!file.type.startsWith('image/')) {
      throw new Error('File must be an image');
    }
    
    try {
      const storageRef = ref(storage, `profile-photos/${user.userId}`);
      await uploadBytes(storageRef, file);
      return getDownloadURL(storageRef);
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  };

  const updateProfile = async (data: Partial<User>, imageFile?: File | null) => {
    setLoading(true);
    setError(null);

    try {
      if (!user?.userId) throw new Error('No user logged in');

      let photoURL = data.photoURL;
      
      if (imageFile) {
        photoURL = await uploadProfileImage(imageFile);
      }

      const updatedData = {
        ...data,
        photoURL: photoURL || user.photoURL || '/default-avatar.jpg',
        updatedAt: new Date(),
      };

      // Clean any potential undefined or empty values
      const cleanedData = Object.fromEntries(
        Object.entries(updatedData)
          .filter(([_, value]) => value !== undefined && value !== '')
      );

      await updateUserProfile(cleanedData);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      setError(errorMessage);
      throw err;
    }
  };

  const checkProfileCompletion = (profile: Partial<User>): boolean => {
    const requiredFields: (keyof User)[] = [
      'firstName',
      'lastName',
      'studentId',
      'programOfStudy',
      'description'
    ];

    return requiredFields.every(field => 
      profile[field] && String(profile[field]).trim().length > 0
    );
  };

  return {
    profile: user,
    loading,
    error,
    updateProfile,
    checkProfileCompletion
  };
} 