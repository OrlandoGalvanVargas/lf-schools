import { MessagesListController } from './MessagesListController';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@/features/routing';

export const MessagesListView = () => {
    const navigate = useNavigate();
    return (
        <MessagesListController
            onView={(id) => navigate(RoutePaths.messages.detail(id))}
            onEdit={(id) => navigate(RoutePaths.messages.update(id))}
            onAdd={() => navigate(RoutePaths.messages.create())}
        />
    );
};
