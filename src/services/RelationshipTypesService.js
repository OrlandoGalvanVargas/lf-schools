import { CreateService } from '@/reactive';
import { RelationshipTypesClient } from '@/sdk/clients';
import { AlertService } from './AlertService';

const COLLECTION_NAME = 'relationshipTypes';

export const relationshipTypesReactor = {
  onSuccess: ({ action, payload, db }) => {
    switch (action) {
      case 'getRelationshipTypes':
        db.collection(COLLECTION_NAME).bulkWrite(payload);
        break;
      case 'getRelationshipTypeById':
        db.collection(COLLECTION_NAME).createOrUpdate(payload);
        break;
    }
  },
  onError: ({ action }) => {
    switch (action) {
      case 'getRelationshipTypes':
        AlertService.error('RelationshipTypes not found');
        break;
      case 'getRelationshipTypeById':
        AlertService.error('RelationshipType not found');
        break;
    }
  },
};

export const RelationshipTypesService = CreateService(
  RelationshipTypesClient,
  relationshipTypesReactor,
);
