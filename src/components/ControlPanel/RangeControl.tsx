import ControlBlock from '@/components/ControlPanel/ControlBlock';
import ControlLabel from '@/components/ControlPanel/ControlLabel';
import { ControlRange } from '@/types/control.types';
import { Entity } from '@/types/entity.types';
import { ChangeEvent, FC } from 'react';

import styles from '@/components/ControlPanel/ControlPanel.module.css';

interface RangeControlProps {
  control: ControlRange;
  value: Entity[ControlRange['id']];
  setValues: (values: Pick<Entity, ControlRange['id']>) => void;
}

const RangeControl: FC<RangeControlProps> = (props) => {
  const { control, value, setValues } = props;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ [control.id]: Number(event.target.value) });
  };

  return (
    <ControlBlock>
      <ControlLabel>{control.label}</ControlLabel>
      <div className={styles['range-control-block']}>
        <input
          type="range"
          value={value}
          min={control.min}
          max={control.max}
          step={control.step}
          onChange={onChange}
        />
        <p>
          {value} {control.unit || ''}
        </p>
      </div>
    </ControlBlock>
  );
};

export default RangeControl;
