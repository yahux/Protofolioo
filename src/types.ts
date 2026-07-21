export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  role: string;
  stats: {
    linesOfCode: string;
    efficiency: string;
    latency: string;
  };
  link?: string;
}

export interface SkillGroup {
  category: string;
  skills: { name: string; level: number; icon: string }[];
}

export interface SystemLog {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export type ChipState = 'standby' | 'about' | 'skills' | 'projects' | 'certificates' | 'contact' | 'done';
