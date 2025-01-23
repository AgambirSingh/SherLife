import React, { useState } from 'react';
import { MapPin, Link as LinkIcon, Calendar } from 'lucide-react';
import type { Event } from '../types';
import { EVENT_LISTINGS, EVENT_CATEGORIES } from '../data/events';

function Events() {
  const [selectedCategory, setSelectedCategory] = useState<typeof EVENT_CATEGORIES[number]>('All');

  const filteredEvents = EVENT_LISTINGS.filter(event => 
    selectedCategory === 'All' || event.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {EVENT_CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              selectedCategory === category
                ? 'bg-[#013767] text-white'
                : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                  <span className="px-3 py-1 text-sm bg-indigo-50 text-indigo-600 rounded-full">
                    {event.category}
                  </span>
                </div>
                <p className="mt-2 text-gray-600">{event.description}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      {event.date.toLocaleDateString(undefined, {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })} at {event.date.toLocaleTimeString(undefined, {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  {event.link && (
                    <div className="flex items-center text-indigo-600">
                      <LinkIcon className="w-4 h-4 mr-2" />
                      <a 
                        href={event.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:underline"
                      >
                        More Information
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-12 text-gray-500">
            No events found for this category
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;