// @flow
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import {
  Row, Card, Radio, Icon, Menu,
} from 'antd';
import { Link } from 'react-router-dom';
import { Table, BarChart, TrendSpark } from 'apps/widgets';
import card from './card.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const withResources = resource => (WrappedComponent) => {
  class Resource extends React.Component<{}> {
    componentDidMount(): void {
      const { store } = this.props;
      store.fetchResources(resource);
    }

    render() {
      const { store } = this.props;

      return <WrappedComponent store={store} />;
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

const totalsColumns = [
  {
    title: 'Team',
    dataIndex: 'teamAbbr',
    key: 'team',
    render: text => <Link to={`/teams/${text.toLowerCase()}`}>{text}</Link>,
  },
  {
    title: 'Games',
    dataIndex: 'totalGames',
    key: 'games',
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
    render: percentage => `${percentage.toFixed(2)} %`,
  },
];

const seasonsColumns = [
  {
    title: 'Season',
    dataIndex: 'season',
    key: 'season',
  },
  ...totalsColumns,
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
        <Table size={'small'} columns={seasonsColumns} dataSource={franchise.seasonStats} />
      ) : (
        <BarChart data={franchise.seasonStats} />
      )}
    </Card>
  );
};

const FranchiseMenu = () => (
  <Menu selectedKeys={['totals']} mode={'horizontal'}>
    <Menu.Item key={'totals'}>{'Totals'}</Menu.Item>
  </Menu>
);

const Franchises = ({ store }) => {
  const columns = [
    ...totalsColumns,
    {
      title: 'Season Wins Trend',
      dataIndex: 'trend',
      key: 'trend',
      render: (text, record) => (
        <TrendSpark data={store.franchises.find(f => f.teamAbbr === record.teamAbbr).seasonStats} />
      ),
    },
  ];

  const franchiseTotals = store.franchises.map(franchise => ({
    teamAbbr: franchise.teamAbbr,
    totalGames: franchise.totalStats.totalGames,
    totalWins: franchise.totalStats.totalWins,
    totalLosses: franchise.totalStats.totalLosses,
    totalTies: franchise.totalStats.totalTies,
    winningPercentage: franchise.totalStats.winningPercentage,
  }));

  console.log('In Franchises');

  return <Table size={'small'} columns={columns} dataSource={franchiseTotals} pagination={false} />;
};

const FranchiseList = withResources('franchises')(observer(Franchises));

const FranchiseLayout = () => {
  console.log('In FranchiseLayout');

  return (
    <React.Fragment>
      <Row style={{ marginBottom: 20 }}>
        <FranchiseMenu />
      </Row>
      <Row>
        <FranchiseList />
      </Row>
    </React.Fragment>
  );
};

export default FranchiseLayout;
