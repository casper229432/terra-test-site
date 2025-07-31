import { useEffect, useRef, useCallback } from 'react';

const StarCanvasBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stars = useRef<
    {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      delta: number;
    }[]
  >([]);

  const initStars = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    stars.current = [];
    for (let i = 0; i < 250; i++) {
      stars.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        delta: Math.random() * 0.02 + 0.005
      });
    }
  }, []);

  const animate = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    for (let s of stars.current) {
      s.alpha += s.delta;
      if (s.alpha <= 0.2 || s.alpha >= 1) s.delta = -s.delta;

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
      canvas.style.width = '100%';
      canvas.style.height = '100%';

      const ctx = canvas.getContext('2d');
      if (ctx) initStars(ctx, canvas.width, canvas.height);
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
      className="absolute top-0 left-0 w-full h-full z-0"
    />
  );
};

export default StarCanvasBackground;
