import { Tabs, Card } from 'antd';

export const BaseTabs = ({
  tabs = [],
  defaultActiveKey = '1',
  size = 'large',
  centered = true,
  ...rest
}) => {
  const tabItems = tabs.map((tab, index) => ({
    key: tab.key ?? tab.label ?? String(index + 1),
    label: (
      <span style={{ fontSize: '15px', fontWeight: 500 }}>
        {tab.icon && <tab.icon style={{ marginRight: 8 }} />}
        {tab.label}
      </span>
    ),
    children: <div style={{ padding: '8px 12px 24px 12px' }}>{tab.children}</div>,
  }));

  return (
    <Card
      style={{
        marginTop: 24,
        minHeight: 400
      }}
    >
      <Tabs
        defaultActiveKey={defaultActiveKey}
        items={tabItems}
        size={size}
        centered={centered}
        tabBarStyle={{ marginBottom: 24 }}
        {...rest}
      />
    </Card>
  );
};
