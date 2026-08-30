import React, { useEffect, useRef } from 'react';

/* Kirmizi nokta imleç + gecikmeli halka. Yalnizca fare varsa calisiyor;
   dokunmatik cihazda hicbir sey basmiyor. HomeV2'den cikarildi, /v2
   altindaki her sayfa ayni imleci kullaniyor. */
export default function DotCursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (!window.matchMedia?.('(hover: hover) and (pointer: fine)').matches) return undefined;

    const dotNode = dot.current;
    const ringNode = ring.current;
    if (!dotNode || !ringNode) return undefined;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let raf = 0;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const loop = () => {
      raf = requestAnimationFrame(loop);
      /* Basit yumusatma: hedefe kalan mesafenin bir kismi kadar yaklas.
         Kare suresinden bagimsiz olmasa da bu olcekte fark edilmiyor. */
      const ease = reduced ? 1 : 0.16;
      ringX += (targetX - ringX) * ease;
      ringY += (targetY - ringY) * ease;
      ringNode.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    };

    const onMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      dotNode.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;

      /* Uzerinde durulan sey tiklanabilir mi? Her harekette soruluyor ama
         `closest` ucuz; alternatifi her etkilesimli ogeye ayri dinleyici
         takmak olurdu ve dinamik icerikte bozulurdu. */
      const hot = event.target?.closest?.('a, button, [role="tab"], summary, input, textarea, label');
      ringNode.classList.toggle('is-hot', Boolean(hot));
    };

    const onDown = () => {
      dotNode.classList.add('is-down');
      ringNode.classList.add('is-down');
    };
    const onUp = () => {
      dotNode.classList.remove('is-down');
      ringNode.classList.remove('is-down');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  return (
    <>
      <span className="v2-cursor__ring" ref={ring} aria-hidden="true" />
      <span className="v2-cursor" ref={dot} aria-hidden="true" />
    </>
  );
}
