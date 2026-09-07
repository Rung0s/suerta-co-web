import React, { useEffect, useRef, useState } from 'react';

/* Film, ekrana girene kadar indirilmiyor.
   --------------------------------------------------------------------------
   Anasayfada iki tanitim filmi var. Ikisi de sayfa
   acilir acilmaz otomatik oynadigi icin, hero'yu gorup ayrilan bir
   ziyaretci bile hic gormedigi iki filmi indiriyordu — mobil veride bu
   tek basina sayfanin en pahali kalemi.

   Simdi once yalnizca poster duruyor (bir goruntu, birkac yuz kilobayt).
   Film ancak kendi bolumu ekrana yaklastiginda kuruluyor ve o zaman
   oynamaya basliyor. Ekrandan cikinca duruyor: gorunmeyen bir videoyu
   oynatmak islemciyi ve pili bosuna yoruyor.

   Hareket kisitlamasi acikken film hic kurulmuyor; poster kaliyor. */
export default function LazyVideo({ className, src, poster, alt = '' }) {
  const holder = useRef(null);
  const video = useRef(null);
  const [mounted, setMounted] = useState(false);

  /* AV1 kopyasi mp4 ile ayni klasorde ve ayni adi tasiyor; cagiran tarafin
     iki adres birden vermesi gerekmesin diye uzanti burada degistiriliyor. */
  const webmSrc = src.replace(/\.mp4$/, '.webm');

  useEffect(() => {
    const node = holder.current;
    if (!node) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setMounted(true);
      },
      /* Bolum ekrana girmeden bir ekran once basliyor: film ziyaretci
         oraya vardiginda hazir olsun. */
      { rootMargin: '100% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = video.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) node.play().catch(() => {});
        else node.pause();
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [mounted]);

  return (
    <span className={className} ref={holder}>
      {mounted ? (
        <video
          ref={video}
          className="v2-lazyvideo__media"
          loop
          muted
          playsInline
          preload="metadata"
          poster={poster}
        >
          {/* Iki kodek, sirasi onemli: tarayici listeden oynatabildigi ilk
              kaynagi aliyor ve digerini hic istemiyor.

              AV1 once geliyor cunku ayni goruntuyu h264'un yaklasik yarisi
              kadar veriyle veriyor (2,6 MB -> 1,8 MB). Destegi Chrome 70,
              Firefox 67 ve Safari 17 ile geliyor; daha eskisi bu satiri
              atlayip alttaki mp4'e dusuyor, yani kimse film goremez duruma
              gelmiyor. */}
          <source src={webmSrc} type="video/webm" />
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <img
          className="v2-lazyvideo__media"
          src={poster}
          alt={alt}
          loading="lazy"
          decoding="async"
        />
      )}
    </span>
  );
}
