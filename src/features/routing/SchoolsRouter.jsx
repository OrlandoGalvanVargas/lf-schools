import { Route, Routes } from 'react-router-dom';
import { SchoolsListView, SchoolsCreateView, SchoolsUpdateView, SchoolsDetailsView } from '@/features/schools';

export const SchoolsRouter = () => {
  return (
    <Routes>
      <Route index element={<SchoolsListView />} />
      <Route path=":id" element={<SchoolsDetailsView />} />
      <Route path="create" element={<SchoolsCreateView />} />
      <Route path=":id/update" element={<SchoolsUpdateView />} />
    </Routes>
  );
};
