import { BookOutlined, TeamOutlined, MessageOutlined } from '@ant-design/icons';
import { SchoolFacultiesList } from "@/features/faculties/components"
import { StudentsList } from "@/features/students/components/StudentsList"
import { BaseTabs } from '@/features/shared/components/tabs';
import { SchoolMessagesList } from "../../messages/components/SchoolMessagesList";
import { SchoolsForm } from "./SchoolsForm";

export const SchoolDetails = ({ schoolInfo, id, onClose }) => {

    const tabs = [
        {
            label: "Faculties",
            icon: BookOutlined,
            children: <SchoolFacultiesList schoolId={id} />
        },
        {
            label: "Students",
            icon: TeamOutlined,
            children: <StudentsList schoolId={id} />
        },
        {
            label: "Messages",
            icon: MessageOutlined,
            children: <SchoolMessagesList schoolId={id} />
        }
    ];

    return (
        <div style={{ paddingBottom: 24 }}>
            <SchoolsForm initialValues={schoolInfo} readOnly={true} onCancel={onClose} />
            <BaseTabs tabs={tabs} />
        </div>
    );
};

