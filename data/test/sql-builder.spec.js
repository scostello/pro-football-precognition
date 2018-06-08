import { expect } from 'chai';
import builder from '../lib/sql-builder';

describe('SQL Builder', () => {
    let db = null;

    it('is true', () => {
        expect(['foo', 'bar']).to.have.lengthOf(2);
    });
});