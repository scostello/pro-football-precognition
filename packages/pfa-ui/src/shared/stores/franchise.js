// @flow
import { types } from 'mobx-state-tree';

export const Franchise = types.model({
  idFranchise: types.identifier,
  teamAbbr: '',
  teamFull: '',
  isActive: true,
  mascot: '',
  stadiumName: '',
  activeFrom: types.number,
  activeTo: types.number,
});

export default Franchise;
