import { ConfigProvider, Button } from 'antd';

export const SecondaryButton = ({ onClick, style, children, ...props }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBg: '#f9f0ff',
            defaultColor: '#2f54eb',
            defaultBorderColor: '#d3adf7',
            defaultHoverBg: '#efdbff',
            defaultHoverColor: '#1d39c4',
            defaultHoverBorderColor: '#b37feb',
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
        {children || 'Secondary'}
      </Button>
    </ConfigProvider>
  );
};