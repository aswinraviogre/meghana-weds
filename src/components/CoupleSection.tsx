import React from 'react';
import { WeddingDetails } from '../types/wedding';

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
    <section className="couple-section no-photo-couple">
      {details.coupleTagline && (
        <h1 className="couple-section-heading" data-aos="fade-up">
          {details.coupleTagline}
        </h1>
      )}

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
