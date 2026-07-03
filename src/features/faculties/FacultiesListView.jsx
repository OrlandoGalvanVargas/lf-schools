import { FacultiesListController } from './FacultiesListController';
import { RoutePaths } from '@/features/routing';
import { useNavigate } from 'react-router-dom';

export function FacultiesListView() {
    const navigate = useNavigate();
    return (
        <div>
            <FacultiesListController
                onView={id => navigate(RoutePaths.faculties.detail(id))}
                onCreate={() => navigate(RoutePaths.faculties.create())}
                onEdit={id => navigate(RoutePaths.faculties.update(id))}
            />
        </div>
    );
}
