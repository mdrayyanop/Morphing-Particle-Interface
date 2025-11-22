import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ParticleSystemProps } from '../types';
import { createTextPoints, getColorForMode, getSphericalDistribution, PARTICLE_COUNT } from '../utils/particleUtils';

const ParticleScene: React.FC<ParticleSystemProps> = ({ 
  text, 
  triggerMorph, 
  onMorphComplete,
  colorMode 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const requestRef = useRef<number>(0);
  const [isReady, setIsReady] = useState(false);
  const timeRef = useRef(0);

  // --- Initialization ---
  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.035); // Denser fog for depth
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 22;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    createParticleSystem(scene, colorMode);
    setIsReady(true);

    const animate = () => {
      timeRef.current += 0.005;
      if (particlesRef.current) {
        // Gentle complex rotation
        particlesRef.current.rotation.y += 0.001;
        // Only bob up and down if it's a sphere (approx check)
        // We'll just keep it subtle always
        particlesRef.current.rotation.x = Math.sin(timeRef.current * 0.5) * 0.05;
      }
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef.current);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Helper to create/reset system ---
  const createParticleSystem = (scene: THREE.Scene, mode: string) => {
    if (particlesRef.current) {
      scene.remove(particlesRef.current);
      if (particlesRef.current.geometry) particlesRef.current.geometry.dispose();
      if (Array.isArray(particlesRef.current.material)) {
        particlesRef.current.material.forEach(m => m.dispose());
      } else {
        particlesRef.current.material.dispose();
      }
    }

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const point = getSphericalDistribution(i, PARTICLE_COUNT);
      
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;

      const color = getColorForMode(mode, point.x, point.y, point.z);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.09,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    particlesRef.current = particles;
    scene.add(particles);
  };

  // --- Color Transition ---
  useEffect(() => {
    if (!particlesRef.current || !isReady) return;
    const geometry = particlesRef.current.geometry;
    const currentColors = geometry.attributes.color.array as Float32Array;
    const positions = geometry.attributes.position.array as Float32Array;

    const targetColors = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = positions[i * 3];
        const y = positions[i * 3 + 1];
        const z = positions[i * 3 + 2];
        const c = getColorForMode(colorMode, x, y, z);
        targetColors[i * 3] = c.r;
        targetColors[i * 3 + 1] = c.g;
        targetColors[i * 3 + 2] = c.b;
    }
    
    const startColors = new Float32Array(currentColors);
    const tweenObj = { t: 0 };

    gsap.to(tweenObj, {
        t: 1,
        duration: 1.0,
        ease: "power2.inOut",
        onUpdate: () => {
            for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
                currentColors[i] = startColors[i] + (targetColors[i] - startColors[i]) * tweenObj.t;
            }
            geometry.attributes.color.needsUpdate = true;
        }
    });
  }, [colorMode, isReady]);


  // --- Morphing Logic ---
  useEffect(() => {
    if (triggerMorph && particlesRef.current && isReady) {
      if (text === '') {
        morphBackToSphere();
      } else {
        performMorphSequence();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerMorph, isReady, text]);

  const performMorphSequence = () => {
    if (!particlesRef.current) return;
    const geometry = particlesRef.current.geometry;
    const currentPositions = geometry.attributes.position.array as Float32Array;
    
    const textPoints = createTextPoints(text);
    const targetPositions = new Float32Array(PARTICLE_COUNT * 3);
    const textPointsLength = textPoints.length;

    // Prepare Target: Text + Scattering
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      if (i < textPointsLength) {
        targetPositions[i * 3] = textPoints[i].x;
        targetPositions[i * 3 + 1] = textPoints[i].y;
        targetPositions[i * 3 + 2] = 0;
      } else {
        // Ambient field around text
        const angle = Math.random() * Math.PI * 2;
        const radius = 18 + Math.random() * 15;
        const z = (Math.random() - 0.5) * 30;
        targetPositions[i * 3] = Math.cos(angle) * radius;
        targetPositions[i * 3 + 1] = Math.sin(angle) * radius;
        targetPositions[i * 3 + 2] = z;
      }
    }

    // Reset rotation
    gsap.to(particlesRef.current.rotation, {
      x: 0, y: 0, z: 0, duration: 0.8, ease: "power3.out"
    });

    // Fast, mechanical morph to text
    const startPositions = new Float32Array(currentPositions);
    const tweenObj = { t: 0 };

    gsap.to(tweenObj, {
      t: 1,
      duration: 1.5,
      ease: "expo.inOut",
      onUpdate: () => {
          for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
              currentPositions[i] = startPositions[i] + (targetPositions[i] - startPositions[i]) * tweenObj.t;
          }
          geometry.attributes.position.needsUpdate = true;
      },
      onComplete: () => {
         onMorphComplete();
      }
    });
  };

  const morphBackToSphere = () => {
    if (!particlesRef.current) return;
    const geometry = particlesRef.current.geometry;
    const currentPositions = geometry.attributes.position.array as Float32Array;
    const targetPositions = new Float32Array(PARTICLE_COUNT * 3);

    // Calculate Sphere Positions
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const point = getSphericalDistribution(i, PARTICLE_COUNT);
      targetPositions[i * 3] = point.x;
      targetPositions[i * 3 + 1] = point.y;
      targetPositions[i * 3 + 2] = point.z;
    }

    // Spin effect
    gsap.to(particlesRef.current.rotation, {
      y: particlesRef.current.rotation.y + Math.PI * 2,
      duration: 2,
      ease: "power3.inOut"
    });

    const startPositions = new Float32Array(currentPositions);
    const tweenObj = { t: 0 };

    gsap.to(tweenObj, {
      t: 1,
      duration: 2,
      ease: "power3.inOut",
      onUpdate: () => {
          for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
              currentPositions[i] = startPositions[i] + (targetPositions[i] - startPositions[i]) * tweenObj.t;
          }
          geometry.attributes.position.needsUpdate = true;
      },
      onComplete: () => onMorphComplete()
    });
  };

  return <div ref={containerRef} className="absolute inset-0 z-0" />;
};

export default ParticleScene;