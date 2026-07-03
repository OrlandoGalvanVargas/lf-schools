import { useEffect } from 'react';
import { useQuery } from '@/reactive/hooks';
import useDeepCompareEffect from 'use-deep-compare-effect';

export const Query = ({ collection, name, defaultValue, where, setData }) => {
  const result = useQuery({ collection, where });
  useEffect(() => {
    setData(prev => ({
      ...prev,
      [name]: result ?? defaultValue,
    }));
  }, []);

  useDeepCompareEffect(() => {
    setData(prev => ({
      ...prev,
      [name]: result ?? defaultValue,
    }));
  }, [result]);

  return <></>;
};
