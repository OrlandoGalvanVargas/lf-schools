import { Button, Card, Flex, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import { StudentForm } from './components/StudentForm';

export const StudentsDetails = ({ students, loading, onBack }) => {
  return (
    <>
      <Card>
        <Flex orientation="vertical" gap={'middle'}>
          <Flex align="center" gap={'small'}></Flex>
          <StudentForm
            initData={students || {}}
            readOnly={true}
            loading={loading}
            onBack={onBack}
          />
        </Flex>
      </Card>
    </>
  );
};
