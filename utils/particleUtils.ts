
import * as THREE from 'three';
import { Vector3 } from '../types';

export const PARTICLE_COUNT = 16000;

// Generate points on a sphere surface with slight volumetric variation
export const getSphericalDistribution = (i: number, count: number, radius: number = 7): Vector3 => {
  const phi = Math.acos(-1 + (2 * i) / count);
  const theta = Math.sqrt(count * Math.PI) * phi;
  
  // Add slight noise to radius for a "force field" effect rather than a perfect shell
  const r = radius + (Math.random() - 0.5) * 0.5;

  return {
    x: r * Math.cos(theta) * Math.sin(phi),
    y: r * Math.sin(theta) * Math.sin(phi),
    z: r * Math.cos(phi)
  };
};

// Create pixel data from text using an offscreen canvas
export const createTextPoints = (text: string): Vector3[] => {
  if (!text) return [];
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return [];

  const fontSize = 60; // Smaller font for better density packing
  const padding = 20; 

  ctx.font = `900 ${fontSize}px 'Orbitron', sans-serif`; 
  const textMetrics = ctx.measureText(text);
  const textWidth = textMetrics.width;
  const textHeight = fontSize;

  canvas.width = textWidth + padding * 2;
  canvas.height = textHeight + padding * 2;

  // Draw text
  ctx.fillStyle = '#ffffff';
  ctx.font = `900 ${fontSize}px 'Orbitron', sans-serif`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  const points: Vector3[] = [];
  const threshold = 50; // Lower threshold to catch more edge pixels

  // Scale factor 
  const scale = 0.12; 

  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i] > threshold) {
      const x = (i / 4) % canvas.width;
      const y = Math.floor((i / 4) / canvas.width);
      
      // Density check
      if (Math.random() < 0.45) { 
        points.push({
          x: (x - canvas.width / 2) * scale,
          y: -(y - canvas.height / 2) * scale,
          z: 0
        });
      }
    }
  }

  return points;
};

export const getColorForMode = (mode: string, x: number, y: number, z: number): THREE.Color => {
    const color = new THREE.Color();
    const dist = Math.sqrt(x * x + y * y + z * z);
    const factor = dist / 8;
    
    switch (mode) {
        case 'neon':
            // Cyberpunk Cyan/Magenta
            color.setHSL(Math.abs(x/20) + 0.5, 0.9, 0.6); 
            break;
        case 'sunset':
            // Solar Flare Orange/Red
            color.setHSL(0.05 + factor * 0.1, 1.0, 0.6);
            break;
        case 'ocean':
            // Deep Matrix Green/Blue
            color.setHSL(0.5 + factor * 0.2, 0.9, 0.5);
            break;
        case 'emerald':
            // Matrix Green
            color.setHSL(0.35 + factor * 0.1, 0.9, 0.5);
            break;
        case 'gold':
            // Golden/Cyber Yellow
            color.setHSL(0.14 + factor * 0.1, 1.0, 0.6);
            break;
        case 'cosmic':
        default:
            // Deep Space Violet/Cyan
            color.setHSL(0.6 + factor * 0.15, 0.8, 0.65);
            break;
    }
    return color;
}
