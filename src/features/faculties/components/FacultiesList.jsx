import { Space } from 'antd';
import { MessageOutlined, SoundOutlined, MailOutlined } from '@ant-design/icons';
import { CrudTable } from '@/features/shared/components/table';

export function FacultiesList({ data, loading, onDelete, onEdit, onView }) {

    const columns = [
        { field: 'faculty', title: 'Faculty' },
        { field: 'organizationName', title: 'School / District' },
        { field: 'roleName', title: 'Roles' },
        {
            field: 'notifications',
            title: 'Notification',
            render: (_, record) => (
                <Space size="middle">
                    <MessageOutlined
                        style={{ fontSize: '16px', color: record.notifications?.sms ? '#2f54eb' : '#bfbfbf', background: record.notifications?.sms ? '#f0f5ff' : 'transparent', padding: '4px', borderRadius: '50%' }}
                    />
                    <SoundOutlined
                        style={{ fontSize: '16px', color: record.notifications?.voice ? '#2f54eb' : '#bfbfbf', background: record.notifications?.voice ? '#f0f5ff' : 'transparent', padding: '4px', borderRadius: '50%' }}
                    />
                    <MailOutlined
                        style={{ fontSize: '16px', color: record.notifications?.email ? '#2f54eb' : '#bfbfbf', background: record.notifications?.email ? '#f0f5ff' : 'transparent', padding: '4px', borderRadius: '50%' }}
                    />
                </Space>
            ),
        },
        { field: 'assignedBeacon', title: 'Assigned Beacon' },
    ];

    return (
        <div style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
            <CrudTable
                columns={columns}
                dataSource={data}
                loading={loading}
                rowKey="id"
                actionConfig={{ view: true, edit: true, delete: true }}
                onView={(record) => onView(record.id)}
                onEdit={(record) => onEdit(record.id)}
                onDelete={(record) => onDelete(record.id)}
            />
        </div>
    );
}
