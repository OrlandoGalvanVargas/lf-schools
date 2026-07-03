import { Route, Routes } from 'react-router-dom';
import { MessagesListView, MessagesCreateView, MessagesUpdateView, MessagesDetailView } from '@/features/messages';

export const MessagesRouter = () => {
    return (
        <Routes>
            <Route index element={<MessagesListView />} />
            <Route path="create" element={<MessagesCreateView />} />
            <Route path=":id/update" element={<MessagesUpdateView />} />
            <Route path=":id" element={<MessagesDetailView />} />
        </Routes>
    );
};
