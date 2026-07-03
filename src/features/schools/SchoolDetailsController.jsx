import { Spin } from "antd";
import { withReactive } from "@/reactive";
import { SchoolDetails } from "./components/SchoolDetails";

const LoadingMonitor = ({ monitor = false, children }) => {
    if (monitor) {
        return (
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "calc(100vh - 200px)"
                }}
            >
                <Spin size="large" />
            </div>
        );
    }

    return children;
};

export const SchoolDetailsController = withReactive(
    ({ data, monitors, onClose, id }) => {

        const schoolInfo = data.school;

        return (
            <LoadingMonitor monitor={monitors.getSchoolById}>
                <SchoolDetails schoolInfo={schoolInfo} id={id} onClose={onClose} />
            </LoadingMonitor>
        );
    },
    {
        init: ({ services, id }) => {
            id && services.schools.getSchoolById(id);
        },
        queries: ({ id }) => [
            {
                collection: 'schools',
                name: 'school',
                where: [{
                    op: 'byId',
                    field: ['id'],
                    value: id
                }]
            }
        ],
        monitors: () => [
            "getSchoolById"
        ]

    }
)