import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WeddingDetails } from '../types/wedding';
import { getTargetTimestamp } from '../utils/dateUtils';

gsap.registerPlugin(ScrollTrigger);

const CONFETTI_COLORS = ['#A2AD94', '#D6B98D', '#FFFFFF', '#7E876D'];

interface CountdownTime {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

interface FlipState {
  days: boolean;
  hours: boolean;
  minutes: boolean;
  seconds: boolean;
}

function calculateRemaining(targetDateStr: string, targetTimeStr: string): CountdownTime {
  if (!targetDateStr) {
    return { days: '00', hours: '00', minutes: '00', seconds: '00' };
  }
  const diff = getTargetTimestamp(targetDateStr, targetTimeStr) - Date.now();
  if (diff <= 0) {
    return { days: '00', hours: '00', minutes: '00', seconds: '00' };
  }
  return {
    days: String(Math.floor(diff / 86400000)).padStart(2, '0'),
    hours: String(Math.floor((diff / 3600000) % 24)).padStart(2, '0'),
    minutes: String(Math.floor((diff / 60000) % 60)).padStart(2, '0'),
    seconds: String(Math.floor((diff / 1000) % 60)).padStart(2, '0'),
  };
}

function isZeroCountdown(t: CountdownTime): boolean {
  return (
    t.days === '00' &&
    t.hours === '00' &&
    t.minutes === '00' &&
    t.seconds === '00'
  );
}

interface CountdownSectionProps {
  details: WeddingDetails;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ details }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const revealRef = useRef<HTMLDivElement | null>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiInstanceRef = useRef<confetti.CreateTypes | null>(null);
  const celebratedRef = useRef(false);
  const flipTimeoutRef = useRef<number | null>(null);

  const [heading, setHeading] = useState('Counting down to Forever');
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(() =>
    calculateRemaining(details.countDownDate, details.countDownTime)
  );
  const [flips, setFlips] = useState<FlipState>({
    days: false,
    hours: false,
    minutes: false,
    seconds: false,
  });

  const timeLeftRef = useRef(timeLeft);
  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  const triggerCelebration = () => {
    if (celebratedRef.current || !confettiInstanceRef.current) return;
    celebratedRef.current = true;
    setHeading('Our Forever Begins');

    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { scale: 0.82, rotation: -2 },
        { scale: 1, rotation: 0, duration: 0.8, ease: 'elastic.out(1, 0.45)' }
      );
    }

    window.setTimeout(() => {
      const endTime = Date.now() + 1200;
      const fireLeft = () => {
        confettiInstanceRef.current?.({
          particleCount: 3,
          spread: 85,
          startVelocity: 18,
          gravity: 0.45,
          decay: 0.94,
          scalar: 1.05,
          ticks: 100,
          drift: 0.2,
          angle: 60,
          origin: { x: 0.18, y: 0.92 },
          colors: CONFETTI_COLORS,
        });
        if (Date.now() < endTime) {
          requestAnimationFrame(fireLeft);
        }
      };
      const fireRight = () => {
        confettiInstanceRef.current?.({
          particleCount: 3,
          spread: 85,
          startVelocity: 18,
          gravity: 0.45,
          decay: 0.94,
          scalar: 1.05,
          ticks: 140,
          drift: 0.2,
          angle: 120,
          origin: { x: 0.82, y: 0.92 },
          colors: CONFETTI_COLORS,
        });
        if (Date.now() < endTime) {
          requestAnimationFrame(fireRight);
        }
      };
      fireLeft();
      fireRight();
    }, 250);
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft((prev) => {
        const next = calculateRemaining(details.countDownDate, details.countDownTime);
        setFlips({
          days: next.days !== prev.days,
          hours: next.hours !== prev.hours,
          minutes: next.minutes !== prev.minutes,
          seconds: next.seconds !== prev.seconds,
        });
        if (flipTimeoutRef.current) {
          window.clearTimeout(flipTimeoutRef.current);
        }
        flipTimeoutRef.current = window.setTimeout(() => {
          setFlips({ days: false, hours: false, minutes: false, seconds: false });
        }, 250);
        return next;
      });
    }, 1000);

    return () => {
      window.clearInterval(interval);
      if (flipTimeoutRef.current) {
        window.clearTimeout(flipTimeoutRef.current);
      }
    };
  }, [details.countDownDate, details.countDownTime]);

  useEffect(() => {
    if (confettiCanvasRef.current) {
      confettiInstanceRef.current = confetti.create(confettiCanvasRef.current, {
        resize: true,
        useWorker: false,
      });
    }
    return () => {
      confettiInstanceRef.current?.reset();
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (revealRef.current && sectionRef.current) {
        gsap.fromTo(
          revealRef.current,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }

      const mm = gsap.matchMedia();
      mm.add('(max-width: 767px)', () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 50%',
          once: true,
          onEnter: () => {
            if (isZeroCountdown(timeLeftRef.current)) {
              triggerCelebration();
            }
          },
        });
      });
      mm.add('(min-width: 768px)', () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 45%',
          once: true,
          onEnter: () => {
            if (isZeroCountdown(timeLeftRef.current)) {
              triggerCelebration();
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!details.countDownDate) return null;

  return (
    <section className={`countdown-section ${details.theme}`} ref={sectionRef}>
      <canvas ref={confettiCanvasRef} className="countdown-confetti-canvas" />
      <div ref={revealRef} className="countdown-reveal">
        <h1>{heading}</h1>
        <div ref={containerRef} className="countdown-container">
          <div className="countdown-item">
            <div className="countdown-box">
              <span className={flips.days ? 'flip-number' : ''}>{timeLeft.days}</span>
            </div>
            <p>Days</p>
          </div>
          <div className="countdown-item">
            <div className="countdown-box">
              <span className={flips.hours ? 'flip-number' : ''}>{timeLeft.hours}</span>
            </div>
            <p>Hours</p>
          </div>
          <div className="countdown-item">
            <div className="countdown-box">
              <span className={flips.minutes ? 'flip-number' : ''}>{timeLeft.minutes}</span>
            </div>
            <p>Minutes</p>
          </div>
          <div className="countdown-item">
            <div className="countdown-box">
              <span className={flips.seconds ? 'flip-number' : ''}>{timeLeft.seconds}</span>
            </div>
            <p>Seconds</p>
          </div>
        </div>
      </div>
    </section>
  );
};
