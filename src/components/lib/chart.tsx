import React, { FC } from 'react';
import { Dimensions } from '../../types';

interface ChartProps {
    dimensions: Dimensions;
    children: React.ReactNode;
    borderStyle?: string;
}

const Chart: FC<ChartProps> = ({ dimensions, children, borderStyle }) => (
  <svg
    width={dimensions.width}
    height={dimensions.height}
    style={{
      ...(borderStyle && { border: borderStyle }),
    }}
  >
    <g transform={`translate(${dimensions.margin?.left}, ${dimensions.margin?.top})`}>
      { children }
    </g>
  </svg>
);

export default Chart;
