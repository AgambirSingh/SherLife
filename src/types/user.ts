export interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  studentId: string;
  programOfStudy: string;
  interests: string[];
  description: string;
  photoURL: string;
  isProfileComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
} 