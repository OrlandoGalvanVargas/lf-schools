import { Spin } from 'antd';
import { withReactive } from '@/reactive';
import { useOnResultReactor } from '@/reactive/hooks';
import { FacultiesForm } from './components';

export const FacultiesUpdateController = withReactive(
({ data, monitors, services, id, onSuccess, onCancel }) => {
    const isLoading = monitors.updateFaculty || monitors.getFacultyById || monitors.getBeacons || monitors.getBeaconTypes;

    const faculty = data.faculty;

    useOnResultReactor({
        updateFaculty: {
            onSuccess: () => onSuccess?.(),
        },
    });

    if (!faculty || isLoading) {
        return (
            <div style={{ padding: '24px', textAlign: 'center' }}>
                <Spin size="large" />
            </div>
        );
    }

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
                const realBeacon = data.beacons.find(b => b.id.toLowerCase() === uuid.toLowerCase());
                return realBeacon ? realBeacon : { id: uuid, deviceName: uuid }; 
                }
            ) 
        : []
    };

    return (
        <div style={{ flex: 1 }}>
            <FacultiesForm
                initialData={initialData}
                beacons={ data.beacons }
                beaconTypes={ data.beaconTypes }
                facultyRoleTypes={ data.facultyRoleTypes }
                isLoading={isLoading}
                onSave={(values) => {

                    const preparedData = {
                        ...values,
                        faculty: `${values.firstName || ''} ${values.lastName || ''}`.trim(),
                        roles: values.role,
                        contactId: faculty.contactId,
                        assignedBeacons:
                            values.selectedBeacons?.length > 0
                                ? values.selectedBeacons.map(b => b.id)
                                : [],
                        id: Number(id),
                        notifications: {
                            email: !!values.notifications?.email,
                            sms: !!values.notifications?.sms,
                            voice: !!values.notifications?.voice
                        }
                    };

                    services.faculties.updateFaculty(Number(id), preparedData);
                }}
                onCancel={() => onCancel()}
            />
        </div>
    );

},
{
    init: ({ services, id }) => {
        id && services.faculties.getFacultyById(id);
        services.beacons.getBeacons();
        services.beacons.getBeaconTypes();
        services.faculties?.getFacultyRoleTypes();
    },
    queries: ({ id }) => [
        {
            collection: 'faculties',
            name: 'faculty',
            where: [
                {
                    op: 'byId',
                    field: ['id'],
                    value: Number(id),
                },
            ],
            defaultValue: [],
        },
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
        {
            collection: 'facultyRoleTypes',
            name: 'facultyRoleTypes',
            defaultValue: [],
        },
    ],
    monitors: () => ([ 'updateFaculty', 'getFacultyById', 'getBeacons', 'getBeaconTypes', 'getFacultyRoleTypes']),
});
