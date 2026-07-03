import { useEffect, useState } from 'react';
import { useMonitors } from '@/reactive/hooks';
import services from '@/services';
import { Query } from './Query';

export const withReactive = (Component, options = {}) => {
  const Wrapper = ({ ...props }) => {
    const [data, setData] = useState({});
    const monitors = useMonitors(options.monitors);

    useEffect(() => {
      options.init({ services, ...props });
    }, []);

    const handleOnSetData = data => {
      setData(data);
    };

    return (
      <>
        {options.queries({ ...props }).map(query => (
          <Query
            key={query.name}
            collection={query.collection}
            name={query.name}
            defaultValue={query.defaultValue}
            where={query.where}
            setData={handleOnSetData}
          />
        ))}
        <Component data={data} monitors={monitors} services={services} {...props} />
      </>
    );
  };

  return Wrapper;
};
