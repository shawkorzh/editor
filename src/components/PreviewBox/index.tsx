import { useControlsContext } from '@/providers/ControlsProvider';
import { CSSProperties, ComponentProps, FC, useMemo } from 'react';

import styles from '@/components/PreviewBox/PreviewBox.module.css';
import { getStyleValue } from '@/utils/data.utils';

const PreviewBox: FC<ComponentProps<'div'>> = (props) => {
  const { className, ...rest } = props;
  const { values } = useControlsContext();

  const previewStyles = useMemo(() => {
    return {
      borderColor: 'black',
      borderStyle: 'solid',

      width: getStyleValue(values, 'width'),
      height: getStyleValue(values, 'height'),
      backgroundColor: getStyleValue(values, 'background_color'),
      borderWidth: getStyleValue(values, 'border_width') || 1,
      // example additional values
      marginTop: getStyleValue(values, 'margin_top'),
      marginBottom: getStyleValue(values, 'margin_bottom'),
      paddingTop: getStyleValue(values, 'padding_top'),
      paddingBottom: getStyleValue(values, 'padding_bottom'),
    } satisfies CSSProperties;
  }, [values]);

  return (
    <div className={styles['preview-container']} {...rest}>
      <div style={previewStyles} />
    </div>
  );
};

export default PreviewBox;
