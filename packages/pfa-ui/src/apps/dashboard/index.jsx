// @flow
import * as React from 'react';
import {
  Row, Col, Card, Divider, Statistic,
} from 'antd';

const TopTeams = () => (
  <Card title={'Top Teams'} extra={<a href="#">More</a>}>
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </Card>
);

const TopPerformers = () => (
  <Card title={'Top Performers'} extra={<a href="#">More</a>}>
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </Card>
);

const Trending = () => (
  <Card title={'Trending'} extra={<a href="#">More</a>}>
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </Card>
);

const SimpleCard = ({ children }) => <Card>{children}</Card>;

export const DashboardLayout = () => (
  <React.Fragment>
    <Row gutter={8}>
      <Col span={6}>
        <SimpleCard>
          <Statistic title={'Total Plays'} value={'829,261'} />
        </SimpleCard>
      </Col>
      <Col span={6}>
        <SimpleCard>
          <Statistic title={'Total Games'} value={'5,057'} />
        </SimpleCard>
      </Col>
      <Col span={6}>
        <SimpleCard>
          <Statistic title={'Total Touchdowns'} value={'24,858'} />
        </SimpleCard>
      </Col>
      <Col span={6}>
        <SimpleCard>
          <Statistic title={'Total Champions'} value={'18'} />
        </SimpleCard>
      </Col>
    </Row>
    <Divider />
    <Row gutter={8}>
      <Col span={8}>
        <TopTeams />
      </Col>
      <Col span={8}>
        <TopPerformers />
      </Col>
      <Col span={8}>
        <Trending />
      </Col>
    </Row>
  </React.Fragment>
);

export default DashboardLayout;
