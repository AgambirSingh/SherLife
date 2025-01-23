import React, { useState, useCallback } from 'react';
import { ThumbsUp, ThumbsDown, Flag, Search, Send, AlertTriangle } from 'lucide-react';
import type { Confession } from '../types';
import { CONFESSION_LISTINGS, CONFESSION_TAGS } from '../data/confessions';

function Confessions() {
  const [confessions, setConfessions] = useState(CONFESSION_LISTINGS);
  const [newConfession, setNewConfession] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTags, setSearchTags] = useState<string[]>([]);

  const handleVote = useCallback((confessionId: string, isUpvote: boolean) => {
    setConfessions(prev => prev.map(confession => {
      if (confession.id === confessionId) {
        // If user has already voted, prevent voting again
        if (confession.userVote !== null) {
          return confession;
        }

        return {
          ...confession,
          upvotes: isUpvote ? confession.upvotes + 1 : confession.upvotes,
          downvotes: !isUpvote ? confession.downvotes + 1 : confession.downvotes,
          userVote: isUpvote ? 'up' : 'down'
        };
      }
      return confession;
    }));
  }, []);

  const handleFlag = useCallback((confessionId: string) => {
    setConfessions(prev => prev.map(confession => {
      if (confession.id === confessionId) {
        return {
          ...confession,
          isFlagged: true
        };
      }
      return confession;
    }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (!newConfession.trim() || selectedTags.length === 0) return;

    const newPost: Confession = {
      id: Date.now().toString(),
      content: newConfession,
      tags: selectedTags,
      upvotes: 0,
      downvotes: 0,
      createdAt: new Date(),
      isFlagged: false,
      userVote: null
    };

    setConfessions(prev => [newPost, ...prev]);
    setNewConfession('');
    setSelectedTags([]);
  }, [newConfession, selectedTags]);

  const filteredConfessions = confessions.filter(confession => {
    const matchesSearch = confession.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      confession.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTags = searchTags.length === 0 || 
      searchTags.some(tag => confession.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  return (
    <div className="space-y-6">
      {/* Search Navigation */}
      <div className="sticky top-0 z-10 bg-white shadow-sm rounded-lg p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search confessions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CONFESSION_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchTags(prev => 
                  prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                )}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  searchTags.includes(tag)
                    ? 'bg-[#013767] text-white'
                    : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Post Confession */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <textarea
          placeholder="Share your confession anonymously..."
          value={newConfession}
          onChange={(e) => setNewConfession(e.target.value)}
          className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {CONFESSION_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTags(prev => 
                  prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                )}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-[#013767] text-white'
                    : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            disabled={!newConfession.trim() || selectedTags.length === 0}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4 mr-2" />
            Post Anonymously
          </button>
        </div>
      </div>

      {/* Confessions List */}
      <div className="space-y-4">
        {filteredConfessions.map((confession) => (
          <div key={confession.id} className="bg-white p-6 rounded-lg shadow-md">
            {confession.isFlagged && (
              <div className="mb-4 flex items-center p-3 bg-yellow-50 text-yellow-800 rounded-lg">
                <AlertTriangle className="w-5 h-5 mr-2" />
                <span>This confession has been flagged for review.</span>
              </div>
            )}
            <p className="text-gray-800">{confession.content}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {confession.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-indigo-50 text-indigo-600 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex space-x-4">
                <button
                  onClick={() => handleVote(confession.id, true)}
                  disabled={confession.userVote !== null}
                  className={`flex items-center space-x-1 ${
                    confession.userVote === 'up'
                      ? 'text-indigo-600'
                      : confession.userVote === null
                      ? 'text-gray-500 hover:text-indigo-600'
                      : 'text-gray-300 cursor-not-allowed'
                  }`}
                  title={confession.userVote !== null ? "You've already voted" : "Upvote this confession"}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{confession.upvotes}</span>
                </button>
                <button
                  onClick={() => handleVote(confession.id, false)}
                  disabled={confession.userVote !== null}
                  className={`flex items-center space-x-1 ${
                    confession.userVote === 'down'
                      ? 'text-red-600'
                      : confession.userVote === null
                      ? 'text-gray-500 hover:text-red-600'
                      : 'text-gray-300 cursor-not-allowed'
                  }`}
                  title={confession.userVote !== null ? "You've already voted" : "Downvote this confession"}
                >
                  <ThumbsDown className="w-4 h-4" />
                  <span>{confession.downvotes}</span>
                </button>
              </div>
              <button
                onClick={() => handleFlag(confession.id)}
                disabled={confession.isFlagged}
                className={`${
                  confession.isFlagged
                    ? 'text-red-500 cursor-not-allowed'
                    : 'text-gray-400 hover:text-red-500'
                }`}
                title={confession.isFlagged ? "This confession has been flagged" : "Flag inappropriate content"}
              >
                <Flag className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Confessions;