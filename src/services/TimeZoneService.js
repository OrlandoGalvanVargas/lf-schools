import { CreateService } from '@/reactive';
import { TimeZoneClient } from '@/sdk/clients';
import { AlertService } from './AlertService';

export const TimeZoneReactor = {
  onSuccess: ({ action, payload, db }) => {
    switch (action) {
      case 'getTimeZones':
        db.collection('timeZones').bulkCreateOrUpdate(payload);
        break;
    }
  },
  onError: ({ action, error }) => {
    switch (action) {
      case 'getTimeZones':
        AlertService.error('Failed to retrieve TimeZones');
        break;
    }
  },
};

export const TimeZoneService = CreateService(TimeZoneClient, TimeZoneReactor);
