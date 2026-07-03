import { FacultiesCreateController } from './FacultiesCreateController';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@/features/routing';

export const FacultiesCreateView = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#f5f5f5' }}>
            <FacultiesCreateController
                onCancel = { () => navigate(-1) }
                onSuccess = { () => navigate(RoutePaths.faculties.list()) }
            />
        </div>
    );
};
