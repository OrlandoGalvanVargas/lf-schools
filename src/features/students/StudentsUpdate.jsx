import { Button, Card, Flex, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import { StudentForm } from './components/StudentForm';

export const StudentsUpdate = ({ students, loading, onBack, onEdit }) => {
  return (
    <>
      <Card>
        <Flex orientation="vertical" gap={'middle'}>
          <StudentForm
            initData={students}
            loading={loading}
            onBack={onBack}
            onSubmitForm={onEdit}
          />
        </Flex>
      </Card>
    </>
  );
};
