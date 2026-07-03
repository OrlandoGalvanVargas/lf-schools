import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { AppMenu } from '@/features/shared/components/menu';
import { ScreenHeader } from '@/features/shared/components/screenHeader';
import { useRouteHeader } from '@/features/shared/hooks';

const { Header, Sider, Content, Footer } = Layout;

export const BaseLayout = () => {
  const header = useRouteHeader();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <AppMenu />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 16,
            background: 'transparent',
            marginBottom: 32,
          }}
        >
          <ScreenHeader
            title={header.title}
            description={header.description}
            onBack={header.onBack}
            showBack={header.showBack}
          />
        </Header>

        <Content style={{ margin: '16px' }}>
          {/* <Router /> */}
          <Outlet />
        </Content>

        <Footer style={{ textAlign: 'center' }}>Schools</Footer>
      </Layout>
    </Layout>
  );
};
