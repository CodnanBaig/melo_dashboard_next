import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Play,
  Heart,
  Share2,
  SkipForward,
  Download
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { mockReleases } from '../data/mockData';

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [selectedRelease, setSelectedRelease] = useState('all');
  const [windowWidth, setWindowWidth] = useState(1024); // Default width for SSR

  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);

    // Add resize listener
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const liveReleases = mockReleases.filter(r => r.status === 'live');
  const totalStreams = liveReleases.reduce((sum, release) => sum + release.analytics.streams, 0);
  const totalSaves = liveReleases.reduce((sum, release) => sum + release.analytics.saves, 0);
  const totalShares = liveReleases.reduce((sum, release) => sum + release.analytics.shares, 0);
  const totalSkips = liveReleases.reduce((sum, release) => sum + release.analytics.skips, 0);

  const topRegions = liveReleases
    .flatMap(release => release.analytics.topRegions)
    .reduce((acc, region) => {
      const existing = acc.find(r => r.country === region.country);
      if (existing) {
        existing.streams += region.streams;
      } else {
        acc.push({ ...region });
      }
      return acc;
    }, [] as typeof liveReleases[0]['analytics']['topRegions'])
    .sort((a, b) => b.streams - a.streams)
    .slice(0, 6);

  const topPlatforms = liveReleases
    .flatMap(release => release.analytics.topPlatforms)
    .reduce((acc, platform) => {
      const existing = acc.find(p => p.platform === platform.platform);
      if (existing) {
        existing.streams += platform.streams;
      } else {
        acc.push({ ...platform });
      }
      return acc;
    }, [] as typeof liveReleases[0]['analytics']['topPlatforms'])
    .sort((a, b) => b.streams - a.streams);

  const monthlyGrowth = [
    { month: 'Jan', streams: 45000, growth: 12 },
    { month: 'Feb', streams: 52000, growth: 15.6 },
    { month: 'Mar', streams: 48000, growth: -7.7 },
    { month: 'Apr', streams: 61000, growth: 27.1 },
    { month: 'May', streams: 58000, growth: -4.9 },
    { month: 'Jun', streams: 67000, growth: 15.5 }
  ];

  const COLORS = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5A2B'];

  const quickStats = [
    { label: 'Total Streams', value: totalStreams.toLocaleString(), icon: Play, color: 'text-green-600', change: '+24%' },
    { label: 'Total Saves', value: totalSaves.toLocaleString(), icon: Heart, color: 'text-red-600', change: '+18%' },
    { label: 'Total Shares', value: totalShares.toLocaleString(), icon: Share2, color: 'text-blue-600', change: '+31%' },
    { label: 'Skip Rate', value: `${((totalSkips / totalStreams) * 100).toFixed(1)}%`, icon: SkipForward, color: 'text-orange-600', change: '-5%' }
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your music performance and audience insights
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          <Button
            variant="outline"
            icon={<Download className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Export
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.change.startsWith('+');
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700 ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-sm font-medium ${
                    isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Streams Over Time */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Streams Over Time
              </h3>
              <select
                value={selectedRelease}
                onChange={(e) => setSelectedRelease(e.target.value)}
                className="text-sm px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Releases</option>
                {liveReleases.map(release => (
                  <option key={release.id} value={release.id}>{release.title}</option>
                ))}
              </select>
            </div>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="streams" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Top Platforms */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Top Platforms
            </h3>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topPlatforms}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ platform, percentage }) => `${platform} ${percentage}%`}
                    outerRadius={windowWidth < 640 ? 80 : 100}
                    fill="#8884d8"
                    dataKey="streams"
                  >
                    {topPlatforms.map((_, index) => (
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
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Regional Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Top Regions
          </h3>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topRegions} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis type="number" stroke="#6B7280" fontSize={12} />
                <YAxis dataKey="country" type="category" stroke="#6B7280" width={60} fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                />
                <Bar dataKey="streams" fill="url(#regionGradient)" radius={[0, 4, 4, 0]} />
                <defs>
                  <linearGradient id="regionGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>

      {/* Release Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Release Performance
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 dark:text-white">Release</th>
                  <th className="text-right py-3 px-2 sm:px-4 font-medium text-gray-900 dark:text-white">Streams</th>
                  <th className="text-right py-3 px-2 sm:px-4 font-medium text-gray-900 dark:text-white hidden sm:table-cell">Saves</th>
                  <th className="text-right py-3 px-2 sm:px-4 font-medium text-gray-900 dark:text-white hidden sm:table-cell">Shares</th>
                  <th className="text-right py-3 px-2 sm:px-4 font-medium text-gray-900 dark:text-white">Skip Rate</th>
                </tr>
              </thead>
              <tbody>
                {liveReleases.map((release) => (
                  <tr key={release.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-4 px-2 sm:px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={release.artwork}
                          alt={release.title}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 dark:text-white truncate">{release.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{release.artist}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 sm:px-4 text-right font-medium text-gray-900 dark:text-white">
                      {release.analytics.streams.toLocaleString()}
                    </td>
                    <td className="py-4 px-2 sm:px-4 text-right font-medium text-gray-900 dark:text-white hidden sm:table-cell">
                      {release.analytics.saves.toLocaleString()}
                    </td>
                    <td className="py-4 px-2 sm:px-4 text-right font-medium text-gray-900 dark:text-white hidden sm:table-cell">
                      {release.analytics.shares.toLocaleString()}
                    </td>
                    <td className="py-4 px-2 sm:px-4 text-right font-medium text-gray-900 dark:text-white">
                      {((release.analytics.skips / release.analytics.streams) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}