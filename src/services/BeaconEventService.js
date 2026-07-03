import { CreateService } from '@/reactive';
import { BeaconEventClient } from '@/sdk/clients';
import { AlertService } from './AlertService';

export const beaconEventReactor = {
  onSuccess: ({ action, payload, db }) => {
    switch (action) {
      case "generateEvent":
        db.collection("beacons").createOrUpdate(payload);
        AlertService.success('Event Created');
        break;
    }
  },
  onError: ({ action, error }) => {
    switch (action) {
      case "generateEvent":
        AlertService.error(error?.message);
        break;
    }
  },
};

export const BeaconEventService = CreateService(BeaconEventClient, beaconEventReactor);