import ControlBlock from '@/components/ControlPanel/ControlBlock';
import ControlLabel from '@/components/ControlPanel/ControlLabel';
import { ControlNumber } from '@/types/control.types';
import { Entity } from '@/types/entity.types';
import { ChangeEvent, FC } from 'react';

interface NumberControlProps {
  control: ControlNumber;
  value: Entity[ControlNumber['id']];
  setValues: (values: Pick<Entity, ControlNumber['id']>) => void;
}

const NumberControl: FC<NumberControlProps> = (props) => {
  const { control, value, setValues } = props;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(event.target.value);
    let clampedValue = inputValue;

    if (control.min !== undefined) {
      clampedValue = Math.max(clampedValue, control.min);
    }
    if (control.max !== undefined) {
      clampedValue = Math.min(clampedValue, control.max);
    }

    setValues({ [control.id]: clampedValue });
  };

  return (
    <ControlBlock>
      <ControlLabel>{control.label}</ControlLabel>
      <input
        type="number"
        min={control.min}
        max={control.max}
        onChange={onChange}
        value={String(value).replace(/^0+(?=\d)/, '')}
      />
    </ControlBlock>
  );
};

export default NumberControl;
