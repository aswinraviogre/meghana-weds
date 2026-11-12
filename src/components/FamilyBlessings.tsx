import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WeddingDetails } from '../types/wedding';

gsap.registerPlugin(ScrollTrigger);

interface FamilyBlessingsProps {
  details: WeddingDetails;
}

export const FamilyBlessings: React.FC<FamilyBlessingsProps> = ({ details }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftCornerRef = useRef<HTMLImageElement | null>(null);
  const rightTopCornerRef = useRef<HTMLImageElement | null>(null);
  const rightBottomCornerRef = useRef<HTMLImageElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        const corners = [
          leftCornerRef.current,
          rightTopCornerRef.current,
          rightBottomCornerRef.current,
        ].filter((el): el is HTMLImageElement => Boolean(el));

        if (corners.length > 0) {
          gsap.from(corners, {
            autoAlpha: 0,
            duration: 1,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`t1-slider-section family-blessings-section ${details.theme}`}
    >
      <img
        ref={leftCornerRef}
        src="/slider-corner.png"
        alt="Floral corner ornament"
        className="t1-slider-left-corner"
      />
      <img
        ref={rightTopCornerRef}
        src="/slider-right-corner.png"
        alt="Floral corner ornament"
        className="t1-slider-right-corner"
      />

      <div className="family-blessings-inner" data-aos="fade-up">
        <div className="family-block">
          <h2 className="family-script-heading">{details.invitedByLabel}</h2>
          <p className="family-names-primary">{details.invitedByNames}</p>
        </div>

        <div className="family-divider" aria-hidden="true">
          <span>❀</span>
        </div>

        <div className="family-block">
          <p className="family-label">{details.complimentsLabel}</p>
          <p className="family-names-secondary">{details.complimentsNames}</p>
          <p className="family-near-dear">{details.nearAndDearText}</p>
        </div>
      </div>

      <img
        ref={rightBottomCornerRef}
        src="/slider-right-corner.png"
        alt="Floral corner ornament"
        className="t1-slider-right-bottom-corner"
      />
    </section>
  );
};

