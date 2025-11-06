import { useRef } from 'react';

export function StepperCarousel({
  labels,
  current,
  onSelect
}: {
  labels: string[];
  current: number;
  onSelect: (index: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scroll = (dir: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    const delta = Math.min(240, el.clientWidth * 0.6);
    el.scrollBy({ left: dir === 'left' ? -delta : delta, behavior: 'smooth' });
  };

  return (
    <div className="stepper-carousel" role="navigation" aria-label="Editor steps">
      <button type="button" className="carousel-arrow" aria-label="Scroll left" onClick={() => scroll('left')}>
        ◀
      </button>
      <nav className="stepper-track" ref={trackRef}>
        {labels.map((label, idx) => (
          <button
            key={label}
            type="button"
            className={idx === current ? 'step active' : 'step'}
            onClick={() => onSelect(idx)}
          >
            <span className="step-index">{idx + 1}</span>
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <button type="button" className="carousel-arrow" aria-label="Scroll right" onClick={() => scroll('right')}>
        ▶
      </button>
    </div>
  );
}

