
export type ParticleColorMode = 'cosmic' | 'neon' | 'sunset' | 'ocean' | 'emerald' | 'gold';

export type ViewState = 'HOME' | 'ABOUT' | 'SKILLS' | 'PROJECTS' | 'GALLERY' | 'CONTACT';

export interface ParticleSystemProps {
  text: string;
  triggerMorph: boolean;
  onMorphComplete: () => void;
  colorMode: ParticleColorMode;
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}
