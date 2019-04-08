// @flow
import * as React from 'react';
import { Row, Col, Card } from 'antd';
import { api } from 'shared/services';
import gql from 'graphql-tag';
import Logo from 'apps/common/Logos';
import card from './Card.less';

export default () => {
  const [teams, setTeams] = React.useState([]);

  React.useEffect(() => {
    api
      .watchQuery({
        query: gql`
          query getTeams {
            teams
          }
        `,
      })
      .subscribe(({ data: { teams } }) => {
        setTeams(teams);
      });
  }, []);

  return (
    <Row gutter={12}>
      <Col span={6}>
        <Card title={Bengals} className={card.base}>
          <Logo name={'bengals'} />
        </Card>
      </Col>
    </Row>
  );
};
