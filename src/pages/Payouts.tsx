import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  Plus, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  CreditCard,
  Calendar,
  TrendingUp
} from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { Payout } from '../types';

const mockPayouts: Payout[] = [
  {
    id: '1',
    amount: 234.52,
    currency: 'USD',
    status: 'paid',
    requestDate: '2024-06-15',
    processedDate: '2024-06-18',
    method: 'Bank Transfer'
  },
  {
    id: '2',
    amount: 189.73,
    currency: 'USD',
    status: 'processing',
    requestDate: '2024-06-20',
    method: 'PayPal'
  },
  {
    id: '3',
    amount: 156.28,
    currency: 'USD',
    status: 'requested',
    requestDate: '2024-06-22',
    method: 'Bank Transfer'
  }
];

export default function Payouts() {
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('');
  const [payoutMethod, setPayoutMethod] = useState('bank');

  const availableBalance = 312.45;
  const totalPaid = mockPayouts
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = mockPayouts
    .filter(p => p.status !== 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const getStatusIcon = (status: Payout['status']) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'requested':
        return <AlertCircle className="w-5 h-5 text-blue-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: Payout['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'requested':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const handlePayoutRequest = () => {
    // Handle payout request logic here
    setShowPayoutModal(false);
    setPayoutAmount('');
  };

  const quickStats = [
    { 
      label: 'Available Balance', 
      value: `$${availableBalance.toFixed(2)}`, 
      icon: DollarSign, 
      color: 'text-green-600' 
    },
    { 
      label: 'Total Paid Out', 
      value: `$${totalPaid.toFixed(2)}`, 
      icon: CheckCircle, 
      color: 'text-blue-600' 
    },
    { 
      label: 'Pending Payouts', 
      value: `$${pendingAmount.toFixed(2)}`, 
      icon: Clock, 
      color: 'text-yellow-600' 
    },
    { 
      label: 'This Month', 
      value: `$${234.52}`, 
      icon: TrendingUp, 
      color: 'text-purple-600' 
    }
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Payouts
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your earnings and payout requests
          </p>
        </div>
        <Button
          onClick={() => setShowPayoutModal(true)}
          icon={<Plus className="w-5 h-5" />}
          size="lg"
          className="w-full sm:w-auto"
        >
          Request Payout
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* Payout Methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Payout Methods
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <CreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">Bank Transfer</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Wells Fargo •••• 1234
                </p>
              </div>
              <span className="text-sm text-green-600 font-medium">Primary</span>
            </div>
            <div className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">PayPal</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  artist@email.com
                </p>
              </div>
              <Button variant="outline" size="sm">
                Set Primary
              </Button>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline" size="sm">
              Add New Method
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Payout History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Payout History
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Method</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Processed</th>
                </tr>
              </thead>
              <tbody>
                {mockPayouts.map((payout) => (
                  <tr key={payout.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-4 px-4 text-gray-900 dark:text-white">
                      {new Date(payout.requestDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white">
                      ${payout.amount.toFixed(2)}
                    </td>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                      {payout.method}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(payout.status)}
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(payout.status)}`}>
                          {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                      {payout.processedDate ? new Date(payout.processedDate).toLocaleDateString() : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>

      {/* Payout Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Payout Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Processing Time</span>
              </div>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-6">
                <li>• Bank Transfer: 3-5 business days</li>
                <li>• PayPal: 1-2 business days</li>
                <li>• Wire Transfer: 1-3 business days</li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Minimum Payout</span>
              </div>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-6">
                <li>• Bank Transfer: $10.00</li>
                <li>• PayPal: $5.00</li>
                <li>• Wire Transfer: $50.00</li>
              </ul>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Payout Request Modal */}
      {showPayoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Request Payout
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="number"
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(e.target.value)}
                    max={availableBalance}
                    step="0.01"
                    className="pl-10 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="0.00"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Available: ${availableBalance.toFixed(2)}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Payout Method
                </label>
                <select
                  value={payoutMethod}
                  onChange={(e) => setPayoutMethod(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="bank">Bank Transfer (Wells Fargo •••• 1234)</option>
                  <option value="paypal">PayPal (artist@email.com)</option>
                </select>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  Processing time: {payoutMethod === 'bank' ? '3-5 business days' : '1-2 business days'}
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowPayoutModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handlePayoutRequest}
                disabled={!payoutAmount || parseFloat(payoutAmount) <= 0}
                className="flex-1"
              >
                Request Payout
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}