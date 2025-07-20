import { useEffect, useRef, useCallback } from 'react';

const StarCanvasBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stars = useRef<{
    x: number;
    y: number;
    radius: number;
    alpha: number;
    delta: number;
  }[]>([]);

  const initStars = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    stars.current = [];
    for (let i = 0; i < 120; i++) {
      stars.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        delta: Math.random() * 0.02 + 0.005,
      });
    }
  }, []);

  const animate = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#0f0f1f');
    gradient.addColorStop(1, '#2c2c3f');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    for (let s of stars.current) {
      s.alpha += s.delta;
      if (s.alpha <= 0 || s.alpha >= 1) s.delta = -s.delta;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
      ctx.fill();
    }

    requestAnimationFrame(() => animate(ctx, width, height));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        initStars(ctx, canvas.width, canvas.height);
      }
    };

    resizeCanvas();
    const ctx = canvas.getContext('2d');
    if (ctx) animate(ctx, canvas.width, canvas.height);

    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [initStars, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-screen h-screen z-[-1]"
    />
  );
};

export default StarCanvasBackground;
