import { ComponentProps, FC } from 'react';

import styles from '@/components/ControlPanel/ControlPanel.module.css';

const ControlBlock: FC<ComponentProps<'div'>> = (props) => {
  const { className, ...rest } = props;

  return <div className={styles['control-block']} {...rest} />;
};

export default ControlBlock;
