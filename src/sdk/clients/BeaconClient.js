import { env } from '@/config/env';
import { api } from '@/sdk';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function RandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const beaconsTable = [
  {
    "id": 1,
    "deviceName": "Beacon-1",
    "beaconType": "Broadcast",
    "phoneNumber": "+12125550101",
    "districtId": 11,
    "schoolId": null,
    "facultyId": 1,
    "isAvailable": true,
    "locations": [
      {
        "beaconId": 1,
        "locationDateUTC": "2026-03-12T00:00:00Z",
        "street1": "5th Avenue",
        "street2": "W 34th St",
        "locality": "New York",
        "state": "NY",
        "postalCode": "10001",
        "country": "United States",
        "reverseGeocode": "350 5th Ave",
        "latitude": 40.7484,
        "longitude": -73.9857,
        "batteryLevel": "92%"
      }
    ],
    "events": []
  },
  {
    "id": 2,
    "deviceName": "Beacon-2",
    "beaconType": "Chaperone",
    "phoneNumber": "+13125550102",
    "districtId": 11,
    "schoolId": 70012,
    "facultyId": 2,
    "isAvailable": false,
    "locations": [
      {
        "beaconId": 2,
        "locationDateUTC": "2026-03-12T00:05:00Z",
        "street1": "Michigan Ave",
        "street2": "E Randolph St",
        "locality": "Chicago",
        "state": "IL",
        "postalCode": "60601",
        "country": "United States",
        "reverseGeocode": "201 E Randolph St",
        "latitude": 41.8839,
        "longitude": -87.6231,
        "batteryLevel": "78%"
      }
    ],
    "events": []
  },
  {
    "id": 3,
    "deviceName": "Beacon-3",
    "beaconType": "Broadcast",
    "phoneNumber": "+12135550103",
    "districtId": 12,
    "schoolId": 70007,
    "facultyId": null,
    "isAvailable": true,
    "locations": [
      {
        "beaconId": 3,
        "locationDateUTC": "2026-03-12T00:10:00Z",
        "street1": "Hollywood Blvd",
        "street2": "Highland Ave",
        "locality": "Los Angeles",
        "state": "CA",
        "postalCode": "90028",
        "country": "United States",
        "reverseGeocode": "6801 Hollywood Blvd",
        "latitude": 34.1016,
        "longitude": -118.3387,
        "batteryLevel": "85%"
      }
    ],
    "events": [
      {
        "beaconId": 3,
        "emergencyType": "Medical",
        "latitude": 34.1016,
        "longitude": -118.3387,
        "reverseGeocode": "6801 Hollywood Blvd",
        "address1": "Hollywood Blvd",
        "address2": "Near Metro Entrance",
        "address3": "North Side",
        "city": "Los Angeles",
        "state": "CA",
        "postalCode": "90028",
        "createdOnUTC": "2026-03-12T00:12:00Z",
        "createdBy": "system"
      }
    ]
  },
  {
    "id": 4,
    "deviceName": "Beacon-4",
    "beaconType": "Chaperone",
    "phoneNumber": "+17135550104",
    "districtId": null,
    "schoolId": 70009,
    "facultyId": null,
    "isAvailable": true,
    "locations": [
      {
        "beaconId": 4,
        "locationDateUTC": "2026-03-12T00:15:00Z",
        "street1": "Main St",
        "street2": "Texas Ave",
        "locality": "Houston",
        "state": "TX",
        "postalCode": "77002",
        "country": "United States",
        "reverseGeocode": "901 Bagby St",
        "latitude": 29.7604,
        "longitude": -95.3698,
        "batteryLevel": "74%"
      }
    ],
    "events": []
  },
  {
    "id": 5,
    "deviceName": "Beacon-5",
    "beaconType": "Broadcast",
    "phoneNumber": "+13055550105",
    "districtId": 12,
    "schoolId": 70007,
    "facultyId": 2,
    "isAvailable": false,
    "locations": [
      {
        "beaconId": 5,
        "locationDateUTC": "2026-03-12T00:20:00Z",
        "street1": "Ocean Dr",
        "street2": "10th St",
        "locality": "Miami",
        "state": "FL",
        "postalCode": "33139",
        "country": "United States",
        "reverseGeocode": "100 Ocean Dr",
        "latitude": 25.7825,
        "longitude": -80.134,
        "batteryLevel": "88%"
      }
    ],
    "events": []
  },
  {
    "id": 6,
    "deviceName": "Beacon-6",
    "beaconType": "Chaperone",
    "phoneNumber": "+16025550106",
    "districtId": 11,
    "schoolId": 70012,
    "facultyId": null,
    "isAvailable": true,
    "locations": [
      {
        "beaconId": 6,
        "locationDateUTC": "2026-03-12T00:25:00Z",
        "street1": "N Central Ave",
        "street2": "E Van Buren St",
        "locality": "Phoenix",
        "state": "AZ",
        "postalCode": "85004",
        "country": "United States",
        "reverseGeocode": "200 E Van Buren St",
        "latitude": 33.4484,
        "longitude": -112.074,
        "batteryLevel": "63%"
      }
    ],
    "events": []
  },
  {
    "id": 7,
    "deviceName": "Beacon-7",
    "beaconType": "Broadcast",
    "phoneNumber": "+12065550107",
    "districtId": 13,
    "schoolId": null,
    "facultyId": 1,
    "isAvailable": false,
    "locations": [
      {
        "beaconId": 7,
        "locationDateUTC": "2026-03-12T00:30:00Z",
        "street1": "1st Ave",
        "street2": "Pike St",
        "locality": "Seattle",
        "state": "WA",
        "postalCode": "98101",
        "country": "United States",
        "reverseGeocode": "85 Pike St",
        "latitude": 47.6097,
        "longitude": -122.3425,
        "batteryLevel": "91%"
      }
    ],
    "events": []
  },
  {
    "id": 8,
    "deviceName": "Beacon-8",
    "beaconType": "Chaperone",
    "phoneNumber": "+17025550108",
    "districtId": null,
    "schoolId": 70007,
    "facultyId": 2,
    "isAvailable": true,
    "locations": [
      {
        "beaconId": 8,
        "locationDateUTC": "2026-03-12T00:35:00Z",
        "street1": "Las Vegas Blvd",
        "street2": "Flamingo Rd",
        "locality": "Las Vegas",
        "state": "NV",
        "postalCode": "89109",
        "country": "United States",
        "reverseGeocode": "3570 Las Vegas Blvd S",
        "latitude": 36.1126,
        "longitude": -115.1728,
        "batteryLevel": "80%"
      }
    ],
    "events": []
  },
  {
    "id": 9,
    "deviceName": "Beacon-9",
    "beaconType": "Broadcast",
    "phoneNumber": "+16195550109",
    "districtId": 13,
    "schoolId": null,
    "facultyId": null,
    "isAvailable": true,
    "locations": [
      {
        "beaconId": 9,
        "locationDateUTC": "2026-03-12T00:40:00Z",
        "street1": "Harbor Dr",
        "street2": "Broadway",
        "locality": "San Diego",
        "state": "CA",
        "postalCode": "92101",
        "country": "United States",
        "reverseGeocode": "100 Harbor Dr",
        "latitude": 32.7157,
        "longitude": -117.1611,
        "batteryLevel": "70%"
      }
    ],
    "events": []
  },
  {
    "id": 10,
    "deviceName": "Beacon-10",
    "beaconType": "Chaperone",
    "phoneNumber": "+13035550110",
    "districtId": 12,
    "schoolId": 70009,
    "facultyId": null,
    "isAvailable": true,
    "locations": [
      {
        "beaconId": 10,
        "locationDateUTC": "2026-03-12T00:45:00Z",
        "street1": "16th St",
        "street2": "Welton St",
        "locality": "Denver",
        "state": "CO",
        "postalCode": "80202",
        "country": "United States",
        "reverseGeocode": "1001 16th St Mall",
        "latitude": 39.742,
        "longitude": -104.9895,
        "batteryLevel": "86%"
      }
    ],
    "events": []
  },
  {
    "id": 11,
    "deviceName": "Beacon-11",
    "beaconType": "Broadcast",
    "phoneNumber": "+14155550111",
    "districtId": 13,
    "schoolId": 70012,
    "facultyId": null,
    "isAvailable": false,
    "locations": [
      {
        "beaconId": 11,
        "locationDateUTC": "2026-03-12T01:00:00Z",
        "street1": "Market St",
        "street2": "5th St",
        "locality": "San Francisco",
        "state": "CA",
        "postalCode": "94103",
        "country": "United States",
        "reverseGeocode": "1355 Market St",
        "latitude": 37.7763,
        "longitude": -122.4167,
        "batteryLevel": "89%"
      }
    ],
    "events": [
      {
        "beaconId": 11,
        "emergencyType": "Medical",
        "latitude": 37.7763,
        "longitude": -122.4167,
        "reverseGeocode": "1355 Market St",
        "address1": "Market St",
        "address2": "Metro Entrance",
        "address3": "Lobby",
        "city": "San Francisco",
        "state": "CA",
        "postalCode": "94103",
        "createdOnUTC": "2026-03-12T01:02:00Z",
        "createdBy": "system"
      }
    ]
  },
  {
    "id": 12,
    "deviceName": "Beacon-12",
    "beaconType": "Chaperone",
    "phoneNumber": "+16175550112",
    "districtId": null,
    "schoolId": 70009,
    "facultyId": 1,
    "isAvailable": true,
    "locations": [
      {
        "beaconId": 12,
        "locationDateUTC": "2026-03-12T01:05:00Z",
        "street1": "Boylston St",
        "street2": "Exeter St",
        "locality": "Boston",
        "state": "MA",
        "postalCode": "02116",
        "country": "United States",
        "reverseGeocode": "800 Boylston St",
        "latitude": 42.3473,
        "longitude": -71.0821,
        "batteryLevel": "72%"
      }
    ],
    "events": [
      {
        "beaconId": 12,
        "emergencyType": "Fire",
        "latitude": 42.3473,
        "longitude": -71.0821,
        "reverseGeocode": "800 Boylston St",
        "address1": "Boylston St",
        "address2": "Back Bay Area",
        "address3": "Near Mall",
        "city": "Boston",
        "state": "MA",
        "postalCode": "02116",
        "createdOnUTC": "2026-03-12T01:06:30Z",
        "createdBy": "system"
      }
    ]
  },
  {
    "id": 13,
    "deviceName": "Beacon-13",
    "beaconType": "Broadcast",
    "phoneNumber": "+12145550113",
    "districtId": 12,
    "schoolId": null,
    "facultyId": 1,
    "isAvailable": false,
    "locations": [
      {
        "beaconId": 13,
        "locationDateUTC": "2026-03-12T01:10:00Z",
        "street1": "Elm St",
        "street2": "Houston St",
        "locality": "Dallas",
        "state": "TX",
        "postalCode": "75201",
        "country": "United States",
        "reverseGeocode": "400 N Houston St",
        "latitude": 32.781,
        "longitude": -96.808,
        "batteryLevel": "83%"
      }
    ],
    "events": [
      {
        "beaconId": 13,
        "emergencyType": "Security",
        "latitude": 32.781,
        "longitude": -96.808,
        "reverseGeocode": "400 N Houston St",
        "address1": "Elm St",
        "address2": "Downtown",
        "address3": "Parking Area",
        "city": "Dallas",
        "state": "TX",
        "postalCode": "75201",
        "createdOnUTC": "2026-03-12T01:12:00Z",
        "createdBy": "system"
      }
    ]
  },
  {
    "id": 14,
    "deviceName": "Beacon-14",
    "beaconType": "Chaperone",
    "phoneNumber": "+16145550114",
    "districtId": 13,
    "schoolId": 70012,
    "facultyId": 1,
    "isAvailable": true,
    "locations": [
      {
        "beaconId": 14,
        "locationDateUTC": "2026-03-12T01:15:00Z",
        "street1": "High St",
        "street2": "Broad St",
        "locality": "Columbus",
        "state": "OH",
        "postalCode": "43215",
        "country": "United States",
        "reverseGeocode": "100 E Broad St",
        "latitude": 39.9612,
        "longitude": -82.9988,
        "batteryLevel": "88%"
      }
    ],
    "events": [
      {
        "beaconId": 14,
        "emergencyType": "Medical",
        "latitude": 39.9612,
        "longitude": -82.9988,
        "reverseGeocode": "100 E Broad St",
        "address1": "High St",
        "address2": "City Center",
        "address3": "Entrance A",
        "city": "Columbus",
        "state": "OH",
        "postalCode": "43215",
        "createdOnUTC": "2026-03-12T01:16:20Z",
        "createdBy": "system"
      }
    ]
  },
  {
    "id": 15,
    "deviceName": "Beacon-15",
    "beaconType": "Broadcast",
    "phoneNumber": "+15035550115",
    "districtId": 11,
    "schoolId": 70008,
    "facultyId": 2,
    "isAvailable": false,
    "locations": [
      {
        "beaconId": 15,
        "locationDateUTC": "2026-03-12T01:20:00Z",
        "street1": "SW 6th Ave",
        "street2": "SW Taylor St",
        "locality": "Portland",
        "state": "OR",
        "postalCode": "97204",
        "country": "United States",
        "reverseGeocode": "600 SW 6th Ave",
        "latitude": 45.5231,
        "longitude": -122.6765,
        "batteryLevel": "64%"
      }
    ],
    "events": [
      {
        "beaconId": 15,
        "emergencyType": "Fire",
        "latitude": 45.5231,
        "longitude": -122.6765,
        "reverseGeocode": "600 SW 6th Ave",
        "address1": "SW 6th Ave",
        "address2": "Downtown",
        "address3": "Retail Area",
        "city": "Portland",
        "state": "OR",
        "postalCode": "97204",
        "createdOnUTC": "2026-03-12T01:21:30Z",
        "createdBy": "system"
      }
    ]
  },

  {
    "id": 16,
    "deviceName": "Beacon-16",
    "beaconType": "Chaperone",
    "phoneNumber": "+17035550116",
    "districtId": 12,
    "schoolId": 70011,
    "facultyId": null,
    "isAvailable": true,
    "locations": [
      {
        "beaconId": 16,
        "locationDateUTC": "2026-03-12T01:25:00Z",
        "street1": "King St",
        "street2": "Union St",
        "locality": "Alexandria",
        "state": "VA",
        "postalCode": "22314",
        "country": "United States",
        "reverseGeocode": "101 King St",
        "latitude": 38.8048,
        "longitude": -77.0469,
        "batteryLevel": "90%"
      }
    ],
    "events": [
      {
        "beaconId": 16,
        "emergencyType": "Security",
        "latitude": 38.8048,
        "longitude": -77.0469,
        "reverseGeocode": "101 King St",
        "address1": "King St",
        "address2": "Old Town",
        "address3": "Parking Garage",
        "city": "Alexandria",
        "state": "VA",
        "postalCode": "22314",
        "createdOnUTC": "2026-03-12T01:26:00Z",
        "createdBy": "system"
      }
    ]
  },

  {
    "id": 17,
    "deviceName": "Beacon-17",
    "beaconType": "Broadcast",
    "phoneNumber": "+14045550117",
    "districtId": 11,
    "schoolId": null,
    "facultyId": null,
    "isAvailable": false,
    "locations": [
      {
        "beaconId": 17,
        "locationDateUTC": "2026-03-12T01:30:00Z",
        "street1": "Peachtree St",
        "street2": "Baker St",
        "locality": "Atlanta",
        "state": "GA",
        "postalCode": "30303",
        "country": "United States",
        "reverseGeocode": "250 Peachtree St",
        "latitude": 33.7489,
        "longitude": -84.3881,
        "batteryLevel": "86%"
      }
    ],
    "events": [
      {
        "beaconId": 17,
        "emergencyType": "Medical",
        "latitude": 33.7489,
        "longitude": -84.3881,
        "reverseGeocode": "250 Peachtree St",
        "address1": "Peachtree St",
        "address2": "Downtown",
        "address3": "Main Entrance",
        "city": "Atlanta",
        "state": "GA",
        "postalCode": "30303",
        "createdOnUTC": "2026-03-12T01:31:00Z",
        "createdBy": "system"
      }
    ]
  },

  {
    "id": 18,
    "deviceName": "Beacon-18",
    "beaconType": "Chaperone",
    "phoneNumber": "+13145550118",
    "districtId": 13,
    "schoolId": 70009,
    "facultyId": 2,
    "isAvailable": true,
    "locations": [
      {
        "beaconId": 18,
        "locationDateUTC": "2026-03-12T01:35:00Z",
        "street1": "Market St",
        "street2": "7th St",
        "locality": "St. Louis",
        "state": "MO",
        "postalCode": "63101",
        "country": "United States",
        "reverseGeocode": "701 Market St",
        "latitude": 38.627,
        "longitude": -90.1994,
        "batteryLevel": "81%"
      }
    ],
    "events": [
      {
        "beaconId": 18,
        "emergencyType": "Fire",
        "latitude": 38.627,
        "longitude": -90.1994,
        "reverseGeocode": "701 Market St",
        "address1": "Market St",
        "address2": "Financial District",
        "address3": "Lobby",
        "city": "St. Louis",
        "state": "MO",
        "postalCode": "63101",
        "createdOnUTC": "2026-03-12T01:36:10Z",
        "createdBy": "system"
      }
    ]
  },

  {
    "id": 19,
    "deviceName": "Beacon-19",
    "beaconType": "Broadcast",
    "phoneNumber": "+16125550119",
    "districtId": null,
    "schoolId": 70010,
    "facultyId": null,
    "isAvailable": false,
    "locations": [
      {
        "beaconId": 19,
        "locationDateUTC": "2026-03-12T01:40:00Z",
        "street1": "Nicollet Mall",
        "street2": "7th St",
        "locality": "Minneapolis",
        "state": "MN",
        "postalCode": "55402",
        "country": "United States",
        "reverseGeocode": "700 Nicollet Mall",
        "latitude": 44.9778,
        "longitude": -93.265,
        "batteryLevel": "69%"
      }
    ],
    "events": [
      {
        "beaconId": 19,
        "emergencyType": "Security",
        "latitude": 44.9778,
        "longitude": -93.265,
        "reverseGeocode": "700 Nicollet Mall",
        "address1": "Nicollet Mall",
        "address2": "Downtown",
        "address3": "Bus Stop",
        "city": "Minneapolis",
        "state": "MN",
        "postalCode": "55402",
        "createdOnUTC": "2026-03-12T01:41:10Z",
        "createdBy": "system"
      }
    ]
  },

  {
    "id": 20,
    "deviceName": "Beacon-20",
    "beaconType": "Chaperone",
    "phoneNumber": "+14125550120",
    "districtId": 12,
    "schoolId": 70007,
    "facultyId": null,
    "isAvailable": true,
    "locations": [
      {
        "beaconId": 20,
        "locationDateUTC": "2026-03-12T01:45:00Z",
        "street1": "Liberty Ave",
        "street2": "7th St",
        "locality": "Pittsburgh",
        "state": "PA",
        "postalCode": "15222",
        "country": "United States",
        "reverseGeocode": "600 Liberty Ave",
        "latitude": 40.4406,
        "longitude": -79.9959,
        "batteryLevel": "87%"
      }
    ],
    "events": [
      {
        "beaconId": 20,
        "emergencyType": "Medical",
        "latitude": 40.4406,
        "longitude": -79.9959,
        "reverseGeocode": "600 Liberty Ave",
        "address1": "Liberty Ave",
        "address2": "Downtown",
        "address3": "Side Entrance",
        "city": "Pittsburgh",
        "state": "PA",
        "postalCode": "15222",
        "createdOnUTC": "2026-03-12T01:46:00Z",
        "createdBy": "system"
      }
    ]
  }
];

