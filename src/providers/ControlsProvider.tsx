import defaultControls from '@/data/editor.json';
import { Control } from '@/types/control.types';
import { Entity } from '@/types/entity.types';
import { parseControlsConfig } from '@/utils/data.utils';
import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface ControlsContextProps {
  values: Entity;
  controls: Control[];
  setControls: Dispatch<SetStateAction<Control[]>>;
  setValues: (values: Entity, uploading?: boolean) => void;
}

const ControlsContext = createContext<ControlsContextProps | undefined>(
  undefined
);

export const ControlsProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [controls, setControls] = useState<Control[]>([]);
  const [values, setValues] = useState<Entity>({});

  const onSetValues = useCallback((values: Entity, uploading = false) => {
    setValues(
      uploading
        ? values
        : (prev) => ({
            ...prev,
            ...values,
          })
    );
  }, []);

  const onSetControls = useCallback((controls: SetStateAction<Control[]>) => {
    setControls(controls);
  }, []);

  useEffect(() => {
    const { controls, values } = parseControlsConfig(
      defaultControls as Control[]
    );
    setControls(controls);
    setValues(values);
  }, []);

  return (
    <ControlsContext.Provider
      value={{
        values,
        controls,
        setValues: onSetValues,
        setControls: onSetControls,
      }}
    >
      {children}
    </ControlsContext.Provider>
  );
};

export const useControlsContext = () => {
  const context = useContext(ControlsContext);
  if (!context)
    throw new Error('useControlsContext must be used within ControlsProvider');
  return context;
};
