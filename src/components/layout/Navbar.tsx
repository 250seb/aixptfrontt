import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { ConsultationModal } from '../modals/ConsultationModal';

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isConsultationOpen: boolean;
  onConsultationToggle: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onPageChange, 
  isConsultationOpen, 
  onConsultationToggle 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'fonctionnalites', label: 'Services' },
    { id: 'contact', label: 'Nous Contacter' },
    { id: 'apropos', label: 'À propos' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center cursor-pointer"
              onClick={() => onPageChange('accueil')}
            >
              <img src="/logoaixpt.png" alt="Aixpt Logo" className="h-12 w-auto mr-2" />
            </motion.div>

            {/* Desktop Navigation and Actions - Right Aligned */}
            <div className="hidden md:flex items-center ml-auto space-x-8">
              {/* Navigation Links */}
              <div className="flex items-center space-x-6">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onPageChange(item.id)}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      currentPage === item.id
                        ? 'text-blue-400'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <a
                  href="https://portal.aixpt.ca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Accéder au Portail
                </a>
                
                <Button
                  onClick={() => onConsultationToggle(true)}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Réserver Une Consultation
                </Button>
              </div>
            </div>


            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-blue-500/20 py-4"
              >
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onPageChange(item.id);
                        setIsMenuOpen(false);
                      }}
                      className={`text-left text-sm font-medium transition-colors duration-200 ${
                        currentPage === item.id
                          ? 'text-blue-400'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                  
                  <a
                    href="https://portal.aixpt.ca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-left text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    Accéder au Portail
                  </a>
                  
                  <Button
                    onClick={() => {
                      onConsultationToggle(true);
                      setIsMenuOpen(false);
                    }}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2 rounded-lg transition-all duration-300 w-full"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Réserver Une Consultation
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <ConsultationModal 
        isOpen={isConsultationOpen}
        onClose={() => onConsultationToggle(false)}
      />
    </>
  );
};