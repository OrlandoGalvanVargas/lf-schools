import { withReactive } from '@/reactive';
import { DistrictsForm, DistrictDetailTables } from './components';

export const DistrictsDetailController = withReactive(
  ({ data, onCancel, id }) => {
    const district = data.districts?.[0] || null;

    return (
      <>
        <DistrictsForm mode="detail" initialValues={district} readOnly onCancel={onCancel} />
        <DistrictDetailTables districtId={id} />
      </>
    );
  },
  {
    init: ({ services, id }) => {
      services.districts.getDistrictById(id);
    },
    queries: ({ id }) => [
      {
        name: 'districts',
        collection: 'districts',
        where: [{ field: ['id'], op: '==', value: id }],
      },
    ],
    monitors: () => ['getDistrictById'],
  },
);
