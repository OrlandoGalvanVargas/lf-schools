import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@/features/routing';
import { DistrictsCreateController } from './DistrictsCreateController';

export const DistrictsCreateView = () => {
  const navigate = useNavigate();

  return (
    <DistrictsCreateController
      onCreate={() => navigate(RoutePaths.districts.list())}
      onCancel={() => navigate(RoutePaths.districts.list())}
    />
  );
};
