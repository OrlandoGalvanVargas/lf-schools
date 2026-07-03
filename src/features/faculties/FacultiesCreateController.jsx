import { withReactive } from '@/reactive';
import { useOnResultReactor } from '@/reactive/hooks';
import { FacultiesForm } from './components';

export const FacultiesCreateController = withReactive(
({ data, monitors, services, onCancel, onSuccess }) => {

    const isLoading = monitors.createFaculty || monitors.getBeacons || monitors.getBeaconTypes;

    useOnResultReactor({
        createFaculty: {
            onSuccess: () => onSuccess?.(),
        },
    });

    const handleSave = (formData) => {

        const preparedData = {
            ...formData,
            faculty: `${formData.firstName || ''} ${formData.lastName || ''}`.trim() || formData.name || 'Unknown Faculty',
            roles: formData.role,
            assignedBeacons:
                formData.selectedBeacons?.length > 0
                    ? formData.selectedBeacons.map(b => b.id)
                    : [],
            notifications: {
                email: !!formData.notifications?.email,
                sms: !!formData.notifications?.sms,
                voice: !!formData.notifications?.voice
            }
        };

        services.faculties.createFaculty(preparedData);
    };

    return (
        <div style={{ flex: 1 }}>
            <FacultiesForm
                onSave={handleSave}
                onCancel={() => onCancel()}
                beacons={ data.beacons }
                beaconTypes={ data.beaconTypes }
                facultyRoleTypes={ data.facultyRoleTypes }
                isLoading={isLoading}
            />
        </div>
    );

},
{
    init: ({ services }) => {
        services.beacons.getBeacons();
        services.beacons.getBeaconTypes();
        services.faculties?.getFacultyRoleTypes();
    },
    queries: () => [
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
    monitors: () => (['createFaculty','getBeacons', 'getBeaconTypes', 'getFacultyRoleTypes']),
});
