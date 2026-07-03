import { api } from '@/sdk';
import { env } from '@/config/env';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const RandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const mockData = {
  broadcastMessageTypes: [
    { id: 1, name: 'Emergency Alert' },
    { id: 2, name: 'General Announcement' },
    { id: 3, name: 'Event Reminder' },
  ],
  broadcastMessagePriorities: [
    { id: 1, name: 'High' },
    { id: 2, name: 'Medium' },
    { id: 3, name: 'Low' },
  ],
  broadcastMessageEnvironmentTypes: [
    { id: 1, name: 'PA System' },
    { id: 2, name: 'Phone Line' },
  ],
  broadcastMessages: [
    {
      id: 1,
      color: '#FF0000',
      isFavorite: true,
      description: 'Emergency lockdown drill scheduled',
      textToVoice: 'An emergency lockdown drill is scheduled for tomorrow at 10 AM',
      textToVoiceGender: 'Female',
      isDefault: false,
      isRecordBroadcast: false,
      callSid: null,
      smsNotificationText: 'Lockdown drill tomorrow at 10 AM',
      emailNotificationText:
        'Dear parents, an emergency lockdown drill is scheduled for tomorrow at 10 AM. No action is needed from your side.',
      audioFile: null,
      recordingId: null,
      recordingUrl: null,
      durationSeconds: 0,
      broadcastMessageType: { id: 1, name: 'Emergency Alert' },
      broadcastMessageEnvironmentType: { id: 1, name: 'PA System' },
      broadcastMessagePriority: { id: 1, name: 'High' },
      school: { id: 70007, name: 'Mountainview Middle School' },
    },
    {
      id: 3,
      color: '#00AA00',
      isFavorite: true,
      description: 'Recordatorio de reunión de padres editado',
      textToVoice: null,
      textToVoiceGender: null,
      isDefault: true,
      isRecordBroadcast: true,
      callSid: null,
      smsNotificationText: 'Reunión de padres HOY a las 5 PM',
      emailNotificationText:
        'Le recordamos que tiene una reunión de padres programada para hoy a las 5 PM',
      audioFile: null,
      recordingId: 'broadcast-messages/hxqjxwopohrbo8n15gvb',
      recordingUrl:
        'https://res.cloudinary.com/dybiwrcn3/video/upload/v1773940946/broadcast-messages/hxqjxwopohrbo8n15gvb.mp3',
      durationSeconds: 20,
      broadcastMessageType: { id: 1, name: 'Emergency Alert' },
      broadcastMessageEnvironmentType: { id: 1, name: 'PA System' },
      broadcastMessagePriority: { id: 3, name: 'Low' },
      school: { id: 3, name: 'Hogwarts School of Witchcraft and Wizardry' },
    },
  ],
};

let nextId = 9;

const enrichMessage = data => {
  const typeId = data.broadcastMessageTypeId || data.broadcastMessageType?.id;
  const envId = data.broadcastMessageEnvironmentTypeId || data.broadcastMessageEnvironmentType?.id;
  const priorityId = data.broadcastMessagePriorityId || data.broadcastMessagePriority?.id;
  const sId = data.schoolId || data.school?.id;

  return {
    id: data.id,
    color: data.color ?? null,
    isFavorite: data.isFavorite ?? false,
    description: data.description ?? null,
    textToVoice: data.textToVoice ?? null,
    textToVoiceGender: data.textToVoiceGender ?? null,
    isDefault: data.isDefault ?? null,
    isRecordBroadcast: data.isRecordBroadcast ?? false,
    callSid: data.callSid ?? null,
    smsNotificationText: data.smsNotificationText ?? null,
    emailNotificationText: data.emailNotificationText ?? null,
    audioFile: null,
    recordingId: data.recordingId ?? null,
    recordingUrl: data.recordingUrl ?? null,
    durationSeconds: data.durationSeconds ?? 0,
    broadcastMessageType: typeId
      ? {
          id: typeId,
          name: mockData.broadcastMessageTypes.find(t => t.id === typeId)?.name || 'Unknown',
        }
      : null,
    broadcastMessageEnvironmentType: envId
      ? {
          id: envId,
          name:
            mockData.broadcastMessageEnvironmentTypes.find(e => e.id === envId)?.name || 'Unknown',
        }
      : null,
    broadcastMessagePriority: priorityId
      ? {
          id: priorityId,
          name:
            mockData.broadcastMessagePriorities.find(p => p.id === priorityId)?.name || 'Unknown',
        }
      : null,
    school: sId
      ? {
          id: sId,
          name: data.schoolName || `School #${sId}`,
        }
      : null,
  };
};

