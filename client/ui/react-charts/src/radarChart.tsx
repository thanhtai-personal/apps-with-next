import React from 'react';
import { Radar, RadarChart as RechartRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';


export interface IRadarChartProps {
  data: any[];
  config?: any;
}

export const BasicRadarChart = ({
  data,
  config = {}
}: IRadarChartProps) => {

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartRadar cx="50%" cy="50%" outerRadius={config.outRadius || "80%"} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <PolarRadiusAxis />
        <Radar name={config.name || ""} dataKey="v1"
          stroke={config.stroke || "#8884d8"}
          fill={config.fill || "#8884d8"}
          fillOpacity={config.fillOpacity || 0.6} />
      </RechartRadar>
    </ResponsiveContainer>
  )
}