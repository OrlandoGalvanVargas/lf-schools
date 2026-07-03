import { ConfigProvider, Button } from 'antd';

export const CancelButton = ({ onClick, style, ...props }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBg: '#ffeaea',
            defaultColor: '#ff4d4f',
            defaultBorderColor: '#ff7875',
            defaultHoverBg: '#ffccc7',
            defaultHoverColor: '#ff4d4f',
            defaultHoverBorderColor: '#ff4d4f',
          },
        },
      }}
    >
      <Button
        shape="round"
        onClick={onClick}
        style={{
          minWidth: '120px',
          height: '40px',
          fontWeight: 500,
          fontSize: '15px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'none',
          ...style
        }}
        {...props}
      >
        Cancel
      </Button>
    </ConfigProvider>
  );
};
