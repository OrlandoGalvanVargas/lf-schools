import { useNavigate, useParams } from 'react-router-dom';
import { RoutePaths } from '@/features/routing';
import { MessagesUpdateController } from './MessagesUpdateController';

export const MessagesUpdateView = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    return (
        <MessagesUpdateController
            id={id}
            onSuccess={() => navigate(RoutePaths.messages.list())}
            onCancel={() => navigate(RoutePaths.messages.list())}
        />
    );
};
