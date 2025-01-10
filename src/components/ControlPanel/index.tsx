import ControlJsonUpload from '@/components/ControlPanel/ControlJsonUpload';
import NumberControl from '@/components/ControlPanel/NumberControl';
import RangeControl from '@/components/ControlPanel/RangeControl';
import SelectControl from '@/components/ControlPanel/SelectControl';
import { useControlsContext } from '@/providers/ControlsProvider';
import { ComponentProps, FC } from 'react';

import styles from '@/components/ControlPanel/ControlPanel.module.css';

const ControlPanel: FC<ComponentProps<'div'>> = (props) => {
  const { className, ...rest } = props;
  const { controls, values, setValues } = useControlsContext();

  return (
    <div className={styles['control-container']} {...rest}>
      <ControlJsonUpload />
      {controls.map((control) => {
        switch (control.type) {
          case 'select':
            return (
              <SelectControl
                key={control.id}
                control={control}
                setValues={setValues}
                value={values[control.id]}
              />
            );
          case 'number':
            return (
              <NumberControl
                key={control.id}
                control={control}
                setValues={setValues}
                value={values[control.id]}
              />
            );
          case 'range':
            return (
              <RangeControl
                key={control.id}
                control={control}
                setValues={setValues}
                value={values[control.id]}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default ControlPanel;
