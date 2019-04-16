// @flow
import * as React from 'react';
import OrdinalFrame from 'semiotic/lib/OrdinalFrame';

const frameProps = {
  data: [
    { wins: 5, losses: 11, season: 2000 },
    { wins: 7, losses: 11, season: 2001 },
    { wins: 7, losses: 11, season: 2002 },
    { wins: 9, losses: 11, season: 2003 },
    { wins: 12, losses: 11, season: 2004 },
    { wins: 11, losses: 11, season: 2005 },
    { wins: 6, losses: 11, season: 2006 },
    { wins: 5, losses: 11, season: 2007 },
    { wins: 7, losses: 11, season: 2008 },
  ],
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
  rAccessor: 'wins',
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
  pieceHoverAnnotation: [
    {
      type: 'highlight',
      style: {
        stroke: 'white',
        fill: 'white',
        strokeWidth: 4,
        strokeOpacity: 0.5,
      },
    },
    { type: 'frame-hover' },
  ],
  tooltipContent: (d) => {
    const bothValues = [
      <div style={{ color: '#ac58e5' }} key={'1'}>
        Leads:
        {' '}
        {d.leads}
      </div>,
      <div style={{ color: '#E0488B' }} key="2">
        Sales:
        {' '}
        {d.sales}
      </div>,
    ];
    const content = d.rIndex === 0 ? bothValues : bothValues.reverse();
    return (
      <div style={{ fontWeight: 900 }} className="tooltip-content">
        {content}
      </div>
    );
  },
  oLabel: true,
};

export const Sample = () => <OrdinalFrame {...frameProps} />;

export default Sample;
