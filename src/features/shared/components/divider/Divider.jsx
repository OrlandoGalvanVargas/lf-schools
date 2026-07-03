import { Divider } from 'antd';

export const DividerComponent = ({
  title,
  placement = 'start',
  dashed = false,
  plain = false,
  style,
  ...rest
}) => {
  return (
    <Divider
      titlePlacement={placement}
      dashed={dashed}
      plain={plain}
      style={{
        borderColor: '#e1e1e1',
        ...style,
      }}
      {...rest}
    >
      {title}
    </Divider>
  );
};
