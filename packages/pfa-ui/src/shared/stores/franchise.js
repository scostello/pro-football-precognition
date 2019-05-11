// @flow
import { types } from 'mobx-state-tree';

const gameOutcomeTypes = {
  totalHomeGames: types.maybe(types.number),
  totalAwayGames: types.maybe(types.number),
  totalGames: types.maybe(types.number),
  totalWins: types.maybe(types.number),
  totalLosses: types.maybe(types.number),
  totalTies: types.maybe(types.number),
  winningPercentage: types.maybe(types.number),
};

export const GameOutcomeStats = types.model('OutcomeStats', gameOutcomeTypes);

export const SeasonStats = types.model('SeasonStat', {
  ...gameOutcomeTypes,
  season: types.number,
});

export const Franchise = types
  .model('Franchise', {
    idFranchise: types.identifier,
    teamAbbr: '',
    teamFull: '',
    isActive: true,
    mascot: '',
    stadiumName: '',
    activeFrom: types.optional(types.number, 2019),
    activeTo: types.optional(types.number, 2019),
    totalStats: GameOutcomeStats,
    seasonStats: types.array(SeasonStats),
  })
  .views(self => ({
    get winPerc() {
      return self.winningPercentage.toFixed(2);
    },
  }));

export default Franchise;
