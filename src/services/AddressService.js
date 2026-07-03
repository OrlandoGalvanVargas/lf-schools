import { AddressClient } from '@/sdk/clients/AddressClient';
import { CreateService } from '@/reactive';
import { AlertService } from './AlertService';

export const AddressReactor = {
  onSuccess: ({ action, payload, params, db }) => {
    switch (action) {
      case 'getStates':
        db.collection('states').bulkCreateOrUpdate(payload);
        break;
      case 'getAddressTypes':
        db.collection('addressTypes').bulkCreateOrUpdate(payload);
        break;
      case 'getAddresses':
        db.collection('addresses').bulkCreateOrUpdate(payload);

        break;
    }
  },

  onError: ({ action }) => {
    switch (action) {
      case 'getStates':
        AlertService.error('Failed to retrieve states catalog');
        break;
      case 'getAddressTypes':
        AlertService.error('Failed to retrieve address types catalog');
        break;
      case 'getAddresses':
        AlertService.error('Failed to retrieve addresses');
        break;
    }
  },
};

export const AddressService = CreateService(AddressClient, AddressReactor);
