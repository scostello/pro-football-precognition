// @flow
import * as React from 'react';
import OrdinalFrame from 'semiotic/lib/OrdinalFrame';

const frameProps = {
  size: [700, 500],
  margin: {
    top: 60,
    bottom: 50,
    left: 60,
    right: 60,
  },
  type: {
    type: 'point',
    customMark: (d) => {
      if (d.rIndex === 1) {
        return <circle r={6} fill={'#E0488B'} />;
      }
      return <rect height={d.scaledValue} width={20} x={-10} fill={'#ac58e5'} />;
    },
  },
  connectorType(e) {
    return e.rIndex !== 0 && e.rIndex;
  },
  oPadding: 10,
  oAccessor: 'season',
  rAccessor: 'totalWins',
  rExtent: [0, 20],
  style: { fill: '#ac58e5', opacity: 1, stroke: 'white' },
  connectorStyle: { stroke: '#E0488B', strokeWidth: 3 },
  title: <text>{'Wins per Season'}</text>,
  axes: [
    {
      key: 'wins-axis',
      orient: 'left',
      tickValues: [0, 4, 8, 12, 16, 20],
      label: (
        <text fontWeight="bold" fill={'#E0488B'}>
          Wins
        </text>
      ),
    },
  ],
  multiAxis: false,
  renderOrder: ['pieces', 'connectors'],
  oLabel: true,
};

export const Sample = ({ data }) => <OrdinalFrame {...frameProps} data={data} />;

export default Sample;
