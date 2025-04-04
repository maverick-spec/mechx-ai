
import React, { useState, useEffect } from "react";

interface WordRotateProps {
  words: string[];
  className?: string;
}

export const WordRotate: React.FC<WordRotateProps> = ({ words, className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      // After fade out animation completes, change the word
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        setCurrentWord(words[(currentIndex + 1) % words.length]);
        setIsAnimating(false);
      }, 500); // Half of the transition duration
      
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(interval);
  }, [words, currentIndex]);

  return (
    <span className={`inline-block relative ${className}`}>
      <span 
        className={`text-gradient transition-opacity duration-1000 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
      >
        {currentWord}
      </span>
      <span className="absolute right-0 top-0 h-full w-0.5 bg-mechatronix-600 animate-pulse-slow"></span>
    </span>
  );
};
