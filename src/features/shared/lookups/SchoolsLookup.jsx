import { useCallback } from "react";
import { withReactive } from "@/reactive";
import { Dropdown } from "@/features/shared/components/inputs/Dropdown";

const SchoolOption = ({ school }) => (
  <div style={{ display: 'flex', flexDirection: 'column', padding: '4px 0' }}>
    <span style={{ fontWeight: 500, fontSize: '14px' }}>{school.name}</span>
    <span style={{ fontSize: '12px', color: '#8c8c8c' }}>
      {school.soscallNumber && `SOS: ${school.soscallNumber}`} | {school.contact?.name && `Contact: ${school.contact.name}`}
    </span>
  </div>
);

export const SchoolsLookup = withReactive(
  ({ data, monitors, name = "SchoolId", labelText = "School", placeholder = "Select a school...", ...rest }) => {
    const schools = data?.schools || [];

    const options = schools.map(school => ({
      label: school.name,
      value: school.id,
      name: school.name,
      id: school.id,
      soscallNumber: school.soscallNumber,
      contactName: school.contact?.name,
      school
    }));

    const optionRender = useCallback((option) => (
      <SchoolOption school={option.data.school} />
    ), []);

    return (
      <Dropdown
        name={name}
        labelText={labelText}
        placeholder={placeholder}
        options={options}
        isAutocomplete={true}
        loading={monitors.getSchools}
        showSearch={{
          optionFilterProp: ['name', 'soscallNumber', 'contactName']
        }}
        optionRender={optionRender}
        allowClear={true}
        {...rest}
      />
    );
  },
  {
    init: ({ services }) => {
      services.schools.getSchools();
    },
    queries: () => [
      {
        name: "schools",
        collection: "schools",
        defaultValue: [],
      }
    ],
    monitors: () => ["getSchools"]
  }
);

export default SchoolsLookup;
