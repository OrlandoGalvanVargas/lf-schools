import { withReactive } from '@/reactive';
import { useOnResultReactor } from '@/reactive/hooks';
import { MessagesForm } from './components/MessagesForm';

export const MessagesUpdateController = withReactive(
    ({ data, monitors, services, id, onSuccess, onCancel }) => {
        const message = data.broadcastMessages?.[0] || null;

        const handleSubmit = formData => {
            const { school, broadcastMessageType, broadcastMessagePriority, broadcastMessageEnvironmentType, broadcastMessageId, ...merged } = {
                ...message,
                ...formData,
                id: Number(id),
            };
            services.broadcastMessages.updateMessage(id, merged);
        };

        useOnResultReactor({
            updateMessage: {
                onSuccess: () => onSuccess?.(),
            },
        });

        return (
            <MessagesForm
                types={data.broadcastMessageTypes || []}
                priorities={data.broadcastMessagePriorities || []}
                environmentTypes={data.broadcastMessageEnvironmentTypes || []}
                initialValues={message}
                loading={monitors.updateMessage}
                onSubmit={handleSubmit}
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
            { name: 'broadcastMessageTypes', collection: 'broadcastMessageTypes', defaultValue: [] },
            { name: 'broadcastMessagePriorities', collection: 'broadcastMessagePriorities', defaultValue: [] },
            { name: 'broadcastMessageEnvironmentTypes', collection: 'broadcastMessageEnvironmentTypes', defaultValue: [] },
            { name: 'broadcastMessages', collection: 'broadcastMessages', where: [{ field: ["id"], op: "==", value: id }] },
        ],
        monitors: () => ['updateMessage'],
    },
);
