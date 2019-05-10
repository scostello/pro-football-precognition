// @flow
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import {
  Row, Col, Card, Table,
} from 'antd';
import Sample from 'apps/widgets/Sample';
import card from './card.less';

const columns = [
  {
    title: 'Games',
    dataIndex: 'games',
    key: 'games',
  },
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
    title: 'Ties',
    dataIndex: 'ties',
    key: 'ties',
  },
  {
    title: 'Win %',
    dataIndex: 'winPerc',
    key: 'winPerc',
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

const Franchises = ({ franchises }) => (
  <Row gutter={12}>
    {franchises.map(franchise => (
      <Col key={franchise.idFranchise} span={12}>
        <Card title={franchise.teamFull} className={card.base}>
          <Sample data={franchise.seasonStats} />
        </Card>
      </Col>
    ))}
  </Row>
);

const withFranchises = withResources('franchises');

export default withFranchises(Franchises);
