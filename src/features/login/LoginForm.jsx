import React from 'react';
import { UserOutlined, LockOutlined, EyeOutlined } from '@ant-design/icons';
import { Form, Input, Button, Card, Typography, Row, Col, Divider } from 'antd';

const { Title, Text } = Typography;

export const LoginForm = ({ onLogin, onDemo }) => {
  const [form] = Form.useForm();

  const handleFinish = values => {
    if (onLogin) {
      onLogin(values);
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Col xs={22} sm={16} md={12} lg={8} xl={6}>
        <Card style={{ borderRadius: 12 }}>
          <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
            Schools
          </Title>

          <Form
            form={form}
            name="login_form"
            layout="vertical"
            onFinish={handleFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Email required' }]}
            >
              <Input prefix={<UserOutlined />} size="large" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Password required' }]}
            >
              <Input.Password prefix={<LockOutlined />} size="large" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large">
                Login
              </Button>
            </Form.Item>
          </Form>

          {onDemo && (
            <>
              <Divider plain>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  o
                </Text>
              </Divider>

              <Button type="default" block size="large" icon={<EyeOutlined />} onClick={onDemo}>
                Probar demo
              </Button>
            </>
          )}
        </Card>
      </Col>
    </Row>
  );
};
