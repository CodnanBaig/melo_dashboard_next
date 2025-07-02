import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Building2, 
  Mail, 
  Phone, 
  MapPin,
  Upload,
  Download,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Eye
} from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { mockLabels } from '../data/mockData';
import { Label } from '../types';

export default function Labels() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<Label | null>(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  const [newLabel, setNewLabel] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const filteredLabels = mockLabels.filter(label => {
    const matchesSearch = label.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         label.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || label.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: Label['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'under-review':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'documents-uploaded':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: Label['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'under-review':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'documents-uploaded':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusLabel = (status: Label['status']) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'under-review':
        return 'Under Review';
      case 'documents-uploaded':
        return 'Documents Uploaded';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Pending';
    }
  };

  const handleAddLabel = () => {
    // Handle label creation logic
    console.log('Adding label:', newLabel);
    setShowAddModal(false);
    setNewLabel({ name: '', email: '', phone: '', address: '' });
  };

  const DocumentUploadModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Upload Documents - {selectedLabel?.name}
            </h3>
            <button
              onClick={() => setShowDocumentModal(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Required Documents */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 dark:text-white">Required Documents</h4>
              
              {[
                { key: 'aadhaar', label: 'Aadhaar Card', required: true },
                { key: 'panCard', label: 'PAN Card', required: true },
                { key: 'msmeCertificate', label: 'MSME Certificate', required: true }
              ].map((doc) => (
                <div key={doc.key} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {doc.label}
                        {doc.required && <span className="text-red-500 ml-1">*</span>}
                      </span>
                    </div>
                    {selectedLabel?.documents[doc.key as keyof typeof selectedLabel.documents] && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PDF, JPG, PNG up to 10MB
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      id={`upload-${doc.key}`}
                    />
                    <label htmlFor={`upload-${doc.key}`}>
                      <Button variant="outline" size="sm" className="mt-2">
                        Choose File
                      </Button>
                    </label>
                  </div>
                </div>
              ))}
            </div>

            {/* Contract Section */}
            {selectedLabel?.contractUrl && (
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Label Agreement Contract
                </h4>
                <div className="flex items-center gap-3 mb-4">
                  <Button
                    variant="outline"
                    icon={<Download className="w-4 h-4" />}
                    onClick={() => window.open(selectedLabel.contractUrl, '_blank')}
                  >
                    Download Contract
                  </Button>
                  <Button
                    variant="outline"
                    icon={<Eye className="w-4 h-4" />}
                    onClick={() => window.open(selectedLabel.contractUrl, '_blank')}
                  >
                    View Contract
                  </Button>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Upload signed contract
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PDF only, up to 10MB
                  </p>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    id="upload-contract"
                  />
                  <label htmlFor="upload-contract">
                    <Button variant="outline" size="sm" className="mt-2">
                      Choose File
                    </Button>
                  </label>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                onClick={() => setShowDocumentModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button className="flex-1">
                Submit Documents
              </Button>
            </div>
          </div>
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
            Labels Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your record labels and partnerships
          </p>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          icon={<Plus className="w-5 h-5" />}
          size="lg"
          className="w-full sm:w-auto"
        >
          Add Label
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search labels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="documents-uploaded">Documents Uploaded</option>
            <option value="under-review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </Card>

      {/* Labels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLabels.map((label, index) => (
          <motion.div
            key={label.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {label.name}
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        {getStatusIcon(label.status)}
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(label.status)}`}>
                          {getStatusLabel(label.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{label.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Phone className="w-4 h-4" />
                    <span>{label.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{label.address}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-2">
                    {label.status === 'pending' && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        icon={<Upload className="w-4 h-4" />}
                        onClick={() => {
                          setSelectedLabel(label);
                          setShowDocumentModal(true);
                        }}
                      >
                        Upload Docs
                      </Button>
                    )}
                    {label.status === 'approved' && label.contractUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        icon={<Download className="w-4 h-4" />}
                        onClick={() => window.open(label.contractUrl, '_blank')}
                      >
                        Contract
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<Eye className="w-4 h-4" />}
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add Label Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add New Label
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
                  Label Name *
                </label>
                <input
                  type="text"
                  value={newLabel.name}
                  onChange={(e) => setNewLabel(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter label name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={newLabel.email}
                  onChange={(e) => setNewLabel(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={newLabel.phone}
                  onChange={(e) => setNewLabel(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address *
                </label>
                <textarea
                  value={newLabel.address}
                  onChange={(e) => setNewLabel(prev => ({ ...prev, address: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter complete address"
                />
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
                onClick={handleAddLabel}
                disabled={!newLabel.name || !newLabel.email || !newLabel.phone || !newLabel.address}
                className="flex-1"
              >
                Add Label
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Document Upload Modal */}
      {showDocumentModal && <DocumentUploadModal />}

      {filteredLabels.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No labels found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Get started by adding your first label
          </p>
          <Button onClick={() => setShowAddModal(true)}>
            Add Label
          </Button>
        </div>
      )}
    </div>
  );
}