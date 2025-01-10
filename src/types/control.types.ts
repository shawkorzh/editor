import { Entity } from '@/types/entity.types';

export interface Option {
  value: string;
  label: string;
}

export interface ControlSelect {
  type: 'select';
  id: keyof Pick<Entity, 'background_color'>;
  label: string;
  options: Option[];
  default: string;
}

export interface ControlNumber {
  type: 'number';
  id: keyof Pick<Entity, 'border_width'>;
  label: string;
  min?: number;
  max?: number;
  default: number;
}

export interface ControlRange {
  type: 'range';
  id: keyof Pick<Entity, 'height' | 'width'>;
  label: string;
  min: number;
  max: number;
  step: number;
  default: number;
  unit?: string;
}

export type Control = ControlSelect | ControlNumber | ControlRange;
