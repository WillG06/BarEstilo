import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const wrap = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;
    document.documentElement.classList.add("has-cursor");

    let tx = 0, ty = 0, x = 0, y = 0;
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [role=button], input, select, textarea, label, summary, .cursor-hover"));
    };
    const tick = () => {
      x += (tx - x) * 0.25;
      y += (ty - y) * 0.25;
      if (wrap.current) wrap.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
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
    <div
      ref={wrap}
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      style={{ willChange: "transform" }}
    >
      <div
        className={`relative -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${
          hover ? "h-10 w-10" : "h-5 w-5"
        }`}
      >
        {/* Plus / rotates to × on hover */}
        <svg
          viewBox="0 0 24 24"
          className={`h-full w-full text-cream transition-transform duration-300 ease-out ${
            hover ? "rotate-45" : "rotate-0"
          }`}
        >
          <line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        {/* hover ring */}
        <div
          className={`absolute inset-0 rounded-full border border-cream/70 transition-all duration-300 ${
            hover ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        />
      </div>
    </div>
  );
}
