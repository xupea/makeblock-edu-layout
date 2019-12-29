import './index.less';

import React from 'react';
import classNames from 'classnames';
import { HeaderViewProps } from '../Header';
import { defaultRenderLogo, SiderMenuProps } from '../SiderMenu/SiderMenu';
import { WithFalse } from '../typings';

export interface GlobalHeaderProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  isMobile?: boolean;
  logo?: React.ReactNode;
  menuRender?: HeaderViewProps['menuRender'];
  collapsedButtonRender?: WithFalse<(collapsed?: boolean) => React.ReactNode>;
  rightContentRender?: HeaderViewProps['rightContentRender'];
  className?: string;
  style?: React.CSSProperties;
  menuHeaderRender?: SiderMenuProps['menuHeaderRender'];
}

const renderLogo = (
  menuHeaderRender: SiderMenuProps['menuHeaderRender'],
  logoDom: React.ReactNode,
) => {
  if (menuHeaderRender === false) {
    return null;
  }
  if (menuHeaderRender) {
    return menuHeaderRender(logoDom, null);
  }
  return logoDom;
};

const GlobalHeader: React.FC<GlobalHeaderProps> = props => {
  const {
    isMobile,
    logo,
    rightContentRender,
    menuHeaderRender,
    className: propClassName,
    style,
  } = props;
  const className = classNames(propClassName, 'ant-pro-global-header');

  const logoDom = (
    <a className="ant-pro-global-header-logo" key="logo">
      {defaultRenderLogo(logo)}
    </a>
  );
  return (
    <div className={className} style={style}>
      {isMobile && renderLogo(menuHeaderRender, logoDom)}
      <div style={{ flex: 1 }} />
      {rightContentRender && rightContentRender(props)}
    </div>
  );
};

export default GlobalHeader;
