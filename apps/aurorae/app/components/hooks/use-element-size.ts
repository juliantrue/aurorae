import { useEffect, useState, type RefObject } from 'react';

type Size = {
  width: number;
  height: number;
};

type UseElementSizeOptions = {
  fallbackWidth?: number;
  fallbackHeight?: number;
};

export function useElementSize<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: UseElementSizeOptions = {},
): Size {
  const { fallbackWidth = 0, fallbackHeight = 0 } = options;
  const [size, setSize] = useState<Size>({
    width: fallbackWidth,
    height: fallbackHeight,
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      setSize({ width: fallbackWidth, height: fallbackHeight });
      return;
    }

    const update = () => {
      const nextWidth = Math.floor(element.clientWidth);
      const nextHeight = Math.floor(element.clientHeight);
      setSize({
        width: nextWidth > 0 ? nextWidth : fallbackWidth,
        height: nextHeight > 0 ? nextHeight : fallbackHeight,
      });
    };

    update();

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.target === element) {
            const nextWidth = Math.floor(entry.contentRect.width);
            const nextHeight = Math.floor(entry.contentRect.height);
            setSize({
              width: nextWidth > 0 ? nextWidth : fallbackWidth,
              height: nextHeight > 0 ? nextHeight : fallbackHeight,
            });
          }
        }
      });
      observer.observe(element);
    }

    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('resize', update);
      observer?.disconnect();
    };
  }, [fallbackHeight, fallbackWidth, ref]);

  return size;
}
