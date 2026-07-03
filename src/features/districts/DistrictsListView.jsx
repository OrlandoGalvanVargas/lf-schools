import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@/features/routing';
import { DistrictsListController } from './DistrictsListController';

export const DistrictsListView = () => {
  const navigate = useNavigate();

  return (
    <div>
      <DistrictsListController
        onView={id => navigate(RoutePaths.districts.detail(id))}
        onCreate={() => navigate(RoutePaths.districts.create())}
        onEdit={id => navigate(RoutePaths.districts.update(id))}
      />
    </div>
  );
};
