import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface AppNode {
  id: string;
  name: string;
  icon: string;
  angle: number;
}

export function NetworkVisualization() {
  const [pulseProgress, setPulseProgress] = useState(0);

  // App nodes positioned in a circle
  const apps: AppNode[] = [
    { 
      id: "gpt", 
      name: "ChatGPT", 
      icon: "https://cdn.oaistatic.com/_next/static/media/apple-touch-icon.59f2e898.png",
      angle: 0 
    },
    { 
      id: "whatsapp", 
      name: "WhatsApp", 
      icon: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
      angle: 60 
    },
    { 
      id: "gmail", 
      name: "Gmail", 
      icon: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico",
      angle: 120 
    },
    { 
      id: "calendar", 
      name: "Calendar", 
      icon: "https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_31.ico",
      angle: 180 
    },
    { 
      id: "notion", 
      name: "Notion", 
      icon: "https://www.notion.so/images/favicon.ico",
      angle: 240 
    },
    { 
      id: "drive", 
      name: "Drive", 
      icon: "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png",
      angle: 300 
    },
  ];

  // Animate pulse continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseProgress((prev) => (prev + 0.01) % 1);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const centerX = 200;
  const centerY = 200;
  const radius = 140;

  // Generate curved path from center to app
  const getCurvedPath = (angle: number) => {
    const endX = centerX + radius * Math.cos((angle * Math.PI) / 180);
    const endY = centerY + radius * Math.sin((angle * Math.PI) / 180);
    
    // Control point for curve (offset perpendicular to the line)
    const midX = (centerX + endX) / 2;
    const midY = (centerY + endY) / 2;
    const perpAngle = angle + 90;
    const controlX = midX + 30 * Math.cos((perpAngle * Math.PI) / 180);
    const controlY = midY + 30 * Math.sin((perpAngle * Math.PI) / 180);
    
    return {
      path: `M ${centerX} ${centerY} Q ${controlX} ${controlY} ${endX} ${endY}`,
      endX,
      endY,
    };
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-square">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.3))' }}
      >
        <defs>
          {/* Subtle metallic rainbow gradient for pulses */}
          <linearGradient id="rainbowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B8B8B8" stopOpacity="0" />
            <stop offset="15%" stopColor="#D8B4E2" stopOpacity="0.4" />
            <stop offset="30%" stopColor="#A5C9E8" stopOpacity="0.5" />
            <stop offset="45%" stopColor="#B8DAD1" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#E8E8E8" stopOpacity="0.7" />
            <stop offset="55%" stopColor="#F5E6C8" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#E8C5B8" stopOpacity="0.5" />
            <stop offset="85%" stopColor="#D8B4E2" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#C0C0C0" stopOpacity="0" />
          </linearGradient>

          {/* Steel grey gradient for V logo */}
          <linearGradient id="metallicV" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B8B8B8" />
            <stop offset="30%" stopColor="#E3E3E3" />
            <stop offset="50%" stopColor="#C0C0C0" />
            <stop offset="70%" stopColor="#A8A8A8" />
            <stop offset="100%" stopColor="#D4D4D4" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Connection lines with animated pulses */}
        {apps.map((app) => {
          const { path } = getCurvedPath(app.angle);
          return (
            <g key={app.id}>
              {/* Base line */}
              <path
                d={path}
                fill="none"
                stroke="url(#rainbowGradient)"
                strokeWidth="1"
                opacity="0.2"
              />
              
              {/* Animated pulse */}
              <motion.path
                d={path}
                fill="none"
                stroke="url(#rainbowGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, pathOffset: 0 }}
                animate={{ 
                  pathLength: [0, 0.3, 0],
                  pathOffset: [0, 1, 1]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (app.angle / 360) * 0.3, // Slight stagger
                }}
              />
            </g>
          );
        })}

        {/* Central Vault V logo - rounded square with steel grey */}
        <g transform={`translate(${centerX}, ${centerY})`}>
          {/* Rounded square frame */}
          <rect
            x="-21"
            y="-21"
            width="42"
            height="42"
            rx="8"
            ry="8"
            fill="rgba(31, 41, 55, 0.3)"
            stroke="url(#metallicV)"
            strokeWidth="1.4"
          />
          
          {/* Inner subtle reflection line (top-left accent) */}
          <rect
            x="-19.5"
            y="-19.5"
            width="39"
            height="39"
            rx="7"
            ry="7"
            fill="none"
            stroke="rgba(229, 231, 235, 0.1)"
            strokeWidth="0.5"
          />
          
          {/* V letter - steel grey */}
          <text
            textAnchor="middle"
            dominantBaseline="central"
            fill="url(#metallicV)"
            style={{
              fontFamily: 'Zen Dots, cursive',
              fontSize: '34px',
              fontWeight: 'bold',
              filter: 'drop-shadow(0px 2px 6px rgba(0, 0, 0, 0.4))',
            }}
          >
            V
          </text>
        </g>
      </svg>

      {/* App icons positioned around the center */}
      {apps.map((app) => {
        const { endX, endY } = getCurvedPath(app.angle);
        return (
          <motion.div
            key={app.id}
            className="absolute"
            style={{
              left: `${(endX / 400) * 100}%`,
              top: `${(endY / 400) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: 1 
            }}
            transition={{
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (app.angle / 360) * 0.5,
              },
              opacity: {
                duration: 0.6,
                delay: 0.3,
              }
            }}
          >
            <div className="relative group">
              {/* Icon container with glow */}
              <div 
                className="w-14 h-14 rounded-xl bg-background border-2 border-accent/50 flex items-center justify-center overflow-hidden shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:border-primary/50"
                style={{
                  boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
                }}
              >
                <img 
                  src={app.icon} 
                  alt={app.name}
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    // Fallback to first letter if icon fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="text-2xl font-bold text-primary">${app.name[0]}</div>`;
                    }
                  }}
                />
              </div>
              
              {/* App name tooltip */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm">
                  {app.name}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}