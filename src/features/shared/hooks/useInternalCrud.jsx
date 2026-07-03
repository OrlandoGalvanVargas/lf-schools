import { useState } from 'react';

export const useInternalCrud = initList => {
  const [list, setList] = useState(initList);
  const [form, setForm] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [itemIndex, setItemIndex] = useState(null);

  const addData = data => {
    setList(prev => {
      if (itemIndex !== null) return prev.map((p, i) => (i === itemIndex ? data : p));
      return [...prev, data];
    });

    closeDrawer();
  };

  const deleteData = index => {
    setList(prev => prev.filter((p, i) => i !== index));
  };

  const showData = data => {
    setForm(data);
    setIsReadOnly(true);
    setIsOpen(true);
  };

  const editData = (data, index) => {
    setForm(data);
    setItemIndex(index);
    setIsReadOnly(false);
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
    setForm({});
    setItemIndex(null);
    setIsReadOnly(false);
  };

  const openDrawer = () => {
    setForm({});
    setIsReadOnly(false);
    setItemIndex(null);
    setIsOpen(true);
  };

  return [
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
  ];
};
