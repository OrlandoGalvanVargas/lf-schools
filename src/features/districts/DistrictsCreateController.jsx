import { withReactive } from '@/reactive';
import { useOnResultReactor } from '@/reactive/hooks';
import { DistrictsForm } from './components';

export const DistrictsCreateController = withReactive(
  ({ services, monitors, onCreate, onCancel }) => {
    const handleSubmit = (formData, addresses = []) => {
      const payload = {
        name: formData.name,
        timeZone: formData.timeZone,
        contact: {
          firstName: formData.contactFirstName,
          lastName: formData.contactLastName,
          name: `${formData.contactFirstName} ${formData.contactLastName}`.trim(),
          email: formData.contactEmail,
          phoneNumber: formData.contactPhoneNumber,
          mobilePhone: formData.contactMobilePhone,
        },
        addresses,
      };
      services.districts.createDistrict(payload);
    };

    useOnResultReactor({
      createDistrict: {
        onSuccess: () => onCreate?.(),
      },
    });

    return (
      <DistrictsForm
        mode="create"
        loading={monitors.createDistrict}
        onSubmit={handleSubmit}
        onCancel={onCancel}
      />
    );
  },
  {
    init: () => {},
    queries: () => [],
    monitors: () => ['createDistrict'],
  },
);
