import React from 'react';
import { WeddingDetails } from '../types/wedding';

interface ClosingFooterProps {
  details: WeddingDetails;
}

export const ClosingFooter: React.FC<ClosingFooterProps> = ({ details }) => {
  return (
    <>
      <section className={`rsvp-footer-section ${details.theme}`}>
        <div className="rsvp-envelope" data-aos="fade-up">
          <img src="/assets/envelope-cropped.png" alt="footer-env" />
          <div className="rsvp-safe rsvp-empty-state">
            <div className="rsvp-empty-content">
              <h3 className="rsvp-empty-heading">
                UNTIL<span>WE</span>MEET
              </h3>
              <p className="rsvp-empty-subtitle">
                We look forward to celebrating with you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className={`branding-footer ${details.theme}`}>
        {details.auspiciousLine} &bull; {details.brideShortName} &amp; {details.groomShortName}
      </footer>
    </>
  );
};
