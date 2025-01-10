import { useControlsContext } from '@/providers/ControlsProvider';
import { parseControlsConfig } from '@/utils/data.utils';
import { ChangeEvent, FC } from 'react';

import styles from '@/components/ControlPanel/ControlPanel.module.css';

const ControlJsonUpload: FC = () => {
  const { setControls, setValues } = useControlsContext();

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (Array.isArray(json)) {
          const { controls, values } = parseControlsConfig(json);
          setControls(controls);
          setValues(values, true);
        } else {
          console.error(
            'Invalid JSON structure. Must be an array of controls.'
          );
        }
      } catch (error) {
        console.error(
          error,
          'handleFileUpload: Error reading JSON file. Please check the format.'
        );
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className={styles['upload-container']}>
      <label className={styles['upload-label']}>
        Upload JSON Configuration
      </label>
      <input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className={styles['upload-input']}
      />
    </div>
  );
};

export default ControlJsonUpload;
