'use client';

import { useState } from 'react';

interface TrackSuggestionFormProps {
  onSubmit: (data: TrackSuggestionData) => void;
}

interface TrackSuggestionData {
  trackName: string;
  artistName: string;
  senderName: string;
  message?: string;
}

export default function TrackSuggestionForm({ onSubmit }: TrackSuggestionFormProps) {
  const [formData, setFormData] = useState<TrackSuggestionData>({
    trackName: '',
    artistName: '',
    senderName: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/track-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit suggestion');
      }

      setStatus('success');
      onSubmit(formData);
      setFormData({
        trackName: '',
        artistName: '',
        senderName: '',
        message: '',
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Suggest a Track</h2>
      
      {status === 'success' && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Your track suggestion has been submitted.</span>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {errorMessage}</span>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="senderName" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name *
          </label>
          <input
            type="text"
            id="senderName"
            name="senderName"
            value={formData.senderName}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-50"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="trackName" className="block text-sm font-medium text-gray-700 mb-1">
            Track Name *
          </label>
          <input
            type="text"
            id="trackName"
            name="trackName"
            value={formData.trackName}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-50"
            placeholder="Enter track name"
          />
        </div>

        <div>
          <label htmlFor="artistName" className="block text-sm font-medium text-gray-700 mb-1">
            Artist Name *
          </label>
          <input
            type="text"
            id="artistName"
            name="artistName"
            value={formData.artistName}
            onChange={handleChange}
            required
            disabled={status === 'loading'}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-50"
            placeholder="Enter artist name"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message (Optional)
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            disabled={status === 'loading'}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-50"
            placeholder="Any additional comments about the track..."
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Submitting...' : 'Submit Suggestion'}
      </button>
    </form>
  );
} 