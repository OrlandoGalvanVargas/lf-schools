import { useNavigate } from "react-router-dom";
import { RoutePaths } from "@/features/routing";
import { BeaconListController } from './BeaconListController';

export const BeaconListView = () => {
const navigate = useNavigate();
  return (
    <div>
        <BeaconListController
          onEdit = { ( id ) => navigate(RoutePaths.beacons.update(id)) }
          onView = { ( id ) => navigate(RoutePaths.beacons.detail(id)) } 
          onCreate = { () => navigate(RoutePaths.beacons.create()) }
        />
    </div>
  );
}