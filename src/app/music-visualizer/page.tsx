'use client'

import { TrackSuggestionsForm } from "@/components/track-suggestions-form"

export default function MusicVisualizerPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Track Suggestions Form */}
      <div className="fixed top-4 left-4 z-50">
        <TrackSuggestionsForm />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">AI Music Visualizer</h1>
        {/* Add your music visualizer content here */}
      </div>
    </div>
  )
} 