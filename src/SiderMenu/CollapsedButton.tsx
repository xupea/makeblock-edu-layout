import React from 'react';
import { Icon } from 'antd';

interface CollapsedButtonProps {
  collapsed?: boolean;
  toggle?: () => void;
}

const CollapsedButton: React.FC<CollapsedButtonProps> = props => {
  const { collapsed, toggle } = props;

  return (
    <button
      type="button"
      className="ant-pro-sider-menu-button ant-pro-sider-menu-collapse"
      onClick={toggle}
    >
      <Icon type={collapsed ? 'right' : 'left'} />
    </button>
  );
};

export default CollapsedButton;
