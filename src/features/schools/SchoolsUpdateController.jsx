import { Spin } from "antd";
import { withReactive } from "@/reactive";
import { useOnResultReactor } from '@/reactive/hooks';
import { SchoolsForm } from "./components/SchoolsForm";


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

export const SchoolsUpdateController = withReactive(
    ({ data, services, monitors, onComplete, onCancel }) => {

        useOnResultReactor({
            updateSchool: {
                onSuccess: () => onComplete(),
            },
        });

        const schoolInfo = data.school;

        const handleUpdate = (data, addresses = []) => {
            const payload = {
                ...data,
                addresses: addresses
            };
            services.schools.updateSchool(payload);
        };

        return (
            <LoadingMonitor monitor={monitors.getSchoolById}>
                <SchoolsForm initialValues={schoolInfo} onSubmit={handleUpdate} onCancel={onCancel} />
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