const toFormData = data => {
  const formData = new FormData();
  for (const key in data) {
    if (
      key === 'upload' ||
      key === 'school' ||
      key === 'broadcastMessageType' ||
      key === 'broadcastMessageEnvironmentType' ||
      key === 'broadcastMessagePriority'
    ) {
      continue;
    }

    if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  }

  // Lógica del audio...
  if (data.upload && data.upload.length > 0) {
    const file = data.upload[0].originFileObj || data.upload[0];
    formData.append('AudioFile', file);
  }

  return formData;
};

export const BroadcastMessageClient = {
  // getMessages: () => api.get('/broadcast-messages'),
  getMessages: async () => {
    if (env.useMock) {
      return api.get('/broadcast-messages');
    }
    await sleep(RandomInt(200, 500));
    return { data: mockData.broadcastMessages };
  },

  // getMessageById: id => api.get(`/broadcast-messages/${id}`),
  getMessageById: async id => {
    if (env.useMock) {
      return api.get(`/broadcast-messages/${id}`);
    }
    await sleep(RandomInt(200, 500));
    const msg = mockData.broadcastMessages.find(m => m.id === Number(id));
    return { data: msg || null };
  },

  // createMessage: data => api.post('/broadcast-messages', data),
  createMessage: async data => {
    if (env.useMock) {
      return api.post('/broadcast-messages', toFormData(data), {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 120000,
      });
    }
    await sleep(RandomInt(300, 600));
    const newMessage = enrichMessage({ ...data, id: nextId++ });
    mockData.broadcastMessages.push(newMessage);
    return { data: newMessage };
  },

  // updateMessage: (id, data) => api.put(`/broadcast-messages/${id}`, data),
  updateMessage: async (id, data) => {
    if (env.useMock) {
      return api.put(`/broadcast-messages/${id}`, toFormData(data), {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 120000,
      });
    }
    await sleep(RandomInt(300, 600));
    const index = mockData.broadcastMessages.findIndex(m => m.id == id);
    const updatedMessage = enrichMessage({ ...data, id: Number(id) });
    if (index !== -1) {
      mockData.broadcastMessages[index] = updatedMessage;
    }
    return { data: updatedMessage };
  },

  // deleteMessage: id => api.delete(`/broadcast-messages/${id}`),
  deleteMessage: async id => {
    if (env.useMock) {
      return api.delete(`/broadcast-messages/${id}`);
    }
    await sleep(RandomInt(200, 400));
    const index = mockData.broadcastMessages.findIndex(m => m.id == id);
    if (index !== -1) {
      mockData.broadcastMessages.splice(index, 1);
    }
    return { data: { success: true } };
  },

  // getTypes: () => api.get('/broadcast-catalogs/types'),
  getTypes: async () => {
    if (env.useMock) {
      return api.get('/broadcast-catalogs/types');
    }
    await sleep(RandomInt(100, 300));
    return { data: mockData.broadcastMessageTypes };
  },

  // getPriorities: () => api.get('/broadcast-catalogs/priorities'),
  getPriorities: async () => {
    if (env.useMock) {
      return api.get('/broadcast-catalogs/priorities');
    }
    await sleep(RandomInt(100, 300));
    return { data: mockData.broadcastMessagePriorities };
  },

  // getEnvironmentTypes: () => api.get('/broadcast-catalogs/environments'),
  getEnvironmentTypes: async () => {
    if (env.useMock) {
      return api.get('/broadcast-catalogs/environments');
    }
    await sleep(RandomInt(100, 300));
    return { data: mockData.broadcastMessageEnvironmentTypes };
  },

  // getBySchoolId: schoolId => api.get(`/broadcast-messages/bySchool/${schoolId}`),
  getBySchoolId: async schoolId => {
    if (env.useMock) {
      const filter = `schoolId:equals:${schoolId}`;
      return api.get(`/broadcast-messages?where=${filter}`);
    }
    await sleep(RandomInt(200, 500));
    return { data: mockData.broadcastMessages.filter(m => m.school?.id === Number(schoolId)) };
  },
};
