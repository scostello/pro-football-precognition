// @flow
import * as React from 'react';
import { Row, Col } from 'antd';

const Header = ({ activeMenuItem, className }) => (
  <header className={className}>
    <Row>
      <Col span={12}>{activeMenuItem.label}</Col>
      <Col span={12}>Right</Col>
    </Row>
  </header>
);

export default Header;
