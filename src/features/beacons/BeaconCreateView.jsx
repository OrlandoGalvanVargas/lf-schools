import { useNavigate } from "react-router-dom";
import { RoutePaths } from "@/features/routing";
import { BeaconCreateController } from "./BeaconCreateController";

export const BeaconCreateView = () => {
    const navigate = useNavigate();
    return (
        <BeaconCreateController
            onClick = { () => navigate(RoutePaths.beacons.list()) }
        />
    )
}