import "./chart.scss";
import { useContext } from "react";
import {  ZoneContext } from "../../context/zonecontext";
import {
  AreaChart,
  Area,
  LineChart,
  XAxis,
  Line,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const Chart = ({ aspect, title,mode }) => {
  const zone = useContext(ZoneContext);
  for(let i=0;i<zone.length;i++){
    zone[i]={length:zone[i].lights.length,working:zone[i].lights.length-zone[i].faultcount,...zone[i]};
  }
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
      <LineChart width={600} height={100} data={zone} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <Line type="monotone" dataKey={mode==="fault"?"faultcount":"working"} stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="name" />
    <YAxis dataKey="length" />
    <Tooltip />
  </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
