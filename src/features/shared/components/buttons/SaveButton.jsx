import { ConfigProvider, Button } from 'antd';

export const SaveButton = ({ onClick, style, ...props }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBg: '#f6ffed',
            defaultColor: '#52c41a',
            defaultBorderColor: '#b7eb8f',
            defaultHoverBg: '#e6fffb',
            defaultHoverColor: '#73d13d',
            defaultHoverBorderColor: '#73d13d',
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
        Save
      </Button>
    </ConfigProvider>
  );
};
