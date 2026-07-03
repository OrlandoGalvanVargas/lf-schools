import { api } from '@/sdk';

export const TripClient = {
  getTrips: () => api.get('/trips'),
  createTrip: data => api.post('/trips', data),
  getTripById: id => api.get(`trips/${id}`),
  updateTrip: (id, data) => api.put(`trips/${id}`, data),
  deleteTrip: id => api.delete(`trips/${id}`),
};
