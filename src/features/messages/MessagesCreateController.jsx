import { withReactive } from '@/reactive';
import { useOnResultReactor } from '@/reactive/hooks';
import { MessagesForm } from './components/MessagesForm';

export const MessagesCreateController = withReactive(
    ({ data, monitors, services, onSuccess, onCancel }) => {
        const handleSubmit = formData => {
            services.broadcastMessages.createMessage(formData);
        };

        useOnResultReactor({
            createMessage: {
                onSuccess: () => onSuccess?.(),
            },
        });

        return (
            <MessagesForm
                types={data.broadcastMessageTypes || []}
                priorities={data.broadcastMessagePriorities || []}
                environmentTypes={data.broadcastMessageEnvironmentTypes || []}
                loading={monitors.createMessage}
                onSubmit={handleSubmit}
                onCancel={onCancel}
            />
        );
    },
    {
        init: ({ services }) => {
            services.broadcastMessages.getTypes();
            services.broadcastMessages.getPriorities();
            services.broadcastMessages.getEnvironmentTypes();
        },
        queries: () => [
            { name: 'broadcastMessageTypes', collection: 'broadcastMessageTypes', defaultValue: [] },
            { name: 'broadcastMessagePriorities', collection: 'broadcastMessagePriorities', defaultValue: [] },
            { name: 'broadcastMessageEnvironmentTypes', collection: 'broadcastMessageEnvironmentTypes', defaultValue: [] },
        ],
        monitors: () => ['createMessage'],
    },
);
