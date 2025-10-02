import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView, useMotionValue, animate, type MotionValue, useTransform, useAnimation } from "framer-motion"
import { Phone, MessageCircle, Mail, FileText, Calendar, Database, BookOpen, Gift, ChartBar as BarChart3, FileSpreadsheet, Search, Presentation, Zap, ArrowRight, Bot, Users, Building2, Scale, Cpu } from "lucide-react"

interface WorkflowStep {
  icon: React.ReactNode
  label: string
  description: string
}

interface Workflow {
  id: string
  title: string
  industry: string
  description: string
  inputIcon: React.ReactNode
  inputLabel: string
  aiIcon: React.ReactNode
  aiLabel: string
  outputs: WorkflowStep[]
  keywords: string[]
  color: string
  accentColor: string
}

const workflows: Workflow[] = [
  {
      id: "car-dealership",
      title: "Agent Vocal IA",
      industry: "Concessions automobiles",
      description: "Transformez les appels clients en rendez-vous instantanés et mises à jour CRM",
      inputIcon: <Phone className="w-6 h-6" />,
      inputLabel: "Appel Client",
      aiIcon: <Phone className="w-8 h-8" />,  // Changé en Phone pour Agent Vocal
      aiLabel: "Agent Vocal IA",
      outputs: [
        {
          icon: <Calendar className="w-5 h-5" />,
          label: "Rendez-vous Planifié",
          description: "Réservation instantanée"
        },
        {
          icon: <Database className="w-5 h-5" />,
          label: "CRM Mis à jour",
          description: "Données client enregistrées"
        }
      ],
      keywords: ["Appels 24/7", "Rendez-vous instantanés", "CRM mis à jour"],
      color: "from-[#007AFF] to-[#00D9F5]",
      accentColor: "bg-[#007AFF]"
    },
  {
    id: "law-firms",
    title: "Chatbot IA",
    industry: "Cabinets juridiques",
    description: "Qualification rapide des clients et collecte intelligente vers une base de données toujours à jour",
    inputIcon: <MessageCircle className="w-6 h-6" />,
    inputLabel: "Client",
    aiIcon: <Bot className="w-8 h-8" />,
    aiLabel: "Chatbot IA",
    outputs: [
      {
        icon: <Calendar className="w-5 h-5" />,
        label: "Prise de rendez-vous",
        description: "Clients pré-qualifiés instantanément"
      },
      {
        icon: <Database className="w-5 h-5" />,
        label: "Base de Données",
        description: "Collecte intelligente et mise à jour continue"
      }
    ],
    keywords: ["Qualification rapide", "Collecte intelligente", "base de données toujours à jour"],
    color: "from-[#007AFF] to-[#00D9F5]",
    accentColor: "bg-[#007AFF]"
  },
  {
      id: "hotels",
      title: "Agent Email IA Complexe",
      industry: "Hôtels",
      description: "Gestion avancée des emails clients avec routage vers CRM et envois intelligents personnalisés",
      inputIcon: <Database className="w-6 h-6" />,
      inputLabel: "Base Clients",
      aiIcon: <Mail className="w-8 h-8" />,  // Changé en Mail pour Agent Email
      aiLabel: "Agent Email IA",
      outputs: [
        {
          icon: <Building2 className="w-5 h-5" />,
          label: "CRM Mis à Jour",
          description: "Réservations et enregistrements actualisés"
        },
        {
          icon: <Mail className="w-5 h-5" />,
          label: "Envoi Intelligent",
          description: "Personnalisation et segmentation automatique"
        }
      ],
      keywords: ["Segmentation automatique", "Réservations directes", "envois intelligents"],
      color: "from-[#007AFF] to-[#00D9F5]",
      accentColor: "bg-[#007AFF]"
    },
  {
      id: "accountants",
      title: "Analyse de Données & Rapports IA",
      industry: "Cabinets comptables",
      description: "Analyse financière automatisée et génération de rapports",
      inputIcon: <FileSpreadsheet className="w-6 h-6" />,
      inputLabel: "Données Financières",
      aiIcon: <Cpu className="w-8 h-8" />,  // Changé en Cpu pour Moteur d'Analyse (comme 'moteur' de traitement)
      aiLabel: "Moteur d'Analyse IA",
      outputs: [
        {
          icon: <BarChart3 className="w-5 h-5" />,
          label: "Rapports Automatisés",
          description: "Génération instantanée"
        },
        {
          icon: <Presentation className="w-5 h-5" />,
          label: "Diapositives Créées",
          description: "Présentations prêtes"
        },
        {
          icon: <Search className="w-5 h-5" />,
          label: "Recherche Effectuée",
          description: "Intelligence en ligne"
        }
      ],
      keywords: ["Analyses automatiques", "Rapports instantanés", "Recherche intelligente"],
      color: "from-[#007AFF] to-[#00D9F5]",
      accentColor: "bg-[#007AFF]"
    }
  ]

