import { withReactive } from "@/reactive";
import { useOnResultReactor } from '@/reactive/hooks';
import { SchoolsForm } from "./components/SchoolsForm";


export const SchoolsCreateController = withReactive(
  ({ services, onComplete, onCancel }) => {

    useOnResultReactor({
      createSchool: {
        onSuccess: () => onComplete(),
      },
    });

    const handleUpdate = (data, addresses = []) => {
      const payload = {
        ...data,
        addresses: addresses
      };
      services.schools.createSchool(payload);
    }


    return (
      <div>
        <SchoolsForm onSubmit={handleUpdate} onCancel={onCancel} />
      </div>
    );
  },
  {
    init: () => {
    },
    queries: () => [
    ],
    monitors: () => [
      
    ]
  }
)