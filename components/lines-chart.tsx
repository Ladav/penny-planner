import * as echarts from "echarts/core";
import {
  ChartElement,
  SvgChart,
  SVGRenderer,
} from "@wuba/react-native-echarts";
import { LineChart } from "echarts/charts";
import { GridComponent, TooltipComponent } from "echarts/components";
import { Dimensions } from "react-native";
import { useCallback, useEffect, useRef } from "react";
import { themesColors } from "@/utils/color-theme.utils";

echarts.use([SVGRenderer, LineChart, GridComponent, TooltipComponent]);

const CHART_WIDTH = Dimensions.get("screen").width; // Default with the phone screen width
const CHART_HEIGHT = 400;

export interface LinesChartProps {
  width?: number;
  height?: number;
  isLoading?: boolean;
  error?: string | null;
  data?: {
    labels: (string | number)[];
    data: number[][];
  };
}

export default function LinesChart({
  width = CHART_WIDTH,
  height = CHART_HEIGHT,
  isLoading,
  error,
  data,
}: LinesChartProps) {
  const skiaRef = useRef<ChartElement | any>(null);

  const showChartLoading = useCallback((chart: echarts.EChartsType) => {
    chart.showLoading("default", {
      text: "Loading...",
      maskColor: themesColors.dark["color-primary-light"],
      textColor: themesColors.dark["color-secondary-default"],
      color: themesColors.dark["color-secondary-default"],
      fontSize: 14,
    });
  }, []);

  const hideChartLoading = useCallback((chart: echarts.EChartsType) => {
    chart.hideLoading();
  }, []);

  const getOptions = useCallback(
    (data: Exclude<LinesChartProps["data"], undefined>) => {
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "cross" },
        },
        xAxis: {
          type: "category",
          data: data?.labels,
          axisLabel: {
            rotate: 30,
            formatter: (value: string) =>
              String(value).slice(0, 15) + (value.length > 15 ? "..." : ""),
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            strockColor: themesColors.dark["color-secondary-light"],
          },
          axisLabel: {
            formatter: "₹ {value}",
          },
        },
        series: [
          ...data.labels.map((label, index) => {
            return {
              data: data?.data[index],
              type: "line",
              name: label,
              itemStyle: {
                color: themesColors.dark["color-secondary-default"],
              },
              endLabel: {
                show: true,
              },
            };
          }),
        ],
        backgroundColor: themesColors.dark["color-primary-light"],
        grid: {
          left: 16,
          containLabel: true,
          bottom: 16,
          top: 26,
          right: 46,
        },
      };
    },
    []
  );

  useEffect(() => {
    let chart: echarts.EChartsType;
    if (skiaRef.current) {
      chart = echarts.init(skiaRef.current, "dark", {
        renderer: "svg",
        width,
        height,
      });
      if (isLoading === true) {
        showChartLoading(chart);
      }
      if (!isLoading && error) {
        hideChartLoading(chart);
      }
      if (data) {
        chart.setOption(getOptions(data));
      }
    }
    return () => chart?.dispose();
  }, [isLoading, data]);

  return <SvgChart ref={skiaRef} />;
}
