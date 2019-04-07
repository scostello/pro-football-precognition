// @flow
import { types, getEnv } from 'mobx-state-tree';
import { api } from 'shared/services';

export const createAppStore = () => {
  const root = types
    .model({ name: '' })
    .views(self => ({
      get api() {
        return getEnv(self).api;
      },
    }))
    .actions(self => ({
      getPlayers: () => {},
    }));

  return root.create(
    {},
    {
      api,
    },
  );
};
