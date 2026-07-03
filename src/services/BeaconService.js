import { CreateService } from '@/reactive';
import { BeaconClient } from '@/sdk/clients';
import { AlertService } from './AlertService';

export const beaconReactor = {
  onSuccess: ({ action, payload, params, db }) => {
    
    switch (action) {
      case 'getBeacons':
        db.collection("beacons").bulkWrite(payload);
        break;
      case "getBeaconById":
        db.collection("beacons").createOrUpdate(payload);
        break;
      case "getBeaconByDistrictId":
        db.collection("beacons").bulkCreateOrUpdate(payload);
        break;
      case "createBeacon":
        db.collection("beacons").createOrUpdate(payload);
        AlertService.success('Beacon Created');
        break;
      case "updateBeacon":
        db.collection("beacons").createOrUpdate(params[0], payload);
        AlertService.success('Beacon Updated');
        break;
      case "deleteBeacon":
        db.collection("beacons").deleteOne(params[0]);
        AlertService.success('Beacon Removed');
        break;
      case "getBeaconTypes":
        db.collection("beaconTypes").bulkWrite(payload);
        break;
    }
  },
  onError: ({ action, error }) => {
    switch (action) {
      case 'getBeacons':
        AlertService.error(error?.message);
        break;
      case 'getBeaconById':
        AlertService.error(error?.message);
        break;
      case 'getBeaconByDistrictId':
        AlertService.error(error?.message);
        break;
      case 'createBeacon':
        AlertService.error(error?.message);
        break;
      case 'updateBeacon':
        AlertService.error(error?.message);
        break;
      case 'deleteBeacon':
        AlertService.error(error?.message);
        break;
      case 'getBeaconTypes':
        AlertService.error(error?.message);
        break;
    }
  },
};

export const BeaconService = CreateService(BeaconClient, beaconReactor);