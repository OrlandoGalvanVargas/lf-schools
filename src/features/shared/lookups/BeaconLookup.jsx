import { Select } from 'antd';
import { withReactive } from "@/reactive";

export const BeaconLookup = withReactive((
    { monitors, data, name = 'beaconId',  placeholder = "Select an Beacon...", ...rest }
) => {

    const isLoading = monitors.getBeacons;

    return (
         <Select
            name = { name }
            placeholder = { placeholder }
            showSearch
            optionFilterProp = 'label'
            loading = { isLoading }
            options = { 
                data?.beacons?.map( beacon => 
                    ({
                        value: beacon.id,
                        label: beacon.deviceName
                    })
                )
            }
            { ...rest }
        />
    );
},
{
    init: ({ services }) => {
        services.beacons.getBeacons();
    },
    queries: () =>[
        {
            collection: 'beacons',
            name:'beacons',
            defaultValue: [],
        },
    ],
    monitors: () => (['getBeacons'])
});