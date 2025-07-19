import React from 'react';
import type {
  Project,
  Skill,
  Hero,
  About,
  Category,
  Resume
} from '../v2/shared/type/types';

// Re-export for convenience
export type {
  Project,
  Skill,
  Hero,
  About,
  Category,
  Resume
};

// V1-specific component prop interfaces

export interface V1LayoutProps {
  children: React.ReactNode;
}

export interface V1HeroProps {
  hero: Hero | null;
}

export interface V1ProjectProps {
  data: Project;
}

export interface V1ProjectsProps {
  projects: Project[];
}

export interface V1ProjectSetProps {
  projects: Project[];
}

export interface V1SkillProps {
  skill: Skill;
}

export interface V1SkillIconProps {
  name: string;
  url: string;
}

export interface V1AboutMeProps {
  about: About | null;
  skills: Skill[];
}

export interface V1ContactMeProps {
  className?: string;
}

export interface V1FooterProps {
  className?: string;
}

export interface V1NavbarProps {
  resumeURL?: string;
}

export interface V1OverlayProps {
  opacity: string | "project" | "default";
}

export interface V1BubblesProps {
  className?: string;
}

// State interfaces for components with complex state
export interface NavbarState {
  showMenu: boolean;
  resumeURL: string;
}

// Event handler types
export type ClickHandler = () => void;
export type MenuToggleHandler = () => void;

// Form data types
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Animation variant types for framer-motion
export interface MotionVariants {
  [key: string]: {
    [key: string]: string | number | boolean | object;
  };
}