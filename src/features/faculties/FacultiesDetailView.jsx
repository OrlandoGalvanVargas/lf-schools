import { useParams, useNavigate } from 'react-router-dom';
import { FacultiesDetailController } from './FacultiesDetailController';
import { RoutePaths } from '@/features/routing';

export const FacultiesDetailView = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#f5f5f5' }}>
            <FacultiesDetailController 
                id={id}
                onClick = { () => navigate(RoutePaths.faculties.update(id)) }
                onBack = { () => navigate(-1) }
            />
        </div>
    );
};
