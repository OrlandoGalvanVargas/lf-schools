import { withReactive } from '@/reactive';
import { MessagesForm } from './components/MessagesForm';

export const MessagesDetailController = withReactive(
    ({ data, monitors, onCancel }) => {
        const message = data.broadcastMessages?.[0] || null;

        return (
            <MessagesForm
                types={data.broadcastMessageTypes || []}
                priorities={data.broadcastMessagePriorities || []}
                environmentTypes={data.broadcastMessageEnvironmentTypes || []}
                initialValues={message}
                disabled
                onCancel={onCancel}
            />
        );
    },
    {
        init: ({ services, id }) => {
            services.broadcastMessages.getMessageById(id);
            services.broadcastMessages.getTypes();
            services.broadcastMessages.getPriorities();
            services.broadcastMessages.getEnvironmentTypes();
        },
        queries: ({ id }) => [
            { name: 'broadcastMessageTypes', collection: 'broadcastMessageTypes' },
            { name: 'broadcastMessagePriorities', collection: 'broadcastMessagePriorities' },
            { name: 'broadcastMessageEnvironmentTypes', collection: 'broadcastMessageEnvironmentTypes' },
            { name: 'broadcastMessages', collection: 'broadcastMessages', where: [{ field: ["id"], op: "==", value: id }] },
        ],
        monitors: () => ['getMessageById'],
    },
);
