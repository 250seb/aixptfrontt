import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const IntegrationsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const integrations = [
    'HubSpot',
    'Salesforce',
    'Microsoft Dynamics',
    'Pipedrive',
    'Zoho CRM',
    'Slack',
    'Jira',
    'Asana',
    'Trello',
    'QuickBooks',
    'Xero',
    'Google Sheets',
    'Outlook',
    'Gmail',
    'WhatsApp',
    'Twilio',
    'Zapier',
    'Make',
    'Aircall',
    'Freshdesk',
    'Zendesk',
    '+ des centaines d\'autres'
  ];

  const itemsPerView = 6;
  const totalSlides = Math.ceil(integrations.length / itemsPerView);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 2500);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const getVisibleItems = () => {
    const startIndex = currentIndex * itemsPerView;
    return integrations.slice(startIndex, startIndex + itemsPerView);
  };

  return (
    <div className="w-full py-16">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.0 }}
        className="text-center mb-12"
      >
        <h3 
          className="text-base font-medium"
          style={{ color: 'rgba(224, 230, 237, 0.7)' }}
        >
          Intégrations possibles
        </h3>
      </motion.div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            duration: 0.6,
            ease: "easeInOut"
          }}
          className="flex justify-center items-center gap-8 px-4"
        >
          {getVisibleItems().map((integration, index) => (
            <motion.div
              key={`${currentIndex}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="group cursor-pointer"
            >
              <div className="relative">
                {integration === '+ des centaines d\'autres' ? (
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      filter: "drop-shadow(0 0 20px rgba(46, 196, 255, 0.4))"
                    }}
                    transition={{ duration: 0.2 }}
                    className="text-center px-4 py-2"
                  >
                    <span 
                      className="text-lg font-bold whitespace-nowrap"
                      style={{ color: '#FFFFFF' }}
                    >
                      {integration}
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      filter: "drop-shadow(0 0 15px rgba(46, 196, 255, 0.3))"
                    }}
                    transition={{ duration: 0.2 }}
                    className="text-center px-3 py-2"
                  >
                    <span 
                      className="text-sm font-medium whitespace-nowrap"
                      style={{ color: '#E0E6ED' }}
                    >
                      {integration}
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress Indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <motion.div
              key={index}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: index === currentIndex ? '#2EC4FF' : 'rgba(224, 230, 237, 0.3)',
              }}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};