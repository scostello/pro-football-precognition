// @flow
import { types } from 'mobx-state-tree';

export const SeasonStat = types.model('SeasonStat', {
  season: types.number,
  totalHomeGames: types.maybe(types.number),
  totalAwayGames: types.maybe(types.number),
  totalGames: types.maybe(types.number),
  totalWins: types.maybe(types.number),
  totalLosses: types.maybe(types.number),
  totalTies: types.maybe(types.number),
  winningPercentage: types.maybe(types.number),
});

export const Franchise = types
  .model({
    idFranchise: types.identifier,
    teamAbbr: '',
    teamFull: '',
    isActive: true,
    mascot: '',
    stadiumName: '',
    activeFrom: types.optional(types.number, 2019),
    activeTo: types.optional(types.number, 2019),
    seasonStats: types.array(SeasonStat),
  })
  .views(self => ({
    get winPerc() {
      return self.winningPercentage.toFixed(2);
    },
  }));

export default Franchise;
