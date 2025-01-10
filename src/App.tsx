import ControlPanel from '@/components/ControlPanel';
import PreviewBox from '@/components/PreviewBox';
import { ControlsProvider } from '@/providers/ControlsProvider';
import { FC } from 'react';

const App: FC = () => {
  return (
    <ControlsProvider>
      <div className="app-container">
        <PreviewBox />
        <ControlPanel />
      </div>
    </ControlsProvider>
  );
};

export default App;
