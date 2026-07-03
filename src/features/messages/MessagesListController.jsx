import { withReactive } from '@/reactive';
import { MessagesList } from './components/MessagesList';
import { AddButton, RefreshButton } from '@/features/shared/components/buttons';
import { Filter } from '@/features/shared/components/filters';

const buildFilters = (types = [], priorities = []) => [
    { type: 'input', field: ['school', 'name'], title: 'School', placeholder: 'Search by school...' },
    {
        type: 'select',
        field: ['broadcastMessageType', 'id'],
        title: 'Type',
        placeholder: 'Select type',
        filterOption: '==',
        options: types.map(t => ({ value: t.id, label: t.name })),
    },
    {
        type: 'select',
        field: ['broadcastMessagePriority', 'id'],
        title: 'Priority',
        placeholder: 'Select priority',
        filterOption: '==',
        options: priorities.map(p => ({ value: p.id, label: p.name })),
    },
];

export const MessagesListController = withReactive(
    ({ data, monitors, services, onView, onEdit, onAdd }) => {
        const filters = buildFilters(
            data.broadcastMessageTypes,
            data.broadcastMessagePriorities,
        );

        return (
            <>
                <Filter collectionName="broadcastMessages" filters={filters}>
                    {({ filteredData }) => (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBottom: 16 }}>
                                <RefreshButton
                                    onClick={() => {
                                        services.broadcastMessages.getMessages();
                                        services.broadcastMessages.getTypes();
                                        services.broadcastMessages.getPriorities();
                                    }}
                                    isLoading={monitors.getMessages}
                                />
                                <AddButton onClick={onAdd} />
                            </div>
                            <MessagesList
                                data={filteredData || []}
                                loading={monitors.getMessages}
                                onView={onView}
                                onEdit={onEdit}
                                onDelete={(id) => services.broadcastMessages.deleteMessage(id)}
                            />
                        </>
                    )}
                </Filter>
            </>
        );
    },
    {
        init: ({ services }) => {
            services.broadcastMessages.getMessages();
            services.broadcastMessages.getTypes();
            services.broadcastMessages.getPriorities();
        },
        queries: () => [
            { name: 'broadcastMessageTypes', collection: 'broadcastMessageTypes', defaultValue: [] },
            { name: 'broadcastMessagePriorities', collection: 'broadcastMessagePriorities', defaultValue: [] },
        ],
        monitors: () => ['getMessages'],
    },
);