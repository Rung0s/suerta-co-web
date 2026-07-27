import { useSyncExternalStore } from 'react';

// Mobil algılamayı window.innerWidth yerine matchMedia ve React 18/19
// useSyncExternalStore ile yapıyoruz. Bu yöntem hem cascading render
// hatalarını önler hem de CSS media query'leriyle birebir tutarlıdır.
export default function useIsMobile(breakpoint = 768) {
  const query = `(max-width: ${breakpoint}px)`;

  return useSyncExternalStore(
    (callback) => {
      if (typeof window === 'undefined' || !window.matchMedia) return () => {};
      const mq = window.matchMedia(query);
      if (mq.addEventListener) {
        mq.addEventListener('change', callback);
        return () => mq.removeEventListener('change', callback);
      } else {
        mq.addListener(callback); // eski tarayıcılar için fallback
        return () => mq.removeListener(callback);
      }
    },
    () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : false),
    () => false // server-side snapshot
  );
}
