import { CreateService } from '@/reactive';
import { BroadcastMessageClient } from '@/sdk/clients';
import { AlertService } from './AlertService';

export const broadcastMessageReactor = {
    onSuccess: ({ action, payload, params, db }) => {
        switch (action) {
            case 'getMessages':
                db.collection('broadcastMessages').bulkCreateOrUpdate(payload);
                break;
            case 'createMessage':
                AlertService.success('Message created successfully');
                db.collection('broadcastMessages').createOrUpdate(payload);
                break;
            case 'updateMessage':
                AlertService.success('Message updated successfully');
                db.collection('broadcastMessages').createOrUpdate(params[1]);
                break;
            case 'deleteMessage':
                AlertService.success('Message deleted successfully');
                db.collection('broadcastMessages').deleteOne(params[0]);
                break;  
            case 'getTypes':
                db.collection('broadcastMessageTypes').bulkWrite(payload);
                break;
            case 'getPriorities':
                db.collection('broadcastMessagePriorities').bulkWrite(payload);
                break;
            case 'getEnvironmentTypes':
                db.collection('broadcastMessageEnvironmentTypes').bulkWrite(payload);
                break;
            case 'getMessageById':
                db.collection('broadcastMessages').createOrUpdate(payload);
                break;
            case 'getBySchoolId':
                db.collection('broadcastMessages').bulkCreateOrUpdate(payload);
                break;
        }
    },
    onError: ({ action, error }) => {
        switch (action) {
            case 'getMessages':
                AlertService.error(error?.response?.data?.message || 'Failed to load messages');
                break;
            case 'createMessage':
                AlertService.error(error?.response?.data?.message || 'Failed to create message');
                break;
            case 'updateMessage':
                AlertService.error(error?.response?.data?.message || 'Failed to update message');
                break;
            case 'deleteMessage':
                AlertService.error(error?.response?.data?.message || 'Failed to delete message');
                break;
            case 'getBySchoolId':
                AlertService.error(error?.response?.data?.message || 'Failed to get messages by school id');
                break;
        }
    },
};

export const BroadcastMessageService = CreateService(BroadcastMessageClient, broadcastMessageReactor);
