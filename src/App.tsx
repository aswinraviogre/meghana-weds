import React, { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { weddingDetails, weddingEvents } from './data/weddingData';
import { EnvelopeSplash } from './components/EnvelopeSplash';
import { MusicToggle } from './components/MusicToggle';
import { HeroCover } from './components/HeroCover';
import { SaveTheDate } from './components/SaveTheDate';
import { CountdownSection } from './components/CountdownSection';
import { CoupleSection } from './components/CoupleSection';
import { EventsTimeline } from './components/EventsTimeline';
import { FamilyBlessings } from './components/FamilyBlessings';
import { ClosingFooter } from './components/ClosingFooter';
import { syncSocialMetaTags } from './utils/socialMeta';

export const App: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [envelopeOpen, setEnvelopeOpen] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  useEffect(() => {
    const displayNames =
      weddingDetails.displayOrder === 'brideFirst'
        ? `${weddingDetails.brideShortName} & ${weddingDetails.groomShortName}`
        : `${weddingDetails.groomShortName} & ${weddingDetails.brideShortName}`;
    document.title = `${displayNames} - Wedding Invitation`;
    syncSocialMetaTags();
  }, []);

  useEffect(() => {
    if (!envelopeOpen) {
      requestAnimationFrame(() => {
        AOS.refresh();
      });
    }
  }, [envelopeOpen]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && audioRef.current) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const playMusic = () => {
    if (!audioRef.current) return;
    audioRef.current
      .play()
      .then(() => {
        setIsMusicPlaying(true);
      })
      .catch(() => {
        setIsMusicPlaying(false);
      });
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      playMusic();
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={weddingDetails.music.audioUrl}
        preload="none"
        loop
      />

      {envelopeOpen ? (
        <EnvelopeSplash
          details={weddingDetails}
          onOpen={playMusic}
          onAnimationComplete={() => setEnvelopeOpen(false)}
        />
      ) : (
        <>
          <MusicToggle
            enabled={weddingDetails.music.enabled}
            isPlaying={isMusicPlaying}
            onToggle={toggleMusic}
            theme={weddingDetails.theme}
          />
          <HeroCover details={weddingDetails} />
          <SaveTheDate details={weddingDetails} />
          <CountdownSection details={weddingDetails} />
          <CoupleSection details={weddingDetails} />
          <EventsTimeline events={weddingEvents} theme={weddingDetails.theme} />
          <FamilyBlessings details={weddingDetails} />
          <ClosingFooter details={weddingDetails} />
        </>
      )}
    </>
  );
};

export default App;
