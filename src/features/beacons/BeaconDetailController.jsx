import { withReactive } from '@/reactive/withReactive';
import { BeaconForm, BeaconEventList, BeaconLocationList } from './components';
import { AlertService } from '@/services/AlertService';
import { SecondaryButton, AddButton, RefreshButton } from '@/features/shared/components/buttons';
import { DividerComponent } from '@/features/shared/components/divider';
import { useOnResultReactor } from '@/reactive/hooks';

export const BeaconDetailController = withReactive ( (
    { data, services, monitors, onCancel, id }
) => {
    const loading = monitors.getBeacons || monitors.getBeaconById || monitors.getBeaconTypes || monitors.getSchools || monitors.getDistricts;
    const beacon = data.beacon;

    useOnResultReactor({
    generateEvent: {
        onSuccess: () => {
            services.beacons.getBeacons(); 
        }
    }
});

    const handlerRefresh = () => {
        services.beacons.getBeacons();
        services.schools.getSchools();
        services.districts.getDistricts();
        services.beacons.getBeaconTypes();
        services.faculties.getFaculties();
        loading ? null : AlertService.success('Data Loaded');
    }

    const handlerCreateEvent = (beaconId) => {
        services.beaconEvent.generateEvent(beaconId);
        services.beacons.getBeacons();
    }

    return (
        <div style={{ background: "#fff", padding: 24, borderRadius: 8 }}>
        
            <BeaconForm readOnly = {true} beacon = { beacon } beaconTypes = { data.beaconTypes } />
    
            <DividerComponent
                title = 'Beacon Events'
            />
    
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                <RefreshButton loading={loading} onClick={() => handlerRefresh()} style={{ margin: '0px 12px' }} />
                <AddButton onClick={() => handlerCreateEvent(beacon.id)} />
            </div>
            
            <BeaconEventList
                beaconEvents={ beacon?.events }
                loading={ loading }
            />
    
            <DividerComponent
                title = 'Beacon Locations'
            />
    
            <BeaconLocationList 
                beaconLocations={ beacon?.locations }
                loading={ loading }
            />
    
            <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                marginTop: 24 
            }}>
                <SecondaryButton
                    onClick={onCancel}
                >
                    Close
                </SecondaryButton>
            </div>
        </div>
    )
},{
    init: ({ id, services }) => {
        id && services.beacons.getBeacons();
        services.schools.getSchools();
        services.districts.getDistricts();
        services.beacons.getBeaconTypes();
        services.faculties.getFaculties();
    },
    queries: ({ id }) => [
        {
            collection: 'beacons',
            name: 'beacon',
            where: [
                {
                    op: 'byId',
                    field: ['id'],
                    value: (id)
                },
            ],
            defaultValue: [],
        },
        {
            collection: 'beaconTypes',
            name: 'beaconTypes',
            defaultValue: [],
        },
        {
            collection: 'schools',
            name: 'schools',
            defaultValue: [],
        },
        {
            collection: 'districts',
            name: 'districts',
            defaultValue: [],
        },
        {
            collection: 'faculties',
            name: 'faculties',
            defaultValue: [],
        },
    ],
    monitors: () => (['getBeacons', 'getBeaconTypes', 'getBeaconById', 'getSchools', 'getDistricts', 'getFaculties' ]),
});