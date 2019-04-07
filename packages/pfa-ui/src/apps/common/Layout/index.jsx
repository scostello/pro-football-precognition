// @flow
import * as React from 'react';
import { Layout as AntdLayout, Menu, Icon } from 'antd';
import {
  withRouter, Link, Route, Switch,
} from 'react-router-dom';
import Header from './Header';
import layout from './Layout.less';

const { Content, Sider } = AntdLayout;

export const Layout = ({ menuItems, location }) => {
  const [collapsed, onCollapsed] = React.useState(true);

  const selectedMenuItems = menuItems.filter(item => item.href === location.pathname);

  return (
    <AntdLayout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={isCollapsed => onCollapsed(isCollapsed)}
        className={layout.sider}
      >
        <div className={layout.logo}>LOGO</div>
        <Menu
          className={layout.siderMenu}
          defaultSelectedKeys={selectedMenuItems.map(item => item.key)}
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
      <AntdLayout className={layout.mainContentWrapper}>
        <Header className={layout.header} activeMenuItem={selectedMenuItems[0]} />
        <Content style={{ margin: '16px' }}>
          <Switch>
            {menuItems.map(item => (
              <Route key={item.key} path={item.href} component={item.content} />
            ))}
          </Switch>
        </Content>
      </AntdLayout>
    </AntdLayout>
  );
};

export default withRouter(Layout);
