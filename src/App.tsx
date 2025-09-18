import React from 'react';
import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { AIXPTHero } from './components/hero/AIXPTHero';
import { Features } from './components/pages/Features';
import { About } from './components/pages/About';
import { AssistantVocal } from './components/pages/AssistantVocal';
import { EmailsAutomatises } from './components/pages/EmailsAutomatises';
import { AgentsConversationnels } from './components/pages/AgentsConversationnels';
import { CreationSitesWeb } from './components/pages/CreationSitesWeb';

function App() {
  const [currentPage, setCurrentPage] = useState('accueil');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const handleCtaClick = () => {
    console.log("Démarrage du voyage IA avec AIXPT...");
    // Ici vous pourriez rediriger vers une page d'inscription ou ouvrir un modal
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'fonctionnalites':
        return <Features onNavigate={setCurrentPage} onOpenConsultation={() => setIsConsultationOpen(true)} />;
      case 'apropos':
        return <About />;
      case 'assistant-vocal':
        return <AssistantVocal onNavigate={setCurrentPage} />;
      case 'emails-automatises':
        return <EmailsAutomatises onNavigate={setCurrentPage} />;
      case 'agents-conversationnels':
        return <AgentsConversationnels onNavigate={setCurrentPage} />;
      case 'creation-sites-web':
        return <CreationSitesWeb onNavigate={setCurrentPage} />;
      default:
        return (
          <AIXPTHero 
            title="L’automatisation IA qui propulse vos affaires."
            subtitle="Transformez votre entreprise avec des solutions d'automatisation IA de pointe qui évoluent avec vos ambitions et révolutionnent votre façon de travailler"
            ctaText="Commencer Votre Voyage IA"
            onCtaClick={handleCtaClick}
            onNavigate={setCurrentPage}
          />
        );
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        isConsultationOpen={isConsultationOpen}
        onConsultationToggle={setIsConsultationOpen}
      />
      {renderCurrentPage()}
    </div>
  );
}

export default App;