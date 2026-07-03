import { useNavigate, useParams } from 'react-router-dom';
import { RoutePaths } from '@/features/routing';
import { BeaconUpdateController } from './BeaconUpdateController';

export const BeaconUpdateView = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    return <BeaconUpdateController
        onClick = { () => navigate(RoutePaths.beacons.list()) }
        id = { id }
    />
}