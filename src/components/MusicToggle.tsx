import React from 'react';
import { MusicNoteIcon, PauseIcon } from './Icons';

interface MusicToggleProps {
  enabled: boolean;
  isPlaying: boolean;
  onToggle: () => void;
  theme: string;
}

export const MusicToggle: React.FC<MusicToggleProps> = ({
  enabled,
  isPlaying,
  onToggle,
  theme,
}) => {
  if (!enabled) return null;

  return (
    <div
      className={`music-handler ${theme}`}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Toggle music"
      aria-pressed={isPlaying}
    >
      {isPlaying ? (
        <PauseIcon className="music-icon" />
      ) : (
        <MusicNoteIcon className="music-icon" />
      )}
    </div>
  );
};

