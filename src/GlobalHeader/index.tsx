import './index.less';

import React, { Component } from 'react';
import { PageHeader } from 'antd';
import classNames from 'classnames';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { HeaderViewProps } from '../Header';
import { defaultRenderLogo, SiderMenuProps } from '../SiderMenu/SiderMenu';
import { isBrowser } from '../utils/utils';
import { WithFalse } from '../typings';
import { BreadcrumbProps } from '../utils/getBreadcrumbProps';

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
  breadcrumbProps: BreadcrumbProps;
}

const defaultRenderCollapsedButton = (collapsed?: boolean) =>
  collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />;

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

export default class GlobalHeader extends Component<GlobalHeaderProps> {
  triggerResizeEvent = () => {
    if (isBrowser()) {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', true, false);
      window.dispatchEvent(event);
    }
  };

  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    if (onCollapse) onCollapse(!collapsed);
    this.triggerResizeEvent();
  };

  renderCollapsedButton = () => {
    const {
      collapsed,
      collapsedButtonRender = defaultRenderCollapsedButton,
      menuRender,
    } = this.props;

    if (collapsedButtonRender !== false && menuRender !== false) {
      return (
        <span className="ant-pro-global-header-trigger" onClick={this.toggle}>
          {collapsedButtonRender(collapsed)}
        </span>
      );
    }

    return null;
  };

  render(): React.ReactNode {
    const {
      isMobile,
      logo,
      rightContentRender,
      menuHeaderRender,
      className: propClassName,
      style,
      breadcrumbProps,
    } = this.props;
    const className = classNames(propClassName, 'ant-pro-global-header');

    const logoDom = (
      <span className="ant-pro-global-header-logo" key="logo">
        {defaultRenderLogo(logo)}
      </span>
    );
    console.log()
    return (
      <div className={className} style={style}>
        {isMobile && renderLogo(menuHeaderRender, logoDom)}
        <PageHeader title={null} breadcrumb={breadcrumbProps} />
        <div style={{ flex: 1 }} />
        {rightContentRender && rightContentRender(this.props)}
      </div>
    );
  }
}
