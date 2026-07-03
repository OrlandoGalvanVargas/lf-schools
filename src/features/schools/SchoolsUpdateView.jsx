import { useNavigate, useParams } from 'react-router-dom';
import { RoutePaths } from '@/features/routing';
import { SchoolsUpdateController } from "./SchoolsUpdateController";

export function SchoolsUpdateView() {

  const navigate = useNavigate();

  const { id } = useParams();

  return (
    <div>
      <SchoolsUpdateController
        id={id}
        onComplete={() => navigate(RoutePaths.schools.list())}
        onCancel={() => navigate(RoutePaths.schools.list())}
      />
    </div>
  );
}