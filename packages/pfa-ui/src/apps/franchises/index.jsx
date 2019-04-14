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

const withResources = resource => (WrappedComponent) => {
  class Resource extends React.Component<{}> {
    componentDidMount(): void {
      const { store } = this.props;
      store.getFranchises();
    }

    render() {
      const {
        store: { state, franchises },
      } = this.props;

      return <WrappedComponent loadingState={state} franchises={franchises} />;
    }
  }

  return inject('store')(observer(Resource));
};

const Franchises = ({ franchises }) => {
  console.log(franchises.length);

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
};

const withFranchises = withResources('franchises');

export default withFranchises(Franchises);
