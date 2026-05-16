import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    document.documentElement.classList.add("has-cursor");

    let rx = 0, ry = 0, dx = 0, dy = 0;
    const onMove = (e: MouseEvent) => {
      dx = e.clientX; dy = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${dx - 3}px, ${dy - 3}px)`;
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [role=button], input, select, textarea, label, summary"));
    };
    const tick = () => {
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-gold mix-blend-difference"
      />
      <div
        ref={ring}
        className={`pointer-events-none fixed left-0 top-0 z-[100] h-9 w-9 rounded-full border border-gold/70 transition-[width,height,opacity] duration-200 mix-blend-difference ${
          hover ? "scale-150 opacity-60" : "opacity-90"
        }`}
      />
    </>
  );
}