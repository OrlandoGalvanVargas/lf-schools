import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@/features/routing';
import { SchoolsCreateController } from './SchoolsCreateController';

export function SchoolsCreateView() {

  const navigate = useNavigate();

  return (
    <div>
      <SchoolsCreateController
        onComplete={() => navigate(RoutePaths.schools.list())}
        onCancel={() => navigate(RoutePaths.schools.list())} />
    </div>
  );
}


