import { api } from '../api';
import { env } from '@/config/env';

const RealSchoolClient = {
  getSchools: () => api.get('/schools'),
  getSchoolsByDistrict: districtId => api.get(`/schools?where=districtId:equals:${districtId}`),
  createSchool: data => api.post('/schools', data),
  getSchoolById: id => api.get(`/schools/${id}`),
  updateSchool: data => api.put('/schools', data),
  deleteSchool: id => api.delete(`/schools/${id}`),
};


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const RandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const mockSchools = [
  {
    id: 70007,
    districtId: 11,
    monitoringStationId: null,
    name: "Mountainview Middle School",
    facultiesCount: 45,
    studentsCount: 620,
    messagesCount: 1240,
    addressCount: 1,
    soscallNumber: "7773332277",
    timeZone: 'America/New York',
    contactId: 60007,
    contact: {
      id: 60007,
      name: "Mark Reynolds",
      firstName: "Mark",
      lastName: "Reynolds",
      email: "m.reynolds@mountainview.edu",
      mobilePhone: "5125557510",
      phoneNumber: "+15550000000"
    },
    addresses: [
      {
        id: 20004,
        typeId: 4,
        type: "Main",
        street1: "4202 Summit Ridge Dr",
        street2: "",
        locality: "Austin",
        stateId: 2,
        state: "Texas",
        postalCode: "78701",
        postalCodeExt: "1234",
        countryName: "United States",
        countryCode: "US",
        latitude: "30.2672",
        longitude: "-97.7431"
      }
    ]
  },
  {
    id: 70008,
    districtId: 12,
    monitoringStationId: null,
    name: "Riverdale Elementary",
    facultiesCount: 32,
    studentsCount: 410,
    messagesCount: 850,
    addressCount: 1,
    soscallNumber: "7773331111",
    timeZone: 'America/Chicago',
    contactId: 60008,
    contact: {
      id: 60008,
      name: "Laura Gardner",
      firstName: "Laura",
      lastName: "Gardner",
      email: "l.gardner@riverdale.k12.org",
      mobilePhone: "2141112233",
      phoneNumber: "+15551111111"
    },
    addresses: [
      {
        id: 20005,
        typeId: 4,
        type: "Main",
        street1: "123 Main St",
        street2: "Suite 100",
        locality: "Dallas",
        stateId: 2,
        state: "Texas",
        postalCode: "75201",
        postalCodeExt: "5678",
        countryName: "United States",
        countryCode: "US",
        latitude: "32.7767",
        longitude: "-96.7970"
      }
    ]
  },
  {
    id: 70009,
    districtId: 13,
    monitoringStationId: null,
    name: "Sunrise High School",
    facultiesCount: 88,
    studentsCount: 1450,
    messagesCount: 3200,
    addressCount: 1,
    soscallNumber: "7773332222",
    timeZone: 'America/Denver',
    contactId: 60009,
    contact: {
      id: 60009,
      name: "Charles Logan",
      firstName: "Charles",
      lastName: "Logan",
      email: "c.logan@sunrisehigh.edu",
      mobilePhone: "4152223344",
      phoneNumber: "+15552222222"
    },
    addresses: [
      {
        id: 20006,
        typeId: 4,
        type: "Main",
        street1: "45 Oakwood Terrace",
        street2: "",
        locality: "Denver",
        stateId: 3,
        state: "Colorado",
        postalCode: "80202",
        postalCodeExt: "9012",
        countryName: "United States",
        countryCode: "US",
        latitude: "39.7392",
        longitude: "-104.9903"
      }
    ]
  },
  {
    id: 70010,
    districtId: 14,
    monitoringStationId: null,
    name: "Green Valley Academy",
    facultiesCount: 25,
    studentsCount: 300,
    messagesCount: 540,
    addressCount: 1,
    soscallNumber: "7773333333",
    timeZone: 'America/Los Angeles',
    contactId: 60010,
    contact: {
      id: 60010,
      name: "Anne Masterson",
      firstName: "Anne",
      lastName: "Masterson",
      email: "a.masterson@greenvalley.org",
      mobilePhone: "3123334455",
      phoneNumber: "+15553333333"
    },
    addresses: [
      {
        id: 20007,
        typeId: 4,
        type: "Main",
        street1: "890 Central Blvd",
        street2: "Bldg C",
        locality: "Los Angeles",
        stateId: 4,
        state: "California",
        postalCode: "90001",
        postalCodeExt: "3456",
        countryName: "United States",
        countryCode: "US",
        latitude: "34.0522",
        longitude: "-118.2437"
      }
    ]
  },
  {
    id: 70011,
    districtId: 16,
    monitoringStationId: null,
    name: "North Ridge School",
    facultiesCount: 40,
    studentsCount: 520,
    messagesCount: 980,
    addressCount: 1,
    soscallNumber: "7773334444",
    timeZone: 'America/Phoenix',
    contactId: 60011,
    contact: {
      id: 60011,
      name: "Peter Sanders",
      firstName: "Peter",
      lastName: "Sanders",
      email: "p.sanders@northridge.edu",
      mobilePhone: "6174445566",
      phoneNumber: "+15554444444"
    },
    addresses: [
      {
        id: 20008,
        typeId: 4,
        type: "Main",
        street1: "567 North St",
        street2: "",
        locality: "Phoenix",
        stateId: 5,
        state: "Arizona",
        postalCode: "85001",
        postalCodeExt: "7890",
        countryName: "United States",
        countryCode: "US",
        latitude: "33.4484",
        longitude: "-112.0740"
      }
    ]
  },
  {
    id: 70012,
    districtId: 18,
    monitoringStationId: null,
    name: "Lakeside Preparatory",
    facultiesCount: 55,
    studentsCount: 780,
    messagesCount: 1560,
    addressCount: 1,
    soscallNumber: "7773335555",
    timeZone: 'America/Chicago',
    contactId: 60012,
    contact: {
      id: 60012,
      name: "Sarah Ramsey",
      firstName: "Sarah",
      lastName: "Ramsey",
      email: "s.ramsey@lakesideprep.edu",
      mobilePhone: "2065556677",
      phoneNumber: "+15555555555"
    },
    addresses: [
      {
        id: 20009,
        typeId: 4,
        type: "Main",
        street1: "321 Blue Lake Ave",
        street2: "",
        locality: "Chicago",
        stateId: 6,
        state: "Illinois",
        postalCode: "60601",
        postalCodeExt: "1234",
        countryName: "United States",
        countryCode: "US",
        latitude: "41.8781",
        longitude: "-87.6298"
      }
    ]
  }
];

