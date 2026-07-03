import { Button, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { DividerComponent } from '../divider'
const { Title, Text } = Typography;

const styles = {
  container: {
    width: '100%',
    border: '1px solid #d9d9d9',
    borderRadius: '12px',
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: '10px',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  text: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  title: {
    margin: 0,
  },
  description: {
    fontSize: '14px',
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
  },
};

export const ScreenHeader = ({ title, description, onBack, showBack = true }) => {
  return (
    <div style={styles.container}>
      <div style={styles.left}>
        {showBack && (
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={onBack}
            size='small'
            style={styles.backButton}
          />
        )}

        <div style={styles.text}>
          <Title level={4} style={styles.title}>
            {title}
          </Title>


          {description && (
            <>
              <DividerComponent orientation="vertical"/>
              <Text type="secondary" style={styles.description}>
                {description}
              </Text>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
