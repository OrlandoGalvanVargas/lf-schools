import { useNavigate, useParams  } from 'react-router-dom';
import { RoutePaths } from '@/features/routing/RoutePaths';
import { BeaconDetailController } from "./BeaconDetailController"

export const BeaconDetailView = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    return (
        <BeaconDetailController 
            onCancel = { () => navigate(RoutePaths.beacons.list()) }
            id = { id }
        />
    )
}