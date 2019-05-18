// @flow
import { types, getEnv, flow } from 'mobx-state-tree';
import gql from 'graphql-tag';
import { api } from 'shared/services';
import { Franchise } from './franchise';

const franchisesQuery = gql`
  query fetchFranchises {
    fetchedResource: franchises {
      cursor
      nodes {
        idFranchise
        teamFull
        teamAbbr
        totalStats {
          totalGames
          totalTies
          totalLosses
          totalWins
          winningPercentage
        }
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

const QUERY_MAP = {
  franchises: franchisesQuery,
};

const playOccurredSubscription = gql`
  subscription {
    playOccurred
  }
`;

const fetchAs = self => flow(function* fetch(resource: string) {
  self.state = 'pending';
  try {
    const {
      data: { fetchedResource },
    } = yield self.api.query({ query: QUERY_MAP[resource], fetchPolicy: 'cache-first' });

    const { cursor, nodes } = fetchedResource;

    self.setResource(resource, nodes);
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
      state: 'idle',
    })
    .views(self => ({
      get api() {
        return getEnv(self).api;
      },
    }))
    .actions(self => ({
      fetchResources: fetchAs(self),
      setResource: (resource, value) => {
        self[resource] = value;
      },
      getPlayers: () => {},
      afterCreate: () => {
        const source$ = self.api.subscribe({ query: playOccurredSubscription });

        source$.subscribe(play => console.log('Play occurred...', play));
      },
    }));

  return root.create(
    {},
    {
      api,
    },
  );
};
