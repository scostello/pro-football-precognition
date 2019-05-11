// @flow
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import {
  Row, Col, Card, Radio, Icon,
} from 'antd';
import Sample from 'apps/widgets/Sample';
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

const TableChartGroup = () => (
  <RadioGroup defaultValue={'table'}>
    <RadioButton value={'table'}>
      <Icon type={'table'} />
    </RadioButton>
    <RadioButton value={'chart'}>
      <Icon type={'line-chart'} />
    </RadioButton>
  </RadioGroup>
);

const Franchises = ({ franchises }) => (
  <Row gutter={12}>
    {franchises.map(franchise => (
      <Col key={franchise.idFranchise} span={12}>
        <Card title={franchise.teamFull} className={card.base} extra={<TableChartGroup />}>
          <Sample data={franchise.seasonStats} />
        </Card>
      </Col>
    ))}
  </Row>
);

const withFranchises = withResources('franchises');

export default withFranchises(Franchises);
