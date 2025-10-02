import React, { useEffect, useRef, useState } from 'react';

/**
 * Reveal component
 * - Fades and slides children in when they enter the viewport
 * - Also animates on initial page load for items already in view
 */
export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div', threshold = 0.2 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => {
      setVisible(true);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);

    // In case element is already visible on first paint
    if (typeof window !== 'undefined') {
      const rect = el.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
        show();
      }
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'reveal-in' : 'reveal-init'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