let nextId = 70013;

const MockSchoolClient = {
  getSchools: async () => {
    await sleep(RandomInt(200, 500));
    const dataWithCounts = mockSchools.map(school => ({
      ...school,
      addressCount: school.addresses ? school.addresses.length : 0
    }));

    return {
      data: dataWithCounts
    };
  },

  getSchoolsByDistrict: async districtId => {
    await sleep(RandomInt(200, 500));
    const schools = mockSchools.filter(s => s.districtId == districtId);
    const dataWithCounts = schools.map(school => ({
      ...school,
      addressCount: school.addresses ? school.addresses.length : 0
    }));

    return {
      data: dataWithCounts
    };
  },

  createSchool: async data => {
    await sleep(RandomInt(300, 600));
    const newSchool = {
      ...data,
      id: nextId++,
      addressCount: data.addresses ? data.addresses.length : 0,
      contact: {
        ...data.contact,
        name: `${data.contact.firstName} ${data.contact.lastName}`
      }
    };

    mockSchools.push(newSchool);

    return {
      data: newSchool
    };
  },

  getSchoolById: async id => {
    await sleep(RandomInt(200, 500));
    const school = mockSchools.find(s => s.id == id);
    const result = school ? {
      ...school,
      addressCount: school.addresses ? school.addresses.length : 0
    } : null;

    return {
      data: result
    };
  },

  updateSchool: async (data) => {
    await sleep(RandomInt(300, 600));
    const index = mockSchools.findIndex(s => s.id == data.id);

    if (index !== -1) {
      const updatedSchool = {
        ...mockSchools[index],
        ...data,
        contact: {
          ...mockSchools[index].contact,
          ...data.contact
        }
      };

      updatedSchool.addressCount = updatedSchool.addresses ? updatedSchool.addresses.length : 0;

      if (updatedSchool.contact) {
        const { firstName, lastName } = updatedSchool.contact;
        updatedSchool.contact.name = `${firstName} ${lastName}`;
      }

      mockSchools[index] = updatedSchool;
    }

    return {
      data: mockSchools[index]
    };
  },

  deleteSchool: async id => {
    await sleep(RandomInt(200, 400));
    const index = mockSchools.findIndex(s => s.id == id);

    if (index !== -1) {
      mockSchools.splice(index, 1);
    }

    return {
      data: { success: true }
    };
  }
};

export const SchoolClient = {
  getSchools: () =>
    env.useMock ? MockSchoolClient.getSchools() : RealSchoolClient.getSchools(),
  getSchoolsByDistrict: districtId =>
    env.useMock ? MockSchoolClient.getSchoolsByDistrict(districtId) : RealSchoolClient.getSchoolsByDistrict(districtId),
  createSchool: data =>
    env.useMock ? MockSchoolClient.createSchool(data) : RealSchoolClient.createSchool(data),
  getSchoolById: id =>
    env.useMock ? MockSchoolClient.getSchoolById(id) : RealSchoolClient.getSchoolById(id),
  updateSchool: data =>
    env.useMock ? MockSchoolClient.updateSchool(data) : RealSchoolClient.updateSchool(data),
  deleteSchool: id =>
    env.useMock ? MockSchoolClient.deleteSchool(id) : RealSchoolClient.deleteSchool(id),
};