import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

interface UserData {
  isProfileComplete: boolean;
  userId: string;
  email: string;
  photoURL: string;
  displayName: string;
  bio: string;
  major: string;
  graduationYear: string;
  createdAt: string;
  updatedAt: string;
}

export function ProfileSetup() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    displayName: '',
    bio: '',
    major: '',
    graduationYear: '',
    photoURL: user?.photoURL || '/default-avatar.jpg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.userId) return;

    try {
      const photoURL = user.photoURL || formData.photoURL || '/default-avatar.jpg';

      const userData: UserData = {
        isProfileComplete: true,
        userId: user.userId,
        email: user.email || '',
        photoURL,
        displayName: formData.displayName,
        bio: formData.bio || '',
        major: formData.major,
        graduationYear: formData.graduationYear,
        createdAt: formData.createdAt,
        updatedAt: formData.updatedAt
      };

      const cleanedUserData = Object.fromEntries(
        Object.entries(userData).map(([key, value]) => [key, value ?? ''])
      );

      await setDoc(doc(db, 'users', user.userId), cleanedUserData);
      navigate('/marketplace');
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Complete Your Profile</h2>
      <p className="text-gray-600 mb-6">Please complete your profile to continue</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Display Name *</label>
            <input
              type="text"
              required
              value={formData.displayName}
              onChange={(e) => setFormData(prev => ({...prev, displayName: e.target.value}))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({...prev, bio: e.target.value}))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Major *</label>
            <input
              type="text"
              required
              value={formData.major}
              onChange={(e) => setFormData(prev => ({...prev, major: e.target.value}))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Graduation Year *</label>
            <input
              type="number"
              required
              value={formData.graduationYear}
              onChange={(e) => setFormData(prev => ({...prev, graduationYear: e.target.value}))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
        >
          Complete Profile
        </button>
      </form>
    </div>
  );
}

export default ProfileSetup; 