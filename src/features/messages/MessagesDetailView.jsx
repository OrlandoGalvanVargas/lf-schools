import { useNavigate, useParams } from 'react-router-dom';
import { RoutePaths } from '@/features/routing';
import { MessagesDetailController } from './MessagesDetailController';

export const MessagesDetailView = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    return (
        <MessagesDetailController
            id={id}
            onCancel={() => navigate(RoutePaths.messages.list())}
        />
    );
};
