import { Route, Routes } from "react-router-dom";
import { BeaconCreateView, BeaconUpdateView, BeaconDetailView, BeaconListView } from "@/features/beacons";

export const BeaconsRouter = () => {
  return (
    <Routes>
      <Route index element={<BeaconListView />} />
      <Route path="create" element={<BeaconCreateView />} />
      <Route path=":id/update" element={<BeaconUpdateView />} />
      <Route path=":id" element={<BeaconDetailView />} />
    </Routes>
  );
}