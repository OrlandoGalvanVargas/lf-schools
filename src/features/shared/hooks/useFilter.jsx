import { useState } from 'react';
import { useCallback } from 'react';

export const useFilter = (initialValue = []) => {
  const [where, setWhere] = useState(initialValue);

  const updateFilterList = useCallback(({ field, value, op }) => {
    setWhere(filterList => {
      const exist = filterList.some(item => item.constraint == field);
      if (exist && value.length == 0) return filterList.filter(item => item.constraint != field);

      if (exist)
        return filterList.map(item =>
          item.constraint == field ? { ...item, value: value } : item,
        );
      return [
        ...filterList,
        {
          constraint: field,
          field: field,
          op: op,
          value: value,
        },
      ];
    });
  }, []);

  const clearFilterList = () => setWhere([]);

  return [where, updateFilterList, clearFilterList];
};
