import { Route, Routes } from 'react-router-dom';
import { FacultiesListView } from '../faculties/FacultiesListView';
import { FacultiesCreateView } from '../faculties/FacultiesCreateView';
import { FacultiesUpdateView } from '../faculties/FacultiesUpdateView';
import { FacultiesDetailView } from '../faculties/FacultiesDetailView';

export const FacultiesRouter = () => {
    return (
        <Routes>
            <Route index element={<FacultiesListView />} />
            <Route path="create" element={<FacultiesCreateView />} />
            <Route path=":id" element={<FacultiesDetailView />} />
            <Route path=":id/update" element={<FacultiesUpdateView />} />
        </Routes>
    );
};
