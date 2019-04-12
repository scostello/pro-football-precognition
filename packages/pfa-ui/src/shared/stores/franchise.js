// @flow
import { types } from 'mobx-state-tree';

export const Franchise = types.model({
  idFranchise: types.identifier,
  teamAbbr: '',
  teamFull: '',
  isActive: true,
  mascot: '',
  stadiumName: '',
  activeFrom: types.optional(types.number, 2019),
  activeTo: types.optional(types.number, 2019),
});

export default Franchise;
