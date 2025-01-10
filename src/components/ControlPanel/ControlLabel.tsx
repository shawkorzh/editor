import { ComponentProps, FC } from 'react';

import styles from '@/components/ControlPanel/ControlPanel.module.css';

const ControlLabel: FC<ComponentProps<'label'>> = (props) => {
  const { className, ...rest } = props;

  return <label className={styles['control-label']} {...rest} />;
};

export default ControlLabel;
