"use client";

import { useEffect, useRef } from "react";

/**
 * Hero visual: a slowly rotating sphere of connected nodes — many points of
 * intelligence converging into one structure. Plain Canvas 2D (no WebGL library):
 * ~200 nodes cost well under a millisecond per frame.
 *
 * Performance guards: starts after the browser is idle (never competes with LCP),
 * pauses when off-screen or the tab is hidden, caps DPR at 2, and renders a single
 * static frame for users who prefer reduced motion.
 */
export default function ConvergenceSphere({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const count = window.innerWidth < 768 ? 120 : 180;

    // Evenly distributed points on a unit sphere (Fibonacci lattice).
    const golden = Math.PI * (3 - Math.sqrt(5));
    const points = Array.from({ length: count }, (_, i) => {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      return [Math.cos(golden * i) * r, y, Math.sin(golden * i) * r];
    });

    // Rotation preserves distances, so neighbour links are computed once.
    const threshold = 2.1 * Math.sqrt((4 * Math.PI) / count) * 0.62;
    const edges = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = points[i][0] - points[j][0];
        const dy = points[i][1] - points[j][1];
        const dz = points[i][2] - points[j][2];
        if (dx * dx + dy * dy + dz * dz < threshold * threshold) edges.push([i, j]);
      }
    }
    // A few edges carry travelling "signals".
    const signals = Array.from({ length: 10 }, (_, k) => ({
      edge: edges[(k * 97 + 13) % edges.length],
      offset: k / 10,
    }));

    let width = 0;
    let height = 0;
    let dpr = 1;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    let rotY = 0.6;
    let tiltX = -0.32;
    let tiltTarget = -0.32;
    let yawOffset = 0;
    let yawTarget = 0;
    const projected = new Float32Array(count * 3);

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);
      const radius = Math.min(width, height) * 0.42;
      const cx = width / 2;
      const cy = height / 2;
      const cosY = Math.cos(rotY + yawOffset);
      const sinY = Math.sin(rotY + yawOffset);
      const cosX = Math.cos(tiltX);
      const sinX = Math.sin(tiltX);

      for (let i = 0; i < count; i++) {
        const [x, y, z] = points[i];
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        const scale = 1 / (1.6 - z2 * 0.45);
        projected[i * 3] = cx + x1 * radius * scale * 1.3;
        projected[i * 3 + 1] = cy + y2 * radius * scale * 1.3;
        projected[i * 3 + 2] = (z2 + 1) / 2; // depth 0 (back) → 1 (front)
      }

      // Links, batched into depth buckets to keep draw calls low.
      ctx.lineWidth = 1;
      for (let bucket = 0; bucket < 4; bucket++) {
        ctx.beginPath();
        for (const [a, b] of edges) {
          const depth = (projected[a * 3 + 2] + projected[b * 3 + 2]) / 2;
          if (Math.min(3, Math.floor(depth * 4)) !== bucket) continue;
          ctx.moveTo(projected[a * 3], projected[a * 3 + 1]);
          ctx.lineTo(projected[b * 3], projected[b * 3 + 1]);
        }
        ctx.strokeStyle = `rgba(143, 223, 231, ${0.035 + bucket * 0.06})`;
        ctx.stroke();
      }

      // Nodes.
      for (let i = 0; i < count; i++) {
        const depth = projected[i * 3 + 2];
        ctx.beginPath();
        ctx.arc(projected[i * 3], projected[i * 3 + 1], 0.6 + depth * 1.7, 0, Math.PI * 2);
        ctx.fillStyle = depth > 0.55 ? `rgba(79, 203, 215, ${0.35 + depth * 0.6})` : `rgba(181, 187, 211, ${0.18 + depth * 0.5})`;
        ctx.fill();
      }

      // Signals travelling along links.
      for (const signal of signals) {
        const [a, b] = signal.edge;
        const progress = (time / 2600 + signal.offset) % 1;
        const depth = (projected[a * 3 + 2] + projected[b * 3 + 2]) / 2;
        if (depth < 0.45) continue;
        const px = projected[a * 3] + (projected[b * 3] - projected[a * 3]) * progress;
        const py = projected[a * 3 + 1] + (projected[b * 3 + 1] - projected[a * 3 + 1]) * progress;
        ctx.beginPath();
        ctx.arc(px, py, 1.8 + depth, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + depth * 0.5})`;
        ctx.fill();
      }
    };

    let frame = 0;
    let last = 0;
    let visible = true;
    let running = false;

    const loop = (time) => {
      const delta = Math.min(time - (last || time), 50);
      last = time;
      rotY += delta * 0.00012;
      tiltX += (tiltTarget - tiltX) * 0.04;
      yawOffset += (yawTarget - yawOffset) * 0.04;
      draw(time);
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduceQuery.matches || !visible || document.hidden) return;
      running = true;
      last = 0;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const onPointer = (event) => {
      if (event.pointerType !== "mouse") return;
      yawTarget = (event.clientX / window.innerWidth - 0.5) * 0.5;
      tiltTarget = -0.32 + (event.clientY / window.innerHeight - 0.5) * 0.3;
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const onMotionPreference = () => {
      if (reduceQuery.matches) {
        stop();
        draw(0);
      } else start();
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (!running) draw(0);
    });
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visible ? start() : stop();
    });

    const boot = () => {
      resize();
      draw(0);
      canvas.dataset.ready = "true";
      resizeObserver.observe(canvas);
      intersection.observe(canvas);
      window.addEventListener("pointermove", onPointer, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
      reduceQuery.addEventListener("change", onMotionPreference);
      start();
    };

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(boot, { timeout: 1200 })
      : window.setTimeout(boot, 300);

    return () => {
      window.cancelIdleCallback ? window.cancelIdleCallback(idle) : window.clearTimeout(idle);
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      reduceQuery.removeEventListener("change", onMotionPreference);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`size-full opacity-0 transition-opacity duration-[1600ms] data-[ready=true]:opacity-100 ${className}`}
    />
  );
}
