import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WeddingDetails } from '../types/wedding';

gsap.registerPlugin(ScrollTrigger);

interface CoupleTextCardProps {
  fullName: string;
  parentsText: string;
}

const CoupleTextCard: React.FC<CoupleTextCardProps> = ({ fullName, parentsText }) => (
  <div className="single-couple-container" data-aos="fade-up">
    <h1 className="couple-name">{fullName}</h1>
    <div className="couple-parents">
      <p>{parentsText}</p>
    </div>
  </div>
);

interface CoupleSectionProps {
  details: WeddingDetails;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ details }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cornersRef = useRef<HTMLImageElement[]>([]);

  const addCornerRef = (el: HTMLImageElement | null) => {
    if (el && !cornersRef.current.includes(el)) {
      cornersRef.current.push(el);
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (cornersRef.current.length > 0 && sectionRef.current) {
        gsap.from(cornersRef.current, {
          opacity: 0,
          duration: 1,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderBride = () => (
    <CoupleTextCard
      fullName={details.brideFullName}
      parentsText={details.brideParents}
    />
  );

  const renderGroom = () => (
    <CoupleTextCard
      fullName={details.groomFullName}
      parentsText={details.groomParents}
    />
  );

  return (
    <section className="couple-section no-photo-couple" ref={sectionRef}>
      <img
        src="/assets/couple-section-flower.png"
        className="corner top-left"
        alt="Decorative flowers"
        ref={addCornerRef}
      />
      <img
        src="/assets/couple-section-flower.png"
        className="corner top-right"
        alt="Decorative flowers"
        ref={addCornerRef}
      />
      <img
        src="/assets/couple-section-flower.png"
        className="corner bottom-left"
        alt="Decorative flowers"
        ref={addCornerRef}
      />
      <img
        src="/assets/couple-section-flower.png"
        className="corner bottom-right"
        alt="Decorative flowers"
        ref={addCornerRef}
      />

      {details.coupleImageUrl && (
        <div className="couple-portrait-wrapper" data-aos="fade-up">
          <img
            src={details.coupleImageUrl}
            alt={`${details.brideShortName} and ${details.groomShortName}`}
            className="couple-portrait-image"
          />
        </div>
      )}

      <div className="couple-wrapper">
        {details.displayOrder === 'groomFirst' ? (
          <>
            {renderGroom()}
            <span className="couple-divider" data-aos="fade-up">
              {details.coupleDividerText}
            </span>
            {renderBride()}
          </>
        ) : (
          <>
            {renderBride()}
            <span className="couple-divider" data-aos="fade-up">
              {details.coupleDividerText}
            </span>
            {renderGroom()}
          </>
        )}
      </div>
    </section>
  );
};
