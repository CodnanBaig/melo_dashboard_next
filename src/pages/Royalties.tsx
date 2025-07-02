import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Download, 
  Filter,
  Music,
  Globe,
  Play
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { mockRoyaltyReports } from '../data/mockData';

export default function Royalties() {
  const [selectedPeriod, setSelectedPeriod] = useState('6');

  const totalEarnings = mockRoyaltyReports.reduce((sum, report) => sum + report.totalEarnings, 0);
  const totalStreams = mockRoyaltyReports.reduce((sum, report) => 
    sum + report.platforms.reduce((pSum, platform) => pSum + platform.streams, 0), 0
  );

  const monthlyEarnings = mockRoyaltyReports.map(report => ({
    month: report.month.split(' ')[0],
    earnings: report.totalEarnings,
    streams: report.platforms.reduce((sum, platform) => sum + platform.streams, 0)
  }));

  const allPlatforms = mockRoyaltyReports
    .flatMap(report => report.platforms)
    .reduce((acc, platform) => {
      const existing = acc.find(p => p.name === platform.name);
      if (existing) {
        existing.earnings += platform.earnings;
        existing.streams += platform.streams;
      } else {
        acc.push({
          name: platform.name,
          earnings: platform.earnings,
          streams: platform.streams
        });
      }
      return acc;
    }, [] as any[])
    .sort((a, b) => b.earnings - a.earnings);

  const allRegions = mockRoyaltyReports
    .flatMap(report => report.regions)
    .reduce((acc, region) => {
      const existing = acc.find(r => r.country === region.country);
      if (existing) {
        existing.earnings += region.earnings;
        existing.streams += region.streams;
      } else {
        acc.push({
          country: region.country,
          earnings: region.earnings,
          streams: region.streams
        });
      }
      return acc;
    }, [] as any[])
    .sort((a, b) => b.earnings - a.earnings);

  const COLORS = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5A2B'];

  const quickStats = [
    { 
      label: 'Total Earnings', 
      value: `$${totalEarnings.toFixed(2)}`, 
      icon: DollarSign, 
      color: 'text-green-600',
      change: '+12.5%'
    },
    { 
      label: 'This Month', 
      value: `$${mockRoyaltyReports[0]?.totalEarnings.toFixed(2) || '0.00'}`, 
      icon: Calendar, 
      color: 'text-blue-600',
      change: '+23.8%'
    },
    { 
      label: 'Avg. Per Stream', 
      value: `$${(totalEarnings / totalStreams).toFixed(4)}`, 
      icon: Play, 
      color: 'text-purple-600',
      change: '+5.2%'
    },
    { 
      label: 'Growth Rate', 
      value: '24.6%', 
      icon: TrendingUp, 
      color: 'text-orange-600',
      change: '+8.1%'
    }
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Royalty Reports
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your earnings and royalty performance
          </p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="3">Last 3 months</option>
            <option value="6">Last 6 months</option>
            <option value="12">Last 12 months</option>
          </select>
          <Button
            variant="outline"
            icon={<Download className="w-4 h-4" />}
          >
            Export Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Earnings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Monthly Earnings
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyEarnings}>
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
                  formatter={(value) => [`$${value}`, 'Earnings']}
                />
                <Bar dataKey="earnings" fill="url(#earningsGradient)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.8}/>
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
          transition={{ delay: 0.5 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Earnings by Platform
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={allPlatforms}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, earnings }) => `${name} $${earnings.toFixed(0)}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="earnings"
                >
                  {allPlatforms.map((entry, index) => (
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
                  formatter={(value) => [`$${value}`, 'Earnings']}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Detailed Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Platform Performance
            </h3>
            <div className="space-y-4">
              {allPlatforms.map((platform, index) => (
                <div key={platform.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{platform.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {platform.streams.toLocaleString()} streams
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      ${platform.earnings.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      ${(platform.earnings / platform.streams).toFixed(4)}/stream
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Regional Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Regional Performance
            </h3>
            <div className="space-y-4">
              {allRegions.map((region, index) => (
                <div key={region.country} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{region.country}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {region.streams.toLocaleString()} streams
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      ${region.earnings.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {((region.earnings / totalEarnings) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Monthly Reports Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Monthly Reports
            </h3>
            <Button
              variant="outline"
              size="sm"
              icon={<Download className="w-4 h-4" />}
            >
              Download All
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Month</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900 dark:text-white">Earnings</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900 dark:text-white">Streams</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900 dark:text-white">Avg/Stream</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockRoyaltyReports.map((report) => (
                  <tr key={report.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">
                      {report.month}
                    </td>
                    <td className="py-4 px-4 text-right font-semibold text-green-600">
                      ${report.totalEarnings.toFixed(2)}
                    </td>
                    <td className="py-4 px-4 text-right text-gray-900 dark:text-white">
                      {report.platforms.reduce((sum, p) => sum + p.streams, 0).toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-right text-gray-900 dark:text-white">
                      ${(report.totalEarnings / report.platforms.reduce((sum, p) => sum + p.streams, 0)).toFixed(4)}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Download className="w-4 h-4" />}
                      >
                        Download
                      </Button>
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