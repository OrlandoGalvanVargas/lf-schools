import { withReactive } from '@/reactive';
import { useOnResultReactor } from '@/reactive/hooks';
import { DistrictsForm } from './components';

export const DistrictsUpdateController = withReactive(
  ({ data, monitors, services, id, onSuccess, onCancel }) => {
    const district = data.districts?.[0] || null;

    const handleSubmit = (formData, addresses = []) => {
      const payload = {
        id: district.id,
        name: formData.name,
        timeZone: formData.timeZone,
        contactId: district.contactId,
        contact: {
          id: district.contact?.id,
          firstName: formData.contactFirstName,
          lastName: formData.contactLastName,
          name: `${formData.contactFirstName} ${formData.contactLastName}`.trim(),
          email: formData.contactEmail,
          phoneNumber: formData.contactPhoneNumber,
          mobilePhone: formData.contactMobilePhone,
        },
        addresses,
      };
      services.districts.updateDistrict(id, payload);
    };

    useOnResultReactor({
      updateDistrict: {
        onSuccess: () => onSuccess?.(),
      },
    });

    return (
      <DistrictsForm
        mode="update"
        initialValues={district}
        loading={monitors.updateDistrict}
        onSubmit={handleSubmit}
        onCancel={onCancel}
      />
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
    monitors: () => ['updateDistrict', 'getDistrictById'],
  },
);
