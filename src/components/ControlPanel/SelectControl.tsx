import ControlBlock from '@/components/ControlPanel/ControlBlock';
import ControlLabel from '@/components/ControlPanel/ControlLabel';
import { ControlSelect } from '@/types/control.types';
import { Entity } from '@/types/entity.types';
import { ChangeEvent, FC } from 'react';

import styles from '@/components/ControlPanel/ControlPanel.module.css';

interface SelectControlProps {
  control: ControlSelect;
  value: Entity[ControlSelect['id']];
  setValues: (values: Pick<Entity, ControlSelect['id']>) => void;
}

const SelectControl: FC<SelectControlProps> = (props) => {
  const { control, value, setValues } = props;

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setValues({ [control.id]: event.target.value });
  };

  return (
    <ControlBlock key={control.id}>
      <ControlLabel>{control.label}</ControlLabel>
      <select
        value={value}
        onChange={onChange}
        className={styles['select-control']}
      >
        {control.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </ControlBlock>
  );
};

export default SelectControl;
