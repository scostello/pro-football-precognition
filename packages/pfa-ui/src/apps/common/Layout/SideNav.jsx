// @flow
import * as React from 'react';
import { Layout as AntdLayout, Icon, Menu } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import layout from './layout.less';

const { Sider } = AntdLayout;

export const SideNav = ({
  collapsed, handleCollapse, menuItems, location,
}) => (
  <Sider collapsible collapsed={collapsed} onCollapse={handleCollapse} className={layout.sider}>
    <div className={layout.logo}>LOGO</div>
    <Menu
      className={layout.siderMenu}
      defaultSelectedKeys={menuItems
        .filter(item => item.href === location.pathname)
        .map(item => item.key)}
      mode={'inline'}
    >
      {menuItems.map(item => (
        <Menu.Item key={item.key} className={layout.siderMenuitem}>
          <Link to={item.href}>
            <Icon type={'pie-chart'} />
            <span>{item.label}</span>
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  </Sider>
);

export default withRouter(SideNav);
