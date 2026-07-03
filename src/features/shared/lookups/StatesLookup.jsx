import { withReactive } from '@/reactive';
import { Dropdown } from '@/features/shared/components/inputs/Dropdown';

export const StatesLookup = withReactive(
  ({
    data,
    monitors,
    name = 'stateId',
    labelText = 'State',
    placeholder = 'Select a state...',
    ...rest
  }) => {
    const states = data?.states || [];

    const options = states.map(state => ({
      label: state.name,
      value: state.id,
    }));

    return (
      <Dropdown
        name={name}
        labelText={labelText}
        placeholder={placeholder}
        options={options}
        loading={monitors.getStates}
        allowClear={true}
        {...rest}
      />
    );
  },
  {
    init: ({ services }) => {
      services.addresses.getStates();
    },
    queries: () => [
      {
        name: 'states',
        collection: 'states',
        defaultValue: [],
      },
    ],
    monitors: () => ['getStates'],
  },
);
