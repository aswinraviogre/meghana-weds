import React, { useEffect, useRef, useState } from 'react';
import { WeddingDetails } from '../types/wedding';
import { ScrollArrowIcon } from './Icons';

const COMPACT_NAME_FONTS = ['Playfair Display, serif', 'Cinzel Decorative, serif'];

interface HeroCoverProps {
  details: WeddingDetails;
}

export const HeroCover: React.FC<HeroCoverProps> = ({ details }) => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [hideScrollIndicator, setHideScrollIndicator] = useState(false);
  const autoScrollTimerRef = useRef<number | null>(null);
  const hideCleanupTimerRef = useRef<number | null>(null);
  const hasInteractedRef = useRef(false);

  const dismissIndicator = () => {
    setShowScrollIndicator((prev) => {
      if (!prev) return prev;
      setHideScrollIndicator(true);
      if (hideCleanupTimerRef.current) {
        window.clearTimeout(hideCleanupTimerRef.current);
      }
      hideCleanupTimerRef.current = window.setTimeout(() => {
        setShowScrollIndicator(false);
      }, 3000);
      return prev;
    });
  };

  const handleScrollClick = () => {
    if (autoScrollTimerRef.current) {
      window.clearTimeout(autoScrollTimerRef.current);
    }
    hasInteractedRef.current = true;
    dismissIndicator();
    window.scrollBy({ top: 100, behavior: 'smooth' });
  };

  useEffect(() => {
    autoScrollTimerRef.current = window.setTimeout(() => {
      if (!hasInteractedRef.current) {
        handleScrollClick();
      }
    }, 8000);

    const handleUserScroll = () => {
      if (autoScrollTimerRef.current) {
        window.clearTimeout(autoScrollTimerRef.current);
      }
      hasInteractedRef.current = true;
      dismissIndicator();
    };

    window.addEventListener('wheel', handleUserScroll, { passive: true });
    window.addEventListener('touchmove', handleUserScroll, { passive: true });

    return () => {
      if (autoScrollTimerRef.current) {
        window.clearTimeout(autoScrollTimerRef.current);
      }
      if (hideCleanupTimerRef.current) {
        window.clearTimeout(hideCleanupTimerRef.current);
      }
      window.removeEventListener('wheel', handleUserScroll);
      window.removeEventListener('touchmove', handleUserScroll);
    };
  }, []);

  const isCompact = COMPACT_NAME_FONTS.includes(details.nameFontStyle);

  const renderBride = () => (
    <h3
      className={`cover-name ${isCompact ? 'cover-name--compact' : ''}`}
      style={{ fontFamily: details.nameFontStyle }}
    >
      {details.brideShortName}
    </h3>
  );

  const renderGroom = () => (
    <h3
      className={`cover-name ${isCompact ? 'cover-name--compact' : ''}`}
      style={{ fontFamily: details.nameFontStyle }}
    >
      {details.groomShortName}
    </h3>
  );

  return (
    <section className="cover no-photo-cover cover-animate">
      <picture>
        <source media="(min-width:768px)" srcSet="/assets/theme1-desk-bg.jpg" />
        <img
          className="cover-bg-image"
          src="/assets/theme1-mobile-bg.jpg"
          alt="cover background"
        />
      </picture>

      <div className="no-photo-bg-card">
        <img
          src="/assets/theme1-cover-flower.png"
          className="card-flower card-flower-top"
          alt="Cover flower"
        />

        <div className="cover-details">
          <span className="cover-auspicious">{details.auspiciousLine}</span>

          <div className="cover-name-wrapper">
            {details.displayOrder === 'groomFirst' ? (
              <>
                {renderGroom()}
                <span
                  className={`cover-and ${isCompact ? 'cover-and--compact' : ''}`}
                  style={{ fontFamily: details.nameFontStyle }}
                >
                  &amp;
                </span>
                {renderBride()}
              </>
            ) : (
              <>
                {renderBride()}
                <span
                  className={`cover-and ${isCompact ? 'cover-and--compact' : ''}`}
                  style={{ fontFamily: details.nameFontStyle }}
                >
                  &amp;
                </span>
                {renderGroom()}
              </>
            )}
          </div>
        </div>

        <img
          src="/assets/theme1-cover-flower.png"
          alt=""
          className="card-flower card-flower-bottom"
        />
      </div>

      {showScrollIndicator && (
        <div
          className={`scroll-indicator ${hideScrollIndicator ? 'hide' : ''}`}
          onClick={handleScrollClick}
          role="button"
          tabIndex={0}
          aria-label="Scroll down"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleScrollClick();
            }
          }}
        >
          <ScrollArrowIcon className="scroll-indication-icon" />
          <span>SCROLL</span>
        </div>
      )}
    </section>
  );
};
