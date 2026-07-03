import { useEffect, useState } from 'react';

const buildMonitors = monitors => {
  return monitors.reduce((acc, monitor) => {
    acc[monitor] = false;
    return acc;
  }, {});
};

export const useMonitors = monitors => {
  const [monitorsState, setMonitors] = useState(buildMonitors(monitors ? monitors() : []));

  useEffect(() => {
    if (!monitors) return;

    const _monitors = monitors();

    const handleOnStart = event => {
      setMonitors(prev => ({ ...prev, [event.detail.action]: true }));
    };
    const handleOnSuccess = event => {
      setMonitors(prev => ({ ...prev, [event.detail.action]: false }));
    };
    const handleOnError = event => {
      setMonitors(prev => ({ ...prev, [event.detail.action]: false }));
    };

    _monitors.forEach(monitor => {
      window.addEventListener(`lf:${monitor}:start`, handleOnStart);
      window.addEventListener(`lf:${monitor}:success`, handleOnSuccess);
      window.addEventListener(`lf:${monitor}:error`, handleOnError);
    });

    return () => {
      _monitors.forEach(monitor => {
        window.removeEventListener(`lf:${monitor}:start`, handleOnStart);
        window.removeEventListener(`lf:${monitor}:success`, handleOnSuccess);
        window.removeEventListener(`lf:${monitor}:error`, handleOnError);
      });
    };
  }, []);

  return monitorsState;
};
