import { Route, Routes } from 'react-router-dom';
import {
  DistrictsListView,
  DistrictsCreateView,
  DistrictsDetailView,
  DistrictsUpdateView,
} from '@/features/districts';

export const DistrictsRouter = () => {
  return (
    <Routes>
      <Route index element={<DistrictsListView />} />
      <Route path="create" element={<DistrictsCreateView />} />
      <Route path=":id" element={<DistrictsDetailView />} />
      <Route path=":id/update" element={<DistrictsUpdateView />} />
    </Routes>
  );
};
