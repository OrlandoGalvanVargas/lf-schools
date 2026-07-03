import { withReactive } from '@/reactive/withReactive';
import { BeaconForm } from './components/BeaconForm';
import { useOnResultReactor } from '@/reactive/hooks';

export const BeaconUpdateController = withReactive ( (
    { data, services, monitors, onClick, id }
) => {
    const isLoading = monitors.updateBeacon || monitors.getBeaconTypes;

    const beacon = data.beacon;

    useOnResultReactor({
        updateBeacon: {
            onSuccess: () => onClick?.(),
        },
    });

    return (
        <div style={{ 
            margin: "0 auto", 
            backgroundColor: "white", 
            padding: "24px",
            borderRadius: "8px" }}
        >
            <BeaconForm 
                beacon = { beacon }
                beaconTypes = { data.beaconTypes }
                onSubmit = { (values) => {
                    const payload = { ...values, id: id };
                    services.beacons.updateBeacon(id, payload);
                }}
                isLoading = { isLoading }
                onCancel = { () => onClick() }
            />
        </div>
    )
},{
    init: ({ id, services }) => {
        id && services.beacons.getBeacons();
        services.beacons.getBeaconTypes();
    },
    queries: ({ id }) => [
        {
            collection: 'beacons',
            name: 'beacon',
            where: [
                {
                    op: 'byId',
                    field: ['id'],
                    value: (id),
                },
            ],
            defaultValue: [],
        },
        {
            collection: 'beaconTypes',
            name: 'beaconTypes',
            defaultValue: [],
        },
    ],
    monitors: () => (['getBeacons', 'getBeaconTypes', 'updateBeacon']),
});