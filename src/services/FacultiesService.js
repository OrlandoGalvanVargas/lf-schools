import { CreateService } from '@/reactive';
import { AlertService } from './AlertService';
import { FacultiesClient } from '../sdk/clients/FacultiesClient';

const collectionFaculties = 'faculties';
const collectionFacultyRoleTypes = 'facultyRoleTypes';

export const facultiesReactor = {
    onSuccess: ({ action, payload, params, db }) => {
        switch (action) {
            case 'getFacultyRoleTypes':
                db.collection(collectionFacultyRoleTypes).bulkCreateOrUpdate(payload);
                break;
            case 'getFaculties':
            case 'getByDistrictId':
            case 'getBySchoolId':
                db.collection(collectionFaculties).bulkCreateOrUpdate(payload);
                break;
            case 'getFacultyById':
                if (payload) {
                    db.collection(collectionFaculties).createOrUpdate(payload);
                }
                break;
            case 'createFaculty':
                AlertService.success('Faculty created successfully');
                db.collection(collectionFaculties).createOrUpdate(payload);
                break;
            case 'updateFaculty':
                AlertService.success('Faculty updated successfully');
                db.collection(collectionFaculties).createOrUpdate(params[1]);
                break;
            case 'deleteFaculty':
                db.collection(collectionFaculties).deleteOne(params[0]);
                AlertService.success('Faculty deleted successfully');
                break;
        }
    },
    onError: ({ action, error }) => {
        switch (action) {
            case 'getFaculties':
                AlertService.error('Failed to load faculties');
                break;
            case 'getFacultyById':
                AlertService.error('Failed to load faculty details');
                break;
            case 'createFaculty':
                AlertService.error('Failed to create faculty');
                break;
            case 'updateFaculty':
                AlertService.error('Failed to update faculty');
                break;
            case 'deleteFaculty':
                AlertService.error('Failed to delete faculty');
                break;
        }
    },
};

export const FacultiesService = CreateService(FacultiesClient, facultiesReactor);