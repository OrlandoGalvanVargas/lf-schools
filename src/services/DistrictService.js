import { CreateService } from '@/reactive';
import { AlertService } from './AlertService';
import { DistrictClient } from '@/sdk/clients';

const collectionDistrict = 'districts';

export const districtReactor = {
  onSuccess: ({ action, payload, params, db }) => {
    switch (action) {
      case 'getDistricts':
        db.collection(collectionDistrict).bulkCreateOrUpdate(payload);
        break;
      case 'getDistrictById':
        db.collection(collectionDistrict).createOrUpdate(payload);
        break;
      case 'createDistrict':
        db.collection(collectionDistrict).createOrUpdate(payload);
        AlertService.success('District created successfully');
        break;
      case 'updateDistrict':
        db.collection(collectionDistrict).createOrUpdate(payload);
        AlertService.success('District updated successfully');
        break;
      case 'deleteDistrict':
        db.collection(collectionDistrict).deleteOne(params[0]);
        AlertService.success('District deleted successfully');
        break;
    }
  },
  onError: ({ action, error }) => {
    switch (action) {
      case 'getDistricts':
        AlertService.error('Failed to load districts');
        break;
      case 'getDistrictById':
        AlertService.error('Failed to load district');
        break;
      case 'createDistrict':
        AlertService.error('Failed to create district');
        break;
      case 'updateDistrict':
        AlertService.error('Failed to update district');
        break;
      case 'deleteDistrict':
        AlertService.error('Failed to delete district');
        break;
    }
  },
};

export const DistrictService = CreateService(DistrictClient, districtReactor);
