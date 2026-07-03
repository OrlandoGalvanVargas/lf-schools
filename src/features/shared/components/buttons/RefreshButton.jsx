import { ConfigProvider, Button } from 'antd';
import { RedoOutlined } from '@ant-design/icons';

export const RefreshButton = ({ onClick, style, isLoading = false, ...props }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBg: '#e6f4ff',
            defaultColor: '#1677ff',
            defaultBorderColor: '#91caff',
            defaultHoverBg: '#d6e4ff',
            defaultHoverColor: '#4096ff',
            defaultHoverBorderColor: '#4096ff',
          },
        },
      }}
    >
      <Button
        shape="round"
        onClick={onClick}
        style={{
          minWidth: '120px',
          height: '48px',
          fontWeight: 500,
          fontSize: '15px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: '2px',
          boxShadow: '0px 4px 10px rgba(22, 119, 255, 0.2)',
          paddingRight: '8px',
          ...style,
        }}
        {...props}
      >
        {!isLoading && 'Update Data'}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            border: '2px solid #1677ff',
            width: '24px',
            height: '24px',
            marginLeft: '12px',
          }}
        >
          <RedoOutlined style={{ fontSize: '12px', fontWeight: 'bold' }} />
        </div>
      </Button>
    </ConfigProvider>
  );
};