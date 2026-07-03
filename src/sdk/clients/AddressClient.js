import { api } from '../api';
import { env } from '@/config/env';

const RealAddressClient = {
  getStates: () => api.get('/addresses/states'),
  getAddressTypes: () => api.get('/addresses/address-types'),
  getAddresses: (featureType, featureId) => api.get(`/${featureType}/${featureId}/addresses`),
};

const mockStates = [
  { id: 1, code: 'AL', name: 'Alabama', countryCode: 'US' },
  { id: 2, code: 'CA', name: 'California', countryCode: 'US' },
  { id: 3, code: 'TX', name: 'Texas', countryCode: 'US' },
  { id: 4, code: 'FL', name: 'Florida', countryCode: 'US' },
  { id: 5, code: 'AZ', name: 'Arizona', countryCode: 'US' },
  { id: 6, code: 'NV', name: 'Nevada', countryCode: 'US' },
];

const mockAddressTypes = [
  { id: 1, name: 'Billing' },
  { id: 2, name: 'Shipping' },
  { id: 3, name: 'Mailing' },
  { id: 4, name: 'Main' },
];

const MockAddressClient = {
  getStates: async () => {
    return Promise.resolve({
      data: mockStates,
    });
  },

  getAddressTypes: async () => {
    return Promise.resolve({
      data: mockAddressTypes,
    });
  },

  getAddresses: async (featureType, featureId) => {
    return Promise.resolve({
      data: [],
    });
  },
};

export const AddressClient = {
  getStates: () => (!env.useMock ? MockAddressClient.getStates() : RealAddressClient.getStates()),
  getAddressTypes: () =>
    !env.useMock ? MockAddressClient.getAddressTypes() : RealAddressClient.getAddressTypes(),
  getAddresses: (featureType, featureId) =>
    !env.useMock
      ? MockAddressClient.getAddresses(featureType, featureId)
      : RealAddressClient.getAddresses(featureType, featureId),
};
