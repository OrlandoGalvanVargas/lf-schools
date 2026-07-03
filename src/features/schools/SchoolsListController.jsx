import { withReactive } from "@/reactive";
import { Filter } from "@/features/shared/components/filters";
import { AddButton, RefreshButton } from '@/features/shared/components/buttons';
import { SchoolsList } from "./components/SchoolsList";


const buildFilters = (timeZones = []) => [
    {
        type: 'input',
        title: 'Name',
        placeholder: 'Search by name...',
        field: ['name'],
    },
    {
        type: 'select',
        title: 'Time zone',
        placeholder: 'Select time zone...',
        field: ['timeZone'],
        filterOption: '==',
        options: timeZones.map(tz => ({ label: tz.label, value: tz.label }))
    },
];

export const SchoolsListController = withReactive(
    ({ data, services, monitors, onSettings, onCreate, onDetails }) => {

        const { timeZones } = data
        const filters = buildFilters(timeZones);
        const isLoading = monitors.getSchools || monitors.getTimeZones

        return (
            <Filter
                collectionName="schools"
                filters={filters}
            >
                {({ filteredData }) => (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                            <RefreshButton
                                loading={isLoading}
                                onClick={() => services.schools.getSchools()}
                                style={{ margin: '0px 12px' }}
                            >
                                {!isLoading && 'Update Data'}
                            </RefreshButton>
                            <AddButton onClick={onCreate}>Add</AddButton>
                        </div>
                        <SchoolsList
                            dataSource={filteredData || []}
                            timeZones={timeZones}
                            loading={isLoading}
                            onSettings={onSettings}
                            onViewDetails={onDetails}
                            onDelete={id => services.schools.deleteSchool(id)}
                        />
                    </>
                )}


            </Filter>
        );
    },
    {
        init: ({ services }) => {
            services.schools.getSchools()
            services.timeZones.getTimeZones()
        },
        queries: () => [
            {
                name: 'timeZones',
                collection: 'timeZones',
                defaultValue: []
            },
        ],
        monitors: () => ["getSchools", "getTimeZones"]
    }
);

