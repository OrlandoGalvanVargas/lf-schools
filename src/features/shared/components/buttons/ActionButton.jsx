import { Button, Popconfirm, message } from "antd";

export const ActionButton = ({
  type,          
  icon,
  onClick,
  style,
  confirmTitle = "Are you sure you want to delete this item?",
}) => {
  const handleAction = () => {
    try {
      onClick();
    } catch {
      message.error("Error executing action");
    }
  };

  if (type === "delete") {
    return (
      <Popconfirm
        title={confirmTitle}
        onConfirm={handleAction}
        okText="Yes"
        cancelText="No"
      >
        <Button type="text" style={{ color: "#ff4516" }} icon={icon} />
      </Popconfirm>
    );
  }
  return (
    <Button
      type="text"
      style={style}
      icon={icon}
      onClick={handleAction}
    />
  );
};
