import React, { useState, useCallback, useEffect } from 'react';
import { auth, storage, db } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Camera } from 'lucide-react';
import { programOptions, interestOptions } from '../data/profileOptions';
import { useProfile } from '../hooks/useProfile';
import type { User } from '../types/user';

function Profile() {
  const { profile, loading, error, updateProfile } = useProfile();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({
    firstName: '',
    lastName: '',
    studentId: '',
    programOfStudy: '',
    description: '',
    interests: [],
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        studentId: profile.studentId || '',
        programOfStudy: profile.programOfStudy || '',
        description: profile.description || '',
        interests: profile.interests || [],
      });
    }
  }, [profile]);

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleInputChange = useCallback((field: keyof User, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleInterestChange = useCallback((interest: string, checked: boolean) => {
    setFormData(prev => {
      const currentInterests = prev.interests || [];
      const newInterests = checked
        ? [...currentInterests, interest]
        : currentInterests.filter(i => i !== interest);
      
      return {
        ...prev,
        interests: newInterests
      };
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setIsSaving(true);
    
    try {
      const updatedData = {
        ...profile,
        ...formData,
        photoURL: imagePreview || profile?.photoURL || '/default-avatar.jpg',
        isProfileComplete: true,
        updatedAt: new Date(),
      };

      const cleanedData = Object.fromEntries(
        Object.entries(updatedData)
          .filter(([_, value]) => value !== undefined && value !== '')
      );

      await updateProfile(cleanedData, imageFile);
      setImageFile(null);
      setSuccessMessage('Profile updated successfully!');
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading && !profile) return <div>Loading...</div>;
  if (!profile) return <div>No profile found</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-md transition-opacity duration-500">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <img
              src={imagePreview || profile.photoURL || '/default-avatar.jpg'}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
            />
            <label
              htmlFor="photo-upload"
              className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50 border border-gray-200"
            >
              <Camera className="w-5 h-5 text-gray-600" />
              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              value={formData.firstName ?? profile.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              value={formData.lastName ?? profile.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Student ID</label>
            <input
              type="text"
              value={formData.studentId ?? profile.studentId}
              onChange={(e) => handleInputChange('studentId', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Program of Study</label>
            <select
              value={formData.programOfStudy ?? profile.programOfStudy}
              onChange={(e) => handleInputChange('programOfStudy', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select a program</option>
              {programOptions.map((program) => (
                <option key={program} value={program}>{program}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Interests</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {interestOptions.map((interest) => (
              <label key={interest} className="relative flex items-start py-2">
                <div className="min-w-0 flex-1 text-sm">
                  <input
                    type="checkbox"
                    checked={(formData.interests || profile.interests || []).includes(interest)}
                    onChange={(e) => handleInterestChange(interest, e.target.checked)}
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mr-2"
                  />
                  <span className="font-medium text-gray-700">{interest}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <p className="mt-1 text-sm text-gray-500">
            Tell us about yourself, your interests, and what you're looking to achieve.
          </p>
          <textarea
            value={formData.description ?? profile.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Write a brief description about yourself..."
          />
        </div>

        <div className="flex justify-end items-center space-x-4">
          {isSaving && (
            <span className="text-sm text-gray-500">
              Saving changes...
            </span>
          )}
          <button
            type="submit"
            disabled={isSaving}
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            {isSaving ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile; 