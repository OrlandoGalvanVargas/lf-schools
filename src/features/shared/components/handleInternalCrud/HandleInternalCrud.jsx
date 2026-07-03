import { Flex } from 'antd';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { useInternalCrud } from '@/features/shared/hooks/useInternalCrud';
import { ItemList } from '@/features/shared/components/itemList';
import { AddButton } from '@/features/shared/components/buttons';
import { BaseDrawer } from '@/features/shared/components/drawer/';

export const HandleInternalCrud = ({
  initListData = [],
  setData,
  readOnly,
  dataForm,
  showInfo,
}) => {
  const [
    list,
    form,
    isOpen,
    isReadOnly,
    addData,
    deleteData,
    showData,
    editData,
    closeDrawer,
    openDrawer,
    setList,
  ] = useInternalCrud([]);

  useDeepCompareEffect(() => {
    setList(initListData);
  }, [initListData]);

  useDeepCompareEffect(() => {
    setData(list);
  }, [list]);

  return (
    <>
      <BaseDrawer open={isOpen} onClose={closeDrawer}>
        {dataForm({ closeDrawer, addData, form, isReadOnly })}
      </BaseDrawer>
      <Flex vertical={true} gap={'middle'}>
        {!readOnly && (
          <Flex justify="flex-start" gap={'middle'}>
            <AddButton onClick={openDrawer} />
          </Flex>
        )}
        <ItemList
          data={list}
          onDelete={!readOnly && (({ index }) => deleteData(index))}
          onEdit={!readOnly && (({ item, index }) => editData(item, index))}
          onDetails={({ item }) => showData(item)}
        >
          {showInfo}
        </ItemList>
      </Flex>
    </>
  );
};