const FlowLine = ({ progress, direction = 'forward', isVisible = false, noDot = false }: { progress: MotionValue<number>; direction?: 'forward' | 'backward'; isVisible?: boolean; noDot?: boolean }) => {
  const xPosition = useTransform(progress, (v) => `${v * 100}%`);
  
  const gradient = useTransform(progress, (p) => {
    const val = direction === 'forward' ? p * 100 : (1 - p) * 100;
    const gradientDir = direction === 'forward' ? 'to right' : 'to left';
    const startColor = direction === 'forward' ? '#007AFF' : '#00D9F5';
    const endColor = direction === 'forward' ? '#00D9F5' : '#007AFF';
    return `linear-gradient(${gradientDir}, transparent 0%, ${startColor} ${val}%, ${endColor} ${val + 10}%, transparent 100%)`;
  });
  
  const clipPath = useTransform(progress, (p) => {
    if (direction === 'forward') {
      return `inset(${(1 - p) * 100}% 0 0 0)`; // Reveal from left to right
    } else {
      return `inset(0 ${(1 - p) * 100}% 0 0)`; // Reveal from right to left for backward
    }
  });
  
  return (
    <div className="relative flex-1 h-0.5 bg-transparent">
      <motion.div
        className="absolute inset-0 h-full"
        style={{ 
          background: gradient,
          clipPath
        }}
      />
      {isVisible && !noDot && (
        <motion.div
          className="absolute top-1/2 w-2 h-2 bg-[#00D9F5] rounded-full shadow-lg invisible"
          style={{ 
            x: xPosition,
            transform: 'translateX(-50%) translateY(-50%)'
          }}
        />
      )}
    </div>
  )
}

