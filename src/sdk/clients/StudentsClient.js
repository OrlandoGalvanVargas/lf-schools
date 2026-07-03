import { api } from '@/sdk';
import { env } from '@/config/env';

const BASE_URL_STUDENTS = '/students';

const studentsClient = {
  getStudents: () => api.get(`${BASE_URL_STUDENTS}`),
  createStudent: data => api.post(`${BASE_URL_STUDENTS}`, data),
  getStudentById: id => api.get(`${BASE_URL_STUDENTS}/${id}`),
  updateStudent: (id, data) => api.put(`${BASE_URL_STUDENTS}/${id}`, data),
  deleteStudent: id => api.delete(`${BASE_URL_STUDENTS}/${id}`),
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function RandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const mockStudents = [
  {
    id: 1,
    schoolId: 70007,
    studentNumber: 'STU-2026-0001',
    contact: {
      id: 1,
      name: 'Juan Perez',
      firstName: 'Juan',
      lastName: 'Perez',
      email: 'juan.perez@example.com',
      phoneNumber: '+52 55 7000 0001',
      mobilePhone: '+52 1 55 8000 0001',
    },
    parents: [
      {
        id: 1,
        firstName: 'Carlos',
        lastName: 'Perez',
        email: 'carlos.perez@example.com',
        phoneNumber: '+52 55 1000 0001',
        mobilePhone: '+52 55 1000 0001',
        studentId: 1,
        relationshipTypeId: 1,
      },
      {
        id: 2,
        firstName: 'Laura',
        lastName: 'Perez',
        email: 'laura.perez@example.com',
        phoneNumber: '+52 55 1000 0001',
        mobilePhone: '+52 55 1000 0001',
        studentId: 1,
        relationshipTypeId: 2,
      },
    ],
  },
  {
    id: 2,
    schoolId: 70008,
    studentNumber: 'STU-2026-0002',
    contact: {
      id: 2,
      name: 'Maria Lopez',
      firstName: 'Maria',
      lastName: 'Lopez',
      email: 'maria.lopez@example.com',
      phoneNumber: '+52 55 7000 0002',
      mobilePhone: '+52 1 55 8000 0002',
    },
    parents: [
      {
        id: 3,
        firstName: 'Jose',
        lastName: 'Lopez',
        email: 'jose.lopez@example.com',
        phoneNumber: '+52 55 1000 0002',
        mobilePhone: '+52 55 1000 0002',
        studentId: 2,
        relationshipTypeId: 3,
      },
      {
        id: 4,
        firstName: 'Ana',
        lastName: 'Lopez',
        email: 'ana.lopez@example.com',
        phoneNumber: '+52 55 1000 0002',
        mobilePhone: '+52 55 1000 0002',
        studentId: 2,
        relationshipTypeId: 4,
      },
    ],
  },
  {
    id: 3,
    schoolId: 70009,
    studentNumber: 'STU-2026-0003',
    contact: {
      id: 3,
      name: 'Carlos Hernandez',
      firstName: 'Carlos',
      lastName: 'Hernandez',
      email: 'carlos.hernandez@example.com',
      phoneNumber: '+52 55 7000 0003',
      mobilePhone: '+52 1 55 8000 0003',
    },
    parents: [
      {
        id: 5,
        firstName: 'Miguel',
        lastName: 'Hernandez',
        email: 'miguel.hernandez@example.com',
        phoneNumber: '+52 55 1000 0003',
        mobilePhone: '+52 55 1000 0003',
        studentId: 3,
        relationshipTypeId: 5,
      },
      {
        id: 6,
        firstName: 'Patricia',
        lastName: 'Hernandez',
        email: 'patricia.hernandez@example.com',
        phoneNumber: '+52 55 1000 0003',
        mobilePhone: '+52 55 1000 0003',
        studentId: 3,
        relationshipTypeId: 6,
      },
    ],
  },
];

const lastStudentId = 3;
const lastContactId = 3;
const lastParentId = 6;

const mockStudentsClient = {
  getStudents: async () => {
    await sleep(RandomInt(1000, 5000));
    return { data: mockStudents };
  },
  createStudent: async data => {
    await sleep(RandomInt(1000, 5000));
    const newStudent = {
      ...data,
      id: lastStudentId + mockStudents.length,
      contact: { ...data.contact, id: lastContactId + mockStudents.length },
      parents: data.parents.map(p => ({ ...p, id: lastParentId + mockStudents.length })) || [],
    };
    mockStudents.push(newStudent);
    return {
      data: newStudent,
    };
  },
  getStudentById: async id => {
    await sleep(RandomInt(1000, 5000));
    const result = mockStudents.find(f => f.id == Number.parseInt(id));
    return { data: result };
  },
  updateStudent: async data => {
    await sleep(RandomInt(1000, 5000));
    const index = mockStudents.findIndex(f => f.id == data.id);
    if (index !== -1) {
      mockStudents[index] = data;
    }
    return {
      data: data,
    };
  },
  deleteStudent: async id => {
    await sleep(RandomInt(1000, 5000));
    mockStudents.splice(
      mockStudents.findIndex(f => f.id == id),
      1,
    );
    return {
      data: id,
    };
  },
};

export const StudentsClient = {
  getStudents: () =>
    !env.useMock ? mockStudentsClient.getStudents() : studentsClient.getStudents(),
  createStudent: data =>
    !env.useMock ? mockStudentsClient.createStudent(data) : studentsClient.createStudent(data),
  getStudentById: id =>
    !env.useMock ? mockStudentsClient.getStudentById(id) : studentsClient.getStudentById(id),
  updateStudent: (id, data) =>
    !env.useMock ? mockStudentsClient.updateStudent(data) : studentsClient.updateStudent(id, data),
  deleteStudent: id =>
    !env.useMock ? mockStudentsClient.deleteStudent(id) : studentsClient.deleteStudent(id),
};
