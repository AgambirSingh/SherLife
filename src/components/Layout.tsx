import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, MessageCircle, Calendar, Bookmark, User, LogOut, Sun, Moon } from 'lucide-react';
import { auth } from '../config/firebase';
import { useUser } from '../hooks/useUser';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const { user } = useUser();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/marketplace" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700">
              SherLife
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/marketplace"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/marketplace' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Marketplace</span>
              </Link>
              
              <Link
                to="/confessions"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/confessions' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confessions</span>
              </Link>

              <Link
                to="/events"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/events' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Events</span>
              </Link>

              <Link
                to="/resources"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/resources' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>Resources</span>
              </Link>

              <Link
                to="/profile"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/profile' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Link>

              <div className="flex items-center space-x-4">
               
                <button
                  onClick={() => auth.signOut()}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
                
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Toggle theme"
                >
                  {isDark ? (
                    <Sun className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
} 