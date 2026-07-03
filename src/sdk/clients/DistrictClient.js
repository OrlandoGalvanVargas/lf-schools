import { api } from '@/sdk';
import { env } from '@/config/env';

const endpoint = '/districts';

const randomCount = () => Math.floor(Math.random() * 10) + 1;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const RandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const mockDistricts = [
  {
    id: 11,
    name: 'Northside Unified School District',
    timeZone: 'America/Chicago',
    contactId: 1,
    contact: {
      id: 1,
      name: 'James Anderson',
      firstName: 'James',
      lastName: 'Anderson',
      email: 'james.anderson@northside.edu',
      phoneNumber: '+13125550101',
      mobilePhone: '+13125550102',
    },
    devices: 4,
    schools: 6,
    faculties: 2,
    addresses: [
      {
        id: 1,
        typeId: 1,
        stateId: 1,
        state: 'Alabama',
        type: 'Mailing',
        street1: '1200 N Michigan Ave',
        street2: null,
        locality: 'Chicago',
        postalCode: '60601',
        postalCodeExt: '0032',
        countryName: 'United States',
        countryCode: 'US',
        latitude: 41.9,
        longitude: -87.62,
      },
    ],
  },
  {
    id: 12,
    name: 'Westlake Community Schools',
    timeZone: 'America/Los Angeles',
    contactId: 2,
    contact: {
      id: 2,
      name: 'Maria Gonzalez',
      firstName: 'Maria',
      lastName: 'Gonzalez',
      email: 'maria.gonzalez@westlake.edu',
      phoneNumber: '+12135550201',
      mobilePhone: '+12135550202',
    },
    devices: 3,
    schools: 4,
    faculties: 2,
    addresses: [],
  },
  {
    id: 13,
    name: 'Eastview Independent District',
    timeZone: 'America/New York',
    contactId: 3,
    contact: {
      id: 3,
      name: 'Robert Kim',
      firstName: 'Robert',
      lastName: 'Kim',
      email: 'robert.kim@eastview.edu',
      phoneNumber: '+12125550301',
      mobilePhone: '+12125550302',
    },
    devices: 2,
    schools: 3,
    faculties: 2,
    addresses: [
      {
        id: 2,
        typeId: 2,
        stateId: 2,
        state: 'California',
        type: 'Billing',
        street1: '500 5th Ave',
        street2: 'Suite 300',
        locality: 'New York',
        postalCode: '10110',
        postalCodeExt: '3420',
        countryName: 'United States',
        countryCode: 'US',
        latitude: 40.75,
        longitude: -73.98,
      },
    ],
  },
  {
    id: 14,
    name: 'Desert Ridge School District',
    timeZone: 'America/Phoenix',
    contactId: 4,
    contact: {
      id: 4,
      name: 'Jennifer Martinez',
      firstName: 'Jennifer',
      lastName: 'Martinez',
      email: 'j.martinez@desertridge.org',
      phoneNumber: '+16025550401',
      mobilePhone: '+16025550402',
    },
    devices: 0,
    schools: 2,
    faculties: 0,
    addresses: [
      {
        id: 3,
        typeId: 4,
        stateId: 5,
        state: 'Arizona',
        type: 'Main',
        street1: '4500 E Main St',
        street2: null,
        locality: 'Scottsdale',
        postalCode: '85251',
        postalCodeExt: '1234',
        countryName: 'United States',
        countryCode: 'US',
        latitude: 33.49,
        longitude: -111.98,
      },
    ],
  },
  {
    id: 15,
    name: 'Coastal Unified School District',
    timeZone: 'America/Los Angeles',
    contactId: 5,
    contact: {
      id: 5,
      name: "Michael O'Brien",
      firstName: 'Michael',
      lastName: "O'Brien",
      email: 'mobrien@coastalunified.edu',
      phoneNumber: '+19495550501',
      mobilePhone: '+19495550502',
    },
    devices: 5,
    schools: 0,
    faculties: 3,
    addresses: [
      {
        id: 4,
        typeId: 2,
        stateId: 2,
        state: 'California',
        type: 'Shipping',
        street1: '3201 Pacific Coast Hwy',
        street2: 'Suite 200',
        locality: 'Santa Monica',
        postalCode: '90405',
        postalCodeExt: '5432',
        countryName: 'United States',
        countryCode: 'US',
        latitude: 34.01,
        longitude: -118.49,
      },
    ],
  },
  {
    id: 16,
    name: 'Hill Country Independent School District',
    timeZone: 'America/Chicago',
    contactId: 6,
    contact: {
      id: 6,
      name: 'William Taylor',
      firstName: 'William',
      lastName: 'Taylor',
      email: 'wtaylor@hillcountryisd.net',
      phoneNumber: '+15125550601',
      mobilePhone: '+15125550602',
    },
    devices: 1,
    schools: 5,
    faculties: 1,
    addresses: [
      {
        id: 5,
        typeId: 1,
        stateId: 3,
        state: 'Texas',
        type: 'Billing',
        street1: '890 Ranch Road 12',
        street2: 'PO Box 456',
        locality: 'Dripping Springs',
        postalCode: '78620',
        postalCodeExt: '1111',
        countryName: 'United States',
        countryCode: 'US',
        latitude: 30.19,
        longitude: -98.09,
      },
      {
        id: 6,
        typeId: 3,
        stateId: 3,
        state: 'Texas',
        type: 'Mailing',
        street1: '890 Ranch Road 12',
        street2: 'PO Box 456',
        locality: 'Dripping Springs',
        postalCode: '78620',
        postalCodeExt: '1111',
        countryName: 'United States',
        countryCode: 'US',
        latitude: 30.19,
        longitude: -98.09,
      },
    ],
  },
  {
    id: 17,
    name: 'Sunshine Coast Schools',
    timeZone: 'America/New York',
    contactId: 7,
    contact: {
      id: 7,
      name: 'Elizabeth Garcia',
      firstName: 'Elizabeth',
      lastName: 'Garcia',
      email: 'egarcia@sunshinecoastschools.org',
      phoneNumber: '+13055550701',
      mobilePhone: '+13055550702',
    },
    devices: 2,
    schools: 3,
    faculties: 2,
    addresses: [
      {
        id: 7,
        typeId: 2,
        stateId: 4,
        state: 'Florida',
        type: 'Shipping',
        street1: '2301 Atlantic Blvd',
        street2: null,
        locality: 'Miami Beach',
        postalCode: '33139',
        postalCodeExt: '7890',
        countryName: 'United States',
        countryCode: 'US',
        latitude: 25.79,
        longitude: -80.13,
      },
    ],
  },
  {
    id: 18,
    name: 'Silver State Charter Schools',
    timeZone: 'America/Los Angeles',
    contactId: 8,
    contact: {
      id: 8,
      name: 'Thomas Wright',
      firstName: 'Thomas',
      lastName: 'Wright',
      email: 'twright@silverstatecharter.org',
      phoneNumber: '+17025550801',
      mobilePhone: '+17025550802',
    },
    devices: 3,
    schools: 2,
    faculties: 4,
    addresses: [
      {
        id: 8,
        typeId: 4,
        stateId: 6,
        state: 'Nevada',
        type: 'Main',
        street1: '555 E Sahara Ave',
        street2: 'Suite 101',
        locality: 'Las Vegas',
        postalCode: '89104',
        postalCodeExt: '2345',
        countryName: 'United States',
        countryCode: 'US',
        latitude: 36.14,
        longitude: -115.13,
      },
    ],
  },
];
let nextId = 19;