const WorkflowCard = ({ workflow, index }: { workflow: Workflow; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: false, amount: 0.3 })
  const localActive = isInView
  const [step, setStep] = useState(0) // 0: input on, 1: ai on, 2: flow to ai forward, 3: outputs on, 4: flow to outputs backward (return), 5: flow to ai backward, 6: pause before loop
  const [inputFlowDirection, setInputFlowDirection] = useState<'forward' | 'backward'>('forward');
  const inputToAiProgress = useMotionValue(0)
  const aiToOutputsProgress = useMotionValue(0)
  const dotX = useMotionValue(0)
  const inputActive = step >= 0 && step < 7
  const aiActive = step >= 1
  const outputsActive = step >= 3
  const flowInputToAiActive = step === 2
  const flowAiToOutputsActive = step === 3 || step === 4 // forward on 3, backward on 4
  const inputReturnActive = step === 6
  const inputFlowVisible = step === 2 || step === 6;
  const inputDirection = inputFlowDirection
  const outputDirection = step === 4 ? 'backward' : 'forward'
  
  const inputIconRef = useRef<HTMLDivElement>(null);
  const [aiPulseState, setAiPulseState] = useState<'idle' | 'preActive' | 'pulsing'>('idle');
  const aiInnerVariants = {
    idle: {
      scale: 1,
      opacity: 0
    },
    preActive: {
      scale: 1,
      opacity: 0.3
    },
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.6, 0.3],
      transition: { duration: 3, repeat: Infinity }
    }
  };
  const aiRingVariants = {
    idle: {
      scale: 1,
      opacity: 0
    },
    preActive: {
      scale: 1,
      opacity: 0.5
    },
    pulse: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: { duration: 2, repeat: Infinity }
    }
  };
  const outputVariants = {
    idle: {
      opacity: 0
    },
    pulse: {
      opacity: [0, 0.4, 0],
      transition: { duration: 2, repeat: Infinity }
    }
  };
  const outputPulseControls = useRef<ReturnType<typeof useAnimation>[]>([]);
  
  const pulseInput = () => {
    if (inputIconRef.current) {
      animate(inputIconRef.current, {
        scale: [1, 1.1, 1],
        opacity: [1, 0.7, 1]
      }, { 
        duration: 0.6, 
        ease: "easeInOut" 
      });
    }
  };
  
  useEffect(() => {
    if (!isInView) {
      setStep(0)
      inputToAiProgress.set(0)
      aiToOutputsProgress.set(0)
      setAiPulseState('idle');
      outputPulseControls.current.forEach(ctrl => ctrl?.stop());
      return
    }
    
    let isLooping = true;
    const timeline = async () => {
      while (isLooping) {
        // Step 1: AI activates after 0.6s initial, but loop starts
        setStep(1)
        await new Promise(resolve => setTimeout(resolve, 1300)) // pause at AI 1.3s
        
        // Step 2: Flow to AI forward 2s
        setStep(2)
        setInputFlowDirection('forward');
        pulseInput(); // Trigger pulse when sending
        await animate(inputToAiProgress, 1, { 
          duration: 2, 
          ease: 'easeInOut',
          onComplete: () => {
            setAiPulseState('pulsing');
          }
        })
        await new Promise(resolve => setTimeout(resolve, 1300))
        
        // Step 3: Outputs activate, flow to outputs forward 2s
        setStep(3)
        await animate(aiToOutputsProgress, 1, { 
          duration: 2, 
          ease: 'easeInOut',
          onComplete: () => {
            setAiPulseState('idle'); // Stop first pulse after sending to outputs
            workflow.outputs.forEach((_, outIndex) => {
              setTimeout(() => {
                outputPulseControls.current[outIndex]?.start('pulse');
              }, outIndex * 200);
            });
          }
        })
        
        // Pause at outputs 1.3s
        await new Promise(resolve => setTimeout(resolve, 1300))
        
        // Step 4: Return from outputs to AI backward 2s
        setStep(4)
        setInputFlowDirection('backward'); // Prepare left line for chain
        await animate(aiToOutputsProgress, 0, { 
          duration: 2, 
          ease: 'easeInOut',
          onComplete: () => {
            outputPulseControls.current.forEach(ctrl => ctrl?.stop());
          }
        })
        
        // Pause at AI on return 1.3s
        setStep(5)
        await new Promise(resolve => setTimeout(resolve, 1300))
        
        // Step 6: Return to input backward 2s - trigger second pulse at start
        setStep(6)
        setAiPulseState('pulsing'); // Second trigger: begin sending back
        await animate(inputToAiProgress, 0, { 
          duration: 2, 
          ease: 'easeInOut',
          onComplete: () => {
            setAiPulseState('idle'); // Stop second pulse
            pulseInput();
          }
        })
        
        // Final pause 1.5s before loop
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Check if still in view before continuing loop
        if (!isInView) {
          isLooping = false;
          return;
        }
        setStep(0)
      }
    }
    
    const initialDelay = index * 0.2 // stagger entry
    setTimeout(() => timeline(), initialDelay * 1000)
    
    return () => { isLooping = false; }
  }, [isInView, index, inputToAiProgress, aiToOutputsProgress])
  
  return (
    <motion.div
      ref={cardRef}
      className="relative bg-[#0A192F]/80 backdrop-blur-sm border border-[#007AFF]/20 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${workflow.color} opacity-5`} />
      
      {/* Industry badge */}
      <div className="flex items-center gap-2 mb-4 md:mb-6">
        <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${workflow.accentColor}`} />
        <span className="text-[#00D9F5] text-xs md:text-sm font-medium">{workflow.industry}</span>
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{workflow.title}</h3>
      <p className="text-sm md:text-base text-gray-300 mb-6 md:mb-8">{workflow.description}</p>

      {/* Workflow visualization */}
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0 mb-6 md:mb-8 overflow-x-auto">
        {/* Input */}
        <motion.div
          className="flex flex-col items-center flex-shrink-0"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={inputActive ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0.6 }}
          transition={{ duration: 0.5 }}
        >
          <div ref={inputIconRef} className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg md:rounded-xl flex items-center justify-center mb-2 relative">
            <div className="scale-75 md:scale-100">{workflow.inputIcon}</div>
            <motion.div
              className="absolute inset-0 bg-[#007AFF]/20 rounded-lg md:rounded-xl"
              animate={inputActive ? { opacity: [0, 0.5, 0] } : { opacity: 0 }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
          <span className="text-xs text-gray-400 text-center whitespace-nowrap">{workflow.inputLabel}</span>
        </motion.div>

        {/* Flow line to AI */}
        <div className="hidden md:block flex-1">
          <FlowLine
            progress={inputToAiProgress}
            direction={inputDirection}
            isVisible={inputFlowVisible}
          />
        </div>
        <div className="md:hidden h-8 w-0.5 bg-transparent">
          <motion.div
            className="h-full w-full bg-gradient-to-b from-[#007AFF] to-[#00D9F5]"
            style={{
              clipPath: useTransform(inputToAiProgress, (p) => `inset(${(1 - p) * 100}% 0 0 0)`)
            }}
          />
        </div>

        {/* AI Agent */}
        <motion.div
          className="flex flex-col items-center relative flex-shrink-0"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={aiActive ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0.6 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${workflow.color} rounded-lg md:rounded-xl flex items-center justify-center mb-2 relative`}>
            <div className="scale-75 md:scale-100">{workflow.aiIcon}</div>
            <motion.div
              className="absolute inset-0 bg-white/10 rounded-lg md:rounded-xl"
              variants={aiInnerVariants}
              animate={aiPulseState === 'pulsing' ? 'pulse' : aiPulseState}
              initial={false}
            />
            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 border-2 border-[#00D9F5] rounded-lg md:rounded-xl"
              variants={aiRingVariants}
              animate={aiPulseState === 'pulsing' ? 'pulse' : aiPulseState}
              initial={false}
            />
          </div>
          <span className="text-xs text-[#00D9F5] font-medium text-center whitespace-nowrap">{workflow.aiLabel}</span>
        </motion.div>

        {/* Flow line to Outputs */}
        <div className="hidden md:block flex-1">
          <FlowLine
            progress={aiToOutputsProgress}
            direction={outputDirection}
            isVisible={flowAiToOutputsActive}
          />
        </div>
        <div className="md:hidden h-8 w-0.5 bg-transparent">
          <motion.div
            className="h-full w-full bg-gradient-to-b from-[#007AFF] to-[#00D9F5]"
            style={{
              clipPath: useTransform(aiToOutputsProgress, (p) => outputDirection === 'forward' ? `inset(${(1 - p) * 100}% 0 0 0)` : `inset(0 0 ${(1 - p) * 100}% 0)`)
            }}
          />
        </div>

        {/* Outputs */}
        <div className="flex flex-col md:flex-row md:flex-1 gap-3 md:gap-4 w-full md:w-auto">
          {workflow.outputs.map((output, outIndex) => {
            const pulseControls = useAnimation();
            outputPulseControls.current[outIndex] = pulseControls;
            return (
              <motion.div
                key={outIndex}
                className="flex flex-col items-center flex-1"
                style={{
                  scale: useTransform(aiToOutputsProgress, (v: number) => outputsActive ? 0.9 + 0.2 * v : 0.9),
                  opacity: useTransform(aiToOutputsProgress, (v: number) => outputsActive ? 0.6 + 0.4 * v : 0.6)
                }}
              >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg md:rounded-xl flex items-center justify-center mb-1 relative">
                <div className="scale-75 md:scale-100">{output.icon}</div>
                <motion.div
                  className="absolute inset-0 bg-[#00D9F5]/20 rounded-lg md:rounded-xl"
                  variants={outputVariants}
                  animate={pulseControls}
                  initial={false}
                />
              </div>
              <span className="text-xs text-gray-400 text-center">{output.label}</span>
              <span className="text-xs text-gray-500 text-center">{output.description}</span>
            </motion.div>
            )
          })}
        </div>

        {/* Single Unified Dot */}
        {false && (inputFlowVisible || flowAiToOutputsActive) && (
          <motion.div
            className="absolute w-2 h-2 bg-[#00D9F5] rounded-full shadow-lg pointer-events-none z-20"
            style={{ 
              left: dotX,
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          />
        )}
      </div>

      {/* Keywords */}
      <div className="flex flex-wrap gap-2 mt-4 md:mt-6">
        {workflow.keywords.map((keyword, kIndex) => (
          <span key={kIndex} className="px-2 md:px-3 py-1 bg-[#007AFF]/10 text-[#00D9F5] text-xs rounded-full">
            {keyword}
          </span>
        ))}
      </div>
    </motion.div>
  ) }


interface UseCasesSectionProps {
  onOpenConsultation?: () => void;
}

const UseCasesSection = ({ onOpenConsultation }: UseCasesSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="w-full py-12 md:py-20 lg:py-24 px-4 bg-[#0A192F] relative overflow-hidden"
    >


      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
            <Zap className="w-4 h-4 md:w-5 md:h-5 text-[#007AFF]" />
            <span className="text-xs md:text-sm text-[#007AFF] font-medium">FLUX DE TRAVAIL AUTOMATISÉS IA</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 px-2">
            <span className="text-white">Découvrez nos </span>
            <span className="bg-gradient-to-r from-[#007AFF] to-[#00D9F5] bg-clip-text text-transparent">cas d'usage IA</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-8 md:mb-12 lg:mb-16 px-4">
            Ces exemples illustrent comment nos agents IA transforment les opérations dans divers secteurs.
            Ce ne sont que quelques possibilités – nous concevons des solutions sur mesure pour répondre à tous vos besoins spécifiques.
          </p>
        </motion.div>

        <div className="space-y-6 md:space-y-8 max-w-6xl mx-auto">
          {workflows.map((workflow, index) => (
            <WorkflowCard
              key={workflow.id}
              workflow={workflow}
              index={index}
            />
          ))}
        </div>



        {/* Call to Action */}
        <motion.div
          className="text-center mt-12 md:mt-16 pt-6 md:pt-8 border-t border-[#007AFF]/10 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">Prêt à révolutionner votre secteur ?</h3>
          <button className="bg-gradient-to-r from-[#007AFF] to-[#00D9F5] text-white px-6 md:px-10 py-3 md:py-4 rounded-full font-bold text-sm md:text-base lg:text-lg hover:from-[#00D9F5] hover:to-[#007AFF] transition-all duration-300 shadow-lg hover:shadow-xl" onClick={onOpenConsultation}>
            <span>Personnaliser Vos Solutions</span> <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 inline-flex" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCasesSection;