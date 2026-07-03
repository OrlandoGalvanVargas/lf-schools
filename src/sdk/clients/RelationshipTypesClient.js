import { api } from '@/sdk';
import { env } from '@/config/env';

const BASE_URL_RELATIONSHIP_TYPES = '/relationship-types';

const relationshipTypesClient = {
  getRelationshipTypes: () => api.get(`${BASE_URL_RELATIONSHIP_TYPES}`),
  getRelationshipTypeById: id => api.get(`${BASE_URL_RELATIONSHIP_TYPES}/${id}`),
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function RandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const mockRelationshipTypes = [
  { id: 1, relationship: 'father' },
  { id: 2, relationship: 'mother' },
  { id: 3, relationship: 'brother' },
  { id: 4, relationship: 'sister' },
  { id: 5, relationship: 'uncle' },
  { id: 6, relationship: 'aunt' },
];

const mockRelationshipTypesClient = {
  getRelationshipTypes: async () => {
    await sleep(RandomInt(1000, 5000));
    return { data: mockRelationshipTypes };
  },

  getRelationshipTypeById: async id => {
    await sleep(RandomInt(1000, 5000));
    const result = mockRelationshipTypes.find(r => r.id == Number.parseInt(id));
    return { data: result };
  },
};

export const RelationshipTypesClient = {
  getRelationshipTypes: () =>
    !env.useMock
      ? mockRelationshipTypesClient.getRelationshipTypes()
      : relationshipTypesClient.getRelationshipTypes(),
  getRelationshipTypeById: id =>
    !env.useMock
      ? mockRelationshipTypesClient.getRelationshipTypeById(id)
      : relationshipTypesClient.getRelationshipTypeById(id),
};
