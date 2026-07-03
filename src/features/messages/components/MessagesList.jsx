import { Tag } from 'antd';
import { CrudTable } from '@/features/shared/components/table';

const columns = [
    {
        field: 'school',
        title: 'School',
        sorter: (a, b) => (a.school?.name || '').localeCompare(b.school?.name || ''),
        render: value => value?.name || '—',
    },
    {
        field: 'description',
        title: 'Description',
        type: 'text',
        ellipsis: true,
        sorter: (a, b) => (a.description || '').localeCompare(b.description || ''),
    },
    {
        field: 'broadcastMessageType',
        title: 'Type',
        sorter: (a, b) => (a.broadcastMessageType?.name || '').localeCompare(b.broadcastMessageType?.name || ''),
        render: value => value?.name || '—',
    },
    {
        field: 'broadcastMessagePriority',
        title: 'Priority',
        sorter: (a, b) => (a.broadcastMessagePriority?.name || '').localeCompare(b.broadcastMessagePriority?.name || ''),
        render: (value, record) => (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span
                    style={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: record.color || '#ccc',
                        display: 'inline-block',
                        flexShrink: 0,
                    }}
                />
                {value?.name || '—'}
            </span>
        ),
    },
    {
        field: 'isFavorite',
        title: 'Favorite',
        sorter: (a, b) => (a.isFavorite ? 1 : 0) - (b.isFavorite ? 1 : 0),
        render: value =>
            value ? <Tag color="gold">★</Tag> : <Tag></Tag>,
    },
];

export const MessagesList = ({ data = [], loading = false, onView, onEdit, onDelete }) => {
    return (
        <CrudTable
            columns={columns}
            dataSource={data}
            loading={loading}
            rowKey="id"
            actionConfig={{ view: true, edit: true, delete: true }}
            onView={(record) => { onView(record.id) }}
            onEdit={(record) => { onEdit(record.id) }}
            onDelete={(record) => { onDelete(record.id) }}
        />
    );
};
