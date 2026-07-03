import { useNavigate, useParams } from 'react-router-dom';
import { RoutePaths } from '@/features/routing';
import { DistrictsDetailController } from './DistrictsDetailController';

export const DistrictsDetailView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <DistrictsDetailController id={id} onCancel={() => navigate(RoutePaths.districts.list())} />
  );
};
