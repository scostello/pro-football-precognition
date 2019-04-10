// @flow
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import {
  Row, Col, Card, Table,
} from 'antd';
import Logo from 'apps/common/Logos';
import Spark from './Spark';
import card from './card.less';

const dataSource = [
  {
    key: '1',
    wins: 100,
    losses: 41,
    win_perc: (100 / 141) * 100,
  },
  {
    key: '2',
    wins: 100,
    losses: 41,
    win_perc: (100 / 141) * 100,
  },
];

const columns = [
  {
    title: 'Wins',
    dataIndex: 'wins',
    key: 'wins',
  },
  {
    title: 'Losses',
    dataIndex: 'losses',
    key: 'losses',
  },
  {
    title: 'Win %',
    dataIndex: 'win_perc',
    key: 'win_perc',
  },
];

export class Franchises extends React.Component<{}> {
  constructor(props) {
    super(props);
    props.store.getFranchises();
  }

  render() {
    const {
      store: { franchises },
    } = this.props;
    return (
      <Row gutter={12}>
        {franchises.map(franchise => (
          <Col key={franchise.idFranchise} span={12}>
            <Card title={franchise.teamFull} className={card.base}>
              <Spark />
              <Table dataSource={dataSource} columns={columns} size={'small'} pagination={false} />
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
}

export default inject('store')(observer(Franchises));
