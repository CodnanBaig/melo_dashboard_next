import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  TrendingUp, 
  Music, 
  DollarSign, 
  Users, 
  Play,
  Eye,
  Share2,
  Calendar,
  ArrowRight
} from 'lucide-react';
import Card from '../components/UI/Card';
import StatusBadge from '../components/UI/StatusBadge';
import Button from '../components/UI/Button';
import { mockReleases, mockRoyaltyReports } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function Dashboard() {
  const totalStreams = mockReleases.reduce((sum, release) => sum + release.analytics.streams, 0);
  const totalEarnings = mockRoyaltyReports.reduce((sum, report) => sum + report.totalEarnings, 0);
  const liveReleases = mockReleases.filter(r => r.status === 'live').length;
  const recentReleases = mockReleases.slice(0, 3);

  const monthlyData = [
    { month: 'Jan', streams: 15000, earnings: 61.5 },
    { month: 'Feb', streams: 18000, earnings: 73.8 },
    { month: 'Mar', streams: 22000, earnings: 90.2 },
    { month: 'Apr', streams: 25000, earnings: 102.5 },
    { month: 'May', streams: 28000, earnings: 114.8 },
    { month: 'Jun', streams: 32000, earnings: 131.2 }
  ];

  const quickStats = [
    { label: 'Total Streams', value: totalStreams.toLocaleString(), icon: Play, color: 'text-green-600' },
    { label: 'Total Earnings', value: `$${totalEarnings.toFixed(2)}`, icon: DollarSign, color: 'text-blue-600' },
    { label: 'Live Releases', value: liveReleases.toString(), icon: Music, color: 'text-purple-600' },
    { label: 'Monthly Growth', value: '+24%', icon: TrendingUp, color: 'text-orange-600' }
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Here's what's happening with your music today
          </p>
        </div>
        <Link to="/releases/create">
          <Button
            icon={<Plus className="w-5 h-5" />}
            size="lg"
            className="w-full sm:w-auto"
          >
            New Release
          </Button>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{stat.label}</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1 truncate">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-700 ${stat.color} flex-shrink-0`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Streams Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Monthly Streams
              </h3>
              <Link 
                to="/analytics" 
                className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1"
              >
                View Details <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="h-48 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
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
                  <Bar dataKey="streams" fill="url(#streamsGradient)" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="streamsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Earnings Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Monthly Earnings
              </h3>
              <Link 
                to="/royalties" 
                className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1"
              >
                View Reports <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="h-48 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
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
                    formatter={(value) => [`$${value}`, 'Earnings']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="earnings" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Recent Releases & Quick Actions */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Releases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="xl:col-span-2"
        >
          <Card>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Releases
              </h3>
              <Link 
                to="/releases" 
                className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {recentReleases.map((release) => (
                <div key={release.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <img
                    src={release.artwork}
                    alt={release.title}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 dark:text-white truncate">
                      {release.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {release.artist} • {release.type}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-3 flex-shrink-0">
                    <StatusBadge status={release.status} />
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {release.analytics.streams.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">streams</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link to="/releases/create" className="block">
                <Button variant="outline" className="w-full justify-start" icon={<Plus className="w-4 h-4" />}>
                  Create New Release
                </Button>
              </Link>
              <Link to="/analytics" className="block">
                <Button variant="outline" className="w-full justify-start" icon={<Eye className="w-4 h-4" />}>
                  View Analytics
                </Button>
              </Link>
              <Link to="/payouts" className="block">
                <Button variant="outline" className="w-full justify-start" icon={<DollarSign className="w-4 h-4" />}>
                  Request Payout
                </Button>
              </Link>
              <Link to="/help" className="block">
                <Button variant="outline" className="w-full justify-start" icon={<Share2 className="w-4 h-4" />}>
                  Pitching Guide
                </Button>
              </Link>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900 dark:text-purple-300">
                  Tip of the Day
                </span>
              </div>
              <p className="text-sm text-purple-800 dark:text-purple-200">
                Submit your releases at least 21 days before the release date to enable pitching to playlists!
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}