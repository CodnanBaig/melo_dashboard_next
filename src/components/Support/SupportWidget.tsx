import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, X, Send } from 'lucide-react';
import Button from '../UI/Button';

export default function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMode, setChatMode] = useState<'menu' | 'chat' | 'call'>('menu');
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{id: string, text: string, sender: 'user' | 'bot', timestamp: Date}>>([]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user' as const,
      timestamp: new Date(),
    };

    setChatMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for reaching out! I'm here to help. How can I assist you with your music distribution today?",
        sender: 'bot' as const,
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full shadow-lg flex items-center justify-center z-50 hover:shadow-xl transition-shadow duration-200"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Support Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {chatMode === 'menu' ? 'Support' : chatMode === 'chat' ? 'Chat Support' : 'Request Call'}
                </span>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setChatMode('menu');
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              {chatMode === 'menu' && (
                <div className="p-4 space-y-3">
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    How can we help you today?
                  </p>
                  
                  <Button
                    onClick={() => setChatMode('chat')}
                    className="w-full justify-start"
                    variant="outline"
                    icon={<MessageCircle className="w-4 h-4" />}
                  >
                    Chat with Support Bot
                  </Button>
                  
                  <Button
                    onClick={() => setChatMode('call')}
                    className="w-full justify-start"
                    variant="outline"
                    icon={<Phone className="w-4 h-4" />}
                  >
                    Request a Call
                  </Button>

                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                    <p>Average response time:</p>
                    <p>• Chat: Instant</p>
                    <p>• Call: Within 2 hours</p>
                  </div>
                </div>
              )}

              {chatMode === 'chat' && (
                <div className="flex flex-col h-full">
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {chatMessages.length === 0 && (
                      <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
                        Start a conversation...
                      </div>
                    )}
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                            msg.sender === 'user'
                              ? 'bg-purple-500 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {chatMode === 'call' && (
                <div className="p-4">
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    We'll call you back within 2 hours. Please provide your details:
                  </p>
                  
                  <form className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    />
                    <input
                      type="tel"
                      placeholder="Phone number"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    />
                    <textarea
                      placeholder="Brief description of your issue"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm resize-none"
                    />
                    <Button className="w-full" size="sm">
                      Request Call Back
                    </Button>
                  </form>
                </div>
              )}
            </div>

            {/* Back Button for non-menu modes */}
            {chatMode !== 'menu' && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  onClick={() => setChatMode('menu')}
                  variant="ghost"
                  size="sm"
                  className="w-full"
                >
                  Back to Menu
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}