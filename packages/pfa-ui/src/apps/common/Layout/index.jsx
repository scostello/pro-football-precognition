// @flow
import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';

const {
  Header, Content, Footer, Sider,
} = Layout;
const { SubMenu } = Menu;

export default () => {
  const [collapsed, onCollapsed] = React.useState(true);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={isCollapsed => onCollapsed(isCollapsed)}>
        <div className={'logo'} />
        <Menu theme={'dark'} defaultSelectedKeys={['1']} mode={'inline'}>
          <Menu.Item key={'1'}>
            <Icon type={'pie-chart'} />
            <span>Teams</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};
