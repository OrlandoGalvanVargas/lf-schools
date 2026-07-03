import { Card, Flex } from 'antd';
import Title from 'antd/es/typography/Title';
import { StudentForm } from './components/StudentForm';

export const StudentsCreate = ({ onCreate, onBack, loading }) => {
  return (
    <Card>
      <Flex orientation="vertical" gap={'middle'}>
        <Flex align="center" gap={'small'}></Flex>
        <StudentForm onSubmitForm={onCreate} onBack={onBack} loading={loading} />
      </Flex>
    </Card>
  );
};
