import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WeddingEvent } from '../types/wedding';
import { formatEventDate, formatWeekdayUpper } from '../utils/dateUtils';
import { HeartFilledIcon, HeartOutlineIcon } from './Icons';

gsap.registerPlugin(ScrollTrigger);

interface EventsTimelineProps {
  events: WeddingEvent[];
  theme: string;
}

export const EventsTimeline: React.FC<EventsTimelineProps> = ({ events, theme }) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let resizeTimer: number | undefined;
    let onScrollRefresh: (() => void) | null = null;
    let onResize: (() => void) | null = null;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.timeline-item', section);
      const lineFill = section.querySelector<HTMLElement>('.timeline-line-fill');
      const timelineLine = section.querySelector<HTMLElement>('.timeline-line');
      const cards = section.querySelectorAll<HTMLElement>('.event-card');

      const updateLineMetrics = () => {
        const timeline = section.querySelector<HTMLElement>('.timeline');
        if (!timeline || !timelineLine || items.length === 0) return;

        const dots = items
          .map((item) => item.querySelector<HTMLElement>('.timeline-dot'))
          .filter((dot): dot is HTMLElement => Boolean(dot));

        if (dots.length === 0) return;

        const timelineRect = timeline.getBoundingClientRect();
        const firstDotRect = dots[0].getBoundingClientRect();
        const lastDotRect = dots[dots.length - 1].getBoundingClientRect();

        const top = firstDotRect.top + firstDotRect.height / 2 - timelineRect.top;
        const height =
          lastDotRect.top + lastDotRect.height / 2 - timelineRect.top - top + 55;

        gsap.set(timelineLine, { top, height: Math.max(0, height) });
      };

      gsap.set(cards, { opacity: 0, y: 60 });

      if (lineFill && timelineLine && items.length > 0) {
        gsap.set(lineFill, { scaleY: 0, transformOrigin: 'top center' });
        gsap.set(section.querySelectorAll('.heart-outline'), { opacity: 1 });
        gsap.set(section.querySelectorAll('.heart-filled'), {
          opacity: 0,
          scale: 0.7,
          transformOrigin: 'center center',
        });

        updateLineMetrics();

        items.forEach((item, index) => {
          const card = item.querySelector<HTMLElement>('.event-card');
          const dot = item.querySelector<HTMLElement>('.timeline-dot');
          const outlineHeart = dot?.querySelector<SVGSVGElement>('.heart-outline');
          const filledHeart = dot?.querySelector<SVGSVGElement>('.heart-filled');

          if (!card || !dot || !outlineHeart || !filledHeart) return;

          const isLast = index === items.length - 1;
          ScrollTrigger.create({
            trigger: item,
            start: 'top 80%',
            once: true,
            onEnter: () => {
              const dotRect = dot.getBoundingClientRect();
              const lineRect = timelineLine.getBoundingClientRect();
              let progress =
                lineRect.height > 0
                  ? (dotRect.top + dotRect.height / 2 - lineRect.top) / lineRect.height
                  : 1;
              if (isLast) progress = 1;
              const clampedProgress = gsap.utils.clamp(0, 1, progress);

              gsap
                .timeline()
                .to(card, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' })
                .to(lineFill, { scaleY: clampedProgress, duration: 0.55, ease: 'power2.out' }, '<')
                .to(outlineHeart, { opacity: 0, duration: 0.18 }, '<')
                .to(
                  filledHeart,
                  { opacity: 1, scale: 1.18, duration: 0.22, ease: 'back.out(2)' },
                  '<'
                )
                .to(filledHeart, { scale: 1, duration: 0.18 });
            },
          });
        });

        onScrollRefresh = () => updateLineMetrics();
        ScrollTrigger.addEventListener('refresh', onScrollRefresh);

        onResize = () => {
          if (resizeTimer) window.clearTimeout(resizeTimer);
          resizeTimer = window.setTimeout(() => {
            updateLineMetrics();
            ScrollTrigger.refresh();
          }, 100);
        };
        window.addEventListener('resize', onResize);

        requestAnimationFrame(() => {
          updateLineMetrics();
          ScrollTrigger.refresh();
        });
      }
    }, sectionRef);

    return () => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      if (onScrollRefresh) ScrollTrigger.removeEventListener('refresh', onScrollRefresh);
      if (onResize) window.removeEventListener('resize', onResize);
      ctx.revert();
    };
  }, [events.length]);

  return (
    <section className={`event-section ${theme}`} ref={sectionRef}>
      <h1 className="event-section-heading" data-aos="fade-up">
        The Celebrations
      </h1>

      <div className="timeline">
        <div className="timeline-line">
          <div className="timeline-line-fill" />
        </div>

        {events.map((event, index) => {
          const side = index % 2 === 0 ? 'right' : 'left';
          const mapsQuery = event.gLocation?.mapsQuery?.trim();
          const mapsHref = mapsQuery
            ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`
            : '';

          return (
            <div
              key={event._id}
              className={`timeline-item ${side}`}
              data-index={index}
            >
              <div className="timeline-dot">
                <HeartOutlineIcon />
                <HeartFilledIcon />
              </div>

              <div className="event-card">
                <div className={`event-top ${side}`}>
                  <h2 className="event-title">{event.eventName}</h2>
                  <span className="event-time">{event.eventTime}</span>
                </div>

                <div className={`event-date-row ${side}`}>
                  <span className="event-date">{formatEventDate(event.eventDate)}</span>
                  <span className="event-day">{formatWeekdayUpper(event.eventDate)}</span>
                </div>

                <p className={`event-address ${side}`}>{event.eventAddress}</p>

                {mapsHref && (
                  <div className={`event-buttons ${side}`}>
                    <a
                      href={mapsHref}
                      target="_blank"
                      rel="noreferrer"
                      className="event-btn"
                    >
                      Get Directions
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
