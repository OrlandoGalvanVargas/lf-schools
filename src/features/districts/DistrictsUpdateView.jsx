import { useNavigate, useParams } from 'react-router-dom';
import { RoutePaths } from '@/features/routing';
import { DistrictsUpdateController } from './DistrictsUpdateController';

export const DistrictsUpdateView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <DistrictsUpdateController
      id={id}
      onSuccess={() => navigate(RoutePaths.districts.list())}
      onCancel={() => navigate(RoutePaths.districts.list())}
    />
  );
};
