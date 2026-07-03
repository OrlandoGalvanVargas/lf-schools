import { useEffect } from 'react';

const getHandlers = reactor => {
  if (typeof reactor === 'function') return { onSuccess: reactor, onError: null };
  return { onSuccess: reactor?.onSuccess, onError: reactor?.onError };
};

export const useOnResultReactor = reactors => {
  useEffect(() => {
    if (!reactors) return;

    const actions = Object.keys(reactors);

    const handleOnSuccess = event => {
      const { action } = event.detail;
      const { onSuccess } = getHandlers(reactors[action]);
      onSuccess?.();
    };

    const handleOnError = event => {
      const { action } = event.detail;
      const { onError } = getHandlers(reactors[action]);
      onError?.();
    };

    actions.forEach(action => {
      window.addEventListener(`lf:${action}:success`, handleOnSuccess);
      window.addEventListener(`lf:${action}:error`, handleOnError);
    });

    return () => {
      actions.forEach(action => {
        window.removeEventListener(`lf:${action}:success`, handleOnSuccess);
        window.removeEventListener(`lf:${action}:error`, handleOnError);
      });
    };
  }, []);
};
