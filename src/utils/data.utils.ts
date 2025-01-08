import { Control } from '@/types/control.types';

export const parseJson = (controls: Control[]) => {
  const values = controls.reduce(
    (acc, control) => {
      acc[control.id] = control.default;
      if (control.unit) {
        acc[`${control.id}_unit`] = control.unit;
      }
      return acc;
    },
    {} as Record<string, any>
  );

  return { controls, values };
};
