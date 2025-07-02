import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Share2, 
  Copy, 
  Download, 
  ExternalLink,
  Smartphone,
  Globe,
  Music,
  Palette,
  Eye,
  Edit
} from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { mockReleases } from '../data/mockData';

export default function SmartLink() {
  const { id } = useParams();
  const release = mockReleases.find(r => r.id === id);
  const [copied, setCopied] = useState(false);

  if (!release || !release.smartLink) {
    return (
      <div className="p-4 lg:p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Smart Link not available
        </h1>
        <Link to="/releases">
          <Button>Back to Releases</Button>
        </Link>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(release.smartLink!);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const platforms = [
    { name: 'Spotify', color: 'bg-green-500', streams: 22839 },
    { name: 'Apple Music', color: 'bg-gray-900', streams: 13703 },
    { name: 'YouTube Music', color: 'bg-red-500', streams: 4568 },
    { name: 'Amazon Music', color: 'bg-blue-500', streams: 2284 },
    { name: 'Deezer', color: 'bg-purple-500', streams: 1284 },
    { name: 'Tidal', color: 'bg-black', streams: 1000 }
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to={`/releases/${id}`}>
          <Button variant="ghost" icon={<ArrowLeft className="w-4 h-4" />}>
            Back
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Smart Link
          </h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" icon={<Edit className="w-4 h-4" />}>
            Customize
          </Button>
          <Button variant="outline" icon={<Download className="w-4 h-4" />}>
            Download Assets
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Smart Link Preview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Smart Link Preview
            </h3>
            
            {/* Mobile Preview */}
            <div className="mx-auto w-80 h-96 bg-black rounded-3xl p-2 shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl overflow-hidden">
                <div className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <Music className="w-5 h-5 text-white" />
                    </div>
                    <span className="ml-2 text-white font-bold">Melo</span>
                  </div>

                  {/* Album Art */}
                  <div className="flex justify-center">
                    <img
                      src={release.artwork}
                      alt={release.title}
                      className="w-32 h-32 rounded-lg shadow-lg"
                    />
                  </div>

                  {/* Track Info */}
                  <div className="text-center">
                    <h3 className="text-white font-bold text-lg">{release.title}</h3>
                    <p className="text-gray-300">{release.artist}</p>
                  </div>

                  {/* Platform Buttons */}
                  <div className="space-y-2">
                    {platforms.slice(0, 3).map((platform) => (
                      <button
                        key={platform.name}
                        className="w-full flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-colors"
                      >
                        <div className={`w-6 h-6 ${platform.color} rounded`} />
                        <span className="font-medium">{platform.name}</span>
                        <ExternalLink className="w-4 h-4 ml-auto" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Link Options */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Share Options
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Globe className="w-5 h-5 text-purple-600" />
                <input
                  type="text"
                  value={release.smartLink}
                  readOnly
                  className="flex-1 bg-transparent text-gray-900 dark:text-white font-mono text-sm"
                />
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  size="sm"
                  icon={<Copy className="w-4 h-4" />}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  icon={<Share2 className="w-4 h-4" />}
                  className="w-full"
                >
                  Share Link
                </Button>
                <Button
                  variant="outline"
                  icon={<Download className="w-4 h-4" />}
                  className="w-full"
                >
                  QR Code
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Analytics & Customization */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Performance Stats */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Smart Link Performance
            </h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg mx-auto mb-2">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">2,847</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Page Views</p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg mx-auto mb-2">
                  <ExternalLink className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">1,923</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Click-throughs</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 dark:text-white">Platform Clicks</h4>
              {platforms.map((platform, index) => (
                <div key={platform.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 ${platform.color} rounded`} />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {platform.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 ${platform.color} rounded-full`}
                        style={{ width: `${Math.max(20, (platform.streams / 22839) * 100)}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                      {Math.round((platform.streams / 22839) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Customization Options */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Customization
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Page Title
                </label>
                <input
                  type="text"
                  value={`${release.title} - ${release.artist}`}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Background Theme
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { name: 'Purple', gradient: 'from-purple-900 via-blue-900 to-indigo-900' },
                    { name: 'Dark', gradient: 'from-gray-900 via-gray-800 to-black' },
                    { name: 'Ocean', gradient: 'from-blue-900 via-teal-900 to-cyan-900' }
                  ].map((theme) => (
                    <button
                      key={theme.name}
                      className={`h-16 bg-gradient-to-br ${theme.gradient} rounded-lg border-2 border-transparent hover:border-white/50 transition-colors`}
                      title={theme.name}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Show Stream Count</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Display total streams on the page
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Enable Analytics</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Track clicks and page views
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <Button className="w-full" icon={<Palette className="w-4 h-4" />}>
                Save Customizations
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}