import { useQuery } from "react-query";
import { fetchCoinHistory } from "../\bapi";
import ApexCharts from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 100000,
    }
  );
  console.log(data);

  return (
    <div>
      {isLoading ? (
        "Loading chart"
      ) : (
        <ApexCharts
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((price) => parseFloat(price.close)) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },

            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
              },
              type: "datetime",
              categories: data
                ? data.map((price) =>
                    new Date(price.time_close * 1000).toISOString()
                  )
                : [],
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#2ecc71"], stops: [0, 100] },
            },
            colors: ["#9b59b6"],
            tooltip: {
              y: {
                formatter: (value) => `$${value}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
