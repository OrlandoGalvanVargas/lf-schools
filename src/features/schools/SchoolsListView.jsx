import { useNavigate } from "react-router-dom";
import { RoutePaths } from "@/features/routing";
import { SchoolsListController } from "./SchoolsListController";

export function SchoolsListView() {

    const navigate = useNavigate();

    return <SchoolsListController
        onSettings={id => navigate(RoutePaths.schools.update(id))}
        onCreate={() => navigate(RoutePaths.schools.create())}
        onDetails={id => navigate(RoutePaths.schools.details(id))}
    />
}