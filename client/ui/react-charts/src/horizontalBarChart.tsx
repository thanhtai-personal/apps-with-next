import React from "react";
import {
  Bar,
  CartesianGrid,
  Label,
  LabelList,
  Legend,
  BarChart as RechartBar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

export interface IHorizontalBarChart {
  data: any[];
  config?: any;
  title?: string;
  unit?: number;
  bars: {
    name: string;
    fill?: string;
    background?: string;
    valueKey?: string;
  }[],
  yUnit?: string;
  styles?: any;
}

const YAxisLeftTick = ({ y, payload: { value } }) => {
  return (
    <>
      <text x={20} y={y + 5} fill="white">
        {value}
      </text>
    </>
  );
};

export const HorizontalBarChart = ({ data, bars, config = {}, styles }: IHorizontalBarChart) => {

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartBar
        width={config.width || 500}
        height={config.height || 450}
        data={data}
        layout="vertical"
        margin={styles?.margin || {
          top: 5,
          right: 30,
          left: 30,
          bottom: 5,
        }}
      >
        {config.useGrid !== false && <CartesianGrid strokeDasharray="3 3" />}
        <XAxis hide={config.hideX} axisLine={false} type="number" />
        <YAxis
          orientation="left"
          dataKey={"name"}
          type="category"
          axisLine={false}
          tickLine={false}
          tick={YAxisLeftTick}
        />
        {config.useTooltip !== false && <Tooltip />}
        {config.useLegend !== false && <Legend />}
        {bars.map((bar, index) => (
          <Bar dataKey={bar.name} fill={bar.fill || "#8884d8"} background={{ fill: bar.background || '#eee' }} barSize={config.barSize || 32}>
            <LabelList dataKey={bar.valueKey} position="right" />
          </Bar>
        ))}
      </RechartBar>
    </ResponsiveContainer>
  );
};
