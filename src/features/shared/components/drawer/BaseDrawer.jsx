import { Drawer } from 'antd';

export const BaseDrawer = ({ title, placement = 'right', size = 480, open, onClose, children }) => {
  return (
    <Drawer
      title={title}
      placement={placement}
      size={size}
      open={open}
      onClose={onClose}
      destroyOnHidden
    >
      {children}
    </Drawer>
  );
};
