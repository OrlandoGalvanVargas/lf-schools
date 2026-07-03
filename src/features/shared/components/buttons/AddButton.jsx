import { ConfigProvider, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export const AddButton = ({ onClick, style, ...props }) => {

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
          height: '48px',
          fontWeight: 500,
          fontSize: '15px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: '2px',
          boxShadow: '0px 4px 10px rgba(183, 235, 143, 0.4)',
          paddingRight: '8px',
          ...style
        }}
        {...props}
      >
        Add
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            border: '2px solid #52c41a',
            width: '24px',
            height: '24px',
            marginLeft: '12px'
          }}
        >
          <PlusOutlined style={{ fontSize: '12px', fontWeight: 'bold' }} />
        </div>
      </Button>
    </ConfigProvider>
  );
};
