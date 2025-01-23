import { auth } from '../config/firebase';
import { signInWithCustomToken } from 'firebase/auth';
import { userServices } from './firebase';

// Add this function to test the token
async function testFirebaseToken(user: any) {
  try {
    const claims = await user.getIdTokenClaims();
    console.log('Auth0 claims:', claims);
    
    if (!claims.firebase_token) {
      throw new Error('FIREBASE_TOKEN_MISSING');
    }
    
    await signInWithCustomToken(auth, claims.firebase_token);
    console.log('Firebase authentication successful');
    return true;
  } catch (error: any) {
    if (error.message === 'FIREBASE_TOKEN_MISSING') {
      console.error('Firebase token not found in claims. Auth0 Action might not be configured correctly.');
    } else {
      console.error('Firebase authentication error:', error);
    }
    return false;
  }
}

export const authServices = {
  async linkWithFirebase(user: any) {
    const success = await testFirebaseToken(user);
    if (!success) {
      throw new Error('FIREBASE_AUTH_FAILED');
    }
  },

  async syncUserProfile(userId: string, auth0Profile: any) {
    try {
      const existingProfile = await userServices.getProfile(userId);
      
      if (!existingProfile) {
        await userServices.createProfile(userId, {
          firstName: auth0Profile.given_name || '',
          lastName: auth0Profile.family_name || '',
          email: auth0Profile.email,
          photoURL: auth0Profile.picture,
          studentId: '',
          course: '',
          interests: []
        });
      }
    } catch (error) {
      console.error('Error syncing user profile:', error);
      throw error;
    }
  }
}; 