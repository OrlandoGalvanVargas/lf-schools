import { useLocalStorage } from '@uidotdev/usehooks';
import { useMemo } from 'react';

function getNestedValue(object = [], path = {}) {
  return path.reduce((acc, key) => acc?.[key], object);
}

function options({ where, table }) {
  switch (where?.op) {
    case '==':
      return table?.filter(item => getNestedValue(item, where.field) == where.value);
    case 'contains':
      return table?.filter(item => {
        return getNestedValue(item, where.field).toLowerCase().includes(where.value.toLowerCase());
      });
    case 'byId':
      return table?.find(item => item.id == where.value) || {};
    default:
      return table || [];
  }
}

export const useQuery = ({ collection, where = [] }) => {
  const [table] = useLocalStorage(collection);

  const result = useMemo(() => {
    let editedData = table || [];

    where.map(constraint => {
      editedData = options({ where: constraint, table: editedData });
    });
    return editedData;
  }, [table, where]);

  return result;
};
