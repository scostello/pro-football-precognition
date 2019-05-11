// @flow
import { types, getEnv, flow } from 'mobx-state-tree';
import gql from 'graphql-tag';
import { api } from 'shared/services';
import { Franchise } from './franchise';

const franchisesQuery = gql`
  query fetchFranchises {
    franchises {
      cursor
      nodes {
        idFranchise
        teamFull
        teamAbbr
        seasonStats {
          season
          totalGames
          totalTies
          totalLosses
          totalWins
          winningPercentage
        }
      }
    }
  }
`;

const fetchAs = self => flow(function* fetch(resource: string) {
  self.state = 'pending';
  try {
    const {
      data: { franchises },
    } = yield self.api.query({ query: franchisesQuery });

    const { cursor, nodes } = franchises;

    self.franchises = nodes;
    self.state = 'done';
  } catch (error) {
    console.log('in error', error);
    self.state = 'error';
  }
});

export const createAppStore = () => {
  const root = types
    .model('RootStore', {
      franchises: types.array(Franchise),
      state: '',
    })
    .views(self => ({
      get api() {
        return getEnv(self).api;
      },
    }))
    .actions(self => ({
      getFranchises: fetchAs(self),
      getPlayers: () => {},
    }));

  return root.create(
    {},
    {
      api,
    },
  );
};
