import toast from 'react-hot-toast';

export const AlertService = {
  success: message => {
    toast.success(message);
  },
  error: message => {
    toast.error(message);
  },
};