export const beaconTypeOptions = [
    { id: 1, name: 'Broadcast' },
    { id: 2, name: 'Chaperone' }
];

const BeaconMock = {

  getBeacons: async () => {
    await sleep(RandomInt(200, 500));

    return {
      data: beaconsTable
    };
  },

  getBeaconById: async (id) => {
    await sleep(RandomInt(300, 500));

    const beacon = beaconsTable.find(item => item.id === id);

    if (!beacon) {
      throw new Error("Beacon not found");
    }

    return {
      data: beacon
    };
  },
  
  getBeaconByDistrictId: async (districtId) => {
    await sleep(RandomInt(300, 500));

    const beacon = beaconsTable.filter(item => item.districtId === districtId);

    if (!beacon) {
      throw new Error("Beacon not found");
    }

    return {
      data: beacon
    };
  },

  createBeacon: async (beacon) => {
    await sleep(RandomInt(200, 500));

    if (!beacon) {
      throw new Error("Beacon not found");
    }

    const newBeacon = {
      ...beacon,
      id: beaconsTable.length
        ? Math.max(...beaconsTable.map(b => b.id)) + 1
        : 1,
    };

    beaconsTable.push(newBeacon);

    return {
      data: newBeacon
    };
  },

  updateBeacon: async (id, beacon) => {
    await sleep(RandomInt(300, 500));

    const index = beaconsTable.findIndex(item => item.id ===  Number(id));

    if (index === -1) {
      throw new Error("Beacon not found");
    }

    beaconsTable[index] = {
      ...beaconsTable[index],
      ...beacon,
    };

    return {
      data: beaconsTable[index]
    };
  },

  deleteBeacon: async (id) => {
    await sleep(RandomInt(200, 500));

    const index = beaconsTable.findIndex(item => item.id === Number(id));

    if (index === -1) {
      throw new Error("Beacon not found");
    }

    const deleted = beaconsTable[index];

    beaconsTable.splice(index, 1);

    return {
      data: deleted
    };
  },

  getBeaconTypes: async () => {
    await sleep(RandomInt(200, 500));

    return {
      data: beaconTypeOptions
    };
  },
};

export const BeaconClient = {
  getBeacons: () => 
    env.useMock ? BeaconMock.getBeacons() : api.get('/beacons'),

  getBeaconById: (id) => 
    env.useMock ? BeaconMock.getBeaconById(id) : api.get(`/beacons/${id}`),

  createBeacon: (data) => 
    env.useMock ? BeaconMock.createBeacon(data) : api.post('/beacons', data),

  updateBeacon: (id, data) => 
    env.useMock ? BeaconMock.updateBeacon(id, data) : api.put(`/beacons`, data),

  deleteBeacon: (id) => 
    env.useMock ? BeaconMock.deleteBeacon(id) : api.delete(`/beacons/${id}`),

  getBeaconTypes: () => 
    BeaconMock.getBeaconTypes(),
  
  getBeaconByDistrictId: (districtId) =>
    env.useMock ? BeaconMock.getBeaconByDistrictId(districtId) : api.get(`/beacons/district/${districtId}`),
};