import {
  Bar,
  CartesianGrid,
  Legend,
  BarChart as RechartBar,
  Rectangle,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts';


export interface IBarItem {
  name: string;
  v1: number;
  v2: number;
}

export interface IBarChart {
  data: IBarItem[];
  title?: string;
  unit?: number;
  barNames?: {
    v1: string;
    v2: string;
  },
  yUnit?: string;
}

export const BarChart = ({ data, barNames, unit = 1, yUnit }: IBarChart) => {
  const chartData = (data || []).map(item => ({
    ...item,
    v1: item.v1 > 0 ? (item.v1 / unit).toFixed(2) : 0,
    v2: item.v2 > 0 ? (item.v2 / unit).toFixed(2) : 0,
  }));

  return (
    <ResponsiveContainer width='100%' minHeight={450}>
      <RechartBar
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 30,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis unit={yUnit} />
        <Legend />
        <Bar
          isAnimationActive={false}
          dataKey='v1'
          label={{ position: 'top' }}
          name={barNames?.v1}
          fill='#22c55e'
          activeBar={<Rectangle fill='pink' stroke='blue' />}
        />
        <Bar
          isAnimationActive={false}
          dataKey='v2'
          name={barNames?.v2}
          label={{ position: 'top' }}
          fill='#ef4444'
          activeBar={<Rectangle fill='gold' stroke='purple' />}
        />
      </RechartBar>
    </ResponsiveContainer>
  );
};
