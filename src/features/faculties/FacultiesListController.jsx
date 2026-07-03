import { withReactive } from '@/reactive';
import { FacultiesList } from './components';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '@/features/routing';
import { AddButton, RefreshButton } from '@/features/shared/components/buttons';
import { Filter } from '@/features/shared/components/filters';

const buildFilters = (schools = [], districts = [], facultyRoleTypes = []) => [
  { type: 'input', field: ['faculty'], title: 'Faculty', placeholder: 'Search by faculty...' },
  {
    type: 'select',
    field: ['organization'],
    title: 'School',
    placeholder: 'Select School',
    filterOption: '==',
    options: schools.map(s => ({ value: s.id, label: s.name })),
  },
  {
    type: 'select',
    field: ['districtId'],
    title: 'District',
    placeholder: 'Select District',
    filterOption: '==',
    options: districts.map(d => ({ value: d.id, label: d.name })),
  },
  {
    type: 'select',
    field: ['roles'],
    title: 'Role',
    placeholder: 'Select Role',
    filterOption: '==',
    options: facultyRoleTypes.map(r => ({ value: r.id, label: r.facultyRoleType }))
  },
];

export const FacultiesListController = withReactive(
  ({ data, services, monitors, onView, onCreate, onEdit }) => {
    const isLoading =
      monitors.getFaculties ||
      monitors.deleteFaculty ||
      monitors.getSchools ||
      monitors.getDistricts ||
      monitors.getFacultyRoleTypes;
    const navigate = useNavigate();
    const filters = buildFilters(data.schools, data.districts, data.facultyRoleTypes);

    return (
      <Filter collectionName="faculties" filters={filters}>
        {({ filteredData }) => (
          <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBottom: 16 }}>
              <RefreshButton
                onClick={() => {
                  services.faculties?.getFaculties();
                  services.schools?.getSchools();
                  services.districts?.getDistricts();
                  services.beacons?.getBeacons();
                  services.faculties?.getFacultyRoleTypes();
                }}
                isLoading={monitors.getFaculties || monitors.getSchools || monitors.getDistricts || monitors.getBeacons || monitors.getFacultyRoleTypes}
              />
              <AddButton onClick={onCreate} />
            </div>
            <FacultiesList
              data={(filteredData || []).map(d => {
                const roleObj = data.facultyRoleTypes?.find(r => r.id === d.roles);
                const derivedRoleName = roleObj ? roleObj.facultyRoleType : 'Unknown Role';
                const school = data.schools?.find(s => s.id === d.organization);
                const district = data.districts?.find(dist => dist.id === d.districtId);
                const derivedOrgName = school
                  ? school.name
                  : district
                    ? district.name
                    : d.organizationName || 'Unknown Organization';

                return {
                  ...d,
                  assignedBeacon: d.assignedBeacon,
                  organizationName: derivedOrgName,
                  roleName: derivedRoleName,
                };
              })}
              loading={isLoading}
              onDelete={id => services.faculties.deleteFaculty(id)}
              onEdit={onEdit}
              onView={onView}
              onCreate={onCreate}
            />
          </>
        )}
      </Filter>
    );
  },
  {
    init: ({ services }) => {
      services.faculties?.getFaculties();
      services.schools?.getSchools();
      services.districts?.getDistricts();
      services.beacons?.getBeacons();
      services.faculties?.getFacultyRoleTypes();
    },
    queries: () => [
      {
        collection: 'faculties',
        name: 'faculties',
        defaultValue: [],
      },
      {
        collection: 'schools',
        name: 'schools',
        defaultValue: [],
      },
      {
        collection: 'districts',
        name: 'districts',
        defaultValue: [],
      },
      {
        collection: 'beacons',
        name: 'beacons',
        defaultValue: [],
      },
      {
        collection: 'facultyRoleTypes',
        name: 'facultyRoleTypes',
        defaultValue: [],
      },
    ],
    monitors: () => ['getFaculties', 'deleteFaculty', 'getSchools', 'getDistricts', 'getBeacons', 'getFacultyRoleTypes'],
  },
);
