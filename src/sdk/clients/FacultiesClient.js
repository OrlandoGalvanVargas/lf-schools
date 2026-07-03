import { api } from '@/sdk';
import { env } from '@/config/env';

const BASE_URL_FACULTIES = '/faculties';

const facultiesClient = {
  getFacultyRoleTypes: async () => {
    const response = await api.get('/faculty-role-types');
    return { data: response.data };
  },
  getFaculties: async () => {
    const response = await api.get(BASE_URL_FACULTIES);
    const enriched = response.data.map(d => enrichApiToUi(d));
    return { data: enriched };
  },
  getFacultyById: async id => {
    const response = await api.get(`${BASE_URL_FACULTIES}/${id}`);
    return { data: enrichApiToUi(response.data) };
  },
  getBySchoolId: async schoolId => {
    const response = await api.get(`${BASE_URL_FACULTIES}/school/${schoolId}`);
    const enriched = response.data.map(d => enrichApiToUi(d));
    return { data: enriched };
  },
  getByDistrictId: async districtId => {
    const response = await api.get(`${BASE_URL_FACULTIES}/district/${districtId}`);
    const enriched = response.data.map(d => enrichApiToUi(d));
    return { data: enriched };
  },
  createFaculty: async data => {
    const payload = enrichUiToApi(data);
    const response = await api.post(BASE_URL_FACULTIES, payload);
    return { data: enrichApiToUi(response.data) };
  },
  updateFaculty: async (id, data) => {
    const payload = enrichUiToApi(data);
    const response = await api.put(`${BASE_URL_FACULTIES}/${id}`, payload);
    return { data: enrichApiToUi(response.data) };
  },
  deleteFaculty: async id => {
    const response = await api.delete(`${BASE_URL_FACULTIES}/${id}`);
    return { data: response.data };
  },
};

/* ============================================================
   MOCK
============================================================ */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function RandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Datos "crudos", como si vinieran directo del backend (antes de enrichApiToUi)
const mockFacultiesRaw = [
  {
    id: 1,
    accountId: 1,
    schoolId: 70007,
    districtId: null,
    firstName: 'Alan',
    lastName: 'Turner',
    name: 'Alan Turner',
    email: 'alan.turner@example.com',
    mobilePhone: '+52 1 55 9000 0001',
    phoneNumber: '+52 55 6000 0001',
    facultyRoleTypeId: 1,
    roleName: 'Principal',
    contactId: 101,
    isSMSNotificationsEnabled: true,
    isVoiceNotificationsEnabled: false,
    isEmailNotificationsEnabled: true,
    assignedBeacons: [1, 2],
    assignedBeaconNames: ['Main Entrance', 'Gymnasium'],
  },
  {
    id: 2,
    accountId: 1,
    schoolId: 70008,
    districtId: null,
    firstName: 'Grace',
    lastName: 'Kim',
    name: 'Grace Kim',
    email: 'grace.kim@example.com',
    mobilePhone: '+52 1 55 9000 0002',
    phoneNumber: '+52 55 6000 0002',
    facultyRoleTypeId: 2,
    roleName: 'Teacher',
    contactId: 102,
    isSMSNotificationsEnabled: false,
    isVoiceNotificationsEnabled: true,
    isEmailNotificationsEnabled: true,
    assignedBeacons: [],
    assignedBeaconNames: [],
  },
  {
    id: 3,
    accountId: 1,
    schoolId: null,
    districtId: 9001,
    firstName: 'Marcus',
    lastName: 'Diaz',
    name: 'Marcus Diaz',
    email: 'marcus.diaz@example.com',
    mobilePhone: '+52 1 55 9000 0003',
    phoneNumber: '+52 55 6000 0003',
    facultyRoleTypeId: 3,
    roleName: 'District Administrator',
    contactId: 103,
    isSMSNotificationsEnabled: true,
    isVoiceNotificationsEnabled: true,
    isEmailNotificationsEnabled: false,
    assignedBeacons: [3],
    assignedBeaconNames: ['District Office'],
  },
];

const mockFacultyRoleTypes = [
  { id: 1, facultyRoleType: 'Principal' },
  { id: 2, facultyRoleType: 'Teacher' },
  { id: 3, facultyRoleType: 'District Administrator' },
  { id: 4, facultyRoleType: 'Counselor' },
  { id: 5, facultyRoleType: 'Nurse' },
];

let lastFacultyId = mockFacultiesRaw.length;
let lastContactId = 103;

