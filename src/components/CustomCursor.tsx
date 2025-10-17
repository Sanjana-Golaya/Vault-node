import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [isIdle, setIsIdle] = useState(false);
  
  // Motion values for cursor position
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Spring animation for smooth lag effect
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  useEffect(() => {
    let idleTimer: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Reset idle state on movement
      setIsIdle(false);
      
      // Set idle after 2 seconds of no movement
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        setIsIdle(true);
      }, 2000);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(idleTimer);
    };
  }, [cursorX, cursorY]);
  
  return (
    <motion.div
      className="custom-cursor"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        x: cursorXSpring,
        y: cursorYSpring,
        pointerEvents: "none",
        zIndex: 9999,
        opacity: isIdle ? 0.3 : 1,
      }}
      transition={{ opacity: { duration: 0.5 } }}
    >
      {/* Outer glow */}
      <div
        className="absolute"
        style={{
          width: "60px",
          height: "60px",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 30%, transparent 70%)",
          filter: "blur(12px)",
          borderRadius: "50%",
        }}
      />
      
      {/* Middle glow */}
      <div
        className="absolute"
        style={{
          width: "30px",
          height: "30px",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 40%, transparent 70%)",
          filter: "blur(6px)",
          borderRadius: "50%",
        }}
      />
      
      {/* Core dot */}
      <div
        className="absolute"
        style={{
          width: "8px",
          height: "8px",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 50%, rgba(255, 255, 255, 0.6) 100%)",
          borderRadius: "50%",
          boxShadow: "0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(255, 255, 255, 0.4)",
        }}
      />
    </motion.div>
  );
}