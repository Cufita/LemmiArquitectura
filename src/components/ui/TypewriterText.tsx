import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}

export default function TypewriterText({ text, delay = 0, speed = 40, className = "" }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  // Intersection Observer para detectar cuando está visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 } // Se activa cuando el 50% está visible
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  // Iniciar la animación después del delay cuando está visible
  useEffect(() => {
    if (!isInView || hasStarted) return;

    const timer = setTimeout(() => {
      setHasStarted(true);
      setShowCursor(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [isInView, delay, hasStarted]);

  // Animación de escritura
  useEffect(() => {
    if (!hasStarted || currentIndex >= text.length) {
      if (currentIndex >= text.length && showCursor) {
        // Mantener cursor por un momento después de completar
        setTimeout(() => setShowCursor(false), 1000);
      }
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedText(text.slice(0, currentIndex + 1));
      setCurrentIndex(currentIndex + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [currentIndex, text, speed, hasStarted]);

  return (
    <span ref={elementRef} className={className}>
      "{displayedText}"
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block w-0.5 h-4 bg-zinc-800 ml-0.5 align-middle"
        />
      )}
    </span>
  );
}