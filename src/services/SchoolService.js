import { SchoolClient } from '@/sdk/clients/SchoolClient';
import { CreateService } from '@/reactive';
import { AlertService } from './AlertService';


export const SchoolReactor = {
    onSuccess: ({ action, payload, db, params }) => {
        switch (action) {
            case 'getSchools':
            case 'getSchoolsByDistrict':
                db.collection('schools').bulkCreateOrUpdate(payload);
                break;
            case 'createSchool':
                db.collection('schools').createOrUpdate(payload);
                AlertService.success('School created successfully');
                break;
            case 'updateSchool':
                db.collection('schools').createOrUpdate(payload);
                AlertService.success('School updated successfully');
                break;
            case 'getSchoolById':
                db.collection('schools').createOrUpdate(payload);
                break;
            case 'deleteSchool':
                db.collection('schools').deleteOne(params[0]);
                AlertService.success('School deleted successfully');
                break;
        }
    },

    onError: ({ action, error }) => {
        switch (action) {
            case 'getSchools':
            case 'getSchoolsByDistrict':
                AlertService.error('Failed to retrieve schools');
                break;
            case 'createSchool':
                AlertService.error('Failed to create school');
                break;
            case 'updateSchool':
                AlertService.error('Failed to update school');
                break;
            case 'getSchoolById':
                AlertService.error('Failed to retrieve school');
                break;
            case 'deleteSchool':
                AlertService.error('Failed to delete school');
                break;
        }

    }
}

export const SchoolService = CreateService(SchoolClient, SchoolReactor);