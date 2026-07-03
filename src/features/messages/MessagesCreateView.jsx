import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@/features/routing';
import { MessagesCreateController } from './MessagesCreateController';

export const MessagesCreateView = () => {
    const navigate = useNavigate();

    return (
        <MessagesCreateController
            onSuccess={() => navigate(RoutePaths.messages.list())}
            onCancel={() => navigate(RoutePaths.messages.list())}
        />
    );
};
