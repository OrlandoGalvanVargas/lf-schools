import { CreateService } from '@/reactive';
import { StudentsClient } from '@/sdk/clients';
import { AlertService } from './AlertService';

const COLLECTION_NAME = 'students';

export const studentsReactor = {
  onSuccess: ({ action, payload, db, params }) => {
    switch (action) {
      case 'getStudents':
        db.collection(COLLECTION_NAME).bulkWrite(payload);
        break;
      case 'getStudentById':
        db.collection(COLLECTION_NAME).createOrUpdate(payload);
        break;
      case 'updateStudent':
        db.collection(COLLECTION_NAME).createOrUpdate(payload);
        AlertService.success('Student updated');

        break;
      case 'createStudent':
        db.collection(COLLECTION_NAME).createOrUpdate(payload);
        AlertService.success('Student created');

        break;
      case 'deleteStudent':
        db.collection(COLLECTION_NAME).deleteOne(params[0]);
        AlertService.success('Student deleted');
        break;
    }
  },
  onError: ({ action }) => {
    switch (action) {
      case 'getStudents':
        AlertService.error('Students not found');
        break;
      case 'getStudentById':
        AlertService.error('Student not found');
        break;
      case 'createStudent':
        AlertService.error('Student not created');
        break;
      case 'updateStudent':
        AlertService.error('Student not updated');
        break;
      case 'deleteStudent':
        AlertService.error('Student not deleted');
        break;
    }
  },
};

export const StudentsService = CreateService(StudentsClient, studentsReactor);
