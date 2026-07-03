import { withReactive } from '@/reactive';
import { AddButton, RefreshButton } from '@/features/shared/components/buttons';
import { Filter } from '@/features/shared/components/filters';
import { DistrictList } from './components';

const buildFilters = (timeZones = []) => [
  {
    type: 'input',
    field: ['name'],
    title: 'District name',
    placeholder: 'Search by name...',
  },
  {
    type: 'select',
    field: ['timeZone'],
    title: 'Time zone',
    placeholder: 'Select time zone',
    options: timeZones.map(tz => ({ value: tz.value, label: tz.label })),
    filterOption: '==',
  },
];

export const DistrictsListController = withReactive(
  ({ data, services, monitors, onView, onCreate, onEdit }) => {
    const filters = buildFilters(data.timeZones);
    const isLoading = monitors.getDistricts || monitors.deleteDistrict;
    return (
      <Filter collectionName="districts" filters={filters}>
        {({ filteredData }) => (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginBottom: 16 }}>
              <RefreshButton
                loading={isLoading}
                onClick={() => services.districts.getDistricts()}
              />
              <AddButton onClick={onCreate} />
            </div>
            <DistrictList
              districts={filteredData || []}
              loading={isLoading}
              onView={onView}
              onEdit={onEdit}
              onDelete={id => services.districts.deleteDistrict(id)}
            />
          </>
        )}
      </Filter>
    );
  },
  {
    init: ({ services }) => {
      services.districts.getDistricts();
      services.timeZones.getTimeZones();
    },
    queries: () => [
      {
        name: 'timeZones',
        collection: 'timeZones',
        defaultValue: [],
      },
    ],
    monitors: () => ['getDistricts', 'deleteDistrict'],
  },
);
