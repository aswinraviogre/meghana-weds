import React from 'react';
import { WeddingDetails } from '../types/wedding';
import { formatShortDate } from '../utils/dateUtils';
import { SaveDateHandsIllustration } from './Icons';

interface SaveTheDateProps {
  details: WeddingDetails;
}

export const SaveTheDate: React.FC<SaveTheDateProps> = ({ details }) => {
  const formattedDate = formatShortDate(details.weddingDate);

  return (
    <section className={`save-the-date ${details.theme}`}>
      <SaveDateHandsIllustration className="save-date-illustration" />

      <h1 data-aos="fade-up">Our Forever Begins</h1>
      <h3 data-aos="fade-up">{formattedDate}</h3>

      <span className="opening-message" data-aos="fade-up">
        {details.blessingMessage}
      </span>
    </section>
  );
};
