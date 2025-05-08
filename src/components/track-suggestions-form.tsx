"use client"

import { useState } from "react"
import { PopoverForm, PopoverFormButton, PopoverFormSuccess } from "./ui/popover-form"

interface TrackSuggestionData {
  trackTitle: string
  artist: string
  senderName: string
}

export function TrackSuggestionsForm() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState<TrackSuggestionData>({
    trackTitle: "",
    artist: "",
    senderName: "",
  })
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/track-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to submit suggestion')
      }

      setShowSuccess(true)
      setFormData({
        trackTitle: "",
        artist: "",
        senderName: "",
      })
    } catch (error) {
      console.error('Failed to submit suggestion:', error)
      setError(error instanceof Error ? error.message : 'Failed to submit suggestion')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <PopoverForm
      open={open}
      setOpen={setOpen}
      showSuccess={showSuccess}
      title="Suggest a Track"
      showCloseButton
      width="320px"
      height="280px"
    >
      {!showSuccess ? (
        <form onSubmit={handleSubmit} className="flex h-full flex-col p-3">
          <div className="flex flex-1 flex-col gap-3">
            <div>
              <label htmlFor="trackTitle" className="block text-sm font-medium text-muted-foreground mb-1">
                Track Title *
              </label>
              <input
                type="text"
                id="trackTitle"
                name="trackTitle"
                value={formData.trackTitle}
                onChange={handleChange}
                required
                className="w-full px-2 py-1.5 rounded-md border bg-transparent text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-primary"
                placeholder="Enter track title"
              />
            </div>

            <div>
              <label htmlFor="artist" className="block text-sm font-medium text-muted-foreground mb-1">
                Artist *
              </label>
              <input
                type="text"
                id="artist"
                name="artist"
                value={formData.artist}
                onChange={handleChange}
                required
                className="w-full px-2 py-1.5 rounded-md border bg-transparent text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-primary"
                placeholder="Enter artist name"
              />
            </div>

            <div>
              <label htmlFor="senderName" className="block text-sm font-medium text-muted-foreground mb-1">
                From *
              </label>
              <input
                type="text"
                id="senderName"
                name="senderName"
                value={formData.senderName}
                onChange={handleChange}
                required
                className="w-full px-2 py-1.5 rounded-md border bg-transparent text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-primary"
                placeholder="Your name"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>
          <div className="flex items-center justify-between pt-3">
            <p className="text-xs text-muted-foreground">
            </p>
            <PopoverFormButton loading={loading} text="Submit" />
          </div>
        </form>
      ) : (
        <PopoverFormSuccess
          title="Thank You!"
          description="Your track suggestion has been submitted successfully."
        />
      )}
    </PopoverForm>
  )
} 