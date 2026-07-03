import { env } from '@/config/env';
import { api } from '@/sdk';
import { beaconsTable } from './BeaconClient';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function RandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const baseLocations = [
  {
    street1: "Av. Insurgentes",
    street2: "Reforma",
    locality: "Ciudad de México",
    state: "CDMX",
    postalCode: "06600",
    country: "México",
    reverseGeocode: "Av. Insurgentes 123",
    latitude: 19.4326,
    longitude: -99.1332
  },
  {
    street1: "Av. Vallarta",
    street2: "Chapultepec",
    locality: "Guadalajara",
    state: "Jalisco",
    postalCode: "44100",
    country: "México",
    reverseGeocode: "Av. Vallarta 500",
    latitude: 20.6597,
    longitude: -103.3496
  },
  {
    street1: "Av. Constitución",
    street2: "Juárez",
    locality: "Monterrey",
    state: "Nuevo León",
    postalCode: "64000",
    country: "México",
    reverseGeocode: "Av. Constitución 800",
    latitude: 25.6866,
    longitude: -100.3161
  },
  {
    street1: "Blvd. Kukulcán",
    street2: "Zona Hotelera",
    locality: "Cancún",
    state: "Quintana Roo",
    postalCode: "77500",
    country: "México",
    reverseGeocode: "Blvd. Kukulcán Km 9",
    latitude: 21.1619,
    longitude: -86.8515
  },
  {
    street1: "Av. Universidad",
    street2: "Copilco",
    locality: "Ciudad de México",
    state: "CDMX",
    postalCode: "04510",
    country: "México",
    reverseGeocode: "Av. Universidad 3000",
    latitude: 19.323,
    longitude: -99.186
  }
];

const eventTypes = [
  "Medical",
  "Fire",
  "Security",
  "Accident",
  "Assistance"
];

const generateLocation = (beacon) => {
  const last = beacon.locations.at(-1);

  if (!last) {
    const base = baseLocations[RandomInt(0, baseLocations.length - 1)];

    return {
      beaconId: beacon.id,
      locationDateUTC: new Date().toISOString(),
      ...base,
      batteryLevel: `${RandomInt(60, 100)}%`
    };
  }

  return {
    beaconId: beacon.id,
    locationDateUTC: new Date().toISOString(),

    ...last,

    latitude: last.latitude + (Math.random() - 0.5) * 0.001,
    longitude: last.longitude + (Math.random() - 0.5) * 0.001,

    batteryLevel: `${RandomInt(60, 100)}%`
  };
};

const generateEventFromLocation = (beacon, location) => {
  return {
    beaconId: beacon.id,
    emergencyType: eventTypes[RandomInt(0, eventTypes.length - 1)],

    latitude: location.latitude,
    longitude: location.longitude,

    reverseGeocode: location.reverseGeocode,
    address1: location.street1,
    address2: "Auto-generated",
    address3: "Zone A",

    city: location.locality,
    state: location.state,
    postalCode: location.postalCode,

    createdOnUTC: new Date().toISOString(),
    createdBy: "mock-system"
  };
};

const EventMock = {

  generateLocationAndEvent: async (beaconId) => {
    await sleep(RandomInt(200, 400));

    const beacon = beaconsTable.find(b => b.id === Number(beaconId));
    if (!beacon) throw new Error("Beacon not found");

    const newLocation = generateLocation(beacon);

    const newEvent = generateEventFromLocation(beacon, newLocation);

    beacon.locations.push(newLocation);
    beacon.events.push(newEvent);

    return {
      data: {
        location: newLocation,
        event: newEvent
      }
    };
  }

};
export const BeaconEventClient = {

  generateEvent: (beaconId) =>
    env.useMock
      ? EventMock.generateLocationAndEvent(beaconId)
      : (api.post(`/beacons/location/${beaconId}`),
         api.post(`/beacons/event/${beaconId}`)
       ),
};