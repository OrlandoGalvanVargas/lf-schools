import { useNavigate, useParams } from 'react-router-dom';
import { RoutePaths } from '@/features/routing';
import { SchoolDetailsController } from "./SchoolDetailsController";

export function SchoolsDetailsView() {

    const navigate = useNavigate();

    const { id } = useParams();


    return (
        <div>
            <SchoolDetailsController
                id={id}
                onClose={() => navigate(RoutePaths.schools.list())}
            />
        </div>
    );
}