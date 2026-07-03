import { withReactive } from '@/reactive';
import { Dropdown } from '@/features/shared/components/inputs/Dropdown';

export const TimeZoneLookup = withReactive(
  ({
    data,
    monitors,
    name = 'timeZone',
    labelText = 'Time zone',
    placeholder = 'Select a time zone...',
    ...rest
  }) => {
    const timeZones = data?.timeZones || [];

    const options = timeZones.map(tz => ({
      label: tz.label,
      value: tz.value,
    }));

    return (
      <Dropdown
        name={name}
        labelText={labelText}
        placeholder={placeholder}
        options={options}
        loading={monitors.getTimeZones}
        allowClear={true}
        {...rest}
      />
    );
  },
  {
    init: ({ services }) => {
      services.timeZones.getTimeZones();
    },
    queries: () => [
      {
        name: 'timeZones',
        collection: 'timeZones',
        defaultValue: [],
      },
    ],
    monitors: () => ['getTimeZones'],
  },
);
