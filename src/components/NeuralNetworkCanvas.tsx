import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Node {
  x: number;
  y: number;
  z: number; // 3D depth simulation (0.5 to 1.5)
  vx: number;
  vy: number;
  radius: number;
  pulseOffset: number;
  isHub?: boolean;
}

interface SignalPulse {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
  isArc?: boolean;
}

interface MicroSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export const NeuralNetworkCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const isDark = theme === 'dark';

    // 1. Initialize Neural Nodes with depth
    const NODE_COUNT = 52;
    const MAX_DIST = 125;
    const nodes: Node[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      const isHub = i % 8 === 0;
      nodes.push({
        x: Math.random() * (width || 420),
        y: Math.random() * (height || 520),
        z: Math.random() * 0.8 + 0.6, // depth multiplier
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: isHub ? Math.random() * 2 + 3 : Math.random() * 1.5 + 1.2,
        pulseOffset: Math.random() * Math.PI * 2,
        isHub,
      });
    }

    // 2. Micro Spark Dust Particles
    const SPARKS_COUNT = 30;
    const sparks: MicroSpark[] = [];
    for (let i = 0; i < SPARKS_COUNT; i++) {
      sparks.push({
        x: Math.random() * (width || 420),
        y: Math.random() * (height || 520),
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1, // gently floating up
        size: Math.random() * 1.2 + 0.6,
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    // 3. Signal Pulses traveling through synapses
    const pulses: SignalPulse[] = [];
    
    // Theme-specific color palettes for maximum shiny technology appeal & readability
    const darkPulseColors = ['#00f0ff', '#38bdf8', '#60a5fa', '#818cf8', '#22d3ee'];
    const lightPulseColors = ['#0284c7', '#2563eb', '#0369a1', '#1d4ed8', '#0891b2'];

    const spawnPulse = () => {
      if (nodes.length < 2) return;
      const fromIdx = Math.floor(Math.random() * nodes.length);
      const n1 = nodes[fromIdx];

      const nearby: number[] = [];
      nodes.forEach((n2, idx) => {
        if (idx !== fromIdx) {
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            nearby.push(idx);
          }
        }
      });

      if (nearby.length > 0) {
        const toIdx = nearby[Math.floor(Math.random() * nearby.length)];
        const colors = isDark ? darkPulseColors : lightPulseColors;
        pulses.push({
          fromNode: fromIdx,
          toNode: toIdx,
          progress: 0,
          speed: Math.random() * 0.022 + 0.015,
          color: colors[Math.floor(Math.random() * colors.length)],
          isArc: Math.random() > 0.6,
        });
      }
    };

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // -------------------------------------------------------------
      // LAYER A: Rotating Cybernetic Orbital Quantum Rings (Background)
      // -------------------------------------------------------------
      ctx.save();
      ctx.translate(centerX, centerY);

      // Ring 1 - Inner Tech Ring
      const ring1Radius = Math.min(width, height) * 0.38;
      ctx.save();
      ctx.rotate(time * 0.15);
      ctx.beginPath();
      ctx.arc(0, 0, ring1Radius, 0, Math.PI * 2);
      ctx.setLineDash([8, 12, 2, 12]);
      ctx.strokeStyle = isDark 
        ? 'rgba(0, 240, 255, 0.18)' 
        : 'rgba(2, 132, 199, 0.22)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      // Ring 2 - Outer Counter-rotating Tech Segment Ring
      const ring2Radius = Math.min(width, height) * 0.48;
      ctx.save();
      ctx.rotate(-time * 0.1);
      ctx.beginPath();
      ctx.arc(0, 0, ring2Radius, 0, Math.PI * 2);
      ctx.setLineDash([20, 25, 4, 15]);
      ctx.strokeStyle = isDark 
        ? 'rgba(59, 130, 246, 0.15)' 
        : 'rgba(37, 99, 235, 0.20)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Orbital intercept nodes on Ring 2
      for (let a = 0; a < 4; a++) {
        const angle = (Math.PI / 2) * a;
        const rx = Math.cos(angle) * ring2Radius;
        const ry = Math.sin(angle) * ring2Radius;
        ctx.beginPath();
        ctx.arc(rx, ry, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? '#00f0ff' : '#0284c7';
        ctx.fill();
      }
      ctx.restore();

      ctx.restore(); // restore center translate

      // -------------------------------------------------------------
      // LAYER B: Ambient Micro Sparks Dust
      // -------------------------------------------------------------
      sparks.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;

        if (s.y < -10) {
          s.y = height + 10;
          s.x = Math.random() * width;
        }
        if (s.x < -10 || s.x > width + 10) {
          s.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(56, 189, 248, ${s.alpha * 0.7})`
          : `rgba(2, 132, 199, ${s.alpha * 0.8})`;
        ctx.fill();
      });

      // -------------------------------------------------------------
      // LAYER C: Update & Connect Neural Nodes
      // -------------------------------------------------------------
      nodes.forEach((node) => {
        node.x += node.vx * node.z;
        node.y += node.vy * node.z;

        if (node.x < 15 || node.x > width - 15) node.vx *= -1;
        if (node.y < 15 || node.y > height - 15) node.vy *= -1;
      });

      // Continuous pulse generator
      if (Math.random() < 0.3 && pulses.length < 22) {
        spawnPulse();
      }

      // Draw Synapses (Lines & Curved Arcs)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DIST) {
            const alphaFactor = (1 - dist / MAX_DIST);
            
            ctx.beginPath();
            if ((i + j) % 5 === 0) {
              // Curved Bezier Neural Pathway for high-tech complexity
              const midX = (n1.x + n2.x) / 2 + Math.sin(time + i) * 15;
              const midY = (n1.y + n2.y) / 2 + Math.cos(time + j) * 15;
              ctx.moveTo(n1.x, n1.y);
              ctx.quadraticCurveTo(midX, midY, n2.x, n2.y);
            } else {
              // Straight Synapse Line
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
            }

            const lineGrad = ctx.createLinearGradient(n1.x, n1.y, n2.x, n2.y);
            if (isDark) {
              const a = alphaFactor * 0.4;
              lineGrad.addColorStop(0, `rgba(0, 240, 255, ${a})`);
              lineGrad.addColorStop(0.5, `rgba(59, 130, 246, ${a * 1.3})`);
              lineGrad.addColorStop(1, `rgba(129, 140, 248, ${a})`);
            } else {
              const a = alphaFactor * 0.45;
              lineGrad.addColorStop(0, `rgba(2, 132, 199, ${a})`);
              lineGrad.addColorStop(0.5, `rgba(37, 99, 235, ${a * 1.3})`);
              lineGrad.addColorStop(1, `rgba(3, 105, 161, ${a})`);
            }

            ctx.strokeStyle = lineGrad;
            ctx.lineWidth = (n1.isHub || n2.isHub) ? 1.4 : 1;
            ctx.stroke();
          }
        }
      }

      // -------------------------------------------------------------
      // LAYER D: Draw Signal Packet Transmissions
      // -------------------------------------------------------------
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(p, 1);
          continue;
        }

        const n1 = nodes[pulse.fromNode];
        const n2 = nodes[pulse.toNode];
        if (!n1 || !n2) continue;

        let px: number, py: number;

        if (pulse.isArc) {
          const midX = (n1.x + n2.x) / 2 + Math.sin(time + pulse.fromNode) * 15;
          const midY = (n1.y + n2.y) / 2 + Math.cos(time + pulse.toNode) * 15;
          const t = pulse.progress;
          px = (1 - t) * (1 - t) * n1.x + 2 * (1 - t) * t * midX + t * t * n2.x;
          py = (1 - t) * (1 - t) * n1.y + 2 * (1 - t) * t * midY + t * t * n2.y;
        } else {
          px = n1.x + (n2.x - n1.x) * pulse.progress;
          py = n1.y + (n2.y - n1.y) * pulse.progress;
        }

        // Pulse glowing head
        ctx.beginPath();
        ctx.arc(px, py, isDark ? 2.8 : 3.2, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? '#ffffff' : pulse.color;
        
        if (isDark) {
          ctx.shadowColor = pulse.color;
          ctx.shadowBlur = 14;
        }
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Pulse tail
        const prevT = Math.max(0, pulse.progress - 0.18);
        const prevX = n1.x + (n2.x - n1.x) * prevT;
        const prevY = n1.y + (n2.y - n1.y) * prevT;

        const trailGrad = ctx.createLinearGradient(prevX, prevY, px, py);
        if (isDark) {
          trailGrad.addColorStop(0, 'rgba(0, 240, 255, 0)');
          trailGrad.addColorStop(1, pulse.color);
        } else {
          trailGrad.addColorStop(0, 'rgba(2, 132, 199, 0)');
          trailGrad.addColorStop(1, pulse.color);
        }

        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(px, py);
        ctx.strokeStyle = trailGrad;
        ctx.lineWidth = 2.2;
        ctx.stroke();
      }

      // -------------------------------------------------------------
      // LAYER E: Draw Neural Nodes & Hubs
      // -------------------------------------------------------------
      nodes.forEach((node) => {
        const pulse = Math.sin(time * 2.5 + node.pulseOffset) * 0.35 + 0.85;
        const radius = node.radius * node.z * pulse;

        // Hub Outer Hexagon / Ring
        if (node.isHub) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius * 2.5, 0, Math.PI * 2);
          ctx.strokeStyle = isDark
            ? `rgba(0, 240, 255, ${0.3 * pulse})`
            : `rgba(2, 132, 199, ${0.4 * pulse})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Outer Aura Glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(0, 240, 255, ${0.2 * pulse})`
          : `rgba(2, 132, 199, ${0.25 * pulse})`;
        ctx.fill();

        // Node Core Dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        if (isDark) {
          ctx.fillStyle = node.isHub ? '#ffffff' : '#00f0ff';
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 12 * pulse;
        } else {
          ctx.fillStyle = node.isHub ? '#0284c7' : '#0369a1';
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [theme]);

  return (
    <div className="absolute -inset-10 sm:-inset-16 pointer-events-none z-0 overflow-hidden rounded-[3rem]">
      {/* Outer Theme-Aware Ambient Tech Aura Glow */}
      <div 
        className={`absolute inset-0 blur-3xl rounded-full transition-all duration-500 ${
          theme === 'dark' 
            ? 'bg-gradient-to-tr from-cyan-500/20 via-blue-600/25 to-indigo-600/20 animate-pulse-slow' 
            : 'bg-gradient-to-tr from-sky-400/25 via-blue-500/20 to-indigo-400/20 animate-pulse-slow'
        }`} 
      />
      
      {/* Dynamic Theme-Optimized Animated Canvas */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full block transition-opacity duration-300 ${
          theme === 'dark' ? 'opacity-100 mix-blend-screen' : 'opacity-95 mix-blend-normal'
        }`}
      />
    </div>
  );
};
