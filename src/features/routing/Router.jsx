import { Route, Routes } from 'react-router-dom';
import { TripsRouter } from './TripsRouter';
import { FacultiesRouter } from './FacultiesRouter';
import { MessagesRouter } from './MessagesRouter';
import { LoginView } from '../login/LoginView';
import { BaseLayout } from '../shared/components/layout/BaseLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { StudentsRouter } from './StudentsRouter';
import { DistrictsRouter } from './DistrictsRouter';
import { BeaconsRouter } from './BeaconsRouter';
import { SchoolsRouter } from './SchoolsRouter';
import { HomeView } from '../home/HomeView';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginView />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<BaseLayout />}>
          + <Route path="/trips/*" element={<TripsRouter />} />
          <Route path="/faculties/*" element={<FacultiesRouter />} />
          {/* <Route path="/trips/*" element={<TripsRouter />} /> */}
          <Route path="/home" element={<HomeView />} />
          <Route path="/students/*" element={<StudentsRouter />} />
          <Route path="/districts/*" element={<DistrictsRouter />} />
          <Route path="/messages/*" element={<MessagesRouter />} />
          <Route path="/beacons/*" element={<BeaconsRouter />} />
          <Route path="/schools/*" element={<SchoolsRouter />} />
        </Route>
      </Route>
    </Routes>
  );
};
