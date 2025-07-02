import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  User, 
  Mail, 
  Instagram, 
  Youtube, 
  Music,
  ExternalLink,
  X,
  Eye,
  Edit
} from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { mockArtists } from '../data/mockData';
import { Artist } from '../types';

export default function Artists() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [newArtist, setNewArtist] = useState({
    name: '',
    email: '',
    bio: '',
    socialLinks: {
      instagram: '',
      youtube: '',
      spotify: '',
      appleMusic: ''
    }
  });

  const filteredArtists = mockArtists.filter(artist => 
    artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (artist.email && artist.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddArtist = () => {
    // Handle artist creation logic
    console.log('Adding artist:', newArtist);
    setShowAddModal(false);
    setNewArtist({
      name: '',
      email: '',
      bio: '',
      socialLinks: {
        instagram: '',
        youtube: '',
        spotify: '',
        appleMusic: ''
      }
    });
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      case 'spotify':
      case 'appleMusic':
        return <Music className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return 'text-pink-600 hover:text-pink-700';
      case 'youtube':
        return 'text-red-600 hover:text-red-700';
      case 'spotify':
        return 'text-green-600 hover:text-green-700';
      case 'appleMusic':
        return 'text-gray-900 hover:text-black dark:text-white dark:hover:text-gray-300';
      default:
        return 'text-gray-600 hover:text-gray-700';
    }
  };

  const ArtistDetailsModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Artist Details
            </h3>
            <button
              onClick={() => setShowDetailsModal(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {selectedArtist && (
            <div className="space-y-6">
              {/* Artist Info */}
              <div className="flex items-center gap-4">
                <img
                  src={selectedArtist.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedArtist.name)}&background=8B5CF6&color=fff`}
                  alt={selectedArtist.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedArtist.name}
                  </h4>
                  {selectedArtist.email && (
                    <p className="text-gray-600 dark:text-gray-400">{selectedArtist.email}</p>
                  )}
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Joined {new Date(selectedArtist.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Bio */}
              {selectedArtist.bio && (
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">Bio</h5>
                  <p className="text-gray-600 dark:text-gray-400">{selectedArtist.bio}</p>
                </div>
              )}

              {/* Social Links */}
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white mb-3">Social Links</h5>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(selectedArtist.socialLinks).map(([platform, url]) => {
                    if (!url) return null;
                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors ${getPlatformColor(platform)}`}
                      >
                        {getPlatformIcon(platform)}
                        <span className="font-medium capitalize">{platform === 'appleMusic' ? 'Apple Music' : platform}</span>
                        <ExternalLink className="w-3 h-3 ml-auto" />
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="outline"
                  onClick={() => setShowDetailsModal(false)}
                  className="flex-1"
                >
                  Close
                </Button>
                <Button
                  icon={<Edit className="w-4 h-4" />}
                  className="flex-1"
                >
                  Edit Artist
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Artists Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your artists and their profiles
          </p>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          icon={<Plus className="w-5 h-5" />}
          size="lg"
          className="w-full sm:w-auto"
        >
          Add Artist
        </Button>
      </div>

      {/* Search */}
      <Card>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search artists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </Card>

      {/* Artists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArtists.map((artist, index) => (
          <motion.div
            key={artist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={artist.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(artist.name)}&background=8B5CF6&color=fff`}
                    alt={artist.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {artist.name}
                    </h3>
                    {artist.email && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {artist.email}
                      </p>
                    )}
                  </div>
                </div>

                {artist.bio && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {artist.bio}
                  </p>
                )}

                {/* Social Links Preview */}
                <div className="flex items-center gap-2">
                  {Object.entries(artist.socialLinks).map(([platform, url]) => {
                    if (!url) return null;
                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors ${getPlatformColor(platform)}`}
                        title={platform === 'appleMusic' ? 'Apple Music' : platform}
                      >
                        {getPlatformIcon(platform)}
                      </a>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      icon={<Eye className="w-4 h-4" />}
                      onClick={() => {
                        setSelectedArtist(artist);
                        setShowDetailsModal(true);
                      }}
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<Edit className="w-4 h-4" />}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add Artist Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add New Artist
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Artist Name *
                </label>
                <input
                  type="text"
                  value={newArtist.name}
                  onChange={(e) => setNewArtist(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter artist name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={newArtist.email}
                  onChange={(e) => setNewArtist(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  value={newArtist.bio}
                  onChange={(e) => setNewArtist(prev => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Tell us about the artist..."
                />
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900 dark:text-white">Social Links</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Instagram *
                  </label>
                  <input
                    type="url"
                    value={newArtist.socialLinks.instagram}
                    onChange={(e) => setNewArtist(prev => ({ 
                      ...prev, 
                      socialLinks: { ...prev.socialLinks, instagram: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="https://instagram.com/artist"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    YouTube
                  </label>
                  <input
                    type="url"
                    value={newArtist.socialLinks.youtube}
                    onChange={(e) => setNewArtist(prev => ({ 
                      ...prev, 
                      socialLinks: { ...prev.socialLinks, youtube: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="https://youtube.com/@artist"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Spotify
                  </label>
                  <input
                    type="url"
                    value={newArtist.socialLinks.spotify}
                    onChange={(e) => setNewArtist(prev => ({ 
                      ...prev, 
                      socialLinks: { ...prev.socialLinks, spotify: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="https://open.spotify.com/artist/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Apple Music
                  </label>
                  <input
                    type="url"
                    value={newArtist.socialLinks.appleMusic}
                    onChange={(e) => setNewArtist(prev => ({ 
                      ...prev, 
                      socialLinks: { ...prev.socialLinks, appleMusic: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="https://music.apple.com/artist/..."
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowAddModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddArtist}
                disabled={!newArtist.name || !newArtist.socialLinks.instagram}
                className="flex-1"
              >
                Add Artist
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Artist Details Modal */}
      {showDetailsModal && <ArtistDetailsModal />}

      {filteredArtists.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No artists found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Get started by adding your first artist
          </p>
          <Button onClick={() => setShowAddModal(true)}>
            Add Artist
          </Button>
        </div>
      )}
    </div>
  );
}