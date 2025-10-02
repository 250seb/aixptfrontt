import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Cpu, Brain } from 'lucide-react';
import { Button } from '../ui/button';
import { MatrixRain } from '../effects/MatrixRain';
import { AnimatedTextCycle } from '../effects/AnimatedTextCycle';
import PossibleIntegrations from './PossibleIntegrations';
import UseCasesSection from './UseCasesSection';

interface AIXPTHeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  onNavigate?: (page: string) => void;
  onOpenConsultation?: () => void;
}

export const AIXPTHero: React.FC<AIXPTHeroProps> = ({
  title = "L'automatisation IA qui propulse vos affaires.",
  subtitle = "Transformez votre entreprise avec des solutions d'automatisation IA de pointe qui évoluent avec vos ambitions",
  ctaText = "Commencer Votre Voyage IA",
  onCtaClick = () => console.log("Démarrage du voyage IA..."),
  onNavigate,
  onOpenConsultation = () => console.log("Open consultation")
}) => {
  const automationWords = [
    "l'IA Automatisée",
    "l'Apprentissage Machine",
    "les Réseaux Neuronaux",
    "les Systèmes Intelligents",
    "l'Intelligence Digitale",
    "l'Informatique Cognitive"
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Matrix Rain Background */}
      <MatrixRain 
        fontSize={16}
        color="#0066ff"
        characters="01AIXPT"
        fadeOpacity={0.05}
        speed={0.8}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-blue-950/60 to-black/90 z-10" />

      {/* Content */}
      <div className="relative z-20 flex min-h-screen items-center justify-center px-4 pt-32">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* AIXPT Logo/Brand - Keep spacing only */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            {/* Content removed, spacing preserved */}
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              {title}
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                <AnimatedTextCycle 
                  words={automationWords}
                  interval={3000}
                  className="text-5xl md:text-7xl lg:text-8xl"
                />
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex justify-center items-center mb-16"
          >
            <Button
              onClick={() => onNavigate && onNavigate('fonctionnalites')}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
            >
              <Zap className="mr-2 h-5 w-5" />
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              {
                icon: <Brain className="h-8 w-8" />,
                title: "Automatisation Intelligente",
                description: "Déployez des agents IA qui apprennent et s'adaptent à vos processus métier"
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Vitesse Fulgurante",
                description: "Traitez des milliers de tâches en quelques secondes avec notre moteur IA optimisé"
              },
              {
                icon: <Cpu className="h-8 w-8" />,
                title: "Intégration Transparente",
                description: "Connectez-vous sans effort à vos outils et workflows existants"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 + index * 0.2 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-blue-500/20 rounded-lg p-6 hover:border-blue-400/40 transition-colors duration-300"
              >
                <div className="text-blue-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Possible Integrations Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="my-16"
          >
            <h3 className="text-2xl font-semibold text-center text-white mb-8">
              Intégrations Possibles
            </h3>
            <PossibleIntegrations />
          </motion.div>

          {/* Use Cases Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0 }}
            className="my-20"
          >
            <UseCasesSection onOpenConsultation={onOpenConsultation} />
          </motion.div>


        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </div>
  );
};