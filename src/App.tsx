import ControlPanel from '@/components/ControlPanel';
import Preview from '@/components/PreviewBox';
import defaultControls from '@/data/editor.json';
import { Control } from '@/types/control.types';
import { parseJson } from '@/utils/data.utils';
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';

import '@/assets/styles/App.css';

const App: FC = () => {
  const [controls, setControls] = useState<Control[]>([]);
  const [values, setValues] = useState<Record<string, any>>({});

  useEffect(() => {
    const { controls, values } = parseJson(defaultControls as Control[]);
    setControls(controls);
    setValues(values);
  }, []);

  const handleChange = useCallback((id: string, value: any) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  }, []);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (Array.isArray(json)) {
          const { controls, values } = parseJson(json);
          setControls(controls);
          setValues(values);
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
    <div className="container">
      <div className="preview-container">
        <Preview values={values} />
      </div>

      <div className="control-container">
        <div className="upload-container">
          <label className="upload-label">Upload JSON Configuration</label>
          <input
            type="file"
            accept=".json"
            className="upload-input"
            onChange={handleFileUpload}
          />
        </div>
        <ControlPanel
          controls={controls}
          values={values}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default App;