const mockFacultiesClient = {
  getFacultyRoleTypes: async () => {
    await sleep(RandomInt(300, 1000));
    return { data: mockFacultyRoleTypes };
  },

  getFaculties: async () => {
    await sleep(RandomInt(1000, 5000));
    return { data: mockFacultiesRaw.map(d => enrichApiToUi(d)) };
  },

  getFacultyById: async id => {
    await sleep(RandomInt(500, 2000));
    const found = mockFacultiesRaw.find(f => f.id === Number.parseInt(id));
    return { data: found ? enrichApiToUi(found) : null };
  },

  getBySchoolId: async schoolId => {
    await sleep(RandomInt(500, 2000));
    const filtered = mockFacultiesRaw.filter(f => f.schoolId === Number.parseInt(schoolId));
    return { data: filtered.map(d => enrichApiToUi(d)) };
  },

  getByDistrictId: async districtId => {
    await sleep(RandomInt(500, 2000));
    const filtered = mockFacultiesRaw.filter(f => f.districtId === Number.parseInt(districtId));
    return { data: filtered.map(d => enrichApiToUi(d)) };
  },

  createFaculty: async data => {
    await sleep(RandomInt(1000, 3000));
    const payload = enrichUiToApi(data);

    lastFacultyId += 1;
    lastContactId += 1;

    const roleObj = mockFacultyRoleTypes.find(r => r.id === payload.facultyRoleTypeId);

    const newRaw = {
      ...payload,
      id: lastFacultyId,
      contactId: lastContactId,
      name: `${payload.firstName || ''} ${payload.lastName || ''}`.trim(),
      roleName: roleObj ? roleObj.facultyRoleType : null,
      assignedBeaconNames: [], // sin catálogo de beacons real en el mock
    };

    mockFacultiesRaw.push(newRaw);
    return { data: enrichApiToUi(newRaw) };
  },

  updateFaculty: async (id, data) => {
    await sleep(RandomInt(1000, 3000));
    const payload = enrichUiToApi(data);
    const index = mockFacultiesRaw.findIndex(f => f.id === Number.parseInt(id));

    if (index === -1) {
      return { data: null };
    }

    const roleObj = mockFacultyRoleTypes.find(r => r.id === payload.facultyRoleTypeId);

    const updatedRaw = {
      ...mockFacultiesRaw[index],
      ...payload,
      id: mockFacultiesRaw[index].id,
      name: `${payload.firstName || ''} ${payload.lastName || ''}`.trim(),
      roleName: roleObj ? roleObj.facultyRoleType : mockFacultiesRaw[index].roleName,
    };

    mockFacultiesRaw[index] = updatedRaw;
    return { data: enrichApiToUi(updatedRaw) };
  },

  deleteFaculty: async id => {
    await sleep(RandomInt(500, 2000));
    const index = mockFacultiesRaw.findIndex(f => f.id === Number.parseInt(id));
    if (index !== -1) {
      mockFacultiesRaw.splice(index, 1);
    }
    return { data: id };
  },
};

/* ============================================================
   ENRICH (sin cambios respecto a tu versión original)
============================================================ */
const enrichApiToUi = apiData => {
  return {
    id: apiData.id,
    faculty: apiData.name || `${apiData.firstName || ''} ${apiData.lastName || ''}`.trim(),
    firstName: apiData.firstName,
    lastName: apiData.lastName,
    organization: apiData.schoolId || null,
    districtId: apiData.districtId || null,
    roles: apiData.facultyRoleTypeId || null,
    roleName: apiData.roleName || null,
    notifications: {
      sms: apiData.isSMSNotificationsEnabled || false,
      voice: apiData.isVoiceNotificationsEnabled || false,
      email: apiData.isEmailNotificationsEnabled || false,
    },
    contactId: apiData.contactId || null,
    assignedBeaconsArr: apiData.assignedBeacons || [],
    assignedBeacon:
      apiData.assignedBeaconNames?.length > 0 ? apiData.assignedBeaconNames.join(', ') : 'None',
    ...apiData,
  };
};

const enrichUiToApi = uiData => {
  return {
    id: uiData.id || 0,
    accountId: 1,
    schoolId: uiData.organization || null,
    districtId: uiData.districtId || null,
    firstName: uiData.firstName,
    lastName: uiData.lastName,
    email: uiData.email,
    mobilePhone: uiData.mobilePhone,
    phoneNumber: uiData.phoneNumber,
    facultyRoleTypeId: uiData.roles,
    contactId: uiData.contactId || null,
    isEmailNotificationsEnabled: !!uiData.notifications?.email,
    isSMSNotificationsEnabled: !!uiData.notifications?.sms,
    isVoiceNotificationsEnabled: !!uiData.notifications?.voice,
    assignedBeacons: Array.isArray(uiData.selectedBeacons)
      ? uiData.selectedBeacons.map(b => b.id)
      : [],
  };
};

/* ============================================================
   EXPORT (switch real / mock, igual que StudentsClient)
============================================================ */
export const FacultiesClient = {
  getFacultyRoleTypes: () =>
    !env.useMock
      ? mockFacultiesClient.getFacultyRoleTypes()
      : facultiesClient.getFacultyRoleTypes(),
  getFaculties: () =>
    !env.useMock ? mockFacultiesClient.getFaculties() : facultiesClient.getFaculties(),
  getFacultyById: id =>
    !env.useMock ? mockFacultiesClient.getFacultyById(id) : facultiesClient.getFacultyById(id),
  getBySchoolId: schoolId =>
    !env.useMock
      ? mockFacultiesClient.getBySchoolId(schoolId)
      : facultiesClient.getBySchoolId(schoolId),
  getByDistrictId: districtId =>
    !env.useMock
      ? mockFacultiesClient.getByDistrictId(districtId)
      : facultiesClient.getByDistrictId(districtId),
  createFaculty: data =>
    !env.useMock ? mockFacultiesClient.createFaculty(data) : facultiesClient.createFaculty(data),
  updateFaculty: (id, data) =>
    !env.useMock
      ? mockFacultiesClient.updateFaculty(id, data)
      : facultiesClient.updateFaculty(id, data),
  deleteFaculty: id =>
    !env.useMock ? mockFacultiesClient.deleteFaculty(id) : facultiesClient.deleteFaculty(id),
};
