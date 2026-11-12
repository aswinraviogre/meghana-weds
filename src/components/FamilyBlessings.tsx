import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FamilyCardInfo, WeddingDetails } from '../types/wedding';

gsap.registerPlugin(ScrollTrigger);

interface FamilyBlessingsProps {
  details: WeddingDetails;
}

const FamilyOrnamentDivider: React.FC = () => (
  <div className="family-ornament-divider" aria-hidden="true">
    <span className="family-ornament-line" />
    <span className="family-ornament-flower">❀</span>
    <span className="family-ornament-line" />
  </div>
);

interface FamilyRoleCardProps {
  card: FamilyCardInfo;
}

const FamilyRoleCard: React.FC<FamilyRoleCardProps> = ({ card }) => (
  <article className="family-card" data-aos="fade-up">
    <span className="family-card-role">{card.roleLabel}</span>
    <FamilyOrnamentDivider />
    <h3 className="family-card-parents">{card.parentsNames}</h3>
    <p className="family-card-invite">{card.inviteLine}</p>
  </article>
);

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

      <div className="family-blessings-inner">
        <header className="family-section-header" data-aos="fade-up">
          <p className="family-kicker">{details.familiesKicker}</p>
          <h2 className="family-main-heading">{details.familiesHeading}</h2>
          <FamilyOrnamentDivider />
        </header>

        <div className="family-cards-grid">
          <FamilyRoleCard card={details.brideFamilyCard} />
          <FamilyRoleCard card={details.groomFamilyCard} />
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
