import { TripsListController } from './TripsListController';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@/features/routing';

export function TripsListView() {
  const navigate = useNavigate();
  return <TripsListController onSettings={id => navigate(RoutePaths.trips.update(id))} />;
}
