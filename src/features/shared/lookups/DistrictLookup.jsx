import { useCallback } from 'react';
import { withReactive } from '@/reactive';
import { Dropdown } from '@/features/shared/components/inputs/Dropdown';

const DistrictOption = ({ district }) => (
  <div style={{ display: 'flex', flexDirection: 'column', padding: '4px 0' }}>
    <span style={{ fontWeight: 500, fontSize: '14px' }}>{district.name}</span>
    <span style={{ fontSize: '12px', color: '#8c8c8c' }}>
      {district.timeZone && `TZ: ${district.timeZone}`}
      {district.contactName && ` | Contact: ${district.contactName}`}
    </span>
  </div>
);

export const DistrictLookup = withReactive(
  ({
    data,
    monitors,
    name = 'districtId',
    labelText = 'District',
    placeholder = 'Select a district...',
    ...rest
  }) => {
    const districts = data?.districts || [];

    const options = districts.map(d => ({
      label: d.name,
      value: d.id,
      name: d.name,
      id: d.id,
      timeZone: d.timeZone,
      contactName: d.contactName,
      district: d,
    }));

    const optionRender = useCallback(
      option => <DistrictOption district={option.data.district} />,
      [],
    );

    return (
      <Dropdown
        name={name}
        labelText={labelText}
        placeholder={placeholder}
        options={options}
        isAutocomplete={true}
        loading={monitors.getDistricts}
        showSearch={{
          optionFilterProp: ['name', 'timeZone', 'contactName'],
        }}
        optionRender={optionRender}
        allowClear={true}
        {...rest}
      />
    );
  },
  {
    init: ({ services }) => {
      services.districts.getDistricts();
    },
    queries: () => [
      {
        name: 'districts',
        collection: 'districts',
        defaultValue: [],
      },
    ],
    monitors: () => ['getDistricts'],
  },
);

export default DistrictLookup;
