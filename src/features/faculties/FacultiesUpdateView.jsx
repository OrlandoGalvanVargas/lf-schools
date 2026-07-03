import { useParams, useNavigate } from 'react-router-dom';
import { FacultiesUpdateController } from './FacultiesUpdateController';
import { RoutePaths } from '@/features/routing';

export const FacultiesUpdateView = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#f5f5f5' }}>
            <FacultiesUpdateController 
                id={id}
                onCancel = { () => navigate(-1) }
                onSuccess = { () => navigate(RoutePaths.faculties.list()) }
            />
        </div>
    );
};