const mockGetDistricts = async () => {
  await sleep(RandomInt(200, 500));
  return { data: mockDistricts };
};

const mockGetDistrictById = id => {
  const district = mockDistricts.find(d => d.id === Number(id));
  return Promise.resolve({ data: district || null });
};

const mockCreateDistrict = async data => {
  await sleep(RandomInt(300, 600));
  const newDistrict = {
    ...data,
    id: nextId++,
    contactId: nextId,
    devices: randomCount(),
    faculties: randomCount(),
    schools: randomCount(),
  };
  mockDistricts.push(newDistrict);
  return { data: newDistrict };
};

const mockUpdateDistrict = async (id, data) => {
  await sleep(RandomInt(300, 600));
  const index = mockDistricts.findIndex(d => d.id === Number(id));
  if (index !== -1) {
    mockDistricts[index] = { ...mockDistricts[index], ...data, id: Number(id) };
  }
  return { data: mockDistricts[index] };
};

const mockDeleteDistrict = async id => {
  await sleep(RandomInt(200, 400));
  const index = mockDistricts.findIndex(d => d.id === Number(id));
  if (index !== -1) mockDistricts.splice(index, 1);
  return { data: null };
};

export const DistrictClient = {
  getDistricts: () => (env.useMock ? mockGetDistricts() : api.get(endpoint)),
  getDistrictById: id => (env.useMock ? mockGetDistrictById(id) : api.get(`${endpoint}/${id}`)),
  createDistrict: data => (env.useMock ? mockCreateDistrict(data) : api.post(endpoint, data)),
  updateDistrict: (id, data) =>
    env.useMock ? mockUpdateDistrict(id, data) : api.put(endpoint, data),
  deleteDistrict: id => (env.useMock ? mockDeleteDistrict(id) : api.delete(`${endpoint}/${id}`)),
};
