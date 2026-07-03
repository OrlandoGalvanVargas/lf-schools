import { withReactive } from '@/reactive';
import { Dropdown } from '@/features/shared/components/inputs/Dropdown';

export const AddressTypesLookup = withReactive(
  ({
    data,
    monitors,
    name = 'typeId',
    labelText = 'Address Type',
    placeholder = 'Select an address type...',
    ...rest
  }) => {
    const addressTypes = data?.addressTypes || [];

    const options = addressTypes.map(type => ({
      label: type.name || type.description,
      value: type.id,
    }));

    return (
      <Dropdown
        name={name}
        labelText={labelText}
        placeholder={placeholder}
        options={options}
        loading={monitors.getAddressTypes}
        allowClear={true}
        {...rest}
      />
    );
  },
  {
    init: ({ services }) => {
      services.addresses.getAddressTypes();
    },
    queries: () => [
      {
        name: 'addressTypes',
        collection: 'addressTypes',
        defaultValue: [],
      },
    ],
    monitors: () => ['getAddressTypes'],
  },
);
