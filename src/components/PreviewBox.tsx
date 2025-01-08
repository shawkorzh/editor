import { FC } from 'react';

interface PreviewBoxProps {
  values: Record<string, any>;
}

const PreviewBox: FC<PreviewBoxProps> = (props) => {
  const { values } = props;

  return (
    <div
      style={{
        width: values.width + (values.width_unit || ''),
        height: values.height + (values.height_unit || ''),
        backgroundColor: values.background_color,
        border: `${values.border}px solid black`,
        // example additional values
        marginTop: values.margin_top + (values.margin_top_unit || ''),
        marginBottom: values.margin_bottom + (values.margin_bottom_unit || ''),
        paddingTop: values.padding_top + (values.padding_top_unit || ''),
        paddingBottom:
          values.padding_bottom + (values.padding_bottom_unit || ''),
      }}
    />
  );
};

export default PreviewBox;
