import { CrudTable } from '@/features/shared/components/table';

export function SchoolsList({ onSettings, onDelete, onViewDetails, dataSource, loading, timeZones = [] }) {

    const columns = [
        {
            field: 'name',
            title: 'Name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            render: (_, record) => record.name
        },
        {
            title: 'Contact',
            field: 'contact',
            render: (_, record) => record.contact?.name
        },
        {
            title: 'SOS Number',
            field: 'soscallNumber',
            render: (_, record) => record.soscallNumber
        },
        {
            title: 'Time Zone',
            field: 'timeZone',
            render: (_, record) => {
                //const tz = timeZones.find(t => t.id === record.timeZone);
                return record.timeZone //tz ? tz.label : record.timeZone || 'N/A'; //TODO: change timezone lookup
            }
        },
        {
            title: 'Addresses',
            field: 'addressCount',
            align: 'center',
            render: (_, record) => record.addressCount
        },
        {
            title: 'Messages',
            field: 'messagesCount',
            align: 'center',
            sorter: (a, b) => (a.messagesCount || 0) - (b.messagesCount || 0),
            render: (_, record) => record.messagesCount || 0
        },
        {
            title: 'Faculties',
            field: 'facultiesCount',
            align: 'center',
            sorter: (a, b) => (a.facultiesCount || 0) - (b.facultiesCount || 0),
            render: (_, record) => record.facultiesCount || 0
        },
        {
            title: 'Students',
            field: 'studentsCount',
            align: 'center',
            sorter: (a, b) => (a.studentsCount || 0) - (b.studentsCount || 0),
            render: (_, record) => record.studentsCount || 0
        },

    ];

    return (
        <>
            <CrudTable
                columns={columns}
                dataSource={dataSource || []}
                loading={loading}
                rowKey="id"
                actionConfig={{ view: true, edit: true, delete: true }}
                onView={(record) => onViewDetails(record.id)}
                onEdit={(record) => onSettings(record.id)}
                onDelete={(record) => onDelete(record.id)}
            />
        </>
    );
}
