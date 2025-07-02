import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Book, 
  MessageCircle, 
  Mail, 
  Phone,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Play,
  DollarSign,
  Upload,
  BarChart3
} from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    id: '1',
    question: 'How long does it take for my music to go live?',
    answer: 'Most releases go live within 1-2 business days after approval. However, if you submit your release at least 21 days before your release date, you can enable pitching to playlists, which may take additional time for review.',
    category: 'releases'
  },
  {
    id: '2',
    question: 'What file formats do you accept?',
    answer: 'We accept high-quality audio files in WAV, FLAC, or MP3 (320kbps minimum) format. For artwork, we require JPG or PNG files with a minimum resolution of 3000x3000 pixels.',
    category: 'releases'
  },
  {
    id: '3',
    question: 'How do royalty payments work?',
    answer: 'You earn royalties every time your music is streamed on digital platforms. We collect these earnings and distribute them to you monthly. The amount varies by platform, but typically ranges from $0.003 to $0.005 per stream.',
    category: 'royalties'
  },
  {
    id: '4',
    question: 'When can I request a payout?',
    answer: 'You can request a payout once your balance reaches the minimum threshold: $10 for bank transfers, $5 for PayPal, or $50 for wire transfers. Payouts are processed within 1-5 business days depending on the method.',
    category: 'payouts'
  },
  {
    id: '5',
    question: 'What is playlist pitching?',
    answer: 'Playlist pitching allows you to submit your music to curated playlists on streaming platforms. This feature is available when you submit your release at least 21 days before the release date. It can significantly increase your music\'s visibility and streams.',
    category: 'pitching'
  },
  {
    id: '6',
    question: 'Can I edit my release after it\'s been submitted?',
    answer: 'You can edit releases that are still in draft or under review status. Once a release is live, you cannot make changes to the audio files or release date, but you can update metadata like description and social links.',
    category: 'releases'
  },
  {
    id: '7',
    question: 'How do I add collaborators to my release?',
    answer: 'When creating or editing a release, you can add collaborators by entering their email addresses. They\'ll receive an invitation to view and edit the release. Collaborators can help with metadata, artwork, and track information.',
    category: 'collaboration'
  },
  {
    id: '8',
    question: 'What analytics data is available?',
    answer: 'You can track streams, saves, skips, shares, top regions, and platform performance. Analytics are updated daily and include demographic data, listening patterns, and revenue information.',
    category: 'analytics'
  }
];

const categories = [
  { id: 'all', label: 'All Topics', icon: Book },
  { id: 'releases', label: 'Releases', icon: Upload },
  { id: 'royalties', label: 'Royalties', icon: DollarSign },
  { id: 'payouts', label: 'Payouts', icon: DollarSign },
  { id: 'pitching', label: 'Pitching', icon: Play },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'collaboration', label: 'Collaboration', icon: MessageCircle }
];

const guides = [
  {
    title: 'Getting Started with Melo',
    description: 'Learn the basics of uploading and distributing your music',
    duration: '5 min read',
    category: 'Getting Started'
  },
  {
    title: 'Maximizing Your Streams',
    description: 'Best practices for promoting your music and growing your audience',
    duration: '8 min read',
    category: 'Promotion'
  },
  {
    title: 'Understanding Royalties',
    description: 'How streaming royalties work and how to optimize your earnings',
    duration: '6 min read',
    category: 'Monetization'
  },
  {
    title: 'Playlist Pitching Guide',
    description: 'Step-by-step guide to getting your music on playlists',
    duration: '10 min read',
    category: 'Pitching'
  }
];

export default function Help() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          How can we help you?
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Find answers to common questions, learn from our guides, or get in touch with our support team
        </p>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for help..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <Card className="text-center hover:shadow-md transition-shadow duration-200">
          <div className="p-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Live Chat</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Get instant help from our support team
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Start Chat
            </Button>
          </div>
        </Card>

        <Card className="text-center hover:shadow-md transition-shadow duration-200">
          <div className="p-6">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email Support</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Send us your questions via email
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Send Email
            </Button>
          </div>
        </Card>

        <Card className="text-center hover:shadow-md transition-shadow duration-200">
          <div className="p-6">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Phone Support</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Schedule a call with our team
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Schedule Call
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
            <nav className="space-y-1">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{category.label}</span>
                  </button>
                );
              })}
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Guides */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Popular Guides
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guides.map((guide, index) => (
                <motion.div
                  key={guide.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-300 dark:hover:border-purple-600 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                      {guide.category}
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    {guide.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {guide.description}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {guide.duration}
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* FAQs */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">
                      {faq.question}
                    </span>
                    {expandedFAQ === faq.id ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {expandedFAQ === faq.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-4 pb-4"
                    >
                      <p className="text-gray-600 dark:text-gray-400">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No results found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We couldn't find any FAQs matching your search. Try different keywords or browse categories.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  variant="outline"
                >
                  Clear Search
                </Button>
              </div>
            )}
          </Card>

          {/* Contact Info */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Still need help?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Email Support</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    support@melo.com
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Response within 24 hours
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Live Chat</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Available 24/7
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Instant responses
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}