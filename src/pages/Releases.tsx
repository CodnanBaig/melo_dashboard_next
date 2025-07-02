import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Play, 
  Eye, 
  Edit, 
  Copy, 
  ExternalLink,
  Calendar,
  Users,
  Link as LinkIcon,
  Send
} from 'lucide-react';
import { Menu } from '@headlessui/react';
import Card from '../components/UI/Card';
import StatusBadge from '../components/UI/StatusBadge';
import Button from '../components/UI/Button';
import { mockReleases } from '../data/mockData';
import { Release } from '../types';

export default function Releases() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showHyperlinkModal, setShowHyperlinkModal] = useState(false);
  const [showPitchModal, setShowPitchModal] = useState(false);
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);

  const [hyperlinkData, setHyperlinkData] = useState({
    youtube: '',
    instagram: '',
    spotify: '',
    amazon: '',
    apple: ''
  });

  const [pitchData, setPitchData] = useState({
    genre: '',
    mood: '',
    description: '',
    targetPlaylists: ''
  });

  const filteredReleases = mockReleases.filter(release => {
    const matchesSearch = release.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         release.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || release.status === statusFilter;
    const matchesType = typeFilter === 'all' || release.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleGenerateHyperlink = () => {
    // Handle hyperlink generation logic
    console.log('Generating hyperlink for:', selectedRelease?.title, hyperlinkData);
    setShowHyperlinkModal(false);
    setHyperlinkData({
      youtube: '',
      instagram: '',
      spotify: '',
      amazon: '',
      apple: ''
    });
  };

  const handleSubmitPitch = () => {
    // Handle pitch submission logic
    console.log('Submitting pitch for:', selectedRelease?.title, pitchData);
    setShowPitchModal(false);
    setPitchData({
      genre: '',
      mood: '',
      description: '',
      targetPlaylists: ''
    });
  };

  const QuickActions = ({ release }: { release: Release }) => (
    <Menu as="div" className="relative">
      <Menu.Button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
        <MoreHorizontal className="w-4 h-4" />
      </Menu.Button>
      <Menu.Items className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-10">
        <Menu.Item>
          {({ active }) => (
            <Link
              href={`/releases/${release.id}`}
              className={`flex items-center gap-2 px-4 py-2 text-sm ${
                active ? 'bg-gray-100 dark:bg-gray-700' : ''
              } text-gray-700 dark:text-gray-300`}
            >
              <Eye className="w-4 h-4" />
              View Details
            </Link>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`flex items-center gap-2 px-4 py-2 text-sm w-full text-left ${
                active ? 'bg-gray-100 dark:bg-gray-700' : ''
              } text-gray-700 dark:text-gray-300`}
            >
              <Edit className="w-4 h-4" />
              Edit Release
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`flex items-center gap-2 px-4 py-2 text-sm w-full text-left ${
                active ? 'bg-gray-100 dark:bg-gray-700' : ''
              } text-gray-700 dark:text-gray-300`}
            >
              <Copy className="w-4 h-4" />
              Duplicate Release
            </button>
          )}
        </Menu.Item>
        {release.status === 'live' && release.smartLink && (
          <Menu.Item>
            {({ active }) => (
              <Link
                href={`/releases/${release.id}/smart-link`}
                className={`flex items-center gap-2 px-4 py-2 text-sm ${
                  active ? 'bg-gray-100 dark:bg-gray-700' : ''
                } text-gray-700 dark:text-gray-300`}
              >
                <ExternalLink className="w-4 h-4" />
                Smart Link
              </Link>
            )}
          </Menu.Item>
        )}
      </Menu.Items>
    </Menu>
  );

  const HyperlinkModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Generate Hyperlink - {selectedRelease?.title}
        </h3>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Add platform links to create a smart hyperlink page for your release.
          </p>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              YouTube Link
            </label>
            <input
              type="url"
              value={hyperlinkData.youtube}
              onChange={(e) => setHyperlinkData(prev => ({ ...prev, youtube: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="https://youtu.be/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Instagram Link
            </label>
            <input
              type="url"
              value={hyperlinkData.instagram}
              onChange={(e) => setHyperlinkData(prev => ({ ...prev, instagram: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="https://instagram.com/reel/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Spotify Link
            </label>
            <input
              type="url"
              value={hyperlinkData.spotify}
              onChange={(e) => setHyperlinkData(prev => ({ ...prev, spotify: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="https://open.spotify.com/track/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amazon Music Link
            </label>
            <input
              type="url"
              value={hyperlinkData.amazon}
              onChange={(e) => setHyperlinkData(prev => ({ ...prev, amazon: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="https://music.amazon.com/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Apple Music Link
            </label>
            <input
              type="url"
              value={hyperlinkData.apple}
              onChange={(e) => setHyperlinkData(prev => ({ ...prev, apple: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="https://music.apple.com/..."
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => setShowHyperlinkModal(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleGenerateHyperlink}
            className="flex-1"
            icon={<LinkIcon className="w-4 h-4" />}
          >
            Generate Link
          </Button>
        </div>
      </motion.div>
    </div>
  );

  const PitchModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Pitch to Playlists - {selectedRelease?.title}
        </h3>
        
        <div className="space-y-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              Submit your verified release for playlist consideration. Our team will review and pitch to relevant curators.
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Primary Genre
            </label>
            <select
              value={pitchData.genre}
              onChange={(e) => setPitchData(prev => ({ ...prev, genre: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Select genre</option>
              <option value="pop">Pop</option>
              <option value="rock">Rock</option>
              <option value="hip-hop">Hip-Hop</option>
              <option value="electronic">Electronic</option>
              <option value="indie">Indie</option>
              <option value="alternative">Alternative</option>
              <option value="jazz">Jazz</option>
              <option value="classical">Classical</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mood/Vibe
            </label>
            <select
              value={pitchData.mood}
              onChange={(e) => setPitchData(prev => ({ ...prev, mood: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Select mood</option>
              <option value="energetic">Energetic</option>
              <option value="chill">Chill</option>
              <option value="uplifting">Uplifting</option>
              <option value="melancholic">Melancholic</option>
              <option value="romantic">Romantic</option>
              <option value="aggressive">Aggressive</option>
              <option value="peaceful">Peaceful</option>
              <option value="party">Party</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={pitchData.description}
              onChange={(e) => setPitchData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Describe your track, its story, and why it would be a good fit for playlists..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Target Playlists (Optional)
            </label>
            <input
              type="text"
              value={pitchData.targetPlaylists}
              onChange={(e) => setPitchData(prev => ({ ...prev, targetPlaylists: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Specific playlists you'd like to target (comma separated)"
            />
          </div>

          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-300">
              <strong>Note:</strong> Pitching results are not guaranteed. Our team will do their best to match your music with suitable playlists.
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => setShowPitchModal(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmitPitch}
            disabled={!pitchData.genre || !pitchData.mood || !pitchData.description}
            className="flex-1"
            icon={<Send className="w-4 h-4" />}
          >
            Submit Pitch
          </Button>
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
            Your Releases
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and track all your music releases
          </p>
        </div>
        <Link href="/releases/create">
          <Button
            icon={<Plus className="w-5 h-5" />}
            size="lg"
            className="w-full sm:w-auto"
          >
            New Release
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search releases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="live">Live</option>
              <option value="verified">Verified</option>
              <option value="draft">Draft</option>
              <option value="under-review">Under Review</option>
              <option value="rejected">Rejected</option>
              <option value="taken-down">Taken Down</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="single">Single</option>
              <option value="ep">EP</option>
              <option value="album">Album</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Releases Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredReleases.map((release, index) => (
          <motion.div
            key={release.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-200 group">
              <div className="relative">
                <img
                  src={release.artwork}
                  alt={release.title}
                  className="w-full h-40 sm:h-48 object-cover rounded-lg"
                />
                <div className="absolute top-3 right-3">
                  <StatusBadge status={release.status} />
                </div>
                {release.status === 'live' && (
                  <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20"
                      icon={<Play className="w-4 h-4" />}
                    >
                      Preview
                    </Button>
                  </div>
                )}
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {release.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {release.artist}
                    </p>
                  </div>
                  <QuickActions release={release} />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400 capitalize">
                    {release.type}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {new Date(release.releaseDate).toLocaleDateString()}
                  </span>
                </div>

                {release.status === 'live' && (
                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {release.analytics.streams.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">streams</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {release.analytics.saves.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">saves</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {release.pitchingAvailable && (
                    <div className="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400">
                      <Calendar className="w-3 h-3" />
                      <span className="hidden sm:inline">Pitching Available</span>
                      <span className="sm:hidden">Pitching</span>
                    </div>
                  )}
                  {release.collaborators.length > 0 && (
                    <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                      <Users className="w-3 h-3" />
                      <span>{release.collaborators.length}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  {release.status === 'live' && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      icon={<LinkIcon className="w-4 h-4" />}
                      onClick={() => {
                        setSelectedRelease(release);
                        setShowHyperlinkModal(true);
                      }}
                    >
                      Generate Hyperlink
                    </Button>
                  )}
                  
                  {release.status === 'verified' && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      icon={<Send className="w-4 h-4" />}
                      onClick={() => {
                        setSelectedRelease(release);
                        setShowPitchModal(true);
                      }}
                    >
                      Pitch to Playlists
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Hyperlink Modal */}
      {showHyperlinkModal && <HyperlinkModal />}

      {/* Pitch Modal */}
      {showPitchModal && <PitchModal />}

      {filteredReleases.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No releases found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button onClick={() => {
            setSearchTerm('');
            setStatusFilter('all');
            setTypeFilter('all');
          }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}