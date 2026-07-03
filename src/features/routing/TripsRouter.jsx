import { Route, Routes } from 'react-router-dom';
import { TripsListView, TripsCreateView, TripsUpdateView } from '@/features/trips';

export const TripsRouter = () => {
  return (
    <Routes>
      <Route index element={<p>TripsListView</p>} />
      <Route path="create" element={<p>TripsCreateView</p>} />
      <Route path=":id/update" element={<p>TripsUpdateView</p>} />
    </Routes>
  );
};
