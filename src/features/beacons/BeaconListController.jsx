import { withReactive } from '@/reactive/withReactive';
import { BeaconList } from './components/BeaconList'
import { Filter } from '@/features/shared/components/filters';
import { AddButton, RefreshButton } from '@/features/shared/components/buttons';
import { useOnResultReactor } from '@/reactive/hooks';

const isAvailable = [
    {
        value: true,
        name: 'Available'
    },
    {
        value: false,
        name: 'Not Available'
    }
];
const buildFilters = ( 
    types = [] , isAvailable = [], schools = [], districts = [], faculties = [] 
) => [

    { 
        type: 'input', 
        field: ['deviceName'], 
        title: 'Beacon name', 
        placeholder: 'Search by beacon name...' 
    },
    {
        type: 'select',
        field: ['beaconType'],
        title: 'Type',
        filterOption:'==',
        placeholder: 'Select Type',
        options: types.map(t => ({ value: t.name, label: t.name })),
    },
    {
        type: 'select',
        field: ['isAvailable'],
        title: 'Available',
        filterOption:'==',
        placeholder: 'Select Option',
        options: isAvailable.map(a => ({ value: a.value, label: a.name })),
    },
    {
        type: 'select',
        field: ['districtId'],
        title: 'District',
        filterOption:'==',
        placeholder: 'Select District',
        options: districts.map(d => ({ value: d.id, label: d.name })),
    },
    {
        type: 'select',
        field: ['facultyId'],
        title: 'Faculty',
        filterOption:'==',
        placeholder: 'Select Faculty',
        options: faculties.map(f => ({ value: f.id, label: f.faculty })),
    },
    {
        type: 'select',
        field: ['schoolId'],
        title: 'School',
        filterOption:'==',
        placeholder: 'Select School',
        options: schools.map(s => ({ value: s.id, label: s.name })),
    },
];

export const BeaconListController = withReactive( (
    { data, services, monitors, onEdit, onView, onCreate }
) => {
    const isLoading = monitors.getBeacons || monitors.getBeaconTypes || monitors.deleteBeacon || monitors.getSchools  || monitors.getDistricts;
    
    useOnResultReactor({
        deleteBeacon: {
            onSuccess: () => {
                services.beacons.getBeacons();
            },
        },
    });

    const filters = buildFilters(
       data.beaconTypes,
       isAvailable,
       data.schools,
       data.districts,
       data.faculties
    );

    const handleRefresh = () => {
        services.beacons.getBeacons();
        services.schools.getSchools();
        services.districts.getDistricts();
        services.faculties.getFaculties();
    };

    return (
    <div>
        <Filter collectionName = 'beacons' filters = { filters } >
            {({ filteredData }) =>
            (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                        <RefreshButton loading={isLoading} onClick={handleRefresh} style={{ margin: '0px 12px' }} />
                        <AddButton onClick={onCreate} />
                    </div>
                    <BeaconList 
                        beacons = { filteredData || [] } 
                        loading = { isLoading } 
                        schools = { data?.schools }
                        districts = { data?.districts }
                        faculties = { data?.faculties }
                        onDelete = { (id) => {
                            services.beacons.deleteBeacon( id );
                        }}
                        onEdit = { (id) => onEdit(id) }
                        onView = { (id) => onView(id) }
                    />
                </div>
            )}
        </Filter>
    </div>);
},
{
    init: ({ services }) => {
        services.beacons.getBeacons();
        services.beacons.getBeaconTypes();
        services.schools.getSchools();
        services.districts.getDistricts();
        services.faculties.getFaculties();
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
    monitors: () => ([ 'getBeacons', 'deleteBeacon', 'getBeaconTypes', 'getSchools', 'getDistricts', 'getFaculties' ]),
});