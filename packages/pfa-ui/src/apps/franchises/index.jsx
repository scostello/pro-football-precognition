// @flow
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import {
  Row, Col, Card, Radio, Icon,
} from 'antd';
import { Table, BarChart } from 'apps/widgets';
import card from './card.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

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

const TableChartGroup = ({ selected, handleChange }) => (
  <RadioGroup value={selected} onChange={e => handleChange(e.target.value)} defaultValue={'table'}>
    <RadioButton value={'table'}>
      <Icon type={'table'} />
    </RadioButton>
    <RadioButton value={'chart'}>
      <Icon type={'line-chart'} />
    </RadioButton>
  </RadioGroup>
);

const columns = [
  {
    title: 'Season',
    dataIndex: 'season',
    key: 'season',
  },
  {
    title: 'Wins',
    dataIndex: 'totalWins',
    key: 'wins',
  },
  {
    title: 'Losses',
    dataIndex: 'totalLosses',
    key: 'losses',
  },
  {
    title: 'Ties',
    dataIndex: 'totalTies',
    key: 'ties',
  },
  {
    title: 'Winning Percentage',
    dataIndex: 'winningPercentage',
    key: 'winning_percentage',
  },
];

const TeamCard = ({ franchise }) => {
  const [displayAs, setDisplayAs] = React.useState('chart');

  return (
    <Card
      title={franchise.teamFull}
      className={card.base}
      extra={<TableChartGroup selected={displayAs} handleChange={value => setDisplayAs(value)} />}
    >
      {displayAs === 'table' ? (
        <Table size={'small'} columns={columns} dataSource={franchise.seasonStats} />
      ) : (
        <BarChart data={franchise.seasonStats} />
      )}
    </Card>
  );
};

const Franchises = ({ franchises }) => (
  <Row gutter={12}>
    {franchises.map(franchise => (
      <Col key={franchise.idFranchise} span={12}>
        <TeamCard franchise={franchise} />
      </Col>
    ))}
  </Row>
);

const withFranchises = withResources('franchises');

export default withFranchises(Franchises);
