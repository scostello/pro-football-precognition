// @flow
import * as React from 'react';
import SparkXYFrame from 'semiotic/lib/SparkXYFrame';
import { curveMonotoneX } from 'd3-shape';

const frameProps = {
  lines: {
    label: '#ac58e5',
    coordinates: [
      { step: 0, value: 40 },
      { step: 1, value: 36.58888317197331 },
      { step: 2, value: 34.361380429458336 },
      { step: 3, value: 36.87873572874993 },
      { step: 4, value: 34.68720854757772 },
      { step: 5, value: 32.18089488954531 },
      { step: 6, value: 35.31048880660374 },
      { step: 7, value: 33.688873784670356 },
      { step: 8, value: 30.564843805527623 },
      { step: 9, value: 34.642076351250246 },
      { step: 10, value: 31.46211844240668 },
      { step: 11, value: 34.82751955028758 },
      { step: 12, value: 38.738039760538165 },
      { step: 13, value: 38.957273651656664 },
      { step: 14, value: 39.88196575980382 },
      { step: 15, value: 43.79206259777478 },
      { step: 16, value: 45.424894711783466 },
      { step: 17, value: 49.09114131995397 },
      { step: 18, value: 44.490587202858094 },
      { step: 19, value: 41.19284696526964 },
      { step: 20, value: 43.472382031335094 },
      { step: 21, value: 40.02452955416336 },
      { step: 22, value: 38.218021010051466 },
      { step: 23, value: 40.65650637198006 },
      { step: 24, value: 37.37995889764865 },
      { step: 25, value: 38.97181922689639 },
      { step: 26, value: 39.07974657776333 },
      { step: 27, value: 43.93499054320263 },
      { step: 28, value: 48.72990588133294 },
      { step: 29, value: 45.827010908305674 },
      { step: 30, value: 45.82971375080307 },
      { step: 31, value: 49.251085191006396 },
      { step: 32, value: 50.38694443168504 },
      { step: 33, value: 53.29759480431096 },
      { step: 34, value: 51.11018555035398 },
      { step: 35, value: 52.321002781627186 },
      { step: 36, value: 51.39527081860849 },
      { step: 37, value: 55.67726385743287 },
      { step: 38, value: 60.45440745315032 },
      { step: 39, value: 58.66441115497674 },
      { step: 40, value: 62.25633540683077 },
    ],
  },
  size: [100, 20],
  lineType: { type: 'stackedarea', interpolator: curveMonotoneX },
  xAccessor: 'step',
  yAccessor: 'value',
  lineStyle(e) {
    return { fill: e.label, stroke: e.label, fillOpacity: 0.75 };
  },
  axes: [{ orient: 'left' }],
};

export default () => <SparkXYFrame {...frameProps} />;
