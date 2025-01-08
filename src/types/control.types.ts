export interface Option {
  value: string;
  label: string;
}

export interface Control {
  type: 'select' | 'number' | 'range';
  id: string;
  label: string;
  options?: Option[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  default: number | string;
}
