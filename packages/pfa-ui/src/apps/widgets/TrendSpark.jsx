// @flow
import * as React from 'react';
import SparkXYFrame from 'semiotic/lib/SparkXYFrame';
import { GradientPinkBlue } from '@vx/gradient';

const frameProps = {
  size: [100, 30],
  lineType: { type: 'line' },
  xAccessor: 'season',
  yAccessor: 'totalWins',
  lineStyle: e => ({ fill: e.label, stroke: 'url(#gradient)', fillOpacity: 0.75 }),
  additionalDefs: [<GradientPinkBlue key={'gradient'} id={'gradient'} />],
};

export default ({ data }) => <SparkXYFrame {...frameProps} lines={{ coordinates: data }} />;
