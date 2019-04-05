// @flow
import * as React from 'react';
import OrdinalFrame from 'semiotic/lib/OrdinalFrame';

const frameProps = {
  data: [
    { sales: 5, leads: 150, month: 'Jan' },
    { sales: 7, leads: 100, month: 'Feb' },
    { sales: 7, leads: 75, month: 'Mar' },
    { sales: 4, leads: 50, month: 'Apr' },
    { sales: 2, leads: 200, month: 'May' },
    { sales: 3, leads: 175, month: 'Jun' },
    { sales: 5, leads: 125, month: 'Jul' },
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
  oAccessor: 'month',
  rAccessor: ['leads', 'sales'],
  rExtent: [0],
  style: { fill: '#ac58e5', opacity: 1, stroke: 'white' },
  connectorStyle: { stroke: '#E0488B', strokeWidth: 3 },
  title: (
    <text>
      <tspan fill={'#E0488B'}>Sales</tspan>
      {' '}
vs
      <tspan fill={'#ac58e5'}>Leads</tspan>
    </text>
  ),
  axes: [
    {
      key: 'leads-axis',
      orient: 'right',
      ticks: 3,
      tickValues: [0, 25, 50, 75, 100, 125, 150, 175, 200],
      label: (
        <text fontWeight="bold" fill={'#ac58e5'}>
          Leads
        </text>
      ),
    },
    {
      key: 'sales-axis',
      orient: 'left',
      tickValues: [0, 1, 2, 3, 4, 5, 6, 7],
      label: (
        <text fontWeight="bold" fill={'#E0488B'}>
          Sales
        </text>
      ),
    },
  ],
  multiAxis: true,
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
