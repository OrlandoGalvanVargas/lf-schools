import { withReactive } from '@/reactive/withReactive';
import { BeaconForm } from "./components/BeaconForm";
import { useOnResultReactor } from '@/reactive/hooks';

export const BeaconCreateController = withReactive (( 
    { services, data, monitors, onClick }
 ) => {
    const isLoading = monitors.createBeacon || monitors.getBeaconType;

    useOnResultReactor({
        createBeacon: {
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
                    beaconTypes = { data.beaconTypes }
                    onSubmit={(beacon) => {
                        services.beacons.createBeacon(beacon);
                    }}
                    isLoading = { isLoading }
                    onCancel={() => onClick()}
                />        
            </div>
        );
 },{
    init: ({ services }) => {
        services.beacons.getBeaconTypes();
    },
    queries: () => [
        {
            collection: 'beaconTypes',
            name: 'beaconTypes',
            defaultValue: [],
        },
    ],
    monitors: () => ([ 'createBeacon', 'getBeaconTypes' ]),
 });