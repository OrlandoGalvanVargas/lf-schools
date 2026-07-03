import { withReactive } from '@/reactive';
import { Card, Spin } from 'antd';
import { SecondaryButton } from '@/features/shared/components/buttons';
import { FacultiesForm } from './components';

export const FacultiesDetailController = withReactive(
    ({ data, id, onClick, onBack, monitors }) => {
        const isLoading = monitors.getFacultyById || monitors.getBeacons || monitors.getBeaconTypes;
        const faculty = data.faculties?.[0] || null;

        if (!faculty || isLoading) return <div style={{ padding: '24px', textAlign: 'center' }}><Spin size="large" /></div>;

        const nameParts = (faculty.faculty || '').split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        const initialData = {
            ...faculty,
            firstName,
            lastName,
            name: faculty.faculty || faculty.name,
            role: faculty.roles,
            notifications: faculty.notifications,
            selectedBeacons: faculty.assignedBeaconsArr?.length > 0
                ? faculty.assignedBeaconsArr.map((uuid) => 
                    {
                    const realBeacon = data.beacons?.find(b => b.id.toLowerCase() === uuid.toLowerCase());
                    return realBeacon ? realBeacon : { id: uuid, deviceName: uuid }; 
                    }
                ) 
            : []
        };

        return (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Card title="Faculty Details" extra={<a onClick={() => onClick()}>Edit</a>}>
                    <FacultiesForm
                        initialData={initialData}
                        beacons={ data.beacons }
                        beaconTypes={ data.beaconTypes }
                        isLoading={isLoading}
                        disabled={true}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                        <SecondaryButton onClick={() => onBack()}>Close</SecondaryButton>
                    </div>
                </Card>
            </div>
        );
    },
    {
        init: ({ services, id }) => {
            services.faculties.getFacultyById(id);
            services.beacons.getBeacons();
            services.beacons.getBeaconTypes();
        },
        queries: ({ id }) => [
            { name: 'faculties', collection: 'faculties', where: [{ field: ["id"], op: "==", value: Number(id) }] },
            {
                collection: 'beacons',
                name: 'beacons',
                defaultValue: [],
            },
            {
                collection: 'beaconTypes',
                name: 'beaconTypes',
                defaultValue: [],
            },
        ],
        monitors: () => ['getFacultyById', 'getBeacons', 'getBeaconTypes'],
    }
);
