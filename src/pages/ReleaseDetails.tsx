import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Edit, 
  Share2, 
  ExternalLink, 
  Play, 
  Users,
  Calendar,
  Music,
  TrendingUp,
  Eye,
  Heart,
  SkipForward,
  Link as LinkIcon,
  Send
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import StatusBadge from '../components/UI/StatusBadge';
import { mockReleases } from '../data/mockData';

export default function ReleaseDetails({ releaseId }: { releaseId: string }) {
  const release = mockReleases.find(r => r.id === releaseId);

  if (!release) {
    return (
      <div className="p-4 lg:p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Release not found
        </h1>
        <Link to="/releases">
          <Button>Back to Releases</Button>
        </Link>
      </div>
    );
  }

  const COLORS = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5A2B'];

  const quickStats = [
    { label: 'Total Streams', value: release.analytics.streams.toLocaleString(), icon: Play, color: 'text-green-600' },
    { label: 'Total Saves', value: release.analytics.saves.toLocaleString(), icon: Heart, color: 'text-red-600' },
    { label: 'Total Shares', value: release.analytics.shares.toLocaleString(), icon: Share2, color: 'text-blue-600' },
    { label: 'Skip Rate', value: `${((release.analytics.skips / release.analytics.streams) * 100).toFixed(1)}%`, icon: SkipForward, color: 'text-orange-600' }
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/releases">
          <Button variant="ghost" icon={<ArrowLeft className="w-4 h-4" />}>
            Back
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Release Details
          </h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" icon={<Edit className="w-4 h-4" />}>
            Edit
          </Button>
          <Button variant="outline" icon={<Share2 className="w-4 h-4" />}>
            Share
          </Button>
        </div>
      </div>

      {/* Release Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={release.artwork}
              alt={release.title}
              className="w-full md:w-48 h-48 object-cover rounded-lg"
            />
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {release.title}
                  </h2>
                  <StatusBadge status={release.status} />
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  by {release.artist}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Type:</span>
                  <p className="font-medium text-gray-900 dark:text-white capitalize">
                    {release.type}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Release Date:</span>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {new Date(release.releaseDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Tracks:</span>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {release.tracks.length}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Genres:</span>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {release.genres.join(', ')}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {release.pitchingAvailable && (
                  <div className="flex items-center gap-1 text-xs bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-full">
                    <Calendar className="w-3 h-3" />
                    Pitching Available
                  </div>
                )}
                {release.collaborators.length > 0 && (
                  <div className="flex items-center gap-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                    <Users className="w-3 h-3" />
                    {release.collaborators.length} collaborator{release.collaborators.length > 1 ? 's' : ''}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {release.status === 'live' && (
                  <>
                    <Button
                      variant="outline"
                      icon={<LinkIcon className="w-4 h-4" />}
                    >
                      Generate Hyperlink
                    </Button>
                    {release.smartLink && (
                      <Link to={`/releases/${release.id}/smart-link`}>
                        <Button
                          variant="outline"
                          icon={<ExternalLink className="w-4 h-4" />}
                        >
                          Smart Link
                        </Button>
                      </Link>
                    )}
                  </>
                )}
                
                {release.status === 'verified' && (
                  <Button
                    variant="outline"
                    icon={<Send className="w-4 h-4" />}
                  >
                    Pitch to Playlists
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  icon={<Play className="w-4 h-4" />}
                >
                  Preview
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Tracks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Track List
          </h3>
          <div className="space-y-3">
            {release.tracks.map((track, index) => (
              <div key={track.id} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {track.title}
                  </h4>
                  {track.isrc && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      ISRC: {track.isrc}
                    </p>
                  )}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
                </div>
                <Button variant="ghost" size="sm" icon={<Play className="w-4 h-4" />}>
                  Preview
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Analytics - only show for live releases */}
      {release.status === 'live' && (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Card className="hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                          {stat.value}
                        </p>
                      </div>
                      <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-700 ${stat.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Performance */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Monthly Performance
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={release.analytics.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                    <XAxis dataKey="month" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                    />
                    <Bar dataKey="streams" fill="url(#streamsGradient)" radius={[4, 4, 0, 0]} />
                    <defs>
                      <linearGradient id="streamsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>

            {/* Platform Distribution */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Platform Distribution
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={release.analytics.topPlatforms}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ platform, percentage }) => `${platform} ${percentage}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="streams"
                    >
                      {release.analytics.topPlatforms.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </motion.div>
          </div>

          {/* Regional Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Top Regions
              </h3>
              <div className="space-y-3">
                {release.analytics.topRegions.map((region, index) => (
                  <div key={region.country} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {region.country}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {region.percentage}% of total streams
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {region.streams.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">streams</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </>
      )}

      {/* Social Links */}
      {(release.socialLinks.youtube || release.socialLinks.instagram) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Social Links
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {release.socialLinks.youtube && (
                <a
                  href={release.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-red-300 dark:hover:border-red-600 transition-colors"
                >
                  <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                    <Play className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">YouTube</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Watch video</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </a>
              )}
              {release.socialLinks.instagram && (
                <a
                  href={release.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-pink-300 dark:hover:border-pink-600 transition-colors"
                >
                  <div className="p-2 bg-pink-100 dark:bg-pink-900/20 rounded-lg">
                    <Share2 className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Instagram</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">View reel</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                </a>
              )}
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}