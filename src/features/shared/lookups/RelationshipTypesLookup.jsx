import { withReactive } from '@/reactive';
import { Dropdown } from '@/features/shared/components/inputs/Dropdown';

export const RelationShipTypesLookup = withReactive(
  ({
    data,
    monitors,
    name = 'RelationshipTypeId',
    labelText = 'Relationship types',
    placeholder = 'Select a relationship type...',
    ...rest
  }) => {
    const relationshipTypeList = data?.relationshipTypes || [];

    const options = relationshipTypeList.map(r => ({
      label: r.relationship.replace(/\b\w/g, c => c.toUpperCase()),
      value: r.id,
      r,
    }));

    return (
      <Dropdown
        name={name}
        labelText={labelText}
        placeholder={placeholder}
        options={options}
        isAutocomplete={true}
        loading={monitors.getRelationshipTypes}
        showSearch={{
          optionFilterProp: ['label'],
        }}
        allowClear={true}
        {...rest}
      />
    );
  },
  {
    init: ({ services }) => {
      services.relationshipTypes.getRelationshipTypes();
    },
    queries: () => [
      {
        collection: 'relationshipTypes',
        name: 'relationshipTypes',
        defaultValue: [],
      },
    ],
    monitors: () => ['getRelationshipTypes'],
  },
);
