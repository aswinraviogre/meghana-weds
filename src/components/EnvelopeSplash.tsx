import React, { useState } from 'react';
import { WeddingDetails } from '../types/wedding';
import { GanpatiIcon } from './Icons';

interface EnvelopeSplashProps {
  details: WeddingDetails;
  onOpen: () => void;
  onAnimationComplete: () => void;
}

export const EnvelopeSplash: React.FC<EnvelopeSplashProps> = ({
  details,
  onOpen,
  onAnimationComplete,
}) => {
  const [animating, setAnimating] = useState(false);

  const handleOpen = () => {
    if (animating) return;
    setAnimating(true);
    onOpen();
    window.setTimeout(() => {
      onAnimationComplete();
    }, 1350);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLImageElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpen();
    }
  };

  return (
    <div className={`envelope-screen ${details.theme}`}>
      <div className={`envelope ${animating ? 'animate' : ''}`}>
        <div className="envelope-seal">
          <img
            src="/assets/stamp.png"
            alt="Seal"
            role="button"
            tabIndex={0}
            aria-label="Click to open wedding invitation"
            onClick={handleOpen}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="top-area">
          <div className="top-area-content">
            {details.coverIcon === 'GanpatiIcon' && (
              <GanpatiIcon className="top-area-icon" />
            )}
            <span>{details.coverText}</span>
          </div>
        </div>

        <div className="click-to-open">Click to open</div>

        <svg className="top-flap" viewBox="0 0 536 544" preserveAspectRatio="none" aria-hidden="true">
          <path d=" M 0 0 L 536 0 L 536 255 L 312 475 L 224 475 L 0 255 Z " fill="currentColor" />
        </svg>
        <svg className="bottom-flap" viewBox="0 0 536 544" preserveAspectRatio="none" aria-hidden="true">
          <path d=" M 0 544 L 536 544 L 536 289 L 312 69 L 224 69 L 0 289 Z " fill="currentColor" />
        </svg>
        <svg className="left-flap" viewBox="0 0 185 325" preserveAspectRatio="none" aria-hidden="true">
          <path d=" M 0 325 L 0 0 L 185 162 Z " fill="currentColor" />
        </svg>
        <svg className="right-flap" viewBox="0 0 185 325" preserveAspectRatio="none" aria-hidden="true">
          <path d=" M 185 325 L 185 0 L 0 162 Z " fill="currentColor" />
        </svg>
      </div>
    </div>
  );
};

