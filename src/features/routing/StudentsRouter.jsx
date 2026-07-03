import { Route, Routes } from 'react-router-dom';
import {
  StudentsListView,
  StudentsDetailsView,
  StudentsUpdateView,
  StudentsCreateView,
} from '@/features/students/';

export const StudentsRouter = () => {
  return (
    <Routes>
      <Route index element={<StudentsListView />} />
      <Route path=":id" element={<StudentsDetailsView />} />
      <Route path=":id/update" element={<StudentsUpdateView />} />
      <Route path="create" element={<StudentsCreateView />} />
    </Routes>
  );
};
