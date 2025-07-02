import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Music, 
  Image, 
  Calendar, 
  Users, 
  Save, 
  Eye,
  X,
  Plus,
  Check,
  Building2,
  User
} from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { mockLabels, mockArtists } from '../data/mockData';

interface Track {
  id: string;
  title: string;
  duration: string;
  file?: File;
}

export default function CreateRelease() {
  const [currentStep, setCurrentStep] = useState(1);
  const [releaseData, setReleaseData] = useState({
    title: '',
    artist: '',
    artistId: '',
    labelId: '',
    type: 'single' as 'single' | 'ep' | 'album',
    releaseDate: '',
    genres: [] as string[],
    collaborators: [] as string[],
    description: '',
    artwork: null as File | null,
    artworkPreview: '',
    socialLinks: {
      youtube: '',
      instagram: ''
    }
  });
  
  const [tracks, setTracks] = useState<Track[]>([
    { id: '1', title: '', duration: '' }
  ]);
  
  const [isDraft, setIsDraft] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const steps = [
    { id: 1, title: 'Basic Info', description: 'Release details and metadata' },
    { id: 2, title: 'Artwork', description: 'Upload your cover art' },
    { id: 3, title: 'Tracks', description: 'Add your music files' },
    { id: 4, title: 'Details', description: 'Additional information' },
    { id: 5, title: 'Review', description: 'Review and submit' }
  ];

  const genreOptions = [
    'Pop', 'Rock', 'Hip-Hop', 'Electronic', 'Jazz', 'Classical', 'Country', 
    'R&B', 'Indie', 'Alternative', 'Folk', 'Blues', 'Reggae', 'Punk', 'Metal'
  ];

  const approvedLabels = mockLabels.filter(label => label.status === 'approved');

  const handleArtworkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReleaseData(prev => ({ ...prev, artwork: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setReleaseData(prev => ({ ...prev, artworkPreview: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTrackUpload = (trackId: string, file: File) => {
    setTracks(prev => prev.map(track => 
      track.id === trackId ? { ...track, file } : track
    ));
  };

  const addTrack = () => {
    setTracks(prev => [...prev, { 
      id: Date.now().toString(), 
      title: '', 
      duration: '' 
    }]);
  };

  const removeTrack = (trackId: string) => {
    setTracks(prev => prev.filter(track => track.id !== trackId));
  };

  const handleGenreToggle = (genre: string) => {
    setReleaseData(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const handleSubmit = async (asDraft = false) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          // Handle successful upload
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    setIsDraft(asDraft);
  };

  const canSubmitForPitching = () => {
    const releaseDate = new Date(releaseData.releaseDate);
    const now = new Date();
    const diffTime = releaseDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 21;
  };

  const getSelectedArtist = () => {
    return mockArtists.find(artist => artist.id === releaseData.artistId);
  };

  const getSelectedLabel = () => {
    return approvedLabels.find(label => label.id === releaseData.labelId);
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
              currentStep >= step.id 
                ? 'bg-purple-600 border-purple-600 text-white' 
                : 'border-gray-300 dark:border-gray-600 text-gray-400'
            }`}>
              {currentStep > step.id ? (
                <Check className="w-5 h-5" />
              ) : (
                <span className="text-sm font-medium">{step.id}</span>
              )}
            </div>
            <div className="mt-2 text-center">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{step.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">{step.description}</p>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-4 ${
              currentStep > step.id ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-4 lg:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          Create New Release
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Upload your music and share it with the world
        </p>
      </div>

      <Card>
        <StepIndicator />

        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Release Title *
                </label>
                <input
                  type="text"
                  value={releaseData.title}
                  onChange={(e) => setReleaseData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter release title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Artist *
                </label>
                <select
                  value={releaseData.artistId}
                  onChange={(e) => {
                    const selectedArtist = mockArtists.find(artist => artist.id === e.target.value);
                    setReleaseData(prev => ({ 
                      ...prev, 
                      artistId: e.target.value,
                      artist: selectedArtist?.name || ''
                    }));
                  }}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select an artist</option>
                  {mockArtists.map(artist => (
                    <option key={artist.id} value={artist.id}>{artist.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Label (Optional)
                </label>
                <select
                  value={releaseData.labelId}
                  onChange={(e) => setReleaseData(prev => ({ ...prev, labelId: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">No label (Independent)</option>
                  {approvedLabels.map(label => (
                    <option key={label.id} value={label.id}>{label.name}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Only approved labels are shown
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Release Type *
                </label>
                <select
                  value={releaseData.type}
                  onChange={(e) => setReleaseData(prev => ({ ...prev, type: e.target.value as any }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="single">Single</option>
                  <option value="ep">EP</option>
                  <option value="album">Album</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Release Date *
              </label>
              <input
                type="date"
                value={releaseData.releaseDate}
                onChange={(e) => setReleaseData(prev => ({ ...prev, releaseDate: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Genres (Select up to 3)
              </label>
              <div className="flex flex-wrap gap-2">
                {genreOptions.map(genre => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => handleGenreToggle(genre)}
                    disabled={!releaseData.genres.includes(genre) && releaseData.genres.length >= 3}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      releaseData.genres.includes(genre)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    } ${
                      !releaseData.genres.includes(genre) && releaseData.genres.length >= 3
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Artist/Label Info */}
            {(releaseData.artistId || releaseData.labelId) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {releaseData.artistId && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-900 dark:text-blue-300">
                          {getSelectedArtist()?.name}
                        </p>
                        <p className="text-sm text-blue-700 dark:text-blue-400">
                          Selected Artist
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {releaseData.labelId && (
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-purple-900 dark:text-purple-300">
                          {getSelectedLabel()?.name}
                        </p>
                        <p className="text-sm text-purple-700 dark:text-purple-400">
                          Selected Label
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {releaseData.releaseDate && canSubmitForPitching() && (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800 dark:text-green-300">
                    Pitching Available!
                  </span>
                </div>
                <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                  Your release is scheduled {Math.ceil((new Date(releaseData.releaseDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days in advance, making it eligible for playlist pitching.
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Step 2: Artwork */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8">
                {releaseData.artworkPreview ? (
                  <div className="relative inline-block">
                    <img
                      src={releaseData.artworkPreview}
                      alt="Artwork preview"
                      className="w-64 h-64 object-cover rounded-lg mx-auto"
                    />
                    <button
                      onClick={() => setReleaseData(prev => ({ ...prev, artwork: null, artworkPreview: '' }))}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Upload Artwork
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Minimum 3000x3000 pixels, JPG or PNG format
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleArtworkUpload}
                      className="hidden"
                      id="artwork-upload"
                    />
                    <label htmlFor="artwork-upload">
                      <Button as="span" icon={<Upload className="w-4 h-4" />}>
                        Choose File
                      </Button>
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Artwork Guidelines</h4>
              <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
                <li>• Minimum resolution: 3000x3000 pixels</li>
                <li>• Square aspect ratio (1:1)</li>
                <li>• No text smaller than 12pt</li>
                <li>• No blurry or pixelated images</li>
                <li>• File size under 10MB</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Step 3: Tracks */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              {tracks.map((track, index) => (
                <div key={track.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Track {index + 1}
                    </h4>
                    {tracks.length > 1 && (
                      <button
                        onClick={() => removeTrack(track.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Track Title *
                      </label>
                      <input
                        type="text"
                        value={track.title}
                        onChange={(e) => setTracks(prev => prev.map(t => 
                          t.id === track.id ? { ...t, title: e.target.value } : t
                        ))}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Enter track title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={track.duration}
                        onChange={(e) => setTracks(prev => prev.map(t => 
                          t.id === track.id ? { ...t, duration: e.target.value } : t
                        ))}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="3:45"
                      />
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
                    {track.file ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Music className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-900 dark:text-white">{track.file.name}</span>
                        </div>
                        <button
                          onClick={() => setTracks(prev => prev.map(t => 
                            t.id === track.id ? { ...t, file: undefined } : t
                          ))}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Music className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          Upload audio file (WAV, FLAC, or high-quality MP3)
                        </p>
                        <input
                          type="file"
                          accept="audio/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleTrackUpload(track.id, file);
                          }}
                          className="hidden"
                          id={`track-upload-${track.id}`}
                        />
                        <label htmlFor={`track-upload-${track.id}`}>
                          <Button
                            as="span"
                            variant="outline"
                            size="sm"
                            icon={<Upload className="w-4 h-4" />}
                          >
                            Choose File
                          </Button>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addTrack}
              className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-purple-500 hover:text-purple-600 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Another Track
            </button>
          </motion.div>
        )}

        {/* Step 4: Details */}
        {currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={releaseData.description}
                onChange={(e) => setReleaseData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Tell people about your release..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Collaborators (Email addresses)
              </label>
              <input
                type="text"
                placeholder="Enter email addresses separated by commas"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Collaborators will be able to view and edit this release
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  YouTube Link
                </label>
                <input
                  type="url"
                  value={releaseData.socialLinks.youtube}
                  onChange={(e) => setReleaseData(prev => ({ 
                    ...prev, 
                    socialLinks: { ...prev.socialLinks, youtube: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="https://youtu.be/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Instagram Reel
                </label>
                <input
                  type="url"
                  value={releaseData.socialLinks.instagram}
                  onChange={(e) => setReleaseData(prev => ({ 
                    ...prev, 
                    socialLinks: { ...prev.socialLinks, instagram: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="https://instagram.com/reel/..."
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 5: Review */}
        {currentStep === 5 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Release Summary
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Title:</span>
                    <p className="font-medium text-gray-900 dark:text-white">{releaseData.title}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Artist:</span>
                    <p className="font-medium text-gray-900 dark:text-white">{getSelectedArtist()?.name}</p>
                  </div>
                  {releaseData.labelId && (
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Label:</span>
                      <p className="font-medium text-gray-900 dark:text-white">{getSelectedLabel()?.name}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Type:</span>
                    <p className="font-medium text-gray-900 dark:text-white capitalize">{releaseData.type}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Release Date:</span>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {new Date(releaseData.releaseDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Genres:</span>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {releaseData.genres.join(', ')}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Tracks:</span>
                    <p className="font-medium text-gray-900 dark:text-white">{tracks.length}</p>
                  </div>
                  {releaseData.artworkPreview && (
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Artwork:</span>
                      <img
                        src={releaseData.artworkPreview}
                        alt="Artwork"
                        className="w-16 h-16 object-cover rounded-lg mt-1"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {isUploading && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Uploading Release...
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {uploadProgress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-8 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>

          <div className="flex gap-3">
            {currentStep === 5 ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleSubmit(true)}
                  disabled={isUploading}
                  icon={<Save className="w-4 h-4" />}
                >
                  Save as Draft
                </Button>
                <Button
                  onClick={() => handleSubmit(false)}
                  disabled={isUploading}
                  icon={<Upload className="w-4 h-4" />}
                >
                  Submit for Review
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setCurrentStep(prev => Math.min(5, prev + 1))}
                icon={<Eye className="w-4 h-4" />}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}