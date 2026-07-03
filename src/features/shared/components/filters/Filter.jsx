import { useMemo } from 'react';
import { useFilter } from '@/features/shared/hooks';
import { useQuery } from '@/reactive/hooks';
import { FilterBar } from './FilterBar';

export const Filter = ({ children, filters = [], collectionName = '' }) => {
  const [listFilter, setListFilter] = useFilter([]);

  const data = useQuery({
    collection: collectionName,
    where: listFilter,
  });

  const filtersEdited = useMemo(() => {
    return filters.map(f => {
      return {
        ...f,
        onChange:
          f.type === 'input'
            ? ({ target }) => {
                setListFilter({
                  field: f.field,
                  value: target.value,
                  op: f.filterOption || 'contains',
                });
              }
            : value => {
                setListFilter({
                  field: f.field,
                  value: value === undefined ? '' : value,
                  op: f.filterOption || 'contains',
                });
              },
      };
    });
  }, [filters, setListFilter]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <FilterBar filters={filtersEdited} />
      </div>
      <br />
      {children({ filteredData: data })}
    </div>
  );
};
