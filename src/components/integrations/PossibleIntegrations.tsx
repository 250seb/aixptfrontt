import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

interface Logo {
  id: string;
  name: string;
  image?: string;
  className?: string;
}

interface PossibleIntegrationsProps {
  heading?: string;
  logos?: Logo[];
  autoScrollInterval?: number;
  className?: string;
}

export const PossibleIntegrations: React.FC<PossibleIntegrationsProps> = ({
  heading = "Intégrations Possibles",
  logos = [
    {
      id: "hubspot",
      name: "HubSpot",
      className: "h-8 w-auto",
    },
    {
      id: "salesforce",
      name: "Salesforce",
      className: "h-8 w-auto",
    },
    {
      id: "microsoft-teams",
      name: "Microsoft Teams",
      className: "h-8 w-auto",
    },
    {
      id: "slack",
      name: "Slack",
      className: "h-8 w-auto",
    },
    {
      id: "zapier",
      name: "Zapier",
      className: "h-8 w-auto",
    },
    {
      id: "google-workspace",
      name: "Google Workspace",
      className: "h-8 w-auto",
    },
    {
      id: "notion",
      name: "Notion",
      className: "h-8 w-auto",
    },
    {
      id: "airtable",
      name: "Airtable",
      className: "h-8 w-auto",
    },
    {
      id: "trello",
      name: "Trello",
      className: "h-8 w-auto",
    },
    {
      id: "asana",
      name: "Asana",
      className: "h-8 w-auto",
    },
  ],
  autoScrollInterval = 3000,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const itemsPerView = 5;
  const maxIndex = Math.max(0, logos.length - itemsPerView);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = window.setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          return nextIndex > maxIndex ? 0 : nextIndex;
        });
      }, autoScrollInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, maxIndex, autoScrollInterval]);

  const scrollToPrevious = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      return newIndex < 0 ? maxIndex : newIndex;
    });
  };

  const scrollToNext = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      return newIndex > maxIndex ? 0 : newIndex;
    });
  };

  const generateLogoSVG = (name: string) => {
    const initials = name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    return (
      <svg
        width="120"
        height="40"
        viewBox="0 0 120 40"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="120"
          height="40"
          rx="6"
          fill="rgba(59, 130, 246, 0.1)"
          stroke="#3B82F6"
          strokeWidth="1"
        />
        <text
          x="60"
          y="25"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="14"
          fontFamily="Arial, sans-serif"
          fontWeight="600"
        >
          {initials}
        </text>
      </svg>
    );
  };

  return (
    <section className={cn("py-16 px-4 bg-black", className)}>
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {heading}
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-300">
            Connectez-vous aux principales plateformes logicielles que les entreprises utilisent quotidiennement. 
            Intégrations API transparentes disponibles.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={scrollToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-blue-600 text-white transition-all duration-200 hover:scale-110 hover:bg-blue-700"
            aria-label="Logos précédents"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={scrollToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-blue-600 text-white transition-all duration-200 hover:scale-110 hover:bg-blue-700"
            aria-label="Logos suivants"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Logos Container */}
          <div 
            ref={containerRef}
            className="overflow-hidden mx-12"
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {logos.map((logo) => (
                <div
                  key={logo.id}
                  className="flex-shrink-0 group cursor-pointer"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="relative p-6 rounded-lg border border-blue-500/20 bg-gray-900/50 backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:border-blue-400/40">
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-blue-500/10 shadow-lg shadow-blue-500/25" />
                    
                    {/* Logo Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-20">
                      {logo.image ? (
                        <img
                          src={logo.image}
                          alt={logo.name}
                          className={cn("object-contain", logo.className)}
                        />
                      ) : (
                        generateLogoSVG(logo.name)
                      )}
                    </div>
                    
                    {/* Logo Name */}
                    <div className="relative z-10 mt-3 text-center">
                      <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                        {logo.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200",
                  index === currentIndex ? "bg-blue-400" : "bg-gray-600"
                )}
                aria-label={`Aller à la diapositive ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};