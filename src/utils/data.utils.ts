import { Control } from '@/types/control.types';
import { Entity } from '@/types/entity.types';

export const parseControlsConfig = (controls: Control[]) => {
  const values = controls.reduce((acc, control) => {
    (acc[control.id] as typeof control.default) = control.default;
    if ('unit' in control && control.unit) {
      acc[`${control.id}_unit`] = control.unit;
    }
    return acc;
  }, {} as Entity);

  return { controls, values };
};

export const getStyleValue = <
  T extends Entity,
  R extends string | number | undefined,
>(
  values: T,
  key: keyof T
): R => {
  const value = values[key];
  const unitKey = `${String(key)}_unit` as keyof T;
  const unit = unitKey in values ? (values[unitKey] as string | undefined) : '';

  if (value !== undefined) {
    if (typeof value === 'number') {
      return (unit ? `${value}${unit}` : value) as R;
    }
    if (typeof value === 'string') {
      return `${value}${unit || ''}` as R;
    }
  }

  return undefined as R;
};
