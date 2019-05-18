// @flow
import * as React from 'react';
import { Layout as AntdLayout } from 'antd';
import { withRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import SideNav from './SideNav';
import layout from './layout.less';

const { Content } = AntdLayout;

export const Layout = ({ menuItems, location }) => {
  const [collapsed, onCollapsed] = React.useState(false);

  const selectedMenuItems = menuItems.filter(item => item.href === location.pathname);

  return (
    <AntdLayout style={{ minHeight: '100vh' }}>
      <SideNav
        collapsed={collapsed}
        handleCollapse={isCollapsed => onCollapsed(isCollapsed)}
        menuItems={menuItems}
      />
      <AntdLayout className={layout.mainContentWrapper}>
        <Header className={layout.header} activeMenuItem={selectedMenuItems[0]} />
        <Content style={{ margin: '16px' }}>
          <Switch>
            {menuItems.map(item => (
              <Route exact key={item.key} path={item.href} component={item.content} />
            ))}
          </Switch>
        </Content>
      </AntdLayout>
    </AntdLayout>
  );
};

export default withRouter(Layout);
