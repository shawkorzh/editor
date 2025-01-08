import { Control } from '@/types/control.types';
import { ComponentProps, FC, PropsWithChildren } from 'react';

interface ControlPanelProps extends Omit<ComponentProps<'div'>, 'onChange'> {
  controls: Control[];
  values: Record<string, any>;
  onChange: (id: string, value: any) => void;
}

const ControlPanel: FC<ControlPanelProps> = (props) => {
  const { controls, values, onChange, style, ...restProps } = props;

  return (
    <div {...restProps}>
      {controls.map((control) => {
        switch (control.type) {
          case 'select':
            return (
              <Block key={control.id}>
                <Label>{control.label}</Label>
                <select
                  style={{ width: 300, cursor: 'pointer' }}
                  value={values[control.id]}
                  onChange={(e) => onChange(control.id, e.target.value)}
                >
                  {control.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Block>
            );
          case 'number':
            return (
              <Block key={control.id}>
                <Label>{control.label}</Label>
                <input
                  type="number"
                  value={String(values[control.id]).replace(/^0+(?=\d)/, '')}
                  min={control.min}
                  max={control.max}
                  onChange={(e) => {
                    const inputValue = Number(e.target.value);
                    let clampedValue = inputValue;

                    if (control.min !== undefined) {
                      clampedValue = Math.max(clampedValue, control.min);
                    }
                    if (control.max !== undefined) {
                      clampedValue = Math.min(clampedValue, control.max);
                    }

                    onChange(control.id, clampedValue);
                  }}
                />
              </Block>
            );
          case 'range':
            return (
              <Block key={control.id}>
                <Label>{control.label}</Label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="range"
                    value={values[control.id]}
                    min={control.min}
                    max={control.max}
                    step={control.step}
                    onChange={(e) =>
                      onChange(control.id, Number(e.target.value))
                    }
                  />
                  <p>
                    {values[control.id]} {control.unit || ''}
                  </p>
                </div>
              </Block>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

const Label: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return (
    <label style={{ display: 'block', marginBottom: '5px' }}>{children}</label>
  );
};

const Block: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return <div style={{ marginBottom: '10px' }}>{children}</div>;
};

export default ControlPanel;
