import { useCallback } from "react";
import { withReactive } from "@/reactive";
import { Dropdown } from "@/features/shared/components/inputs/Dropdown";

const FacultyOption = ({ data }) => (
  <div style={{ display: 'flex', flexDirection: 'column', padding: '4px 0' }}>
    <span style={{ fontWeight: 500, fontSize: '14px' }}>{data.faculty}</span>
    { (data.organizationName || data.roleName) && (
      <span style={{ fontSize: '12px', color: '#8c8c8c' }}>
        {[data.organizationName, data.roleName].filter(Boolean).join(' | ')}
      </span>
    )}
  </div>
);

export const FacultiesLookup = withReactive(
  ({ data, monitors, name = "FacultyId", labelText = "Faculty", placeholder = "Select a faculty...", ...rest }) => {
    const faculties = data?.faculties || [];

    const options = faculties.map(faculty => ({
      label: faculty.faculty,
      value: faculty.id,
      name: faculty.faculty,
      id: faculty.id,
      organizationName: faculty.organizationName,
      roleName: faculty.roleName,
      facultyData: faculty
    }));

    const optionRender = useCallback((option) => (
      <FacultyOption data={option.data.facultyData} />
    ), []);

    return (
      <Dropdown
        name={name}
        labelText={labelText}
        placeholder={placeholder}
        options={options}
        isAutocomplete={true}
        loading={monitors.getFaculties}
        showSearch={{
          optionFilterProp: ['name', 'organizationName', 'roleName']
        }}
        optionRender={optionRender}
        allowClear={true}
        {...rest}
      />
    );
  },
  {
    init: ({ services }) => {
      services.faculties.getFaculties();
    },
    queries: () => [
      {
        name: "faculties",
        collection: "faculties",
        defaultValue: [],
      }
    ],
    monitors: () => ["getFaculties"]
  }
);

export default FacultiesLookup;
